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
        'description',
        'dueDate',
        'active',
        'leaderId',
    ];
    public function statuses()
    {
        return $this->hasMany(ProjectStatus::class, 'projectId', 'projectId')->with('status');
    }
    public function users()
    {
        return $this->hasMany(ProjectUser::class, 'projectId', 'projectId')->with('user');
    }
    public function issues()
    {
        return $this->hasMany(Issue::class, 'projectId', 'projectId');
    }
}
