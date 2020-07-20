import React, {useRef} from 'react';
import config from '../../config';
import {Layout, useLayoutNavigation} from '@react-md/layout';
import {Link, Router, useLocation} from '@reach/router';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import {ENTER, useCrossFade} from '@react-md/transition';
import {HomeSVGIcon} from '@react-md/material-icons';

const navItems = {
    '/': {itemId: '/', parentId: null, to: '/', children: 'Home', leftAddon: <HomeSVGIcon/>},
    '/login': {itemId: '/login', parentId: null, to: '/login', children: 'Login'},
};

const MainLayout = () => {
    const {pathname} = useLocation();
    const [_rendered, transitionProps, dispatch] = useCrossFade();
    const prevPathname = useRef(pathname);

    if (pathname !== prevPathname.current) {
        prevPathname.current = pathname;
        dispatch(ENTER);
    }

    return (
        <Layout
            title={config.appTitle}
            navHeaderTitle={config.navTitle}
            treeProps={useLayoutNavigation(navItems, pathname, Link)}
            mainProps={transitionProps}
        >
            <Router>
                <HomePage path="/"/>
                <LoginPage path="/login"/>
                <NotFoundPage default/>
            </Router>
        </Layout>
    );
};

export default MainLayout;
