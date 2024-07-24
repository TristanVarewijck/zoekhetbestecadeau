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
                'image_url',
                'affiliate_link',
                'currency',
                'category_path',
                'delivery_time',
                'stock',
                'brand_id',
                'category_id',
                'sub_category_id',
                'sub_sub_category_id',
                'occasion_id',
                'delivery',
        ];
}
