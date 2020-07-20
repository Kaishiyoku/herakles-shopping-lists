import React from 'react';
import DefaultGrid from '../core/DefaultGrid';
import isAuthorized from '../../authorization/isAuthorized';
import LoginPage from './LoginPage';

class HomePage extends React.PureComponent {
    renderHomePage() {
        return (
            <DefaultGrid>
                Home
            </DefaultGrid>
        );
    }

    renderLoginPage() {
        return <LoginPage/>;
    }

    render() {
        return isAuthorized() ? this.renderHomePage() : this.renderLoginPage();
    }
}

export default HomePage;
