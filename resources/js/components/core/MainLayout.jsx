import React, {useRef} from 'react';
import config from '../../config';
import {Layout, useLayoutNavigation} from '@react-md/layout';
import {Link, Router, useLocation} from '@reach/router';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import {ENTER, useCrossFade} from '@react-md/transition';
import {useAddMessage} from '@react-md/alert';
import useObservable from './useObservable';
import toast$ from '../../rx/toast$';
import ErrorDialog from './ErrorDialog';
import getNavItems from '../../core/navigation/getNavItems';
import LogoutPage from '../pages/LogoutPage';
import isAuthorized from '../../authorization/isAuthorized';

const MainLayout = () => {
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
                treeProps={useLayoutNavigation(getNavItems(), pathname, Link)}
                mainProps={transitionProps}
            >
                <Router>
                    <HomePage path="/"/>
                    <LoginPage path="/login"/>
                    <LogoutPage path="/logout"/>
                    <NotFoundPage default/>
                </Router>
            </Layout>
        </>
    );
};

export default MainLayout;
