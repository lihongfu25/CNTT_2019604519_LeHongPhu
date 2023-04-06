<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class IssueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('issues')->insert(
            [
                [
                    'issueId' => 'GT-1',
                    'name' => '[API] Authentication',
                    'priority' => 'Highest',
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'reporterId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'assigneeId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                ],
                [
                    'issueId' => 'GT-2',
                    'name' => '[API][Frontend] Dashboard',
                    'priority' => 'Medium',
                    'projectId' => 'b12a2b33-c572-11ed-a7fb-00e04c2ca3a6',
                    'reporterId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'assigneeId' => 'b1245733-c572-11ed-a7fb-00e04c2ca3a6',
                ],
                [
                    'issueId' => 'GI-1',
                    'name' => '[API] Authentication',
                    'priority' => 'Medium',
                    'projectId' => 'b91a2b34-c572-11ed-a7fb-00e04c2ca3a6',
                    'reporterId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'assigneeId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                ],
            ]
        );
    }
}
