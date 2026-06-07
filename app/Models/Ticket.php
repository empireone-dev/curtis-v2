<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Ticket extends Model
{

    use HasFactory;
    protected $fillable = [
        'user_id',
        'ticket_id',
        'asc_id',
        'decision_making_id',
        'fname',
        'lname',
        'email',
        'phone',
        'phone2',
        'item_number',
        'unit',
        'brand',
        'class',
        'serial_number',
        'call_type',
        'purchase_data',
        'zip_code',
        'country',
        'state',
        'decision_status',
        'city',
        'address',
        'address2',
        'issue',
        'explanation',
        'warranty_status',
        'validation_notes',
        'availability_notes',
        'callback_notes',
        'internal_notes',
        'created_from',
        'isUploading',
        'remarks',
        'reason_to_close',
        'store_refusal_reason',
        'status',
        'cases_status',
        'move_status',
        'purchase_date',
        'email_date',
        'validator_id',
        'is_reply',
        'detailed_explanation_issue',
        'isExported',
        'isEscalated',
        'where_status',
        'received_at',
        'asc_status'
    ];


    public function activities(): HasMany
    {
        return $this->hasMany(Activity::class, 'ticket_id', 'id')->where('type', '<>', 'upload');
    }
    public function product_registration(): HasOne
    {
        return $this->hasOne(ProductRegistration::class, 'serial', 'serial_number');
    }
}
