<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\SubCategory;
use App\Models\SubSubCategory;
use Illuminate\Console\Command;
use Kreait\Laravel\Firebase\Facades\Firebase;

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
    protected $loggingEnabled = true;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        ini_set('memory_limit', '-1');

        $storage = Firebase::storage();
        $bucket = $storage->getBucket();
        $categories = $this->argument('categories');

        foreach ($categories as $category) {
            $this->processCategory($bucket, $category);
        }
    }

    public function processCategory($bucket, $categoryName)
    {
        $category = Category::firstOrCreate(['name' => $categoryName, "icon" => "fas fa-gift"]);
        $filePath = $categoryName . '.csv';
        $processedRecords = 0;

        if ($bucket->object($filePath)->exists()) {
            $object = $bucket->object($filePath);

            $fileSize = $object->info()['size'];
            $this->log('File size: ' . $fileSize . ' bytes');

            $content = $object->downloadAsStream();
            $csv = $content->getContents();

            switch ($categoryName) {
                case 'tech':
                    $processedRecords = $this->processCsv($csv, $category, 'tech');
                    break;
                default:
                    $processedRecords = $this->processCsv($csv, $category, 'default');
                    break;
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

            if ($counter >= 200) {
                break;
            }

            $brand = $this->processRecord(Brand::class, ['name' => $row['brand']], 'name');

            $productData = [
                'serial_number' => $row[$config['serial_number']],
                'name' => $row[$config['name']],
                'description' => $row[$config['description']],
                'price' => $row[$config['price']],
                'image_url' => $row[$config['image_url']] ?? null,
                'affiliate_link' => $row[$config['affiliate_link']],
                'currency' => $row[$config['currency']],
                'category_path' => $category->name,
                'delivery_time' => $row[$config['delivery_time']],
                'stock' => $row[$config['stock']] ?? null,
                'brand_id' => $brand->id,
                'category_id' => $category->id,
            ];
            $product = $this->processRecord(Product::class, $productData, 'serial_number');
            $newCategoryPath = $category->name;
            $subCategoryName = $row[$config['sub_category']];
            $subSubCategoryName = $row[$config['sub_sub_category']];
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
                'occasion_id' => null, // Will be updated later
                'gender_id' => null, // Will be updated later
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

    private function log($message)
    {
        if ($this->loggingEnabled) {
            $this->info($message);
        }
    }
}