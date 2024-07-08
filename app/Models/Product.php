<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'serial_number',
        'name',
        "stock",
        'description',
        'currency',
        'category_path',
        'delivery_time',
        'price',
        'brand_id',
        'brand_name',
        'category_id',
        'image_url',
        'affiliate_link',
    ];

    public function interests()
    {
        return $this->belongsToMany(Category::class, 'category_products');
    }
}
