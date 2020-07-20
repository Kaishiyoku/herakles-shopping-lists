import React from 'react';
import {LocationProvider} from '@reach/router';
import {Configuration} from '@react-md/layout';
import MainLayout from './MainLayout';
import {MessageQueue} from '@react-md/alert';
import {history} from '../../core/routerHistory';
import getNavItems from '../../core/navigation/getNavItems';

class App extends React.Component {
    state = {
        currentPathname: null,
    };

    componentDidMount() {
        history.listen(({location}) => {
            this.setState({currentPathname: location.pathname});
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.currentPathname !== nextState.currentPathname;
    }

    render() {
        return (
            <LocationProvider history={history}>
                <Configuration>
                    <MessageQueue id="main-alerts">
                        <MainLayout navItems={getNavItems()}/>
                    </MessageQueue>
                </Configuration>
            </LocationProvider>
        );
    }
}

export default App;
