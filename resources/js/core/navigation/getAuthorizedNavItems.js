import merge from '../merge';
import createNavItem from './createNavItem';
import {ExitToAppSVGIcon, HomeSVGIcon} from '@react-md/material-icons';
import React from 'react';
import createDivider from './createDivider';
import trans from '../../i18n/trans';

const getAuthorizedNavItems = () => merge(
    createNavItem('/', trans('nav.home'), <HomeSVGIcon/>),
    createDivider('divider-1'),
    createNavItem('/logout', trans('nav.logout'), <ExitToAppSVGIcon/>),
);

export default getAuthorizedNavItems;
