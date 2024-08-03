<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

require __DIR__ . '/auth.php';

// Routes with data
Route::get('/', [productController::class, 'renderHome'])->name('home');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('product');

// both finder logic 
Route::get('/finder', [productController::class, 'renderFinder'])->name('finder');

Route::get('/products', function () {
    return Inertia::render('Products');
})->name('products');

Route::get('/categories', [ProductController::class, 'renderCategories'])->name('categories');

// Legal routes
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');
Route::get('/disclaimer', function () {
    return Inertia::render('Disclaimer');
})->name('disclaimer');
Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy-policy');
Route::get('/conditions', function () {
    return Inertia::render('Conditions');
})->name('conditions');

// Define the fallback route
Route::fallback(function () {
    return Inertia::render('NotFound');
});

// Application error route
Route::get('/application-error', function () {
    return Inertia::render('ApplicationError');
})->name('application-error');

// Auth routes
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
