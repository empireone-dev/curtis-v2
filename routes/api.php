<?php

use App\Http\Controllers\AutomaticSendingEmailController;
use App\Http\Controllers\ProductRegistrationControlller;
use App\Http\Controllers\TicketControlller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\EnsureValidApiKey;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::middleware([EnsureValidApiKey::class])->group(function () {
    Route::post('/ticket_creation', [TicketControlller::class, 'ticket_creation']);
});

Route::get('/auto_send_lacking_information_notification', [AutomaticSendingEmailController::class, 'auto_send_lacking_information_notification']);
Route::get('/auto_close_send_email_notification', [AutomaticSendingEmailController::class, 'auto_close_send_email_notification']);


Route::resource('tickets', TicketControlller::class);
Route::post('/upload_lacking_information', [TicketControlller::class, 'upload_lacking_information']);
Route::get('/search_serial_number/{id}', [TicketControlller::class, 'search_serial_number']);
Route::get('/get_ticket_by_serial_number/{id}', [TicketControlller::class, 'get_ticket_by_serial_number']);
Route::get('/get_product_registration_by_serial_number/{id}', [TicketControlller::class, 'get_product_registration_by_serial_number']);
Route::resource('product_registration', ProductRegistrationControlller::class);
Route::get('/verify_serial_number/{id}', [ProductRegistrationControlller::class, 'verify_serial_number']);
