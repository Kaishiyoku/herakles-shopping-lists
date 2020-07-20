import merge from '../merge';
import createNavItem from './createNavItem';
import {ExitToAppSVGIcon, HomeSVGIcon} from '@react-md/material-icons';
import React from 'react';
import createDivider from './createDivider';

const authorizedNavItems = merge(
    createNavItem('/', 'Home', <HomeSVGIcon/>),
    createDivider('divider-1'),
    createNavItem('/logout', 'Logout', <ExitToAppSVGIcon/>),
)

export default authorizedNavItems;
