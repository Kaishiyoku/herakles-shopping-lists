import React from 'react';
import DefaultGrid from '../core/DefaultGrid';
import get from '../../request/get';
import merge from '../../core/merge';
import {Text} from '@react-md/typography';

class ShoppingListDetailPage extends React.PureComponent {
    state = {
        shoppingList: {},
    };

    componentDidMount() {
        get(`/shopping_lists/${this.props.id}`).then(({data}) => {
            this.setState((prevState, props) => {
                return merge(prevState, {shoppingList: data});
            });
        });
    }

    render() {
        return (
            <DefaultGrid>
                <Text type="headline-3">{this.state.shoppingList.name}</Text>
            </DefaultGrid>
        );
    }
}

export default ShoppingListDetailPage;
