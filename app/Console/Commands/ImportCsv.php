<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\SubSubCategory;
use App\Models\SubCategory;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Console\Command;
use Kreait\Laravel\Firebase\Facades\Firebase;

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
    protected $loggingEnabled = true;

    /**
     * Counters for created, updated, and deleted records per model.
     */
    private $createdCount = [];
    private $updatedCount = [];
    private $deletedCount = [];
    private $filteredCount = [];

    /**
     * Execute the console command.
     */
    public function handle()
    {
        set_time_limit(0);
        ini_set('memory_limit', '-1'); // Remove memory limit temporarily

        // Get firebase storage instance
        $storage = Firebase::storage();
        // Get the bucket
        $bucket = $storage->getBucket();

        // Define the path to your CSV file in Firebase Storage
        $filePath = $this->argument('category') . '.csv';

        // Get the category from the command argument and add it to the database
        $categoryName = $this->argument('category');
        logger($categoryName);
        // create / get the category
        $category = Category::firstOrCreate(['name' => $categoryName]);


        // Check if the file exists in the storage bucket
        if ($bucket->object($filePath)->exists()) {
            // Get the file object
            $object = $bucket->object($filePath);

            // Log the file size
            $fileSize = $object->info()['size'];
            $this->info('File size: ' . $fileSize . ' bytes');

            // Stream the file content
            $content = $object->downloadAsStream();

            $csv = $content->getContents();

            // Process the CSV file
            $this->processCsv($csv, $category);

            // Log summary
            $this->logSummary();
        } else {
            $this->error('File not found in Firebase Storage.');
            return;
        }
    }

    // Process the CSV file
    public function processCsv($file, $category, $splitter = ';')
    {
        set_time_limit(0);
        ini_set('memory_limit', '-1'); // Remove memory limit temporarily

        // Check if the file exists
        if (!$file) {
            $this->error("File not found: $file");
            return;
        }

        if ($category->id == 'tech') {
            $splitter = ',';
        }

        // Split the CSV content into lines
        $lines = explode("\n", $file);

        $this->info('File opened.');

        $header = null;
        $counter = 0;
        $processedProductIds = [];

        // Initialize the progress bar
        $totalRows = count($lines) - 1; // Minus one for the header row
        $bar = $this->output->createProgressBar($totalRows);
        $bar->start();

        foreach ($lines as $line) {
            // Skip empty lines
            if (empty(trim($line))) {
                $bar->advance();
                continue;
            }

            // Convert the CSV line to an array
            $row = str_getcsv($line, $splitter);

            // Skip header row
            if (!$header) {
                $header = $row;
                $bar->advance();
                continue;
            }

            // Ensure the number of columns match
            if (count($header) !== count($row)) {
                $bar->advance();
                continue;
            }

            // Map the row data to the header
            $row = array_combine($header, $row);

            // Stop after 100 rows for testing purposes
            if ($counter >= 500) {
                break;
            }

            // Filter out products with a price lower than 5 or higher than 150
            if ($row['price'] < 5 || $row['price'] > 150) {
                $bar->advance();
                $this->incrementCount('Product', 'filtered');
                continue;
            }

            // Process the brand record
            $brand = $this->processRecord(Brand::class, ['name' => $row['brand']], 'name');

            // Prepare product data for processing
            $productData = [];
            switch ($category->id) {
                case 'wonen':
                    $parsedData = [
                        'serial_number' => $row['product ID'],
                        'name' => $row['name'],
                        'description' => $row['description'],
                        'price' => $row['price'],
                        'image_url' => $row['imageURL'] ?? null,
                        'affiliate_link' => $row['productURL'],
                        "currency" => $row['currency'],
                        "delivery_time" => $row['deliveryTime'],
                        'stock' => $row['stock'] ?? $row['product_availability_state_id'] ?? null,
                        'brand_id' => $brand->id,
                        'category_id' => $category->id,
                    ];

                    $productData = array_filter($parsedData);
                    break;

                case 'tech':
                    $parsedData = [
                        'serial_number' => $row['sku'],
                        'name' => $row['product_name'],
                        'description' => $row['product_summary'],
                        'price' => $row['price'],
                        'image_url' => $row['image_url'] ?? null,
                        'affiliate_link' => $row['product_url'],
                        "currency" => $row['currency'],
                        "delivery_time" => $row['delivery_time'],
                        'stock' => $row['product_availability_state_id'] ?? null,
                        'brand_id' => $brand->id,
                        'category_id' => $category->id,
                    ];

                    $productData = array_filter($parsedData);
                    break;

                default;
                    $this->info('No data for category found!');
                    return;
            }

            // Process the product record
            $product = $this->processRecord(Product::class, $productData, 'serial_number');

            // Prepare subcategory and subsubcategory data for processing
            $subCategory = null;
            $subSubCategory = null;
            $categoryPath = $category->name;
            switch ($category->id) {
                case 'wonen':
                    if (!empty($row['subcategories'])) {
                        $subCategory = $this->processRecord(SubCategory::class, ['name' => ucfirst($row['subcategories']), 'category_id' => $category->id], 'name');
                        $categoryPath .= ' > ' . $subCategory->name;

                        if (!empty($row['subsubcategories'])) {
                            $subSubCategory = $this->processRecord(SubSubCategory::class, ['name' => ucfirst($row['subsubcategories']), 'sub_category_id' => $subCategory->id], 'name');
                            $categoryPath .= ' > ' . $subSubCategory->name;
                        }
                    }
                    break;

                case 'tech':
                    if (!empty($row['product_type'])) {
                        $subCategory = $this->processRecord(SubCategory::class, ['name' => ucfirst($row['product_type']), 'category_id' => $category->id], 'name');
                        $categoryPath .= ' > ' . $subCategory->name;

                        if (!empty($row['subproducttypename'])) {
                            $subSubCategory = $this->processRecord(SubSubCategory::class, ['name' => ucfirst($row['subproducttypename']), 'sub_category_id' => $subCategory->id], 'name');
                            $categoryPath .= ' > ' . $subSubCategory->name;
                        }
                    }
                    break;

                default;
                    $this->info('No data for category found!');
                    return;
            }

            // Update product with subcategory id and subsubcategory id
            $product->update([
                'sub_category_id' => $subCategory ? $subCategory->id : null,
                'sub_sub_category_id' => $subSubCategory ? $subSubCategory->id : null,
                'category_path' => $categoryPath,
                'occasion_id' => null, // Will be updated later
                'gender_id' => null, // Will be updated later
                'created_at' => now(),
                'updated_at' => now(),
            ]);


            if ($subSubCategory) {
                $subSubCategory->update([
                    'sub_category_id' => $subCategory ? $subCategory->id : null,
                ]);
            }

            $processedProductIds[] = $product->id;

            $counter++;
            $bar->advance();
        }

        // Clean up the database
        $this->deleteUnprocessedProducts($processedProductIds, $category->id);
        $this->deleteUnusedBrands();
        $this->deleteUnusedSubCategories();
        $this->deleteUnusedSubSubCategories();

        // Finish the progress bar
        $bar->finish();

        // Log the number of processed rows
        $this->info('Processed ' . $counter . ' rows.');
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
                $this->incrementCount($modelName, 'updated');
                $this->log("{$modelName} with {$uniqueIdentifier} " . $existingRecord->$uniqueIdentifier . " updated.");
            }

            return $existingRecord;
        } else {
            // Create a new record
            $record = $model::create($row);
            $this->incrementCount($modelName, 'created');
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
            $this->incrementCount($modelName, 'deleted');
            $record->delete();
        }
    }

    private function deleteUnusedBrands()
    {
        // Split the model name and log the actual model name
        $modelParts = explode('\\', Brand::class);
        $modelName = end($modelParts);

        // Find and delete brands without products
        $recordsToDelete = Brand::whereDoesntHave('products')->get();

        foreach ($recordsToDelete as $record) {
            $this->log("Brand with id " . $record->id . " deleted.");
            $this->incrementCount($modelName, 'deleted');
            $record->delete();
        }
    }

    private function deleteUnusedSubCategories()
    {
        // Split the model name and log the actual model name
        $modelParts = explode('\\', SubCategory::class);
        $modelName = end($modelParts);

        // Find and delete subcategories without products
        $recordsToDelete = SubCategory::whereDoesntHave('products')->get();

        foreach ($recordsToDelete as $record) {
            $this->log("SubCategory with id " . $record->id . " deleted.");
            $this->incrementCount($modelName, 'deleted');
            $record->delete();
        }
    }

    private function deleteUnusedSubSubCategories()
    {
        // Split the model name and log the actual model name
        $modelParts = explode('\\', SubSubCategory::class);
        $modelName = end($modelParts);

        // Find and delete subcategories without products
        $recordsToDelete = SubSubCategory::whereDoesntHave('products')->get();

        foreach ($recordsToDelete as $record) {
            $this->log("SubSubCategory with id " . $record->id . " deleted.");
            $this->incrementCount($modelName, 'deleted');
            $record->delete();
        }
    }

    private function incrementCount($model, $action)
    {
        if (!isset($this->{$action . 'Count'}[$model])) {
            $this->{$action . 'Count'}[$model] = 0;
        }
        $this->{$action . 'Count'}[$model]++;
    }

    private function logSummary()
    {
        $this->info(''); // Empty line for spacing
        $this->info('Summary of operations:');
        $this->logActionSummary('created');
        $this->logActionSummary('updated');
        $this->logActionSummary('deleted');
        $this->logActionSummary('filtered');
    }

    private function logActionSummary($action)
    {
        if (isset($this->{$action . 'Count'}) && count($this->{$action . 'Count'}) > 0) {
            foreach ($this->{$action . 'Count'} as $model => $count) {
                $this->info("{$count} {$model}(s) {$action}");
            }
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
