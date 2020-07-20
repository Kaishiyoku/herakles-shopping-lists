import React from 'react';
import get from '../../request/get';
import merge from '../../core/merge';
import trans from '../../i18n/trans';
import {slugify} from 'transliteration';

class ShoppingListsPage extends React.PureComponent {
    state = {
        shoppingLists: [],
    };

    componentDidMount() {
        get('/shopping_lists').then((response) => {
            this.setState((prevState, props) => {
                return merge(prevState, {shoppingLists: response.data});
            })
        });
    }

    render() {
        return (
            <ul>
                {this.state.shoppingLists.map((shoppingList) => <li key={slugify(shoppingList.name)}>{shoppingList.name}</li>)}
            </ul>
        );
    }
}

export default ShoppingListsPage;
