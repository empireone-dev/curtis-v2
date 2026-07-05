<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return Inertia::render('homepage/page');
    return Inertia::render('auth/login/page');
});

Route::prefix('email')->group(function () {
    Route::view('/warranty-initial-email', 'emails.warranty-initial-email');
    Route::view('/parts-initial-email', 'emails.parts-initial-email');
    Route::view('/safety-issue-initial-email', 'emails.safety-issue-initial-email');
});

Route::get('/auth/login', function () {
    return Inertia::render('auth/login/page');
});


Route::prefix('resolution')->group(function () {
    Route::inertia('/', 'resolution/page');
    Route::inertia('/registration', 'resolution/registration/page');
    Route::inertia('/product_registration', 'resolution/product_registration/page');
    Route::inertia('/success/{serial}', 'resolution/success/page');
    $categories = ['warranty', 'parts', 'safety_issue', 'search', 'product_registration'];
    foreach ($categories as $category) {
        Route::prefix($category)->group(function () use ($category) {
            Route::inertia('/confirmation', 'resolution/confirmation/page');
            Route::inertia('/verification', 'resolution/verification/page');
            Route::inertia('/{id}', "resolution/{$category}/page");
        });
    }
});

Route::prefix('/accounts/administrator')->middleware(['auth', 'verified'])->group(function () {

    // Maps to /accounts/administrator/dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('accounts/administrator/dashboard/page');
    })->name('dashboard');
    Route::get('/emails', function () {
        return Inertia::render('accounts/administrator/emails/page');
    })->name('emails');
    Route::get('/analytics', function () {
        return Inertia::render('accounts/administrator/analytics/page');
    })->name('analytics');
    Route::get('/warranty', function () {
        return Inertia::render('accounts/administrator/resolutions/warranty/page');
    })->name('warranty');

    // You can add more admin routes here later...
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
