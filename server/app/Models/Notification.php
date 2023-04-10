<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'issueId',
        'userId',
        'content',
        'created_at',
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'userId', 'userId');
    }
    public function issue()
    {
        return $this->belongsTo(Issue::class, 'issueId', 'issueId');
    }
}
