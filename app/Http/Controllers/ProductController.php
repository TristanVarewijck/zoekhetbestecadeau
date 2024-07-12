<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Gender;
use App\Models\Occasion;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function query(Request $request)
    {
        $occasions = $request->input('occasions');
        $price = $request->input('price');
        $interests = $request->input('interests');
        $genders = $request->input('forWho');

        $occasion = Occasion::where('id', $occasions)->first();
        $interest = Category::where('id', $interests)->first();
        $gender = Gender::where('id', $genders)->first();

        if (!$occasion || !$interest || !$gender) {
            return response()->json(['data' => []]);
        }

        $products = Product::where('category_id', $interest->id)->get();
        // ->where('category_id', $interest->id)
        // ->where('gender_id', $gender->id)->get();

        logger($products);

        return response()->json(['data' => $products]);
    }

    public function show($product_id)
    {
        try {
            $product = Product::findOrFail($product_id);

            $products = Product::where('category_id', $product->category_id)
                ->where('sub_category_id', $product->sub_category_id)
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

    public function renderHome()
    {
        // Fetch 100 random products
        $products = Product::inRandomOrder()->limit(100)->get();

        return Inertia::render('Home', [
            'products' => $products,
            'occasions' => $this->getOccasions(),
            'interests' => $this->getInterests(),
            'genders' => $this->getGenders()
        ]);
    }

    public function renderFinder()
    {
        return Inertia::render('Finder', [
            'occasions' => $this->getOccasions(),
            'interests' => $this->getInterests(),
            'genders' => $this->getGenders()
        ]);
    }

    private function getOccasions()
    {
        $cacheKey = 'occasions';

        if (Cache::has($cacheKey)) {
            return cache($cacheKey);
        }

        $occasions = Occasion::all();

        Cache::put($cacheKey, $occasions, now()->addDay());

        return $occasions;
    }

    private function getInterests()
    {
        $cacheKey = 'interests';

        if (Cache::has($cacheKey)) {
            return cache($cacheKey);
        }

        $interests = Category::all();

        Cache::put($cacheKey, $interests, now()->addDay());

        return $interests;
    }

    private function getGenders()
    {
        $cacheKey = 'genders';

        if (Cache::has($cacheKey)) {
            return cache($cacheKey);
        }

        $genders = Gender::all();

        Cache::put($cacheKey, $genders, now()->addDay());

        return $genders;
    }
}
