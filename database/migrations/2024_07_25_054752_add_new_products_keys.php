<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->integer('reviews')->nullable();
            $table->integer('rating')->nullable();
            $table->text('size')->nullable();
            $table->decimal('from_price', 10, 2)->nullable();
            $table->text('material')->nullable();
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('reviews');
            $table->dropColumn('rating');
            $table->dropColumn('size');
            $table->dropColumn('from_price');
            $table->dropColumn('material');
        });
    }
};
