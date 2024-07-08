<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $now = Carbon::now();
        $genders = [
            [
                'icon' => '🚺',
                'name' => 'Voor haar',
                'id' => 'voor_haar',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '🚹',
                'name' => 'Voor hem',
                'id' => 'voor_hem',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '🚻',
                'name' => 'Voor iedereen',
                'id' => 'voor_iedereen',
                'created_at' => $now,
                'updated_at' => $now
            ]
        ];

        DB::table('genders')->insert($genders);
    }
}
