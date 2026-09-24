<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'emp_id',
        'google_id',
        'name',
        'email',
        'password',
        'role_id',
        'agent_type'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /* ==========================================
       RELATIONSHIPS
    ========================================== */

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'user_id', 'id');
    }

    public function casesLogs()
    {
        return $this->hasMany(CasesLog::class, 'user_id', 'id');
    }

    public function directEmails()
    {
        return $this->hasMany(DirectEmail::class);
    }
    public function handledCasesLogs()
    {
        return $this->hasMany(CasesLog::class)->where('log_from', 'handled');
    }
    public function role(): HasOne
    {
        return $this->hasOne(Role::class, 'id', 'role_id');
    }
    public function handledDirectEmailsLogs()
    {
        return $this->hasMany(CasesLog::class)->where('log_from', 'direct_emails');
    }
}
