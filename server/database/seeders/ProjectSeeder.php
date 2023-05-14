<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dueDateLevel1 = Carbon::now()->addDays(5);
        $dueDateLevel2 = Carbon::now()->addDays(10);
        $pastDate = Carbon::now()->subDays(3);
        DB::table('projects')->insert(
            [
                [
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'name' => 'Graduation Thesis',
                    'shortName' => 'GT',
                    'description' => 'Đây là đồ án tốt nghiệp của tôi, dự án xây dựng website quản lý công việc WoFM.',
                    'leaderId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'dueDate' => $dueDateLevel1,
                    'created_at' => $pastDate,
                    'updated_at' => $pastDate,
                ],
                [
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'name' => 'Graduation Internship',
                    'shortName' => 'GI',
                    'description' => null,
                    'leaderId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'dueDate' => $dueDateLevel2,
                    'created_at' => $pastDate,
                    'updated_at' => $pastDate,
                ],
            ]
        );
    }
}
