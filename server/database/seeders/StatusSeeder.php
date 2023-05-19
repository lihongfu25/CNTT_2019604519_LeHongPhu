<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('statuses')->insert(
            [
                [
                    'statusId' => 'STT01',
                    'name' => 'BACKLOG',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'statusId' => 'STT02',
                    'name' => 'TO DO',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'statusId' => 'STT03',
                    'name' => 'IN PROGRESS',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'statusId' => 'STT04',
                    'name' => 'REVIEW FAILED',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'statusId' => 'STT05',
                    'name' => 'IN REVIEW',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'statusId' => 'STT06',
                    'name' => 'DONE',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            ]
        );
    }
}
