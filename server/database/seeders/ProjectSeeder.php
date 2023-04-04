<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('projects')->insert(
            [
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'name' => 'Graduation Thesis',
                    'shortName' => 'GT',
                    'leaderId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'name' => 'Graduation Internship',
                    'shortName' => 'GI',
                    'leaderId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                ],
            ]
        );
    }
}
