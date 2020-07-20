import React from 'react';
import {createHistory, LocationProvider} from '@reach/router';
import {Configuration} from '@react-md/layout';
import MainLayout from './MainLayout';

const App = () => {
    return (
        <LocationProvider history={createHistory(window)}>
            <Configuration>
                <MainLayout/>
            </Configuration>
        </LocationProvider>
    );
};

export default App;
