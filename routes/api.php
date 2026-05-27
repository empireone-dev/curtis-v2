<?php

use App\Http\Controllers\ProductRegistrationControlller;
use App\Http\Controllers\TicketControlller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::resource('tickets', TicketControlller::class);
Route::resource('product_registration', ProductRegistrationControlller::class);
Route::get('/verify_serial_number/{id}', [ProductRegistrationControlller::class, 'verify_serial_number']);
