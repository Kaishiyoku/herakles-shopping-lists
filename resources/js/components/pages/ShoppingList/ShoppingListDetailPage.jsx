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
import {length} from 'ramda';
import ShoppingListNumberAvatar from './ShoppingListNumberAvatar';
import {withStyles} from '@material-ui/core';

const styles = {
    avatar: {
        marginRight: '10px',
        marginTop: '8px',
    },
};

class ShoppingListDetailPage extends React.PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        isLoading: PropTypes.bool.isRequired,
    };

    deleteShoppingList = () => {
        const {id, name} = this.props.data;

        destroy(`/shopping_lists/${id}`).then(() => {
            this.props.enqueueSnackbar(trans('shoppingLists.destroy.success', {name}));

            navigate('/shopping_lists');
        });
    };

    render() {
        const {isLoading, data, classes} = this.props;
        const {name, shopping_list_entries: shoppingListEntries} = data;

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
                                <ShoppingListNumberAvatar className={classes.avatar}>
                                    {formatNumberExceeds(99, length(shoppingListEntries))}
                                </ShoppingListNumberAvatar>
                            </Grid>
                            <Grid item>
                                <Typography variant="h3" gutterBottom>
                                    {isLoading ? <Skeleton animation="wave" width="30%"/> : name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <AlertDialog
                            buttonTitle="Delete shopping list"
                            buttonComponent={<DeleteButton variant="outlined">{trans('shoppingLists.details.deleteShoppingList')}</DeleteButton>}
                            description={trans('shoppingLists.destroy.confirmation.description', {name})}
                            onConfirm={this.deleteShoppingList}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default withStyles(styles)(withSnackbar(withFade(withShoppingListLoader(ShoppingListDetailPage))));
