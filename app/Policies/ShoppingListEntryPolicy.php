<?php

namespace App\Policies;

use App\Models\ShoppingListEntry;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ShoppingListEntryPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ShoppingListEntry  $shoppingListEntry
     * @return mixed
     */
    public function view(User $user, ShoppingListEntry $shoppingListEntry)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ShoppingListEntry  $shoppingListEntry
     * @return mixed
     */
    public function update(User $user, ShoppingListEntry $shoppingListEntry)
    {
        return $shoppingListEntry->shoppingList->users
            ->filter(function (User $shoppingListUser) use ($user) {
                return $shoppingListUser->id === $user->id;
            })
            ->isNotEmpty();
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ShoppingListEntry  $shoppingListEntry
     * @return mixed
     */
    public function delete(User $user, ShoppingListEntry $shoppingListEntry)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ShoppingListEntry  $shoppingListEntry
     * @return mixed
     */
    public function restore(User $user, ShoppingListEntry $shoppingListEntry)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ShoppingListEntry  $shoppingListEntry
     * @return mixed
     */
    public function forceDelete(User $user, ShoppingListEntry $shoppingListEntry)
    {
        //
    }
}
