import React from 'react';
import {Router} from '@reach/router';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import LogoutPage from '../pages/LogoutPage';
import PropTypes from 'prop-types';
import ShoppingListsPage from '../pages/ShoppingListsPage';
import ShoppingListDetailPage from '../pages/ShoppingListDetailPage';
import ShoppingListCreatePage from '../pages/ShoppingListCreatePage';
import MainTheme from './MainTheme';

const PlaceholderComponent = ({children}) => children;

const MainLayout = ({navItems}) => {
    /*const addMessage = useAddMessage();
    const {pathname} = useLocation();
    const [_rendered, transitionProps, dispatch] = useCrossFade();
    const prevPathname = useRef(pathname);

    useObservable(toast$, null, addMessage);

    if (pathname !== prevPathname.current) {
        prevPathname.current = pathname;
        dispatch(ENTER);
    }*/

    return (
        <MainTheme>
            <Router>
                <PlaceholderComponent path="/">
                    <ShoppingListsPage path="/"/>
                    <ShoppingListCreatePage path="/shopping_lists/create"/>
                    <ShoppingListDetailPage path="/shopping_lists/:id"/>
                </PlaceholderComponent>

                <LoginPage path="/login"/>
                <LogoutPage path="/logout"/>
                <NotFoundPage default/>
            </Router>
        </MainTheme>
    );
};

MainLayout.propTypes = {
    navItems: PropTypes.object.isRequired,
};

export default MainLayout;
