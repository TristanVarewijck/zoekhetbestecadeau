<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class Product extends Model
{
        use HasFactory, HasUuids;

        protected $fillable = [
                'serial_number',
                'name',
                'description',
                'price',
                'affiliate_link',
                'currency',
                'brand_id',
                'category_id',

                // Temporary nullable
                'occasion_id',

                // Extra fields (nullable)
                'delivery',
                'delivery_time',
                'sub_category_id',
                'sub_sub_category_id',
                'stock',
                'image_url',
                'material',
                'reviews',
                'rating',
                'size',
                'color'
        ];

        public function brand()
        {
                return $this->belongsTo(Brand::class);
        }

        public function category()
        {
                return $this->belongsTo(Category::class);
        }

        public function subCategory()
        {
                return $this->belongsTo(SubCategory::class);
        }

        public function subSubCategory()
        {
                return $this->belongsTo(SubSubCategory::class);
        }
}
