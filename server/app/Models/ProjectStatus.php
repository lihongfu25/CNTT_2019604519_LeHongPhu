<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'projectId',
        'statusId',
    ];
    public function project()
    {
        return $this->belongsTo(Project::class, 'projectId', 'projectId');
    }
    public function status()
    {
        return $this->belongsTo(Status::class, 'statusId', 'statusId');
    }
}
