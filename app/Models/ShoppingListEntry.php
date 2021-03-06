<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ShoppingListEntry
 *
 * @property int $id
 * @property int $user_id
 * @property int $shopping_list_id
 * @property string $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ShoppingList $shoppingList
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingListEntry newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingListEntry newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingListEntry query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingListEntry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingListEntry whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingListEntry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingListEntry whereShoppingListId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingListEntry whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingListEntry whereUserId($value)
 * @mixin \Eloquent
 * @property string|null $finished_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingListEntry whereFinishedAt($value)
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ShoppingListEntry onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingListEntry whereDeletedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ShoppingListEntry withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ShoppingListEntry withoutTrashed()
 */
class ShoppingListEntry extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'description',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function shoppingList()
    {
        return $this->belongsTo(ShoppingList::class);
    }
}
