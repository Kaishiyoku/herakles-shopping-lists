import React from 'react';
import {Router} from '@reach/router';
import PropTypes from 'prop-types';
import MainTheme from './MainTheme';
import getRoutes from '../../core/getRoutes';

const MainLayout = ({navItems}) => {
    /*
    const addMessage = useAddMessage();
    const {pathname} = useLocation();
    const [_rendered, transitionProps, dispatch] = useCrossFade();
    const prevPathname = useRef(pathname);

    useObservable(toast$, null, addMessage);

    if (pathname !== prevPathname.current) {
        prevPathname.current = pathname;
        dispatch(ENTER);
    }
    */

    return (
        <MainTheme>
            <Router>
                {getRoutes()}
            </Router>
        </MainTheme>
    );
};

// eslint-disable-next-line fp/no-mutation
MainLayout.propTypes = {
    navItems: PropTypes.object.isRequired,
};

export default MainLayout;
