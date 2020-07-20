<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\ShoppingList;
use Illuminate\Http\Request;

class ShoppingListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shoppingLists = auth('api')->user()->shoppingLists->map(function ($shoppingList) {
            if ($shoppingList->name === env('DEFAULT_SHOPPING_LIST_NAME')) {
                $shoppingList->name = trans('shopping_list.default');
            }

            return $shoppingList;
        });

        return response()->json($shoppingLists);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ShoppingList  $gender
     * @return \Illuminate\Http\Response
     */
    public function show(ShoppingList $gender)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ShoppingList  $gender
     * @return \Illuminate\Http\Response
     */
    public function edit(ShoppingList $gender)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ShoppingList  $gender
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ShoppingList $gender)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ShoppingList  $gender
     * @return \Illuminate\Http\Response
     */
    public function destroy(ShoppingList $gender)
    {
        //
    }
}
