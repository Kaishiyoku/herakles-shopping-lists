import React from 'react';
import get from '../../request/get';
import merge from '../../core/merge';
import {slugify} from 'transliteration';
import {List, ListItem} from "@react-md/list";
import DefaultGrid from '../core/DefaultGrid';
import {Link} from '@reach/router';
import {navigate} from '../../core/routerHistory';

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

    handleShoppingListItemClick = (id) => {
        this.props.navigate(`/shopping_lists/${id}`);
    };

    render() {
        return (
            <DefaultGrid>
                <List className="elevation-1">
                    {this.state.shoppingLists.map((shoppingList) => (
                        <ListItem key={slugify(shoppingList.name)} onClick={() => this.handleShoppingListItemClick(shoppingList.id)}>
                            {shoppingList.name}
                        </ListItem>
                    ))}
                </List>
            </DefaultGrid>
        );
    }
}

export default ShoppingListsPage;
