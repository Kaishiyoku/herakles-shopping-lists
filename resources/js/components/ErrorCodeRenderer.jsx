import getErrorStatusCodeComponent from '../getErrorStatusCodeComponent';
import React from 'react';
import PropTypes from 'prop-types';

class ErrorCodeRenderer extends React.PureComponent {
    static propTypes = {
        errorStatusCode: PropTypes.number,
    };

    render() {
        const {errorStatusCode, children} = this.props;

        const Component = getErrorStatusCodeComponent(errorStatusCode);

        return Component ? <Component {...this.props}/> : children;
    }
}

export default ErrorCodeRenderer;
