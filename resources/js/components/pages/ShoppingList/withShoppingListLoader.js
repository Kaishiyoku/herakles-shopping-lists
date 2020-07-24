import React from 'react';
import get from '../../../request/get';
import merge from '../../../core/merge';
import withErrorCodeRenderer from '../../withErrorCodeRenderer';
import {compose} from 'ramda';

function withShoppingListLoader(WrappedComponent) {
    return class extends React.PureComponent {
        state = {
            data: {
                users: [],
            },
            errorStatusCode: null,
            isLoading: true,
        };

        componentDidMount() {
            get(`/shopping_lists/${this.props.id}`).then(({data}) => {
                this.setState((prevState, props) => {
                    return merge(prevState, {data, isLoading: false});
                });
            }).catch((error) => {
                this.setState((prevState, props) => {
                    return merge(prevState, {errorStatusCode: error.response.status});
                });
            });
        }

        render() {
            const {isLoading, data, errorStatusCode} = this.state;
            const additionalProps = {data, errorStatusCode, isLoading};

            return <WrappedComponent {...this.props} {...additionalProps}/>;
        }
    };
}

export default compose(withShoppingListLoader, withErrorCodeRenderer);
