<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OccasionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();
        $occasions = [
            [
                'icon' => '🌹',
                'name' => 'Date',
                'id' => 'date',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '🧁',
                'name' => 'Verjaardag',
                'id' => 'verjaardag',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '🙏',
                'name' => 'Bedankje',
                'id' => 'bedankje',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '👋',
                'name' => 'Vertrek',
                'id' => 'vertrek',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '🏡',
                'name' => 'Huis',
                'id' => 'huis',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '🎓',
                'name' => 'Diploma',
                'id' => 'diploma',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '👶',
                'name' => 'Geboorte',
                'id' => 'geboorte',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '🎓',
                'name' => 'Pensioen',
                'id' => 'pensioen',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '🎊',
                'name' => 'Jubileum',
                'id' => 'jubileum',
                'created_at' => $now,
                'updated_at' => $now
            ],
            [
                'icon' => '👰',
                'name' => 'Bruiloft',
                'id' => 'bruiloft',
                'created_at' => $now,
                'updated_at' => $now
            ]
        ];

        DB::table('occasions')->insert($occasions);
    }
}
