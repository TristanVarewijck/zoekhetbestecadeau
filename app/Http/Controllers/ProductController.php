<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function show($product_id)
    {
        $product = Product::findOrFail($product_id);
        logger($product);
        return response()->json($product);
    }
}