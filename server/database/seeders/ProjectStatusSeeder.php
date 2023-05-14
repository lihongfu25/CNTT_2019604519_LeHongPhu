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
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT03',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT04',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT05',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT06',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT01',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT02',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT03',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT04',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT05',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'statusId' => 'STT06',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]
        );
    }
}
