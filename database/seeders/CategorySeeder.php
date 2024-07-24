<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        $now = Carbon::now();
        $categories = [
            [
                'icon' => '🏋️',
                'name' => 'Sport',
                'id' => 'sport',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '📚',
                'name' => 'Lezen',
                'id' => 'lezen',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '💎',
                'name' => 'Sieraden',
                'id' => 'sieraden',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '🥘',
                'name' => 'Koken',
                'id' => 'koken',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '✈️',
                'name' => 'Reizen',
                'id' => 'reizen',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '💻',
                'name' => 'Tech',
                'id' => 'tech',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '🏡',
                'name' => 'Wonen',
                'id' => 'wonen',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '🧴',
                'name' => 'Verzorging',
                'id' => 'verzorging',
                'created_at' => $now,
                'updated_at' => $now
            ],
        ];

        DB::table('categories')->insert($categories);
    }
}
