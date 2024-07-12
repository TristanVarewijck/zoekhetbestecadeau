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
            $table->text('image_url');
            $table->text('affiliate_link');
            $table->text('currency');
            $table->text('category_path');
            $table->text('delivery_time');
            $table->integer('stock');
            $table->foreignUuid('brand_id')->constrained('brands')->onDelete('cascade');
            $table->foreignUuid('category_id')->constrained('categories')->onDelete('cascade');
            // Will be updated later (nullable)
            $table->foreignUuid('sub_category_id')->nullable()->constrained('sub_categories')->onDelete('cascade');
            $table->foreignUuid('occasion_id')->nullable()->constrained('occasions')->onDelete('cascade');
            $table->foreignUuid('gender_id')->nullable()->constrained('genders')->onDelete('cascade');
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
