<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Console\Command;

class ImportCsv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-csv';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to import CSV file to database.';

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
        $processedBrandIds = [];
        $processedCategoryIds = [];
        $processedProductIds = [];

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

            // Stop after 100 rows for testing purposes
            if ($counter >= 1000) {
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
                'brand' => $brand->id,
                'category' => $category->id,
                'image_url' => $row['imageURL'],
                'affiliate_link' => $row['productURL'],
            ];

            $product =  $this->processRecord(Product::class, $productData, 'serial_number');

            $processedBrandIds[] = $brand->id;
            $processedCategoryIds[] = $category->id;
            $processedProductIds[] = $product->id;

            $counter++;
        }

        // Delete records not in the CSV file
        $this->deleteUnprocessedRecords(Brand::class, $processedBrandIds);
        $this->deleteUnprocessedRecords(Category::class, $processedCategoryIds);
        $this->deleteUnprocessedRecords(Product::class, $processedProductIds);

        // Log success message + number of records processed (grouped by model)
        $this->info("Import completed. Processed {$counter} records.");
    }

    private function deleteUnprocessedRecords($model, $processedIds)
    {
        // Split the model name and log the actual model name
        $modelParts = explode('\\', $model);
        $modelName = end($modelParts);

        $recordsToDelete = $model::whereNotIn('id', $processedIds)->get();

        foreach ($recordsToDelete as $record) {
            $this->info("{$modelName} with id " . $record->id . " deleted.");
            $record->delete();
        }
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
                $this->info("{$modelName} with {$uniqueIdentifier} " . $existingRecord->$uniqueIdentifier . " updated.");
            } else {
                $this->info("{$modelName} with {$uniqueIdentifier} " . $existingRecord->$uniqueIdentifier . " is unchanged.");
            }

            return $existingRecord;
        } else {
            $record = $model::create($row);
            $this->info("Record created: {$record->name}");

            return $record;
        }
    }
}
