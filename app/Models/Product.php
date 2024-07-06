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
        'description',
        'price',
        'brand_id',
        'category_id',
        'image_url',
        'affiliate_link',
    ];

    public function interests()
    {
        return $this->belongsToMany(Interest::class, 'interest_products');
    }
}
