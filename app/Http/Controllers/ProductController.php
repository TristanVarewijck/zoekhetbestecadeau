<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{
    // get product by ID
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

    // Retrieve products based on category and subCategory
    public function byCategory($category_id, $sub_category_id)
    {
        $products = Product::where('category_id', $category_id)
            ->where('sub_category_id', $sub_category_id)
            ->get();
        return response()->json($products);
    }
}