<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    use HasFactory;
    protected $fillable = [
        'issueId',
        'name',
        'description',
        'dueDate',
        'priority',
        'projectId',
        'statusId',
        'reporterId',
        'assigneeId',
    ];
}
