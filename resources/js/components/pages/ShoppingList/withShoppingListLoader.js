import React from 'react';
import get from '../../../request/get';
import merge from '../../../core/merge';
import withErrorCodeRenderer from '../../withErrorCodeRenderer';
import {compose} from 'ramda';
import noop from '../../../core/noop';
import {concat} from 'ramda';

function withShoppingListLoader(WrappedComponent) {
    return class extends React.PureComponent {
        state = {
            data: {
                // eslint-disable-next-line camelcase
                shopping_list_entries: [],
                users: [],
            },
            errorStatusCode: null,
            isLoading: true,
        };

        componentDidMount() {
            this.loadData();
        }

        loadData = (callback = noop) => {
            this.setState((prevState, props) => {
                return merge(prevState, {isLoading: true});
            }, () => {
                this.sendRequest(callback);
            });
        };

        sendRequest = (callback = noop) => {
            get(`/shopping_lists/${this.props.id}`).then(({data}) => {
                this.setState((prevState, props) => {
                    return merge(prevState, {data, isLoading: false});
                }, callback);
            }).catch((error) => {
                this.setState((prevState, props) => {
                    return merge(prevState, {errorStatusCode: error.response.status});
                }, callback);
            });
        };

        updateShoppingListEntry = (shoppingListEntry) => {
            this.sendRequest();
        };

        render() {
            const {isLoading, data, errorStatusCode} = this.state;
            const additionalProps = {data, dataEntryUpdaterFn: this.updateShoppingListEntry, dataLoaderFn: this.loadData, errorStatusCode, isLoading};

            return <WrappedComponent {...this.props} {...additionalProps}/>;
        }
    };
}

export default compose(withShoppingListLoader, withErrorCodeRenderer);
