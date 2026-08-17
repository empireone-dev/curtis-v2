<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    /**
     * Helper 1: Builds the base query and extracts the date range
     */
    public function get_ticket(Request $request)
    {
        // Default to the last 7 days
        $startDate = Carbon::now()->subDays(6)->startOfDay();
        $endDate = Carbon::now()->endOfDay();

        // Override if date_range is provided
        if ($request->filled('date_range')) {
            $dates = explode(',', $request->date_range);
            if (count($dates) === 2 && !empty($dates[0]) && !empty($dates[1])) {
                $startDate = Carbon::parse($dates[0])->startOfDay();
                $endDate = Carbon::parse($dates[1])->endOfDay();
            }
        }

        // Build the base query
        $query = Ticket::whereBetween('created_at', [$startDate, $endDate]);

        if ($request->filled('call_type')) {
            $query->where('call_type', $request->call_type);
        }

        return [
            'query' => $query,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ];
    }

    /**
     * Helper 2: Calculates total tickets created and chart data
     */
    public function number_of_ticket_created(Request $request)
    {
        $ticketData = $this->get_ticket($request);

        // Clone the query so we don't modify the original
        $query = clone $ticketData['query'];
        $startDate = $ticketData['startDate'];
        $endDate = $ticketData['endDate'];

        $ticketsQuery = $query->selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')
            ->pluck('count', 'date');

        $period = CarbonPeriod::create($startDate, $endDate);

        $chartData = [];
        $totalTicketsCreated = 0;

        foreach ($period as $date) {
            $dateString = $date->format('Y-m-d');
            $count = $ticketsQuery->get($dateString, 0);

            $totalTicketsCreated += $count;

            $chartData[] = [
                'name' => $date->format('M d'),
                'tickets' => $count
            ];
        }

        return [
            'total_tickets_created' => $totalTicketsCreated,
            'total_tickets_created_chart_data' => $chartData
        ];
    }

    /**
     * Helper 3: Calculates photo upload percentages and chart data
     */
    public function percentage_provide_photos(Request $request)
    {
        $ticketData = $this->get_ticket($request);

        $baseQuery = $ticketData['query'];
        $startDate = $ticketData['startDate'];
        $endDate = $ticketData['endDate'];

        // Get daily counts for ALL tickets
        $allTicketsQuery = (clone $baseQuery)
            ->where('created_from', 'WEB FORM')
            ->selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')
            ->pluck('count', 'date');

        // Get daily counts for tickets WITH PHOTOS 
        $photosQuery = (clone $baseQuery)
            ->where('created_from', 'WEB FORM')
            ->where('isUploading', 'true')
            ->selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')
            ->pluck('count', 'date');

        // Get daily counts for tickets WITHOUT PHOTOS
        $photosQuery2 = (clone $baseQuery)
            ->where('created_from', 'WEB FORM')
            ->where('isUploading', 'false')
            ->selectRaw('DATE(created_at) as date, count(*) as count')
            ->groupBy('date')
            ->pluck('count', 'date');

        $period = CarbonPeriod::create($startDate, $endDate);

        $chartData = [];
        $chartData2 = [];
        $totalTickets = 0;
        $totalPhotos = 0;
        $totalPhotos2 = 0;

        foreach ($period as $date) {
            $dateString = $date->format('Y-m-d');

            $dayTotal = $allTicketsQuery->get($dateString, 0);
            $dayPhotos = $photosQuery->get($dateString, 0);
            $dayPhotos2 = $photosQuery2->get($dateString, 0);

            $totalTickets += $dayTotal;
            $totalPhotos += $dayPhotos;
            $totalPhotos2 += $dayPhotos2;

            // Prevent division by zero
            $dayPercentage = $dayTotal > 0 ? round(($dayPhotos / $dayTotal) * 100, 2) : 0;
            $dayPercentage2 = $dayTotal > 0 ? round(($dayPhotos2 / $dayTotal) * 100, 2) : 0;

            $chartData[] = [
                'name' => $date->format('M d'),
                'percentage' => $dayPercentage
            ];
            $chartData2[] = [
                'name' => $date->format('M d'),
                'percentage' => $dayPercentage2
            ];
        }

        // Prevent division by zero for the overall totals
        $overallPercentage = $totalTickets > 0 ? round(($totalPhotos / $totalTickets) * 100, 2) : 0;
        $overallPercentage2 = $totalTickets > 0 ? round(($totalPhotos2 / $totalTickets) * 100, 2) : 0;

        // Fetch actual ticket records for the UI Data Tables
        $providesList = (clone $baseQuery)
            ->where('created_from', 'WEB FORM')
            ->where('isUploading', 'true')
            ->orderBy('created_at', 'desc')
            ->get();

        $notProvidesList = (clone $baseQuery)
            ->where('created_from', 'WEB FORM')
            ->where('isUploading', 'false')
            ->orderBy('created_at', 'desc')
            ->get();

        return [
            // List of ticket records
            'data' => [
                'provides' => $providesList,
                'not_provides' => $notProvidesList,
            ],

            // Percentages
            'total_percentage_provide_photos' => $overallPercentage,
            'total_percentage_not_provide_photos' => $overallPercentage2,

            // Chart Data Arrays
            'total_percentage_provide_photos_chart' => $chartData,
            'total_percentage_not_provide_photos_chart' => $chartData2,

            // Raw Volume Counts
            'provides_count' => $totalPhotos,
            'not_provides_count' => $totalPhotos2,
            'total_tickets_count' => $totalTickets
        ];
    }
    /**
     * Main API Endpoint
     */
    public function percentage_of_approved_claims(Request $request)
    {
        $ticketData = $this->get_ticket($request);

        $baseQuery = $ticketData['query'];
        $startDate = $ticketData['startDate'];
        $endDate = $ticketData['endDate'];

        // 1. Fetch approved tickets into a Collection AND eager-load the decision activity
        $approvedTickets = (clone $baseQuery)
            ->where('created_from', 'WEB FORM')
            ->whereHas('approved_claims', function ($query) {
                $query->where('type', 'DECISION MAKING');
            })
            // Eager load the specific activity so it's available for the CSV 
            ->with(['approved_claims' => function ($query) {
                $query->where('type', 'DECISION MAKING');
            }])
            ->orderBy('created_at', 'desc')
            ->get();

        // 2. Pre-process the tickets to count business days and separate them for export
        $dailyStats = [];
        $fastList = [];
        $slowList = [];

        foreach ($approvedTickets as $ticket) {
            $dateString = $ticket->created_at->format('Y-m-d');

            if (!isset($dailyStats[$dateString])) {
                $dailyStats[$dateString] = ['total' => 0, 'fast' => 0, 'slow' => 0];
            }

            $dailyStats[$dateString]['total']++;

            // Extract the specific DECISION MAKING activity. 
            $decisionActivity = $ticket->approved_claims->where('type', 'DECISION MAKING')->first();
            $decisionDate = $decisionActivity ? $decisionActivity->created_at : $ticket->updated_at;

            // --- THE FIX ---
            // Convert the Laravel Model to a standard array and inject the decisionDate
            $exportRecord = array_merge($ticket->toArray(), [
                'decisionDate' => $decisionDate
            ]);

            // Carbon's diffInWeekdays() automatically skips Saturdays and Sundays
            // Fast: 0, 1, 2, or 3 business days. Slow: 4+ business days.
            if ($ticket->created_at->diffInWeekdays($decisionDate) <= 3) {
                $dailyStats[$dateString]['fast']++;
                $fastList[] = $exportRecord; // Add flat array to fast export list
            } else {
                $dailyStats[$dateString]['slow']++;
                $slowList[] = $exportRecord; // Add flat array to slow export list
            }
        }

        // 3. Generate the continuous date period
        $period = CarbonPeriod::create($startDate, $endDate);

        $chartDataFast = [];
        $chartDataSlow = [];
        $totalApproved = 0;
        $totalFastApproved = 0;
        $totalSlowApproved = 0;

        // 4. Loop over the period to build the chart arrays (including empty days)
        foreach ($period as $date) {
            $dateString = $date->format('Y-m-d');

            // Pull from our pre-processed array, default to 0 if no tickets that day
            $dayTotalApproved = $dailyStats[$dateString]['total'] ?? 0;
            $dayFastApproved = $dailyStats[$dateString]['fast'] ?? 0;
            $daySlowApproved = $dailyStats[$dateString]['slow'] ?? 0;

            $totalApproved += $dayTotalApproved;
            $totalFastApproved += $dayFastApproved;
            $totalSlowApproved += $daySlowApproved;

            // Prevent division by zero
            $dayFastPercentage = $dayTotalApproved > 0
                ? round(($dayFastApproved / $dayTotalApproved) * 100, 2)
                : 0;

            $daySlowPercentage = $dayTotalApproved > 0
                ? round(($daySlowApproved / $dayTotalApproved) * 100, 2)
                : 0;

            // Push to respective chart arrays
            $chartDataFast[] = [
                'name' => $date->format('M d'),
                'percentage' => $dayFastPercentage
            ];

            $chartDataSlow[] = [
                'name' => $date->format('M d'),
                'percentage' => $daySlowPercentage
            ];
        }

        // 5. Prevent division by zero for the overall totals
        $overallFastPercentage = $totalApproved > 0
            ? round(($totalFastApproved / $totalApproved) * 100, 2)
            : 0;

        $overallSlowPercentage = $totalApproved > 0
            ? round(($totalSlowApproved / $totalApproved) * 100, 2)
            : 0;

        return [
            // --- Raw Ticket Lists for CSV Export ---
            'data' => [
                'fast_approved' => $fastList,
                'slow_approved' => $slowList,
            ],

            // Percentages
            'percentage_fast_approved' => $overallFastPercentage,
            'percentage_slow_approved' => $overallSlowPercentage,

            // Chart Data Arrays
            'fast_approved_data' => $chartDataFast,
            'slow_approved_data' => $chartDataSlow,

            // Raw Counts for the UI Cards
            'fast_approved_count' => $totalFastApproved, // <= 3 Business Days
            'slow_approved_count' => $totalSlowApproved, // > 3 Business Days
            'total_approved_count' => $totalApproved,

            // Grand Total mapping
            'total_tickets_count' => $totalApproved
        ];
    }
    public function get_analytics(Request $request)
    {
        // Fetch both datasets
        $ticketStats = $this->number_of_ticket_created($request);
        $photoStats = $this->percentage_provide_photos($request);
        $percentage_of_approved_claims = $this->percentage_of_approved_claims($request);
        return response()->json([
            'status' => 'success',
            'data' => [
                // General Ticket Stats
                'total_tickets_created' => $ticketStats['total_tickets_created'],
                'total_tickets_created_chart_data' => $ticketStats['total_tickets_created_chart_data'],
                'percentage_of_approved_claims' => $percentage_of_approved_claims,
                // Raw Counts for UI
                'provide_photos' => $photoStats,
            ]
        ], 200);
    }
}
