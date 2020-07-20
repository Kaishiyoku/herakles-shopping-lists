import React from 'react';
import clearApiToken from '../../authorization/clearApiToken';
import addToastMessage from '../../core/addToastMessage';
import trans from '../../i18n/trans';
import {navigate} from '../../core/routerHistory';

class LogoutPage extends React.PureComponent {
    componentDidMount() {
        this.handleLogout();
    }

    handleLogout() {
        clearApiToken();

        addToastMessage(trans('logout.success'));

        this.props.navigate('/');
    }

    render() {
        return <></>;
    }
}

export default LogoutPage;
