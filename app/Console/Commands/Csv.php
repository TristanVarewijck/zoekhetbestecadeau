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
    protected $signature = 'import:csv {category}';

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
        $categoryName = $this->argument('category');
        $category = Category::firstOrCreate(['name' => $categoryName, "icon" => "fas fa-gift"]);
        $filePath = $categoryName . '.csv';

        if ($bucket->object($filePath)->exists()) {
            $object = $bucket->object($filePath);

            $fileSize = $object->info()['size'];
            $this->log('File size: ' . $fileSize . ' bytes');

            $content = $object->downloadAsStream();
            $csv = $content->getContents();

            switch ($categoryName) {
                case 'tech':
                    $this->processCsv($csv, $category, 'tech');
                    break;
                default:
                    $this->processCsv($csv, $category, 'default');
                    break;
            }
        } else {
            $this->error('File not found');
            return;
        }
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

            if ($counter >= 500) {
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
            $subCategory = $this->processRecord(SubCategory::class, ['name' => $row[$config['sub_category']], 'category_id' => $category->id], 'name');
            $subSubCategory = $this->processRecord(SubSubCategory::class, ['name' => $row[$config['sub_sub_category']]], 'name');
            $newCategoryPath = $category->name;

            if ($subCategory && $subSubCategory) {
                $newCategoryPath = ucfirst($category->name) . ' > ' . ucfirst($subCategory->name) . ' > ' . ucfirst($subSubCategory->name);
            } else if ($subCategory && !$subSubCategory) {
                $newCategoryPath = ucfirst($category->name) . ' > ' . ucfirst($subCategory->name);
            } else if (!$subCategory && !$subSubCategory) {
                $newCategoryPath = ucfirst($category->name);
            }

            $product->update([
                'sub_category_id' => $subCategory->id,
                'sub_sub_category_id' => $subSubCategory->id,
                'category_path' => $newCategoryPath,
                'occasion_id' => null, // Will be updated later
                'gender_id' => null, // Will be updated later
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            $subSubCategory->update([
                'sub_category_id' => $subCategory->id,
            ]);

            $processedProductIds[] = $product->id;
            $counter++;
        }
    }

    private function processRecord($model, $row, $uniqueIdentifier)
    {
        logger($row);

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
