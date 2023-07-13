<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CarReturn extends Model
{
    use HasFactory;

    protected $fillable = [
        'car_id',
        'car_rent_id',
        'verified'
    ];

    public function car_rent(): BelongsTo
    {
        return $this->belongsTo(CarRent::class);
    }

    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }
}
