<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\ShoppingList;
use App\Models\ShoppingListEntry;
use App\Models\User;
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
        $shoppingLists = auth('api')->user()->shoppingLists->map('formatDefaultShoppingListName');

        return response()->json($shoppingLists);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => ['required'],
            'user_ids.*' => ['sometimes', 'exists:users,id'],
        ];

        $data = $request->validate($rules);

        $shoppingList = new ShoppingList($data);

        auth('api')->user()->shoppingLists()->save($shoppingList, ['is_creator' => true]);

        if (isset($data['user_ids'])) {
            $shoppingList->users()->attach($data['user_ids']);
        }

        return response()->json($shoppingList);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ShoppingList  $shoppingList
     * @return \Illuminate\Http\Response
     */
    public function show(ShoppingList $shoppingList)
    {
        $this->authorize('view', $shoppingList);

        return response()->json(formatDefaultShoppingListName($shoppingList));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ShoppingList  $shoppingList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ShoppingList $shoppingList)
    {
        //
    }

    /**
     * Clean up finished entries
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ShoppingList  $shoppingList
     * @return \Illuminate\Http\Response
     */
    public function cleanUp(ShoppingList $shoppingList)
    {
        $this->authorize('cleanUp', $shoppingList);

        $shoppingList->shoppingListEntries()
            ->whereNotNull('finished_at')
            ->delete();

        return response()->json();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ShoppingList  $shoppingList
     * @return \Illuminate\Http\Response
     */
    public function destroy(ShoppingList $shoppingList)
    {
        $this->authorize('delete', $shoppingList);

        $shoppingList->shoppingListEntries()->delete();
        $shoppingList->users()->detach();
        $shoppingList->delete();

        return response()->json();
    }
}
