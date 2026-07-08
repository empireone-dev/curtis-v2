<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\File;
use App\Models\ProductRegistration;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class TicketControlller extends Controller
{

    public function get_ticket_by_serial_number($serial_number)
    {
        $ticket = Ticket::where('serial_number', $serial_number)->with(['activities', 'product_registration','files'])->first();
        if ($ticket) {
            return response()->json([
                'data' => $ticket,
                'message' => 'success'
            ], 200);
        }
    }

    public function upload_lacking_information(Request $request)
    {
        return response()->json([
            'message' => 'success'
        ], 200);
    }

    public function get_product_registration_by_serial_number($serial_number)
    {

        $product_registration = ProductRegistration::where('serial', $serial_number)->with(['ticket'])->first();
        $ticket = Ticket::where('serial_number', $serial_number)->with(['activities', 'product_registration'])->first();
        if ($product_registration) {
            return response()->json([
                'data' => $product_registration,
                'message' => 'success'
            ], 200);
        } else if ($ticket) {
            $ticket = Ticket::where('serial_number', $serial_number)->with(['activities', 'product_registration'])->first();
            return response()->json([
                'id' => null,
                'data' => [
                    'ticket' => $ticket,
                ],
                'message' => 'success'
            ], 200);
        } else {
            return response()->json([
                'data' => $product_registration,
                'message' => 'success'
            ], 200);
        }
    }



    public function send_initial_email($subject, $ticket, $type = 'CF-Warranty Claim')
    {
        if ($type == 'Parts') {
            $scriptUrl = env('PARTS_SEND_APPSCRIPT');
        } else {
            $scriptUrl = env('WARRANTY_SEND_APPSCRIPT');
        }

        $recipient = $ticket->email;

        // 1. Determine ONLY the view based on the form type
        // Since $subject is passed as an argument, we don't need it in the match block
        $view = match ($type) {
            'Parts'        => 'emails.parts-initial-email',
            'Safety Issue' => 'emails.safety-issue-initial-email',
            default        => 'emails.warranty-initial-email',
        };

        // 2. Render the correct blade view to a string
        $body = view($view, compact('ticket'))->render();

        // 3. Setup the parameters for the API call
        $params = [
            'recipient' => $recipient,
            'subject'   => $subject,
            'body'      => $body
        ];

        // 4. Send the email via Guzzle
        $client = new Client();
        $response = $client->post($scriptUrl, [
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded'
            ],
            'form_params' => $params
        ]);

        return $response->getBody()->getContents();
    }

    public function queueing(?string $call_type): ?int
    {
        $map = [
            'Parts'             => 'Parts',
            'CF-Warranty Claim' => 'Warranty',
            'TS-Tech Support'   => 'Tech',
            'Safety Issue'      => 'Safety Issue',
        ];

        $type = $map[$call_type] ?? 'Warranty';

        // Optimize date filtering to allow database index usage
        $today = Carbon::today();
        $tomorrow = Carbon::tomorrow();

        // Only get eligible users
        $userWithSmallestCount = User::where('agent_type', $type)
            ->whereNull('remember_token')
            ->withCount(['tickets' => function ($query) use ($today, $tomorrow) {
                // Faster than whereDate('created_at', Carbon::today())
                $query->where('created_at', '>=', $today)
                    ->where('created_at', '<', $tomorrow);
            }])
            ->orderBy('tickets_count', 'asc')
            ->first();

        return $userWithSmallestCount?->id;
    }

    private function getValidation(?string $callType): string
    {
        $map = [
            'Parts'             => 'PARTS VALIDATION',
            'CF-Warranty Claim' => 'WARRANTY VALIDATION',
            'Safety Issue'      => 'SAFETY ISSUE VALIDATION',
            'TS-Tech Support'   => 'TECH VALIDATION',
        ];

        // Return mapped value, or fallback to the original callType
        return $map[$callType] ?? (string) $callType;
    }

    private function generateSubject(?string $callType, int $ticketId): string
    {
        // Use native PHP str_pad instead of manual repetition
        $paddedId = str_pad((string) $ticketId, 6, '0', STR_PAD_LEFT);
        $id = date("dmy") . $paddedId;
        $map = [
            'Parts'             => 'PS',
            'Safety Issue'      => 'SI',
            'CF-Warranty Claim' => 'CF',
            'TS-Tech Support'   => 'TS',
            'General Inquiry'   => '',
        ];

        // Match original fallback logic
        $prefix = array_key_exists($callType, $map) ? $map[$callType] : ($callType === null ? 'CF' : '');

        return $prefix . $id;
    }

    public function store(Request $request)
    {
        // 1. Capture validated data to avoid mass assignment vulnerabilities
        $validated = $request->validate([
            'fname'         => 'required|string|max:255',
            'lname'         => 'required|string|max:255',
            'email'         => 'required|email|max:255',
            'phone'         => 'required|string|max:50',
            'phone2'        => 'nullable|string|max:50',
            'item_number'   => 'required|string|max:255',
            'unit'          => 'required|string|max:255',
            'brand'         => 'required|string|max:255',
            'class'         => 'required|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'zip_code'      => 'required|string|max:20',
            'country'       => 'required|string|max:100',
            'state'         => 'required|string|max:100',
            'city'          => 'required|string|max:100',
            'address'       => 'required|string',
            'address2'       => 'nullable|string',
            'detailed_explanation_issue'  => 'nullable|string',
            'remarks'       => 'nullable|string',
            'store_refusal_reason' => 'nullable|string',
            'call_type'     => 'nullable|string', // Added since it's used below
            'parts_issue'     => 'nullable|string',
        ]);

        $isExist = false;
        if ($request->filled('serial_number')) {
            $isExist = Ticket::where('serial_number', $request->input('serial_number'))->exists();
        }

        if (!$isExist) {
            $callType = $request->input('call_type');
            $validation = $this->getValidation($callType);
            $ticket = Ticket::create(array_merge($validated, [
                'user_id'      => $this->queueing($callType),
                'call_type'    => $callType ?? 'CF-Warranty Claim',
                'status'       => $validation,
                'cases_status' => 'handled',
                'created_from' => 'WEB FORM',
                'is_reply' => 'true',
                'issue' => $request->parts_issue
            ]));

            // 3. Generate subject and update the model directly in memory
            $subject = $this->generateSubject($callType, $ticket->id);
            $ticket->update(['ticket_id' => $subject]);
            $ticket->url = url("/resolution/search/{$ticket->serial_number}");
            $this->send_initial_email($subject, $ticket, $callType);

            Activity::create([
                'user_id' => 0,
                'ticket_id' => $ticket->id,
                'type' => 'TICKET CREATED',
                'message' => json_encode($ticket)
            ]);
            $fileCategories = [
                'readable_serial_section',
                'bill_of_sale',
                'parts_model',
                'receipt_model',
                'defect_issue'
            ];
            $folder = date("Y");
            $filesData = [];
            foreach ($fileCategories as $category) {
                if ($request->hasFile($category)) {
                    foreach ($request->file($category) as $uploadedFile) {
                        $path = $uploadedFile->store($folder, 's3');
                        $filesData[] = [
                            'ticket_id'  => $ticket->id,
                            'url'        => Storage::disk('s3')->url($path),
                            'type'       => $category, // Dynamically assigns 'bill_of_sale', etc.
                            'created_at' => now(),
                            'updated_at' => now(),
                        ];
                    }
                }
            }
            if (!empty($filesData)) {
                File::insert($filesData);
            }
        }

        return response()->json(['message' => 'success'], 200);
    }
}
