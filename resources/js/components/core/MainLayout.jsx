import React from 'react';
import {Router} from '@reach/router';
import PropTypes from 'prop-types';
import MainTheme from './MainTheme';
import getRoutes from '../../core/getRoutes';

const MainLayout = ({navItems}) => {
    return (
        <MainTheme>
            <Router>
                {getRoutes()}
            </Router>
        </MainTheme>
    );
};

// eslint-disable-next-line fp/no-mutation
MainLayout.propTypes = {
    navItems: PropTypes.object.isRequired,
};

export default MainLayout;
