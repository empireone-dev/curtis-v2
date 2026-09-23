<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\File;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function store(Request $request)
    {
        $fileCategories = [
            'readable_serial_section',
            'bill_of_sale',
            'parts_model',
            'receipt_model',
            'defect_issue'
        ];
        $folder = date("Y");
        $filesData = [];
        foreach ($fileCategories as $category) {
            if ($request->hasFile($category)) {
                foreach ($request->file($category) as $uploadedFile) {
                    $path = $uploadedFile->store($folder, 's3');
                    $filesData[] = [
                        'ticket_id'  => $request->id,
                        'url'        => Storage::disk('s3')->url($path),
                        'type'       => $category, // Dynamically assigns 'bill_of_sale', etc.
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }

        if (!empty($filesData)) {
            File::insert($filesData);
        }

        Activity::create([
            'user_id' => Auth::id(),
            'ticket_id' => $request->id,
            'type' => 'VALIDATION TEAM UPLOADED',
            'message' => 'VALIDATION TEAM UPLOADED ' . $request->type,
        ]);
        return response()->json([
            'status' => 'success',
        ], 200);
    }
}
