import React from 'react';
import clearApiToken from '../../authorization/clearApiToken';
import {withSnackbar} from 'notistack';
import trans from '../../i18n/trans';

class LogoutPage extends React.PureComponent {
    componentDidMount() {
        this.handleLogout();
    }

    handleLogout() {
        clearApiToken();

        this.props.enqueueSnackbar(trans('logout.success'));

        this.props.navigate('/');
    }

    render() {
        return <></>;
    }
}

export default withSnackbar(LogoutPage);
