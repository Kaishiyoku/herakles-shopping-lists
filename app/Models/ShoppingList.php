<?php

namespace App\Models;

use App\Models\Pivots\ShoppingListUser;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\ShoppingList
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingList newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingList newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingList query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingList whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingList whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingList whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingList whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ShoppingListEntry[] $shoppingListEntries
 * @property-read int|null $shopping_list_entries_count
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ShoppingList onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ShoppingList whereDeletedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ShoppingList withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\ShoppingList withoutTrashed()
 */
class ShoppingList extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = [
        'shoppingListEntries',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('is_creator')->using(ShoppingListUser::class);
    }

    public function shoppingListEntries()
    {
        return $this->hasMany(ShoppingListEntry::class)
            ->orderBy('finished_at', 'asc')
            ->orderBy('id', 'desc');
    }
}
