<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
 */
class ShoppingList extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}