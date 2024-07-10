<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;


// products api
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
Route::get('/products/{category_id}/{sub_category_id}', [ProductController::class, 'byCategory'])->name('products.byCategory');

