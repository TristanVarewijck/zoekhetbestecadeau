<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubSubCategory extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'id',
        'name',
        'sub_category_id',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
