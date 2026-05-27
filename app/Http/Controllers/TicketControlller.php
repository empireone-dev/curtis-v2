<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TicketControlller extends Controller
{
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
            'issue'         => 'required|string|max:255',
            'remarks'       => 'nullable|string',
            'call_type'     => 'nullable|string', // Added since it's used below
        ]);

        $callType = $request->input('call_type');
        $validation = $this->getValidation($callType);

        $ticket = Ticket::create(array_merge($validated, [
            'user_id'      => $this->queueing($callType),
            'call_type'    => $callType ?? 'CF-Warranty Claim',
            'status'       => $validation,
            'cases_status' => 'handled'
        ]));

        // 3. Generate subject and update the model directly in memory
        $subject = $this->generateSubject($callType, $ticket->id);
        $ticket->update(['ticket_id' => $subject]);

        return response()->json(['message' => 'success'], 200);
    }
}
