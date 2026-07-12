<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AutomaticSendingEmailController extends Controller
{
    public function send_lacking_information_notification()
    {

        $tickets = Ticket::select('id', 'email', 'ticket_id', 'serial_number')
            ->whereDate('created_at', Carbon::now()->subDays(3)->toDateString())
            ->where('call_type', 'CF-Warranty Claim')
            ->whereNotNull('email')
            ->whereNotNull('serial_number')
            ->where(function ($query) {
                $query->whereDoesntHave('files', function ($q) {
                    $q->where('type', 'readable_serial_section');
                })
                    ->orWhereDoesntHave('files', function ($q) {
                        $q->where('type', 'bill_of_sale');
                    })
                    ->orWhereDoesntHave('files', function ($q) {
                        $q->where('type', 'defect_issue');
                    });
            })
            ->with(['files'])
            ->get();

        // 1. Define the exact file types you require
        $requiredFiles = ['readable_serial_section', 'bill_of_sale', 'defect_issue'];

        // 2. Loop through the tickets to calculate what is missing
        $tickets->map(function ($ticket) use ($requiredFiles) {
            $uploadedTypes = $ticket->files->pluck('type')->toArray();
            $missingFiles = array_diff($requiredFiles, $uploadedTypes);
            $ticket->lacking_files = array_values($missingFiles); 
            $ticket->makeHidden('files');

            return $ticket;
        });

        // $tickets = collect([
        //     (object) [
        //         'id'            => 1045,
        //         'email'         => 'webdev@empireonegroup.com',
        //         'ticket_id'     => 'CF0000000001',
        //         'serial_number' => 'A2508635280001029'
        //     ],
        // ]);

        $googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzi7UYWokXtlxYTCuW3Wm-mYJiIf-Dhsegrpx_p87DPFkLmYcVtILMOpGorR1y6zTo0/exec';

        // Send the entire collection as a single JSON payload
        $response = Http::post($googleScriptUrl, [
            'tickets' => $tickets->toArray()
        ]);

        // Parse the JSON response returned from Apps Script
        $googleResponse = $response->json();

        return response()->json([
            'status'        => 'success',
            'tickets_found' => $tickets->count(),
            'emails_sent'   => $googleResponse['emails_sent'] ?? 0,
            'error_msg'     => $googleResponse['message'] ?? null,
            'tickets' => $tickets,
        ], 200);
    }
}
