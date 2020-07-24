import React from 'react';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import withFade from '../../core/withFade';
import AlertDialog from '../../core/ConfirmationDialog';
import trans from '../../../i18n/trans';
import destroy from '../../../request/destroy';
import {navigate} from '../../../core/routerHistory';
import {withSnackbar} from 'notistack';
import withShoppingListLoader from './withShoppingListLoader';
import PropTypes from 'prop-types';
import DeleteButton from '../../core/DeleteButton';
import Grid from '@material-ui/core/Grid';
import formatNumberExceeds from '../../../core/formatNumberExceeds';
import {length, range} from 'ramda';
import ShoppingListNumberAvatar from './ShoppingListNumberAvatar';
import {withStyles} from '@material-ui/core';
import ShoppingListEntryCreatePage from './ShoppingListEntryCreatePage';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import FullscreenDialogTransition from '../../core/FullscreenDialogTransition';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import merge from '../../../core/merge';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import {slugify} from 'transliteration';
import ListItem from '@material-ui/core/ListItem';
import {Link} from '@reach/router';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import getUserId from '../../../authorization/getUserId';
import Box from '@material-ui/core/Box';

const styles = (theme) => ({
    appBar: {
        position: 'relative',
    },
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
    title: {
        flex: 1,
        marginLeft: theme.spacing(2),
    },
});

class ShoppingListDetailPage extends React.PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        dataLoaderFn: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
    };

    state = {
        isCreateEntryDialogOpen: false,
    };

    constructor(props, context) {
        super(props, context);

        this.createEntrySubmitButtonRef = React.createRef();
    }

    deleteShoppingList = () => {
        const {id, name} = this.props.data;

        destroy(`/shopping_lists/${id}`).then(() => {
            this.props.enqueueSnackbar(trans('shoppingLists.destroy.success', {name}));

            navigate('/shopping_lists');
        });
    };

    handleOpenCreateEntryDialog = () => {
        this.toggleIsCreateEntryDialogOpen(true);
    };

    handleCloseCreateEntryDialog = () => {
        this.toggleIsCreateEntryDialogOpen(false);
    };

    toggleIsCreateEntryDialogOpen = (isCreateEntryDialogOpen) => {
        this.setState((prevState, props) => {
            return merge(prevState, {isCreateEntryDialogOpen});
        });
    };

    handleCreateEntrySuccess = (callback) => {
        this.props.dataLoaderFn(() => {
            this.setState((prevState, props) => {
                return merge(prevState, {isCreateEntryDialogOpen: false});
            }, callback);
        });
    };

    renderEntries() {
        const {data, isLoading} = this.props;
        const {shopping_list_entries: shoppingListEntries} = data;

        if (isLoading) {
            return range(0, 7).map((i) => <Box mb={1} key={i}><Skeleton animation="wave" width="100%"/></Box>);
        }

        if (length(shoppingListEntries) === 0) {
            return <Typography variant="h5">{trans('shoppingLists.details.noEntriesYet')}</Typography>;
        }

        return (
            <Paper>
                <List>
                    {shoppingListEntries.map((shoppingListEntry, i) => (
                        <div key={slugify(`${shoppingListEntry.id}}`)}>
                            <ListItem>
                                <ListItemText primary={shoppingListEntry.description}/>
                            </ListItem>
                            {i < (length(shoppingListEntries) - 1) && <Divider variant="fullWidth"/>}
                        </div>
                    ))}
                </List>
            </Paper>
        );
    }

    renderSharedWith() {
        if (this.props.isLoading) {
            return <p><Skeleton animation="wave" width={200}/></p>;
        }

        return (
            <p>
                {trans('shoppingLists.details.sharedWith')}: {this.props.data.users.filter(({id}) => id !== getUserId()).map(({name}) => name).join(', ')}
            </p>
        );
    }

    render() {
        const {isLoading, data, classes} = this.props;
        const {isCreateEntryDialogOpen} = this.state;
        const {name, shopping_list_entries: shoppingListEntries, users} = data;

        return (
            <>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                {isLoading ? <Skeleton animation="wave" variant="circle" width={45} height={45} className={classes.avatar}/> : <ShoppingListNumberAvatar className={classes.avatar}>{formatNumberExceeds(99, length(shoppingListEntries))}</ShoppingListNumberAvatar>}
                            </Grid>
                            <Grid item>
                                <Typography variant="h3" gutterBottom>
                                    {isLoading ? <Skeleton animation="wave" width={300}/> : name}
                                </Typography>
                            </Grid>
                        </Grid>
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

                {this.renderSharedWith()}

                {this.renderEntries()}

                <Dialog fullScreen open={isCreateEntryDialogOpen} onClose={this.handleCloseCreateEntryDialog} TransitionComponent={FullscreenDialogTransition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleCloseCreateEntryDialog} aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {trans('shoppingLists.createEntry.title')}
                            </Typography>
                            <Button ref={this.createEntrySubmitButtonRef} autoFocus color="inherit" onClick={() => document.getElementById('entryCreateForm').dispatchEvent(new Event('submit', {cancelable: true}))}>
                                {trans('common.create')}
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <ShoppingListEntryCreatePage
                        handleSuccess={this.handleCreateEntrySuccess}
                        shoppingListId={this.props.data.id}
                        submitButtonRef={this.createEntrySubmitButtonRef}
                    />
                </Dialog>

                <Fab color="primary" aria-label="add" className={classes.fab} onClick={this.handleOpenCreateEntryDialog}>
                    <AddIcon/>
                </Fab>
            </>
        );
    }
}

export default withStyles(styles)(withSnackbar(withFade(withShoppingListLoader(ShoppingListDetailPage))));
