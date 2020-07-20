import React from 'react';
import isAuthorized from '../../authorization/isAuthorized';

class HomePage extends React.PureComponent {
    componentDidMount() {
        const uri = isAuthorized() ? '/shopping_lists' : '/login';

        this.props.navigate(uri);
    }

    render() {
        return <></>;
    }
}

export default HomePage;
