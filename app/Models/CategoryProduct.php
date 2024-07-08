<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryProduct extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'category_id',
        'product_id',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'interest_products');
    }
}
