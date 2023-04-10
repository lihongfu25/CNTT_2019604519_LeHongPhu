<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $createdAtDate = Carbon::now()->subDays(3);
        $createdAtHour = Carbon::now()->subHour(5);
        DB::table('notifications')->insert(
            [
                [
                    'userId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'issueId' => 'GT-1',
                    'content' => 'created issue',
                    'created_at' => $createdAtDate,
                ],
                [
                    'userId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'issueId' => 'GI-1',
                    'content' => 'created issue',
                    'created_at' => $createdAtDate,
                ],
                [
                    'userId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'issueId' => 'GT-1',
                    'content' => 'changed status to DONE',
                    'created_at' => $createdAtHour,
                ],
                [
                    'userId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'issueId' => 'GT-2',
                    'content' => 'add a comment',
                    'created_at' => now(),
                ],
                [
                    'userId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'issueId' => 'GT-2',
                    'content' => 'changed status to IN PROGRESS',
                    'created_at' => now(),
                ],
            ]
        );
    }
}
