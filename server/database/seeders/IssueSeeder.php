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
        DB::table('issues')->insert(
            [
                [
                    'issueId' => 'GT-1',
                    'name' => '[API] Authentication',
                    'priority' => 5,
                    'dueDate' => now(),
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'reporterId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'assigneeId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                ],
                [
                    'issueId' => 'GT-2',
                    'name' => '[API][Frontend] Dashboard',
                    'priority' => 2,
                    'dueDate' => $dueDateLevel3,
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'reporterId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'assigneeId' => 'b1245733-c572-11ed-a7fb-00e04c2ca3a6',
                ],
                [
                    'issueId' => 'GI-1',
                    'name' => '[API] Authentication',
                    'priority' => 3,
                    'dueDate' => $dueDateLevel2,
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'reporterId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'assigneeId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                ],
            ]
        );
    }
}
