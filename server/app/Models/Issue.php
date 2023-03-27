<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'dueDate',
        'priority',
        'projectId',
        'statusId',
        'reporterId',
        'assigneeId',
    ];
    public function status()
    {
        return $this->hasOne(Status::class, 'statusId', 'statusId');

    }
    public function assignee()
    {
        return $this->hasOne(User::class, 'userId', 'assigneeId');

    }
    public function reporter()
    {
        return $this->hasOne(User::class, 'userId', 'reporterId');

    }
}
