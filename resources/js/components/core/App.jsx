import React from 'react';
import {createHistory, LocationProvider} from '@reach/router';
import {Configuration} from '@react-md/layout';
import MainLayout from './MainLayout';
import {MessageQueue} from '@react-md/alert';
import {history} from '../../core/routerHistory';

const App = () => {
    return (
        <LocationProvider history={history}>
            <Configuration>
                <MessageQueue id="main-alerts">
                    <MainLayout/>
                </MessageQueue>
            </Configuration>
        </LocationProvider>
    );
};

export default App;
