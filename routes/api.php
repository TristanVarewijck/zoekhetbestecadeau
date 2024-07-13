<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;


// products api
Route::post('/query', [ProductController::class, 'query'])->name('products.query');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');

// Get products by identifier(s)
Route::get('/products/categories', [ProductController::class, 'getCategoriesWithSubCategories'])
    ->name('products.categories');

Route::post('/products/{category_id}/{sub_category_id?}', [ProductController::class, 'getProductsByCategory'])
    ->name('products.byCategory');

Route::post('/products/{brand_id}', [ProductController::class, 'getProductsByBrand'])
    ->name('products.byBrand');

Route::post('/products/{gender_id}', [ProductController::class, 'getProductsByGender'])
    ->name('products.byGender');
