<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{
    public function show($product_id)
    {
        try {
            $product = Product::findOrFail($product_id);
            logger($product);
            return response()->json($product);
        } catch (ModelNotFoundException $e) {
            logger($e);
            return response()->json('Product not found');
        }
    }
}