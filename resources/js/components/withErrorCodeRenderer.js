import React from 'react';
import PropTypes from 'prop-types';
import UnauthorizedAccessPage from './pages/UnauthorizedAccessPage';
import NotFoundPage from './pages/NotFoundPage';
import {prop} from 'ramda';

function withErrorCodeRenderer(WrappedComponent) {
    return class extends React.PureComponent {
        static propTypes = {
            errorStatusCode: PropTypes.number,
        };

        render() {
            const {errorStatusCode} = this.props;

            const renderComponents = {
                [403]: UnauthorizedAccessPage,
                [404]: NotFoundPage,
            };

            const Component = prop(errorStatusCode, renderComponents) || WrappedComponent;

            return <Component {...this.props}/>;
        }
    };
}

export default withErrorCodeRenderer;
