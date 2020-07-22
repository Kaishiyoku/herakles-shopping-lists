<?php

namespace App\Models\Pivots;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ShoppingListUser extends Pivot
{
    protected $casts = [
        'is_creator' => 'boolean',
    ];
}
