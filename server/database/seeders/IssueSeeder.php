<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class IssueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dueDateLevel2 = Carbon::now()->addDays(3);
        $dueDateLevel3 = Carbon::now()->addDays(7);
        $pastDate = Carbon::now()->subDays(3);
        DB::table('issues')->insert(
            [
                [
                    'issueId' => 'GT-1',
                    'name' => '[API] Authentication',
                    'priority' => 5,
                    'dueDate' => now(),
                    'description' => 'Đây là bước đầu để người dùng xác minh người dùng.',
                    'statusId' => 'STT06',
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'reporterId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'assigneeId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'created_at' => $pastDate,
                    'updated_at' => $pastDate,
                ],
                [
                    'issueId' => 'GT-2',
                    'name' => '[API][Frontend] Dashboard',
                    'priority' => 2,
                    'dueDate' => $dueDateLevel3,
                    'description' => null,
                    'statusId' => 'STT03',
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'reporterId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'assigneeId' => 'b1245733-c572-11ed-a7fb-00e04c2ca3a6',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'issueId' => 'GT-3',
                    'name' => '[API][Frontend] Profile',
                    'priority' => 2,
                    'dueDate' => now(),
                    'description' => null,
                    'statusId' => 'STT03',
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'reporterId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'assigneeId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'issueId' => 'GI-1',
                    'name' => '[API] Authentication',
                    'priority' => 3,
                    'dueDate' => $dueDateLevel2,
                    'description' => null,
                    'statusId' => 'STT01',
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'reporterId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'assigneeId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]
        );
    }
}
