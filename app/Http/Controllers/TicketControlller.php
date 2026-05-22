<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketControlller extends Controller
{

  
    public function store(Request $request)
    {
        // 1. Validate incoming form requests based on your React validation setup
        $validated = $request->validate([
            'fname'         => 'required|string|max:255',
            'lname'         => 'required|string|max:255',
            'email'         => 'required|email|max:255',
            'phone'         => 'required|string|max:50',
            'phone2'        => 'nullable|string|max:50', // optional secondary phone
            'item_number'   => 'required|string|max:255',
            'unit'          => 'required|string|max:255',
            'brand'         => 'required|string|max:255',
            'class'         => 'required|string|max:255',
            'serial_number' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'zip_code'      => 'required|string|max:20',
            'country'       => 'required|string|max:100',
            'state'         => 'required|string|max:100',
            'city'          => 'required|string|max:100',
            'address'       => 'required|string',
            'issue'         => 'required|string|max:255',
            'remarks'       => 'nullable|string',
        ]);

        // 2. Fallbacks/Defaults for backend-managed fields from your $fillable array
        // $validated['user_id'] = auth()->id(); // Assigns authenticated worker ID if available
        // $validated['created_from'] = 'web';
        // $validated['status'] = 'open';
        // $validated['received_at'] = now();

        // // 3. Persist record to database via Mass Assignment
        // Ticket::create($validated);

        // 4. Inertia Redirect back with session flash notifications
        return redirect()->back()->with('flash', [
            'message' => 'Ticket submitted successfully!'
        ]);
    }

    
}
