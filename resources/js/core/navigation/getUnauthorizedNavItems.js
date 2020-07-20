import merge from '../merge';
import createNavItem from './createNavItem';
import {ExitToAppSVGIcon} from '@react-md/material-icons';
import React from 'react';
import trans from '../../i18n/trans';

const getUnauthorizedNavItems = () => merge(
    createNavItem('/login', trans('nav.login'), <ExitToAppSVGIcon/>),
);

export default getUnauthorizedNavItems;
