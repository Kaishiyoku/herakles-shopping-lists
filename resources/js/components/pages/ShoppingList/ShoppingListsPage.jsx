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
import ShoppingListNumberAvatar from './ShoppingListNumberAvatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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
        const {isLoading, shoppingLists} = this.state;

        if (isLoading) {
            return range(0, 5).map((i) => <Box mb={1} key={i}><Skeleton animation="wave" width="100%"/></Box>);
        }

        if (length(shoppingLists) === 0) {
            return <Typography variant="h5">{trans('shoppingLists.noShoppingListsYet')}</Typography>;
        }

        return (
            <Paper>
                <List>
                    {shoppingLists.map(({name, id, shopping_list_entries: shoppingListEntries}, i) => (
                        <div key={slugify(`${name}-${id}`)}>
                            <ListItem button component={Link} to={`/shopping_lists/${id}`}>
                                <ListItemAvatar>
                                    <ShoppingListNumberAvatar>
                                        {formatNumberExceeds(99, length(shoppingListEntries.filter((shoppingListEntry) => shoppingListEntry.finished_at === null)))}
                                    </ShoppingListNumberAvatar>
                                </ListItemAvatar>
                                <ListItemText primary={name}/>
                            </ListItem>
                            {i < (length(this.state.shoppingLists) - 1) && <Divider variant="inset"/>}
                        </div>
                    ))}
                </List>
            </Paper>
        );
    }

    render() {
        const {isLoading} = this.state;

        return (
            <>
                <p>
                    {isLoading ? <Skeleton animation="wave" width={200} height={40}/> : (
                        <Button variant="outlined" color="primary" onClick={() => navigate('/shopping_lists/create')}>
                            {trans('shoppingLists.create.title')}
                        </Button>
                    )}
                </p>

                {this.renderShoppingLists()}
            </>
        );
    }
}

export default withFade(ShoppingListsPage);
