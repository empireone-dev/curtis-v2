<?php

namespace App\Http\Controllers;

use App\Models\CommonIssue;
use App\Models\ProductRegistration;
use Illuminate\Http\Request;

class ProductRegistrationControlller extends Controller
{
    public function show($id)
    {
        $raw_id = rawurldecode(base64_decode($id));

        // Use firstOrFail() so it automatically returns a 404 if the record doesn't exist
        $registration = ProductRegistration::where('id', $raw_id)->with(['ticket'])->firstOrFail();

        $common_issues = CommonIssue::get();

        return response()->json([
            // Convert the model to an array first, then spread it
            ...$registration->toArray(),
            'common_issues' => $common_issues
        ], 200);
    }
    public function verify_serial_number($serial_number)
    {
        // Look up the registration
        $registration = ProductRegistration::where('serial', $serial_number)->first();
        return response()->json($registration, 200);
    }
}
