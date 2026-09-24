<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AgentNote extends Model
{
    use HasFactory;
    protected $touches = ['ticket'];
    protected $fillable = [
        'user_id',
        'ticket_id',
        'message',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function cases_logs(): HasMany
    {
        return $this->hasMany(CasesLog::class, 'ticket_id', 'ticket_id');
    }

    public function ticket(): HasOne
    {
        return $this->hasOne(Ticket::class, 'id', 'ticket_id');
    }
}
