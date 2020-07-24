<?php

namespace App\Providers;

use App\Models\ShoppingList;
use App\Models\ShoppingListEntry;
use App\Policies\ShoppingListEntryPolicy;
use App\Policies\ShoppingListPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        ShoppingList::class => ShoppingListPolicy::class,
        ShoppingListEntry::class => ShoppingListEntryPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
