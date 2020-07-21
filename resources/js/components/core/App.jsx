import React from 'react';
import {LocationProvider} from '@reach/router';
import {history} from '../../core/routerHistory';
import MainLayout from './MainLayout';
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
        const {classes} = this.props;

        return (
            <LocationProvider history={history}>
                <MainLayout navItems={getNavItems()}/>
            </LocationProvider>
        );
    }
}

export default App;
