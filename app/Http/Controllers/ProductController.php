<?php

namespace App\Http\Controllers;

use App\Models\Brand;
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

        // if (!$occasion || !$interest || !$gender) {
        //     return response()->json(['data' => []]);
        // }

        $products = Product::where('category_id', $interest->id)->get();
        // ->where('category_id', $interest->id)
        // ->where('gender_id', $gender->id)->get();

        return response()->json(['data' => $products]);
    }

    public function show($product_id)
    {
        try {
            $product = Product::findOrFail($product_id);
            $productBrand = Brand::where('id', $product->brand_id)->first();
            $productWithBrandName = array_merge($product->toArray(), [
                'brand_name' => $productBrand->name
            ]);

            $products = collect();

            // Query products with the same sub_sub_category_id
            if ($product->sub_sub_category_id) {
                $products = Product::where('sub_sub_category_id', $product->sub_sub_category_id)
                    ->where('id', '!=', $product_id)
                    ->inRandomOrder()
                    ->limit(72)
                    ->get();
            }

            // If less than 72, fill with products from the same sub_category_id
            if ($products->count() < 72 && $product->sub_category_id) {
                $additionalProducts = Product::where('sub_category_id', $product->sub_category_id)
                    ->where('id', '!=', $product_id)
                    ->whereNotIn('id', $products->pluck('id')->toArray())
                    ->inRandomOrder()
                    ->limit(72 - $products->count())
                    ->get();

                $products = $products->merge($additionalProducts);
            }

            // If still less than 72, fill with products from the same category_id
            if ($products->count() < 72) {
                $additionalProducts = Product::where('category_id', $product->category_id)
                    ->where('id', '!=', $product_id)
                    ->whereNotIn('id', $products->pluck('id')->toArray())
                    ->inRandomOrder()
                    ->limit(72 - $products->count())
                    ->get();

                $products = $products->merge($additionalProducts);
            }

            // Render the Inertia page with the product data
            return Inertia::render('Product', [
                'product' => $productWithBrandName,
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
        // Step 1: Retrieve all categories
        $categories = Category::all();
        $totalCategories = $categories->count();

        // Step 2: Determine the number of products per category
        $productsPerCategory = intdiv(100, $totalCategories);
        $remainder = 100 % $totalCategories;

        $products = collect();

        // Step 3: Retrieve products from each category
        foreach ($categories as $category) {
            $limit = $productsPerCategory + ($remainder > 0 ? 1 : 0);
            $remainder--;

            $categoryProducts = Product::where('category_id', $category->id)
                ->inRandomOrder()
                ->limit($limit)
                ->get();

            $products = $products->merge($categoryProducts)->shuffle();
        }

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

    public function renderCategories()
    {
        return Inertia::render('Categories', [
            'categories' => $this->getCategoriesWithSubCategories()
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

        // Fetch all categories that have products
        $interests = Category::whereHas('products')->get();

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

    public function getCategoriesWithSubCategories(Request $request = null)
    {
        $categories = Category::whereHas('products')->get();

        $categories->each(function ($category) {
            $category->subCategories = $category->subCategories()->get();
        });

        if ($request) {
            return response()->json(['data' => $categories]);
        }

        return $categories;
    }

    public function byCategory(Request $request)
    {
        $category_id = $request->route('category_id');
        $sub_category_id = $request->route('sub_category_id');

        if ($category_id && !$sub_category_id) {
            $products = Product::where('category_id', $category_id)
                ->inRandomOrder()
                ->limit(300)
                ->get();

            return response()->json(['data' => $products]);
        }

        $products = Product::where('category_id', $category_id)
            ->where('sub_category_id', $sub_category_id)
            ->inRandomOrder()
            ->limit(300)
            ->get();

        return response()->json($products);
    }

    // NEW ENDPOINTS
    public function getProductsByCategory($category_id, $sub_category_id = null)
    {
        if ($sub_category_id) {
            return Product::where('category_id', $category_id)
                ->where('sub_category_id', $sub_category_id)
                ->get();
        }

        return Product::where('category_id', $category_id)->get();
    }

    public function getProductsBySubCategory($sub_category_id)
    {
        return Product::where('sub_category_id', $sub_category_id)->get();
    }

    public function getProductsByBrand($brand_id)
    {
        return Product::where('brand_id', $brand_id)->get();
    }

    public function getProductsByGender($gender_id)
    {
        return Product::where('gender_id', $gender_id)->get();
    }
}
