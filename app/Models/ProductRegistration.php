<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProductRegistration extends Model
{

    use HasFactory;
    protected $fillable = [
        'address1',
        'address2',
        'city',
        'country',
        'email',
        'fname',
        'lname',
        'model',
        'phone',
        'serial',
        'state',
        'zipcode',
    ];

    public function ticket():HasOne
    {
        return $this->hasOne(Ticket::class, 'serial_number', 'serial');
    }
}
