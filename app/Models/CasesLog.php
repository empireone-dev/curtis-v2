<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CasesLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'ticket_id',
        'user_id',
        'remarks',
        'isEscalate',
        'case_type',
        'case_status',
        'log_from'
    ];
    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function ticket(): HasOne
    {
        return $this->hasOne(Ticket::class, 'id', 'ticket_id');
    }

    //  public function direct_email(): HasOne
    // {
    //     return $this->hasOne(DirectEmail::class,'id','ticket_id');
    // }

}
