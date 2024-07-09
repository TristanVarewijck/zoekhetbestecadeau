<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;


// products api
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
