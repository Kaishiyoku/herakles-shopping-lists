import React from 'react';
import {LocationProvider} from '@reach/router';
import {Configuration} from '@react-md/layout';
import MainLayout from './MainLayout';
import {MessageQueue} from '@react-md/alert';
import {history} from '../../core/routerHistory';
import getNavItems from '../../core/navigation/getNavItems';
import merge from '../../core/merge';

class App extends React.Component {
    state = {
        currentPathname: null,
        navItems: {},
    };

    componentDidMount() {
        history.listen(({location}) => {
            this.setState({currentPathname: location.pathname});
        });

        this.setState((prevState, props) => {
            return merge(prevState, {navItems: getNavItems()});
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.currentPathname !== nextState.currentPathname || this.state.navItems !== nextState.navItems;
    }

    render() {
        const {navItems} = this.state;

        return (
            <LocationProvider history={history}>
                <Configuration>
                    <MessageQueue id="main-alerts">
                        <MainLayout navItems={navItems}/>
                    </MessageQueue>
                </Configuration>
            </LocationProvider>
        );
    }
}

export default App;
