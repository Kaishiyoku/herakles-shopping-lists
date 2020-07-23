import React from 'react';
import get from '../../../request/get';
import merge from '../../../core/merge';
import {slugify} from 'transliteration';
import trans from '../../../i18n/trans';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Link} from '@reach/router';
import Skeleton from '@material-ui/lab/Skeleton';
import {length, range} from 'ramda';
import {navigate} from '../../../core/routerHistory';
import withFade from '../../core/withFade';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import formatNumberExceeds from '../../../core/formatNumberExceeds';

class ShoppingListsPage extends React.PureComponent {
    state = {
        isLoading: true,
        shoppingLists: [],
    };

    componentDidMount() {
        get('/shopping_lists').then(({data}) => {
            this.setState((prevState, props) => {
                return merge(prevState, {isLoading: false, shoppingLists: data});
            });
        });
    }

    renderShoppingLists() {
        if (this.state.isLoading) {
            return range(0, 5).map((i) => <ListItem key={i} animation="wave"><Skeleton animation="wave" width="100%"/></ListItem>);
        }

        return this.state.shoppingLists.map(({name, id, shopping_list_entries: shoppingListEntries}, i) => (
            <div key={slugify(`${name}-${id}`)}>
                <ListItem button component={Link} to={`/shopping_lists/${id}`}>
                    <ListItemAvatar>
                        <Avatar>
                            {formatNumberExceeds(99, length(shoppingListEntries))}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={name}/>
                </ListItem>
                {i < (length(this.state.shoppingLists) - 1) && <Divider variant="inset"/>}
            </div>
        ));
    }

    render() {
        return (
            <>
                <p>
                    <Button variant="outlined" color="primary" onClick={() => navigate('/shopping_lists/create')}>
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

export default withFade(ShoppingListsPage);
