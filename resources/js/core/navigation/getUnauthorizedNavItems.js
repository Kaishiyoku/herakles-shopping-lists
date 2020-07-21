import createNavItem from './createNavItem';
import React from 'react';
import trans from '../../i18n/trans';
import createNavItemList from './createNavItemList';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const getUnauthorizedNavItems = () => (
    <>
        {
            [
                createNavItemList('nav-1', [
                    createNavItem('/login', trans('nav.login'), <ExitToAppIcon/>),
                ]),
            ]
        }
    </>
);

export default getUnauthorizedNavItems;
