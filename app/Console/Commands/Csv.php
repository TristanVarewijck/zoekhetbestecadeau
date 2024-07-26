<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use Illuminate\Console\Command;

class Csv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:csv {categories*}';

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
    protected $loggingEnabled = true; // Set to false to disable logging

    /**
     * Execute the console command.
     */
    public function handle()
    {
        ini_set('memory_limit', '-1');

        $categories = $this->argument('categories');

        foreach ($categories as $category) {
            $this->processCategory($category);
        }
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


            // based on production mode or dev mode (ticket in jira to dynamically change this in de command)
            // if (env('APP_ENV') === 'local') {
            //     if ($counter >= 100) {
            //         break;
            //     }
            // }

            logger($row);

            // Filter out products with a price lower than 5 or higher than 150
            if ($row[$config['price']] < 5 || $row[$config['price']] > 150) {
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
                'category_path' => $category->name,
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
            ];

            $product = $this->processRecord(Product::class, $productData, 'serial_number');
            $newCategoryPath = $category->name;
            $subCategoryName = $row[$config['sub_category']] ?? null;
            $subSubCategoryName = $row[$config['sub_sub_category']] ?? null;
            $deliveryTime = $row[$config['delivery_time']] ?? null;
            $subCategory = null;
            $subSubCategory = null;

            if ($subCategoryName) {
                $subCategory = $this->processRecord(SubCategory::class, ['name' => $row[$config['sub_category']], 'category_id' => $category->id], 'name');
            }

            if ($subSubCategoryName) {
                $subSubCategory = $this->processRecord(SubSubCategory::class, ['name' => $row[$config['sub_sub_category']], 'sub_category_id' => $subCategory->id], 'name');
            }

            if ($subCategory && $subSubCategory) {
                $newCategoryPath = ucfirst($category->name) . ' > ' . ucfirst($subCategory->name) . ' > ' . ucfirst($subSubCategory->name);
            } else if ($subCategory && !$subSubCategory) {
                $newCategoryPath = ucfirst($category->name) . ' > ' . ucfirst($subCategory->name);
            } else if (!$subCategory && !$subSubCategory) {
                $newCategoryPath = ucfirst($category->name);
            }

            $product->update([
                'sub_category_id' => $subCategory ? $subCategory->id : null,
                'sub_sub_category_id' => $subSubCategory ? $subSubCategory->id : null,
                'category_path' => $newCategoryPath,
                'delivery' => $this->mapDeliveryTimeToDays($deliveryTime),
                'occasion_id' => null, // Will be updated later
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            if ($subSubCategory) {
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
