<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail, JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'userId',
        'fullName',
        'username',
        'email',
        'emailVerified',
        'gender',
        'dob',
        'phoneNumber',
        'password',
        'photoUrl',
        'provinceCode',
        'districtCode',
        'wardCode',
        'roleId',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */

    public function getJWTIdentifier()
    {
        return $this->userId;
    }

    public function getAuthIdentifierName()
    {
        return 'userId';
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'roleId', 'roleId');
    }
    public function projects()
    {
        return $this->hasMany(ProjectUser::class, 'userId', 'userId');

    }
}
