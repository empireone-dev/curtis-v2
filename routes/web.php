<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('homepage/page');
});

Route::get('/auth/login', function () {
    return Inertia::render('auth/login/page');
});


Route::prefix('resolution')->group(function () {
    Route::inertia('/', 'resolution/page');
    Route::inertia('/registration', 'resolution/registration/page');
    Route::inertia('/confirmation', 'resolution/confirmation/page');
    Route::inertia('/verification', 'resolution/verification/page');
    Route::inertia('/warranty/{id}', 'resolution/warranty/page');
    Route::inertia('/parts', 'resolution/parts/page');
    Route::inertia('/safety_issue', 'resolution/safety_issue/page');
});

Route::get('/accounts/administrator/dashboard', function () {
    return Inertia::render('accounts/administrator/dashboard/page');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
