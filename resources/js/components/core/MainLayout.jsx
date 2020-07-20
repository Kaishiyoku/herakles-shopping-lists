import React, {useRef} from 'react';
import config from '../../config';
import {Layout, useLayoutNavigation} from '@react-md/layout';
import {Link, Redirect, Router, useLocation} from '@reach/router';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import {ENTER, useCrossFade} from '@react-md/transition';
import {useAddMessage} from '@react-md/alert';
import useObservable from './useObservable';
import toast$ from '../../rx/toast$';
import ErrorDialog from './ErrorDialog';
import LogoutPage from '../pages/LogoutPage';
import PropTypes from 'prop-types';
import ShoppingListsPage from '../pages/ShoppingListsPage';
import ShoppingListDetailPage from '../pages/ShoppingListDetailPage';
import HomePage from '../pages/HomePage';

const PlaceholderComponent = ({children}) => children;

const MainLayout = ({navItems}) => {
    const addMessage = useAddMessage();
    const {pathname} = useLocation();
    const [_rendered, transitionProps, dispatch] = useCrossFade();
    const prevPathname = useRef(pathname);

    useObservable(toast$, null, addMessage);

    if (pathname !== prevPathname.current) {
        prevPathname.current = pathname;
        dispatch(ENTER);
    }

    return (
        <>
            <ErrorDialog/>

            <Layout
                title={config.appTitle}
                navHeaderTitle={config.navTitle}
                treeProps={useLayoutNavigation(navItems, pathname, Link)}
                mainProps={transitionProps}
            >
                <Router>
                    <PlaceholderComponent path="/">
                        <ShoppingListsPage path="/"/>
                        <ShoppingListDetailPage path="/shopping_lists/:id"/>
                    </PlaceholderComponent>

                    <LoginPage path="/login"/>
                    <LogoutPage path="/logout"/>
                    <NotFoundPage default/>
                </Router>
            </Layout>
        </>
    );
};

MainLayout.propTypes = {
    navItems: PropTypes.object.isRequired,
};

export default MainLayout;
