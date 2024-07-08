<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateTablesStructure extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop the existing tables
        Schema::dropIfExists('interest_products');
        Schema::dropIfExists('interests');

        Schema::dropIfExists('sub_category_products');
        Schema::dropIfExists('sub_categories');

        Schema::dropIfExists('category_products');
        Schema::dropIfExists('categories');

        // Create the new categories table
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('icon')->nullable();
            $table->timestamps();
        });

        // Create the category_products table
        Schema::create('category_products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('category_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('product_id')->constrained('products')->cascadeOnDelete();
            $table->timestamps();
        });

        // Create the sub_categories table
        Schema::create('sub_categories', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->foreignUuid('category_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });

        // Create the sub_category_products table
        Schema::create('sub_category_products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('sub_category_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('product_id')->constrained('products')->cascadeOnDelete();
            $table->timestamps();
        });



        // Add category and subcategory to product
        Schema::table('products', function (Blueprint $table) {
            $table->foreignUuid('category_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignUuid('sub_category_id')->nullable()->constrained()->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop foreign key constraints on products table
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropForeign(['sub_category_id']);
            $table->dropColumn(['category_id', 'sub_category_id']);
        });

        // Drop the new tables
        Schema::dropIfExists('sub_category_products');
        Schema::dropIfExists('sub_categories');
        Schema::dropIfExists('category_products');
        Schema::dropIfExists('categories');

        // Recreate the old tables
        Schema::create('interests', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('icon')->nullable();
            $table->timestamps();
        });

        Schema::create('interest_products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('interest_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('product_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }
}
