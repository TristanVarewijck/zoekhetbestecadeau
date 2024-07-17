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
        // make sub_category_id nullable on sub_sub_categories table
        Schema::table('sub_sub_categories', function (Blueprint $table) {
            $table->foreignUuid('sub_category_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sub_sub_categories', function (Blueprint $table) {
            $table->foreignUuid('sub_category_id')->change();
        });
    }
};
