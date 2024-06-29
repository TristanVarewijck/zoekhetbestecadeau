<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterestProduct extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'interest_id',
        'product_id',
    ];
}
