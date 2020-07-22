import React from 'react';
import ShoppingListsPage from '../components/pages/ShoppingListsPage';
import ShoppingListCreatePage from '../components/pages/ShoppingListCreatePage';
import ShoppingListDetailPage from '../components/pages/ShoppingListDetailPage';
import LogoutPage from '../components/pages/LogoutPage';
import NotFoundPage from '../components/pages/NotFoundPage';
import PlaceholderComponent from '../components/core/PlaceholderComponent';

const getAuthorizedRoutes = () => (
    <>
        <PlaceholderComponent path="/">
            <ShoppingListsPage path="/"/>
            <ShoppingListCreatePage path="/shopping_lists/create"/>
            <ShoppingListDetailPage path="/shopping_lists/:id"/>
        </PlaceholderComponent>

        <LogoutPage path="/logout"/>
        <NotFoundPage default/>
    </>
);

export default getAuthorizedRoutes;
