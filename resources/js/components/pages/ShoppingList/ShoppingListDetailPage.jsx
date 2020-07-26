import React from 'react';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import withFade from '../../core/withFade';
import AlertDialog from '../../core/ConfirmationDialog';
import trans from '../../../i18n/trans';
import destroy from '../../../request/destroy';
import {navigate} from '../../../core/routerHistory';
import {withSnackbar} from 'notistack';
import DeleteButton from '../../core/DeleteButton';
import Grid from '@material-ui/core/Grid';
import formatNumberExceeds from '../../../core/formatNumberExceeds';
import {length, range} from 'ramda';
import ShoppingListNumberAvatar from './ShoppingListNumberAvatar';
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import merge from '../../../core/merge';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import {slugify} from 'transliteration';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import getUserId from '../../../authorization/getUserId';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import put from '../../../request/put';
import noop from '../../../core/noop';
import get from '../../../request/get';
import classNames from 'classnames';
import {grey} from '@material-ui/core/colors';
import {Link} from '@reach/router';
import ErrorCodeRenderer from '../../ErrorCodeRenderer';

const styles = (theme) => ({
    avatar: {
        marginRight: '10px',
        marginTop: '8px',
    },
    fab: {
        bottom: 20,
        left: 'auto',
        margin: 0,
        position: 'fixed',
        right: 20,
        top: 'auto',
    },
    finishedEntry: {
        color: grey[600],
    },
});

class ShoppingListDetailPage extends React.PureComponent {
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

    deleteShoppingList = () => {
        const {id, name} = this.state.data;

        destroy(`/shopping_lists/${id}`).then(() => {
            this.props.enqueueSnackbar(trans('shoppingLists.destroy.success', {name}));

            navigate('/shopping_lists');
        });
    };

    handleShoppingListEntryCheckboxChange = (shoppingListEntry, event) => {
        put(`/shopping_lists/${this.props.id}/shopping_list_entries/${shoppingListEntry.id}/toggle_finished`)
            .then(({data}) => {
                this.setState((prevState, props) => {
                    return merge(prevState, {data});
                });
            });
    };

    cleanUpFinishedEntries = () => {
        put(`/shopping_lists/${this.props.id}/clean_up`)
            .then(() => this.sendRequest(() => this.props.enqueueSnackbar(trans('shoppingLists.details.cleanUpSuccess'))));
    };

    renderEntries() {
        const {data, isLoading} = this.state;
        const {shopping_list_entries: shoppingListEntries} = data;

        if (isLoading) {
            return range(0, 7).map((i) => <Box mb={1} key={i}><Skeleton animation="wave" width="100%"/></Box>);
        }

        if (length(shoppingListEntries) === 0) {
            return <Box mt={5}><Typography variant="h5">{trans('shoppingLists.details.noEntriesYet')}</Typography></Box>;
        }

        return (
            <Box mt={2}>
                <Paper>
                    <List component="div">
                        {shoppingListEntries.map((shoppingListEntry, i) => (
                            <div key={slugify(`${shoppingListEntry.id}`)} className={classNames({[this.props.classes.finishedEntry]: shoppingListEntry.finished_at})}>
                                <ListItem component="div">
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={shoppingListEntry.finished_at !== null}
                                            onChange={(event) => this.handleShoppingListEntryCheckboxChange(shoppingListEntry, event)}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={shoppingListEntry.description}/>
                                </ListItem>
                                {i < (length(shoppingListEntries) - 1) && <Divider variant="inset"/>}
                            </div>
                        ))}
                    </List>
                </Paper>
            </Box>
        );
    }

    renderSharedWith() {
        if (this.state.isLoading) {
            return <p><Skeleton animation="wave" width={200}/></p>;
        }

        const sharedWithUsers = this.state.data.users.filter(({id}) => id !== getUserId());

        if (length(sharedWithUsers) === 0) {
            return null;
        }

        return (
            <p>
                {trans('shoppingLists.details.sharedWith')}: {sharedWithUsers.map(({name}) => name).join(', ')}
            </p>
        );
    }

    render() {
        const {classes} = this.props;
        const {data, isLoading, errorStatusCode} = this.state;
        const {name, shopping_list_entries: shoppingListEntries, users} = data;

        return (
            <ErrorCodeRenderer errorStatusCode={errorStatusCode}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                {isLoading ? <Skeleton animation="wave" variant="circle" width={45} height={45} className={classes.avatar}/> : <ShoppingListNumberAvatar className={classes.avatar}>{formatNumberExceeds(99, length(shoppingListEntries.filter((shoppingListEntry) => shoppingListEntry.finished_at === null)))}</ShoppingListNumberAvatar>}
                            </Grid>
                            <Grid item>
                                <Typography variant="h3" gutterBottom>
                                    {isLoading ? <Skeleton animation="wave" width={300}/> : name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container spacing={1}>
                            <Grid item>
                                {isLoading ? <Skeleton animation="wave" width={150} height={40}/> : (
                                    <Button
                                        variant="outlined"
                                        onClick={this.cleanUpFinishedEntries}
                                        disabled={length(shoppingListEntries.filter((item) => item.finished_at !== null)) === 0}
                                    >
                                        {trans('shoppingLists.details.cleanUpFinishedEntries')}
                                    </Button>
                                )}
                            </Grid>

                            <Grid item>
                                {isLoading ? <Skeleton animation="wave" width={200} height={40}/> : (
                                    <AlertDialog
                                        buttonTitle="Delete shopping list"
                                        buttonComponent={<DeleteButton variant="outlined">{trans('shoppingLists.details.deleteShoppingList')}</DeleteButton>}
                                        description={trans('shoppingLists.destroy.confirmation.description', {name})}
                                        onConfirm={this.deleteShoppingList}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {this.renderSharedWith()}

                {this.renderEntries()}

                <Fab color="primary" aria-label="add" className={classes.fab} component={Link} to={`/shopping_lists/${this.props.id}/create`}>
                    <AddIcon/>
                </Fab>
            </ErrorCodeRenderer>
        );
    }
}

export default withStyles(styles)(withSnackbar(withFade(ShoppingListDetailPage)));
