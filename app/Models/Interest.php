<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interest extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'icon',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'interest_products');
    }
}
