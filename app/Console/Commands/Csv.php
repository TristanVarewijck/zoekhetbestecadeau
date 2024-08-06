<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class Csv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:csv {categories*} {--json}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import CSV file to database';

    /**
     * Control logging
     *
     * @var bool
     */
    protected $loggingEnabled = false; // Set to false to disable logging

    /**
     * Execute the console command.
     */
    public function handle()
    {
        ini_set('memory_limit', '-1');

        $categories = $this->argument('categories');
        $exportJson = $this->option('json');

        foreach ($categories as $category) {
            $this->processCategory($category);
        }

        if ($exportJson) {
            $this->exportProductsToJson();
        }

        // clear cache after importing new data
        Cache::flush();
    }

    private function exportProductsToJson()
    {
        $products = Product::with(['brand', 'category', 'subCategory', 'subSubCategory'])->get();
        $productsCount = $products->count();

        $productsJson = $products->map(function ($product) {
            return [
                'id' => $product->id,
                'serial_number' => $product->serial_number,
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'affiliate_link' => $product->affiliate_link,
                'currency' => $product->currency,
                'brand' => $product->brand->id,
                'image_url' => $product->image_url,
                'material' => $product->material,
                'reviews' => $product->reviews,
                'rating' => $product->rating,
                'size' => $product->size,
                'delivery_time' => $product->delivery_time,
                'stock' => $product->stock,
                'category' => $product->category ? $product->category->id : null,
                'sub_category' => $product->subCategory ? $product->subCategory->id : null,
                'sub_sub_category' => $product->subSubCategory ? $product->subSubCategory->id : null,
                'color' => $product->color,
            ];
        })->toJson(JSON_PRETTY_PRINT);

        // Save JSON to file
        $filePath = storage_path('exports/products.json');
        file_put_contents($filePath, $productsJson);

        $this->info("Products have been exported to JSON");
        $this->info("Total products: {$productsCount}");
    }

    public function processCategory($categoryName)
    {
        $category = Category::firstOrCreate(['id' => $categoryName]);
        $filePath = storage_path('imports/' . $categoryName . '.csv');
        $processedRecords = 0;

        if (file_exists($filePath)) {
            $fileSize = filesize($filePath);
            $this->log('File size: ' . $fileSize . ' bytes');

            $csv = file_get_contents($filePath);

            // add new categories here
            switch ($categoryName) {
                case 'tech':
                    $processedRecords = $this->processCsv($csv, $category, 'tech');
                    break;
                case 'lezen':
                    $processedRecords = $this->processCsv($csv, $category, 'lezen');
                    break;
                case 'sport':
                    $processedRecords = $this->processCsv($csv, $category, 'sport');
                    break;
                case 'wonen':
                    $processedRecords = $this->processCsv($csv, $category, 'wonen');
                    break;
                case 'koken':
                    $processedRecords = $this->processCsv($csv, $category, 'koken');
                    break;
                case 'sieraden':
                    $processedRecords = $this->processCsv($csv, $category, 'sieraden');
                    break;
                default:
                    $this->error('Category not found');
                    return;
            }
        } else {
            $this->error('File not found');
            return;
        }

        $this->info("{$processedRecords} records processed for category {$categoryName}");
    }

    public function processCsv($csv, $category, $configKey)
    {
        $lines = explode("\n", $csv);
        $header = null;
        $counter = 0;
        $processedProductIds = [];
        $config = config('csv_import.' . $configKey);

        foreach ($lines as $line) {
            if (empty(trim($line))) {
                continue;
            }

            $row = str_getcsv($line, $config['delimiter']);

            if (!$header) {
                $header = $row;
                continue;
            }
            if (count($header) !== count($row)) {
                continue;
            }

            $row = array_combine($header, $row);

            if (env('APP_ENV') === 'local') {
                if ($counter >= 1000) {
                    break;
                }
            }

            // Filter out products with a price lower than 5 or higher than 1000
            if ($row[$config['price']] < 5 || $row[$config['price']] > 1000) {
                $this->log("Skipping product due to price: Price: {$row[$config['price']]}");
                continue;
            }

            // Filter out products with a non-numeric serial number
            if ($configKey === 'tech' && !is_numeric($row[$config['serial_number']])) {
                $this->log("Skipping product due to non-numeric serial number: Serial Number: {$row[$config['serial_number']]}");
                continue;
            }

            $brand = $this->processRecord(Brand::class, ['name' => $row['brand']], 'name');

            $productData = [
                'serial_number' => $row[$config['serial_number']],
                'name' => $row[$config['name']],
                'description' => $row[$config['description']],
                'price' => $row[$config['price']],
                'affiliate_link' => $row[$config['affiliate_link']],
                'currency' => $row[$config['currency']],
                'brand_id' => $brand->id,

                // nullable fields
                'image_url' => $row[$config['image_url']] ?? null,
                'material' => $row[$config['material']] ?? null, // wonen
                'reviews' => $row[$config['reviews']] ?? null, // tech
                'rating' => $row[$config['rating']] ?? null, // tech
                'size' => $row[$config['size']] ?? null, // sport
                'delivery_time' => $row[$config['delivery_time']] ?? null,
                'stock' => $row[$config['stock']] ?? null,
                'category_id' => $category->id,
                'color' => $row[$config['color']] ?? null,
            ];

            $product = $this->processRecord(Product::class, $productData, 'serial_number');
            $subCategoryName = $row[$config['sub_category']] ?? null;
            $subSubCategoryName = $row[$config['sub_sub_category']] ?? null;
            $deliveryTime = $row[$config['delivery_time']] ?? null;
            $subCategory = null;
            $subSubCategory = null;

            if ($subCategoryName) {
                $subCategory = $this->processRecord(SubCategory::class, ['name' => $subCategoryName, 'category_id' => $category->id], 'name');
            }

            // Compare lowercased names to avoid case differences
            if ($subCategoryName && $subSubCategoryName && strtolower($subSubCategoryName) !== strtolower($subCategoryName)) {
                $subSubCategory = $this->processRecord(SubSubCategory::class, ['name' => $subSubCategoryName, 'sub_category_id' => $subCategory->id], 'name');
            }


            $product->update([
                'sub_category_id' => $subCategory ? $subCategory->id : null,
                'sub_sub_category_id' => ($subCategory && $subSubCategory && strtolower($subSubCategoryName) !== strtolower($subCategoryName)) ? $subSubCategory->id : null,
                'delivery' => $this->mapDeliveryTimeToDays($deliveryTime),
                'occasion_id' => null, // Will be updated later
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            if ($subCategory && $subSubCategory && strtolower($subSubCategoryName) !== strtolower($subCategoryName)) {
                $subSubCategory->update([
                    'sub_category_id' => $subCategory->id ? $subCategory->id : null,
                ]);
            }

            $processedProductIds[] = $product->id;
            $counter++;
        }

        $this->deleteUnprocessedProducts($processedProductIds, $category->id);
        $this->deleteUnusedBrands();
        $this->deleteUnusedSubCategories();
        $this->deleteUnusedSubSubCategories();

        return $counter;
    }

    private function processRecord($model, $row, $uniqueIdentifier)
    {
        // Split the model name and log the actual model name
        $modelParts = explode('\\', $model);
        $modelName = end($modelParts);

        // Check if record already exists
        $existingRecord = $model::where($uniqueIdentifier, $row[$uniqueIdentifier])->first();

        if ($existingRecord) {
            // Check if the record data is different
            if ($this->isRecordDataDifferent($existingRecord, $row)) {
                $existingRecord->update($row);
                $this->log("{$modelName} with {$uniqueIdentifier} " . $existingRecord->$uniqueIdentifier . " updated.");
            }

            return $existingRecord;
        } else {
            // Create a new record
            $record = $model::create($row);
            $this->log("{$modelName} with {$uniqueIdentifier} " . $record->$uniqueIdentifier . " created.");
            return $record;
        }
    }

    private function deleteUnprocessedProducts($processedIds, $category_id)
    {
        // Split the model name and log the actual model name
        $modelParts = explode('\\', Product::class);
        $modelName = end($modelParts);

        // Find and delete unprocessed products
        $recordsToDelete = Product::where('category_id', $category_id)->whereNotIn('id', $processedIds)->get();

        foreach ($recordsToDelete as $record) {
            $this->log("{$modelName} with id " . $record->id . " deleted.");
            $record->delete();
        }
    }

    private function deleteUnusedBrands()
    {
        // Find and delete brands without products
        $recordsToDelete = Brand::whereDoesntHave('products')->get();

        foreach ($recordsToDelete as $record) {
            $this->log("Brand with id " . $record->id . " deleted.");
            $record->delete();
        }
    }

    private function deleteUnusedSubCategories()
    {
        // Find and delete subcategories without products
        $recordsToDelete = SubCategory::whereDoesntHave('products')->get();

        foreach ($recordsToDelete as $record) {
            $this->log("SubCategory with id " . $record->id . " deleted.");
            $record->delete();
        }
    }

    private function deleteUnusedSubSubCategories()
    {
        // Find and delete subcategories without products
        $recordsToDelete = SubSubCategory::whereDoesntHave('products')->get();

        foreach ($recordsToDelete as $record) {
            $this->log("SubSubCategory with id " . $record->id . " deleted.");
            $record->delete();
        }
    }

    private function isRecordDataDifferent($existingProduct, $productData)
    {
        // Compare existing record data with new data
        foreach ($productData as $key => $value) {
            if ($existingProduct->$key != $value) {
                return true;
            }
        }
        return false;
    }

    private function mapDeliveryTimeToDays($deliveryTime)
    {
        $patterns = [
            '/Pre-order/' => null,
            '/De levertijd is (\d+) werkdag\(en\)/' => function ($matches) {
                return $matches[1];
            },
            '/(\d+)-(\d+) werkdagen/' => function ($matches) {
                return $matches[1];
            },
            '/Op werkdagen voor \d{2}:\d{2} besteld, morgen in huis/' => "1",
            '/(\d+)-(\d+) werkdag\(en\)/' => function ($matches) {
                return $matches[2];
            },

        ];

        foreach ($patterns as $pattern => $replacement) {
            if (preg_match($pattern, $deliveryTime, $matches)) {
                return is_callable($replacement) ? $replacement($matches) : $replacement;
            }
        }

        return null;
    }

    private function log($message)
    {
        if ($this->loggingEnabled) {
            $this->info($message);
        }
    }
}
