<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\SubCategory;
use App\Models\SubCategoryProduct;
use App\Models\Category;
use App\Models\CategoryProduct;
use App\Models\Product;
use Illuminate\Console\Command;

class ImportCsv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-csv {category}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to import CSV file to database.';

    /**
     * Control logging
     *
     * @var bool
     */
    protected $loggingEnabled = false;

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Get the category type argument and construct the file path
        $categoryType = $this->argument('category');
        $file = storage_path("products/{$categoryType}.csv");

        // Check if the file exists
        if (!file_exists($file)) {
            $this->error("File not found: $file");
            return;
        }

        // Open the CSV file for reading
        $fileObject = new \SplFileObject($file);
        $fileObject->setFlags(\SplFileObject::READ_CSV);
        $fileObject->setCsvControl(';');

        $header = null;
        $counter = 0;
        $processedProductIds = [];

        // Get the category from the command argument and add it to the database
        $categoryName = $this->argument('category');
        $category = Category::firstOrCreate(['name' => $categoryName]);

        foreach ($fileObject as $row) {
            // Skip empty lines
            if (empty($row[0])) {
                continue;
            }

            // Skip header row
            if (!$header) {
                $header = $row;
                continue;
            }

            // Stop after 300 rows for testing purposes
            if ($counter >= 300) {
                break;
            }

            // Map the row data to the header
            $row = array_combine($header, $row);

            // Filter out products with a price lower than 5 or higher than 150
            if ($row['price'] < 5 || $row['price'] > 150) {
                continue;
            }

            // Process the brand record
            $brand = $this->processRecord(Brand::class, ['name' => $row['brand']], 'name');

            // Prepare product data for processing
            $productData = [
                'serial_number' => $row['product ID'],
                'name' => $row['name'],
                'stock' => $row['stock'],
                'description' => $row['description'],
                "currency" => $row['currency'],
                "category_path" => $row['categoryPath'],
                "delivery_time" => $row['deliveryTime'],
                'category_id' => $category->id,
                'price' => $row['price'],
                'brand_name' => $brand->name,
                'brand_id' => $brand->id,
                'image_url' => $row['imageURL'],
                'affiliate_link' => $row['productURL'],
                'created_at' => now(),
                'updated_at' => now(),
            ];

            // Process the product record
            $product = $this->processRecord(Product::class, $productData, 'serial_number');

            // Associate product with category
            $this->processRecord(CategoryProduct::class, ['category_id' => $category->id, 'product_id' => $product->id], 'product_id');

            // Process the subcategory record
            $subCategory = $this->processRecord(SubCategory::class, ['name' => $row['subcategories'], 'category_id' => $category->id], 'name');

            // update product with subcategory id
            $product->update(['sub_category_id' => $subCategory->id]);

            // Associate product with subcategory
            $this->processRecord(SubCategoryProduct::class, ['sub_category_id' => $subCategory->id, 'product_id' => $product->id], 'product_id');

            $processedProductIds[] = $product->id;
            $counter++;
        }

        // Clean up the database
        $this->deleteUnprocessedProducts($processedProductIds);
        $this->deleteUnusedBrands();
        $this->deleteUnusedCategories();

        // Log success message + number of records processed
        $this->info("Import completed. Processed {$counter} records.");
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

    private function deleteUnprocessedProducts($processedIds)
    {
        // Split the model name and log the actual model name
        $modelParts = explode('\\', Product::class);
        $modelName = end($modelParts);

        // Find and delete unprocessed products
        $recordsToDelete = Product::whereNotIn('id', $processedIds)->get();

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

    private function deleteUnusedCategories()
    {
        // Find and delete categories without products
        $recordsToDelete = Category::whereDoesntHave('products')->get();

        foreach ($recordsToDelete as $record) {
            $this->log("Category with id " . $record->id . " deleted.");
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

    private function log($message)
    {
        // Log messages if logging is enabled
        if ($this->loggingEnabled) {
            $this->info($message);
        }
    }
}
