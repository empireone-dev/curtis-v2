<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class IOController extends Controller
{
    public function add_review(Request $request)
    {
        $response = Http::withHeaders([
            'store'  => env('REVIEWS_IO_STORE'),
            'apikey' => env('REVIEWS_IO_API_KEY'),
        ])->post('https://api.reviews.io/invitation', $request->all());

        if ($response->successful()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Reviews.io invitation sent successfully!'
            ]);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Failed to send invitation',
            'details' => $response->body()
        ], $response->status());
    }
}
