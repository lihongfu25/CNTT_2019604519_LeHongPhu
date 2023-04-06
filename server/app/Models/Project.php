<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'projectId',
        'name',
        'shortName',
        'description',
        'dueDate',
        'active',
        'leaderId',
    ];
    public function statuses()
    {
        return $this->hasMany(ProjectStatus::class, 'projectId', 'projectId');
    }
    public function users()
    {
        return $this->hasMany(ProjectUser::class, 'projectId', 'projectId');
    }
    public function issues()
    {
        return $this->hasMany(Issue::class, 'projectId', 'projectId');
    }
}
