<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategoryProduct extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'sub_category_id',
        'product_id',
    ];
}
