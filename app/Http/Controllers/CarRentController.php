<?php

namespace App\Http\Controllers;

use App\Models\CarRent;
use Illuminate\Http\Request;

class CarRentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $rents = CarRent::with(['car', 'user'])->get();

        return $rents;
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
        $rent = CarRent::create([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'user_id' => $request->user_id,
            'car_id' => $request->car_id,
        ]);

        return $rent;
    }

    /**
     * Display the specified resource.
     */
    public function show(CarRent $rent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CarRent $rent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CarRent $rent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CarRent $rent)
    {
        //
    }
}
