import React from 'react';
import PropTypes from 'prop-types';
import getErrorStatusCodeComponent from '../getErrorStatusCodeComponent';

function withErrorCodeRenderer(WrappedComponent) {
    return class extends React.PureComponent {
        static propTypes = {
            errorStatusCode: PropTypes.number,
        };

        render() {
            const Component = getErrorStatusCodeComponent(this.props.errorStatusCode) || WrappedComponent;

            return <Component {...this.props}/>;
        }
    };
}

export default withErrorCodeRenderer;
