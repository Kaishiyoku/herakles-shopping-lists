<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function () {
    Route::post('/login', 'Api\V1\Auth\LoginController@login')->name('login');

    Route::group(['middleware' => ['auth:api']], function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        Route::get('/users', function () {
            $users = \App\Models\User::where('id', '!=', auth('api')->user()->id)->get()->map->only(['id', 'name']);

            return response()->json($users);
        });
        Route::resource('shopping_lists', 'Api\V1\ShoppingListController')->except(['create', 'edit']);
        Route::resource('shopping_lists.shopping_list_entries', 'Api\V1\ShoppingListEntryController')->only(['store', 'update', 'destroy']);
    });

    Route::any('{all}', function () {
        return response()->json(null, 404);
    })->where('all', '^.*$');
});
