<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use App\Models\Occasion;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function query(Request $request)
    {
        $occasions = $request->input('occasions', []);
        $priceRange = $request->input('price', []);
        $interests = $request->input('interests', []);
        $subCategories = $request->input('subCategories', []);
        $subSubCategories = $request->input('subSubCategories', []);
        $delivery = $request->input('delivery', []);

        // Generate a cache key based on the request parameters
        $cacheKey = 'products_' . md5(json_encode([
            'occasions' => $occasions,
            'priceRange' => $priceRange,
            'interests' => $interests,
            'subCategories' => $subCategories,
            'subSubCategories' => $subSubCategories,
            'delivery' => $delivery
        ]));

        // Check if the results are already cached
        if (Cache::has($cacheKey)) {
            return response()->json(['data' => Cache::get($cacheKey)]);
        }

        $query = Product::query();

        // Get the ID of the "tech" category
        $techCategoryId = Category::where('name', 'tech')->value('id');

        // Check if the interests array contains only the "tech" category
        $isOnlyTechInterest = count($interests) === 1 && in_array($techCategoryId, $interests);

        if (!empty($occasions)) {
            // $query->whereIn('occasion_id', $occasions);
            $query->whereNull('occasion_id');
        }

        if (!empty($priceRange)) {
            $query->whereBetween('price', [$priceRange[0], $priceRange[1]]);
        }

        if (!empty($interests)) {
            $query->whereIn('category_id', $interests);
        }

        if (!empty($subCategories)) {
            $query->whereIn('sub_category_id', $subCategories);
        }

        if (!empty($subSubCategories)) {
            $query->whereIn('sub_sub_category_id', $subSubCategories);
        }

        if (!empty($delivery)) {
            $deliveryDateStr = $delivery[0];
            $deliveryDate = Carbon::createFromFormat('Y-m-d', $deliveryDateStr);
            $currentDate = Carbon::now();

            $daysDifference = $currentDate->diffInDays($deliveryDate, false);
            $roundedDaysDifference = ceil($daysDifference);

            if ($roundedDaysDifference <= 0) {
                $query->where('delivery', '=', "1");
            } else {
                $query->where(function ($q) use ($roundedDaysDifference) {
                    $q->where('delivery', '<=', $roundedDaysDifference)
                        ->orWhereNull('delivery');
                });
            }
        }

        if ($isOnlyTechInterest) {
            $query->orderBy('reviews', 'desc')->limit(500);
        } else {
            $query->inRandomOrder()->limit(500);
        }

        $products = $query->get();

        // Cache the results
        Cache::put($cacheKey, $products, now()->addHour());

        return response()->json(['data' => $products]);
    }


    public function show($product_id)
    {
        $cacheKey = "product_show_" . $product_id;

        if (Cache::has($cacheKey)) {
            $cachedData = Cache::get($cacheKey);
        } else {
            try {
                $product = Product::findOrFail($product_id);

                $category_id = $product->category_id;
                $category = Category::find($category_id);

                $sub_category_id = $product->sub_category_id;
                $subCategory = SubCategory::find($sub_category_id);

                $sub_sub_category_id = $product->sub_sub_category_id;
                $subSubCategory = SubSubCategory::find($sub_sub_category_id);

                $productBrand = Brand::where('id', $product->brand_id)->first();

                $productWithBrandName = array_merge($product->toArray(), [
                    'brand_name' => $productBrand->name
                ]);

                $products = collect();

                // Query products with the same sub_sub_category_id
                if ($sub_sub_category_id) {
                    $products = Product::where('sub_sub_category_id', $sub_sub_category_id)
                        ->where('id', '!=', $product_id)
                        ->inRandomOrder()
                        ->limit(500)
                        ->get();
                }

                // If less than 72, fill with products from the same sub_category_id
                if ($products->count() < 500 && $sub_category_id) {
                    $additionalProducts = Product::where('sub_category_id', $sub_category_id)
                        ->where('id', '!=', $product_id)
                        ->whereNotIn('id', $products->pluck('id')->toArray())
                        ->inRandomOrder()
                        ->limit(500 - $products->count())
                        ->get();

                    $products = $products->merge($additionalProducts);
                }

                // If still less than 72, fill with products from the same category_id
                if ($products->count() < 500) {
                    $additionalProducts = Product::where('category_id', $category_id)
                        ->where('id', '!=', $product_id)
                        ->whereNotIn('id', $products->pluck('id')->toArray())
                        ->inRandomOrder()
                        ->limit(72 - $products->count())
                        ->get();

                    $products = $products->merge($additionalProducts);
                }

                $cachedData = [
                    'product' => $productWithBrandName,
                    'products' => $products->isEmpty() ? [] : $products,
                    'productCategories' => [
                        'category' => $category,
                        'subCategory' => $subCategory,
                        'subSubCategory' => $subSubCategory
                    ]
                ];

                Cache::put($cacheKey, $cachedData, now()->addHour());
            } catch (ModelNotFoundException $e) {
                // Redirect to the fallback route for not found
                return Inertia::render('NotFound');
            } catch (QueryException $e) {
                // Redirect to the application error page
                return Inertia::render('ApplicationError');
            }
        }

        // Render the Inertia page with the cached data or the freshly fetched data
        return Inertia::render('Product', $cachedData);
    }

    public function renderHome()
    {
        $cacheKey = "home_products";

        if (Cache::has($cacheKey)) {
            $cachedData = Cache::get($cacheKey);
        } else {


            // Step 1: Retrieve all categories
            $categories = Category::all();
            $totalCategories = $categories->count();

            // Step 2: Determine the number of products per category
            $productsPerCategory = intdiv(500, $totalCategories);
            $remainder = 500 % $totalCategories;

            $products = collect();

            // Step 3: Retrieve products from each category
            foreach ($categories as $category) {
                $limit = $productsPerCategory + ($remainder > 0 ? 1 : 0);
                $remainder--;

                $categoryProducts = Product::where('category_id', $category->id)
                    ->inRandomOrder()
                    ->limit($limit)
                    ->get();

                $products = $products->merge($categoryProducts);
            }

            // Step 4: If we have fewer than 500 products, fetch additional products
            if ($products->count() < 500) {
                $needed = 500 - $products->count();
                $additionalProducts = Product::whereNotIn('id', $products->pluck('id')->toArray())
                    ->inRandomOrder()
                    ->limit($needed)
                    ->get();

                $products = $products->merge($additionalProducts);
            }

            // Step 5: Shuffle the final collection of products to ensure randomness
            $products = $products->shuffle();
            $cachedData = [
                'products' => $products,
                'occasions' => $this->getOccasions(),
                'interests' => $this->getInterests(),
            ];

            Cache::put($cacheKey, $cachedData, now()->addHour());
        }

        return Inertia::render('Home', $cachedData);
    }

    public function renderFinder()
    {
        return Inertia::render('Finder', [
            'occasions' => $this->getOccasions(),
            'interests' => $this->getInterests(),
        ]);
    }

    public function renderProducts(Request $request)
    {
        $category_ids = $request->query('category_id');
        $sub_category_id = $request->query('sub_category_id');
        $sub_sub_category_id = $request->query('sub_sub_category_id');
        $category_ids_array = array_filter(explode(',', $category_ids), 'strlen');

        // from here it will work for multiple category IDs
        $query = Product::query();

        // Get the ID of the "tech" category
        $techCategoryId = Category::where('name', 'tech')->value('id');

        // Check if the "tech" category is in the provided category IDs
        $isOnlyTechInterest = in_array($techCategoryId, $category_ids_array) && count($category_ids_array) === 1;

        // if the category_ids is not empty (length? > 0)
        if (!empty($category_ids_array)) {
            $query->whereIn('category_id', $category_ids_array);
        }

        if (!empty($sub_category_id)) {
            $query->where('sub_category_id', $sub_category_id);
        }

        if (!empty($sub_sub_category_id)) {
            $query->where('sub_sub_category_id', $sub_sub_category_id);
        }

        // Apply order by reviewsCount if only "tech" is in the interests
        if ($isOnlyTechInterest) {
            $query->orderBy('reviews', 'desc')->limit(500);
        } else {
            $query->inRandomOrder()->limit(500);
        }

        $products = $query->get();

        return Inertia::render('Products', [
            'interests' => $this->getInterests(),
            'productsCategories' => [
                'categoryIds' => $category_ids_array,
                'subCategory' => $sub_category_id,
                'subSubCategory' => $sub_sub_category_id
            ],
            'products' => $products

        ]);
    }


    public function renderCategories()
    {
        $cacheKey = 'categories_with_subcategories';

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $categories = $this->getCategoriesWithSubCategories();

        Cache::put($cacheKey, Inertia::render('Categories', [
            'categories' => $categories
        ]), now()->addHour());

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

        Cache::put($cacheKey, $occasions, now()->addHour());

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

        Cache::put($cacheKey, $interests, now()->addHour());

        return $interests;
    }

    public function getCategoriesWithSubCategories(Request $request = null)
    {
        $cacheKey = 'categories_with_subcategories';

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        $categories = Category::whereHas('products')->get();

        $categories->each(function ($category) {
            $category->subCategories = $category->subCategories()->get();
        });

        if ($request) {
            $cachedData = response()->json(['data' => $categories]);
            Cache::put($cacheKey, $cachedData, now()->addHour());
            return $cachedData;
        }

        Cache::put($cacheKey, $categories, now()->addHour());

        return $categories;
    }

    public function byCategory(Request $request)
    {
        $category_id = $request->route('category_id');
        $sub_category_id = $request->route('sub_category_id');
        $cacheKey = "products_by_category_{$category_id}_{$sub_category_id}";

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        if ($category_id && !$sub_category_id) {
            $products = Product::where('category_id', $category_id)
                ->inRandomOrder()
                ->limit(300)
                ->get();
        } else {
            $products = Product::where('category_id', $category_id)
                ->where('sub_category_id', $sub_category_id)
                ->inRandomOrder()
                ->limit(300)
                ->get();
        }

        $cachedData = response()->json(['data' => $products]);
        Cache::put($cacheKey, $cachedData, now()->addHour());

        return $cachedData;
    }


    // NEW ENDPOINTS
    public function getProductsByCategory($category_id, $sub_category_id = null)
    {
        $cacheKey = "products_by_category_{$category_id}_{$sub_category_id}";

        if (Cache::has($cacheKey)) {
            return Cache::get($cacheKey);
        }

        if ($sub_category_id) {
            $products = Product::where('category_id', $category_id)
                ->where('sub_category_id', $sub_category_id)
                ->get();
        } else {
            $products = Product::where('category_id', $category_id)->get();
        }

        Cache::put($cacheKey, $products, now()->addHour());

        return $products;
    }

    public function getProductsBySubCategory($sub_category_id)
    {
        return Product::where('sub_category_id', $sub_category_id)->get();
    }

    public function getProductsByBrand($brand_id)
    {
        return Product::where('brand_id', $brand_id)->get();
    }
}
