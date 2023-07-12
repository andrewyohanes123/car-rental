<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Car extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'model',
        'license_plate',
        'cost'
    ];

    public function car_rent(): HasOne
    {
        return $this->hasOne(CarRent::class);
    }
}
