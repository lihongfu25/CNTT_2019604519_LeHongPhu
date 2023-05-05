<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('project_statuses')->insert(
            [
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT01',
                ],
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT03',
                ],
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT04',
                ],
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT05',
                ],
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT06',
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT01',
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT02',
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT03',
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT04',
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT05',
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT06',
                ],
            ]
        );
    }
}
