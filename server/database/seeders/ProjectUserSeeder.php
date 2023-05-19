<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('project_users')->insert(
            [
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'userId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'userId' => 'b1245733-c572-11ed-a7fb-00e04c2ca3a6',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'userId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]
        );
    }
}
