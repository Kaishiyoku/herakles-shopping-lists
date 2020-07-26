import React from 'react';
import {Router} from '@reach/router';
import MainTheme from './MainTheme';
import getRoutes from '../../core/getRoutes';

const MainLayout = () => {
    return (
        <MainTheme>
            <Router>
                {getRoutes()}
            </Router>
        </MainTheme>
    );
};

export default MainLayout;
