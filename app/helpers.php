<?php

if (!function_exists('formatDefaultShoppingListName')) {
    function formatDefaultShoppingListName(\App\Models\ShoppingList $shoppingList): \App\Models\ShoppingList
    {
        if ($shoppingList->name === env('DEFAULT_SHOPPING_LIST_NAME')) {
            $shoppingList->name = trans('shopping_list.default');
        }

        return $shoppingList;
    }
}
