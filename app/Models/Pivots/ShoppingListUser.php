<?php

namespace App\Models\Pivots;

use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * App\Models\Pivots\ShoppingListUser
 *
 * @property int $id
 * @property int $user_id
 * @property int $shopping_list_id
 * @property bool $is_creator
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pivots\ShoppingListUser newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pivots\ShoppingListUser newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pivots\ShoppingListUser query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pivots\ShoppingListUser whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pivots\ShoppingListUser whereIsCreator($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pivots\ShoppingListUser whereShoppingListId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pivots\ShoppingListUser whereUserId($value)
 * @mixin \Eloquent
 */
class ShoppingListUser extends Pivot
{
    protected $casts = [
        'is_creator' => 'boolean',
    ];
}
