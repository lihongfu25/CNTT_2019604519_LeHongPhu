<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'projectId',
        'userId',
    ];
    public function project()
    {
        return $this->belongsTo(Project::class, 'projectId', 'projectId');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'userId');
    }
}
