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
                ],
                [
                    'statusId' => 'STT02',
                    'name' => 'TO DO',
                ],
                [
                    'statusId' => 'STT03',
                    'name' => 'IN PROGRESS',
                ],
                [
                    'statusId' => 'STT04',
                    'name' => 'REVIEW FAILED',
                ],
                [
                    'statusId' => 'STT05',
                    'name' => 'IN REVIEW',
                ],
                [
                    'statusId' => 'STT06',
                    'name' => 'DONE',
                ]
            ]
        );
    }
}
