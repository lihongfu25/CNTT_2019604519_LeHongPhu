<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Models\Issue;

class CheckIssueDueDate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'issue:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $today = now()->format('Y-m-d');
        $issues = Issue::with('assignee')->where('dueDate', $today)->get();
        foreach ($issues as $issue) {
            if ($issue->assignee !== null)
                Mail::send('emails.issueDue', compact('issue'), function($email) use($issue) {
                    $email->subject("WoFM - Thông báo công việc đến hạn hoàn thành");
                    $email->to($issue->assignee->email, $issue);
                });
        }
    }
}
