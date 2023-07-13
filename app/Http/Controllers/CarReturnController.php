<?php

namespace App\Http\Controllers;

use App\Models\CarRent;
use App\Models\CarReturn;
use Illuminate\Http\Request;

class CarReturnController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $car_returns = CarReturn::with(['car_rent', 'car'])->get();

        return $car_returns;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $car_return = CarReturn::create([
            'car_id' => $request->car_id,
            'car_rent_id' => $request->car_rent_id,
            'verified' => true,
        ]);

        $car_rent = CarRent::find($request->car_rent_id);

        $car_rent->active = false;
        $car_rent->save();

        return $car_return;
    }

    /**
     * Display the specified resource.
     */
    public function show(CarReturn $carReturn)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CarReturn $carReturn)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CarReturn $carReturn)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarReturn $carReturn)
    {
        //
    }
}
