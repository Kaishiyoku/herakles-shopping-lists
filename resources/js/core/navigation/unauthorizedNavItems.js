import merge from '../merge';
import createNavItem from './createNavItem';
import {ExitToAppSVGIcon} from '@react-md/material-icons';
import React from 'react';

const unauthorizedNavItems = merge(
    createNavItem('/login', 'Login', <ExitToAppSVGIcon/>),
)

export default unauthorizedNavItems;
