import React from 'react';
import trans from '../../i18n/trans';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import createNavItem from './createNavItem';
import createDivider from './createDivider';
import createNavItemList from './createNavItemList';

const getAuthorizedNavItems = () => (
    <>
        {
            [
                createNavItemList('nav-1', [
                    createNavItem('/', trans('nav.home'), <HomeIcon/>),
                ]),
                createDivider('divider-1'),
                createNavItemList('nav-2', [
                    createNavItem('/logout', trans('nav.logout'), <ExitToAppIcon/>),
                ]),
            ]
        }
    </>
);

export default getAuthorizedNavItems;
