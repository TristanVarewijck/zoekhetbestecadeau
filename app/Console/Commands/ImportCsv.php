<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Interest;
use App\Models\InterestProduct;
use App\Models\Product;
use Illuminate\Console\Command;

class ImportCsv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-csv {interest}';

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
        $file = storage_path('products/wonen.csv');

        if (!file_exists($file)) {
            $this->error("File not found: $file");
            return;
        }

        $fileObject = new \SplFileObject($file);
        $fileObject->setFlags(\SplFileObject::READ_CSV);
        $fileObject->setCsvControl(';');

        $header = null;
        $counter = 0;
        $processedProductIds = [];

        // Get the interest from the command argument and add it to the database
        $interestName = $this->argument('interest');
        $interest = Interest::firstOrCreate(['name' => $interestName, 'icon' => 'fas fa-home']);

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

            // Stop after 1000 rows for testing purposes
            if ($counter >= 300) {
                break;
            }

            $row = array_combine($header, $row);

            // Filter out products with a price lower than 5 or higher than 150
            if ($row['price'] < 5 || $row['price'] > 150) {
                continue;
            }

            $brand = $this->processRecord(Brand::class, ['name' => $row['brand']], 'name');
            $category = $this->processRecord(Category::class, ['name' => $row['subcategories']], 'name');

            $productData = [
                'serial_number' => $row['product ID'],
                'name' => $row['name'],
                'description' => $row['description'],
                'price' => $row['price'],
                'brand_id' => $brand->id,
                'category_id' => $category->id,
                'image_url' => $row['imageURL'],
                'affiliate_link' => $row['productURL'],
            ];

            $product =  $this->processRecord(Product::class, $productData, 'serial_number');
            $this->processRecord(InterestProduct::class, ['interest_id' => $interest->id, 'product_id' => $product->id], 'product_id');

            $processedProductIds[] = $product->id;

            $counter++;
        }

        // Clean up the database
        $this->deleteUnprocessedProducts($processedProductIds);
        // * When product gets deleted it automatically deletes the records everywhere where the product_id is used
        $this->deleteUnusedBrands();
        $this->deleteUnusedCategories();

        // Log success message + number of records processed
        $this->info("Import completed. Processed {$counter} records.");
    }

    private function isRecordDataDifferent($existingProduct, $productData)
    {
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

        $recordsToDelete = Product::whereNotIn('id', $processedIds)->get();

        foreach ($recordsToDelete as $record) {
            $this->log("{$modelName} with id " . $record->id . " deleted.");
            $record->delete();
        }
    }

    private function deleteUnusedBrands()
    {
        $recordsToDelete = Brand::whereDoesntHave('products')->get();

        foreach ($recordsToDelete as $record) {
            $this->log("Brand with id " . $record->id . " deleted.");
            $record->delete();
        }
    }

    private function deleteUnusedCategories()
    {
        $recordsToDelete = Category::whereDoesntHave('products')->get();

        foreach ($recordsToDelete as $record) {
            $this->log("Category with id " . $record->id . " deleted.");
            $record->delete();
        }
    }

    private function log($message)
    {
        if ($this->loggingEnabled) {
            $this->info($message);
        }
    }
}
