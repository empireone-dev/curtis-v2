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

        return [

            // Percentages
            'total_percentage_provide_photos' => $overallPercentage,
            'total_percentage_not_provide_photos' => $overallPercentage2,

            // Chart Data Arrays
            'total_percentage_provide_photos_chart' => $chartData,
            'total_percentage_not_provide_photos_chart' => $chartData2,
        ];
    }
    /**
     * Main API Endpoint
     */
    public function get_analytics(Request $request)
    {
        // Fetch both datasets
        $ticketStats = $this->number_of_ticket_created($request);
        $photoStats = $this->percentage_provide_photos($request);

        return response()->json([
            'status' => 'success',
            'data' => [
                // General Ticket Stats
                'total_tickets_created' => $ticketStats['total_tickets_created'],
                'total_tickets_created_chart_data' => $ticketStats['total_tickets_created_chart_data'],

                // Raw Counts for UI
                'provide_photos' => $photoStats,
            ]
        ], 200);
    }
}
