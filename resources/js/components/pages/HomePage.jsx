import React from 'react';
import isAuthorized from '../../authorization/isAuthorized';
import LoginPage from './LoginPage';
import ShoppingListsPage from './ShoppingListsPage';

class HomePage extends React.PureComponent {
    renderHomePage() {
        return <ShoppingListsPage/>;
    }

    renderLoginPage() {
        return <LoginPage/>;
    }

    render() {
        return isAuthorized() ? this.renderHomePage() : this.renderLoginPage();
    }
}

export default HomePage;
