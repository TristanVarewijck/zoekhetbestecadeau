<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/finder', function () {
    return Inertia::render('Finder');
})->name('finder');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');

Route::get('/disclaimer', function () {
    return Inertia::render('Disclaimer');
})->name('disclaimer');

Route::get('/conditions', function () {
    return Inertia::render('Conditions');
})->name('conditions');

Route::get('/products/{id}', [ProductController::class, 'show'])->name('product');

// Define the fallback route
Route::fallback(function () {
    return Inertia::render('NotFound');
});

// Application error route
Route::get('/application-error', function () {
    return Inertia::render('ApplicationError');
})->name('application-error');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
