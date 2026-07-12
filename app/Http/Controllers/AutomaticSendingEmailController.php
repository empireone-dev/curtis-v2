<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AutomaticSendingEmailController extends Controller
{
    public function auto_send_lacking_information_notification()
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
            $ticket->lackings = array_values($missingFiles);
            $ticket->makeHidden('files');

            return $ticket;
        });


        $googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwE2lG1ZG_dNwwwT8f_OpePh6wiEElGBf846AS_ZF1T-cj9QdOcVtbOR3oJoLuWkgU/exec';

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

    public function auto_close_send_email_notification()
    {
        $tickets = Ticket::select('id', 'email', 'ticket_id', 'serial_number')
            ->whereDate('created_at', Carbon::now()->subDays(7)->toDateString())
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


        $requiredFiles = ['readable_serial_section', 'bill_of_sale', 'defect_issue'];

        // 2. Loop through the tickets to calculate what is missing
        $tickets->map(function ($ticket) use ($requiredFiles) {
            $uploadedTypes = $ticket->files->pluck('type')->toArray();
            $missingFiles = array_diff($requiredFiles, $uploadedTypes);
            $ticket->lackings = array_values($missingFiles);
            $ticket->makeHidden('files');

            return $ticket;
        });

        $googleScriptUrl = 'https://script.google.com/macros/s/AKfycbzs7VzzdevO1LnlbTW5qNWOpaCH_9D2U5tY_n2JInNpElLv2rXkkuun1-Tbba8UmygB/exec';

        // Send the entire collection as a single JSON payload
        $response = Http::post($googleScriptUrl, [
            'tickets' => $tickets->toArray()
        ]);

        // Parse the JSON response returned from Apps Script
        $googleResponse = $response->json();
        // 1. Extract the IDs using Laravel's Collection 'pluck' method
        $ticketIds = $tickets->pluck('id')->toArray();

        // 2. Perform a single mass update query if the array isn't empty
        if (!empty($ticketIds)) {
            Ticket::whereIn('id', $ticketIds)->update([
                'status' => 'CLOSED'
            ]);
        }
        return response()->json([
            'status'        => 'success',
            'tickets_found' => $tickets->count(),
            'emails_sent'   => $googleResponse['emails_sent'] ?? 0,
            'error_msg'     => $googleResponse['message'] ?? null,
            'tickets' => $tickets,
        ], 200);
    }
}
