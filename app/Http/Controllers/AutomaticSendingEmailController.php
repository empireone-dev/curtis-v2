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
        // 1. Fetch the tickets (selecting id and email)
        $tickets = Ticket::select('id', 'email', 'ticket_id', 'serial_number') // Removed duplicate 'serial_number'
            ->whereDate('created_at', Carbon::now()->subDays(3)->toDateString())
            ->where('call_type', 'CF-Warranty Claim')
            ->whereNotNull('email')
            // Group the missing file checks together
            ->where(function ($query) {
                $query->whereDoesntHave('files', function ($q) {
                    $q->where('type', 'readable_serial_section'); // Adjust 'type' to your actual database column name
                })
                    ->orWhereDoesntHave('files', function ($q) {
                        $q->where('type', 'bill_of_sale');
                    })
                    ->orWhereDoesntHave('files', function ($q) {
                        $q->where('type', 'defect_issue');
                    });
            })
            ->get();

        // $tickets = collect([
        //     (object) [
        //         'id'            => 1045,
        //         'email'         => 'webdev@empireonegroup.com',
        //         'ticket_id'     => 'CF0000000001',
        //         'serial_number' => 'A2508635280001029'
        //     ],
        // ]);

        // $googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwDA7cQlEWJhOb20cC0eSQjnnraFooz8OSC04spycjFLV4Ujf3j1rDFCQt8XyLHkDDB/exec';

        // // Send the entire collection as a single JSON payload
        // $response = Http::post($googleScriptUrl, [
        //     'tickets' => $tickets->toArray()
        // ]);

        // // Parse the JSON response returned from Apps Script
        // $googleResponse = $response->json();

        return response()->json([
            // 'status'        => $response->successful() ? 'success' : 'failed',
            'tickets_found' => $tickets->count(),
            // Grab the actual count from Google's response
            'emails_sent'   => $googleResponse['emails_sent'] ?? 0,
            'error_msg'     => $googleResponse['message'] ?? null,
            'tickets' => $tickets,
        ], 200);
    }
}
