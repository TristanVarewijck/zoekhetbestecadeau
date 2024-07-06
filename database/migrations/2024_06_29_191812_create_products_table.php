<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('serial_number')->unique();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->foreignUuid('brand_id')->constrained('brands');
            $table->foreignUuid('category_id')->constrained('categories');
            $table->text('image_url');
            $table->text('affiliate_link');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
