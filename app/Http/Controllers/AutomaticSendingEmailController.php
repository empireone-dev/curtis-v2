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
            ->where('status', '<>', 'CLOSED')
            ->whereNull('is_reply')
            ->whereNotNull('email')
            ->whereNotNull('serial_number')
            ->with(['files'])
            ->get();

        // 1. Define the exact file types you require
        $requiredFiles = ['readable_serial_section', 'bill_of_sale', 'defect_issue'];

        // 2. Loop through the tickets to calculate what is missing
        $processedTickets = $tickets->map(function ($ticket) use ($requiredFiles) {
            $uploadedTypes = $ticket->files->pluck('type')->toArray();
            $missingFiles = array_diff($requiredFiles, $uploadedTypes);

            $ticket->lackings = array_values($missingFiles);
            $ticket->makeHidden('files');

            return $ticket;
        })
            ->filter(function ($ticket) {
                return count($ticket->lackings) > 0;
            })
            ->values();


        $googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwE2lG1ZG_dNwwwT8f_OpePh6wiEElGBf846AS_ZF1T-cj9QdOcVtbOR3oJoLuWkgU/exec';

        // Send the entire collection as a single JSON payload
        $response = Http::post($googleScriptUrl, [
            'tickets' => $processedTickets->toArray()
        ]);

        // Parse the JSON response returned from Apps Script
        $googleResponse = $response->json();

        return response()->json([
            'status'        => 'success',
            'tickets_found' => $processedTickets->count(),
            'emails_sent'   => $googleResponse['emails_sent'] ?? 0,
            'error_msg'     => $googleResponse['message'] ?? null,
            'tickets' => $processedTickets,
        ], 200);
    }

    public function auto_close_send_email_notification()
    {

        $tickets = Ticket::select('id', 'email', 'ticket_id', 'serial_number')
            ->whereDate('created_at', Carbon::now()->subDays(7)->toDateString())
            ->where('call_type', 'CF-Warranty Claim')
            ->where('status', '<>', 'CLOSED')
            ->whereNull('is_reply')
            ->whereNotNull('email')
            ->whereNotNull('serial_number')
            ->with(['files'])
            ->get();

        $requiredFiles = ['readable_serial_section', 'bill_of_sale', 'defect_issue'];

        // 1. Map through all tickets to calculate missing files
        $processedTickets = $tickets->map(function ($ticket) use ($requiredFiles) {
            $uploadedTypes = $ticket->files->pluck('type')->toArray();
            $missingFiles = array_diff($requiredFiles, $uploadedTypes);

            $ticket->lackings = array_values($missingFiles);
            $ticket->makeHidden('files');

            return $ticket;
        })
            ->filter(function ($ticket) {
                return count($ticket->lackings) > 0;
            })
            ->values();

        $googleScriptUrl = 'https://script.google.com/macros/s/AKfycbyW14egpknUjisMI_OKdnPcuI64W2codzge_dkYq-RoHJ78sTRA7G7yPBCDp68Tmg9X/exec';

        // Send the entire collection as a single JSON payload
        $response = Http::post($googleScriptUrl, [
            'tickets' => $processedTickets->toArray()
        ]);

        $googleResponse = $response->json();
        $ticketIds = $processedTickets->pluck('id')->toArray();
        if (!empty($ticketIds)) {
            Ticket::whereIn('id', $ticketIds)->update([
                'status' => 'CLOSED'
            ]);
        }

        return response()->json([
            'status'        => 'success',
            'tickets_found' => $processedTickets->count(),
            'emails_sent'   => $googleResponse['emails_sent'] ?? 0,
            'error_msg'     => $googleResponse['message'] ?? null,
            'tickets' => $processedTickets,
        ], 200);
    }
}
