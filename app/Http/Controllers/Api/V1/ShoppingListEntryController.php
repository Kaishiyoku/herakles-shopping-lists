<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\ShoppingList;
use App\Models\ShoppingListEntry;
use Illuminate\Http\Request;

class ShoppingListEntryController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ShoppingList  $shoppingList
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, ShoppingList $shoppingList)
    {
        $this->authorize('view', $shoppingList);

        $rules = [
            'description' => ['required'],
        ];

        $data = $request->validate($rules);

        $shoppingListEntry = new ShoppingListEntry($data);
        $shoppingListEntry->user_id = auth('api')->user()->id;

        $shoppingList->shoppingListEntries()->save($shoppingListEntry);

        return response()->json($shoppingListEntry);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ShoppingList  $shoppingList
     * @param  \App\Models\ShoppingListEntry  $shoppingListEntry
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ShoppingList $shoppingList, ShoppingListEntry $shoppingListEntry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ShoppingList  $shoppingList
     * @param  \App\Models\ShoppingListEntry  $shoppingListEntry
     * @return \Illuminate\Http\Response
     */
    public function destroy(ShoppingList $shoppingList, ShoppingListEntry $shoppingListEntry)
    {
        //
    }
}
