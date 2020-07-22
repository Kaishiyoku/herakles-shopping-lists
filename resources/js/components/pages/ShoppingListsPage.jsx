import React from 'react';
import get from '../../request/get';
import merge from '../../core/merge';
import {slugify} from 'transliteration';
import trans from '../../i18n/trans';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Link} from '@reach/router';
import Skeleton from '@material-ui/lab/Skeleton';
import {range} from 'ramda';

class ShoppingListsPage extends React.PureComponent {
    state = {
        isLoading: true,
        shoppingLists: [],
    };

    componentDidMount() {
        get('/shopping_lists').then((response) => {
            this.setState((prevState, props) => {
                return merge(prevState, {isLoading: false, shoppingLists: response.data});
            });
        });
    }

    renderShoppingLists() {
        if (this.state.isLoading) {
            return range(0, 5).map((i) => <ListItem key={i} animation="wave"><Skeleton animation="wave" width="100%"/></ListItem>);
        }

        return this.state.shoppingLists.map(({name, id}) => (
            <ListItem button key={slugify(`${name}-${id}`)} component={Link} to={`/shopping_lists/${id}`}>
                {name}
            </ListItem>
        ));
    }

    render() {
        return (
            <>
                <p>
                    <Button variant="outlined" color="primary" onClick={() => this.props.navigate('/shopping_lists/create')}>
                        {trans('shoppingLists.create.title')}
                    </Button>
                </p>

                <Paper>
                    <List>
                        {this.renderShoppingLists()}
                    </List>
                </Paper>
            </>
        );
    }
}

export default ShoppingListsPage;
