<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;


class ProductController extends Controller
{
    public function show($product_id)
    {
        try {
            $product = Product::findOrFail($product_id);

            $products = Product::where('category_id', $product->category_id)
                ->where('sub_category_id', $product->sub_category_id)
                ->where('id', '!=', $product_id)
                ->get();

            // Render the Inertia page with the product data
            return Inertia::render('Product', [
                'product' => $product,
                'products' => $products->isEmpty() ? [] : $products
            ]);
        } catch (ModelNotFoundException $e) {
            // Redirect to the fallback route for not found
            return Inertia::render('NotFound');
        } catch (QueryException $e) {
            // Redirect to the application error page
            return Inertia::render('applicationError');
        }
    }
}