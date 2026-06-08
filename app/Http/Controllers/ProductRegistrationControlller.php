<?php

namespace App\Http\Controllers;

use App\Models\CommonIssue;
use App\Models\File;
use App\Models\ProductRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $registration = ProductRegistration::where('serial', $serial_number)->first();
        return response()->json($registration, 200);
    }

    public function store(Request $request)
    {
        // 1. Define the file array keys you expect from your frontend
        // (Make sure 'receipt' is here if your React code uses formData.append('receipt[]', file))
        $fileCategories = [
            'readable_serial_section',
            'bill_of_sale',
            'parts_model',
            'receipt',
            'receipt_model',
            'defect_issue'
        ];

        // 2. Extract ONLY the text data (exclude the file arrays)
        $textData = $request->except($fileCategories);

        // 3. Safely create the database record first
        $pr = ProductRegistration::create($textData);

        // 4. Handle the file uploads and update the record
        $folder = date("Y");

        foreach ($fileCategories as $category) {
            if ($request->hasFile($category)) {
                // NOTE: If there are multiple files in one category, this loop 
                // will overwrite the 'bill_of_sale' column with the LAST uploaded file.
                foreach ($request->file($category) as $uploadedFile) {
                    $path = $uploadedFile->store($folder, 's3');

                    $pr->update([
                        'bill_of_sale' => Storage::disk('s3')->url($path)
                    ]);
                }
            }
        }

        return response()->json([
            'status' => 'success'
        ], 200);
    }
}
