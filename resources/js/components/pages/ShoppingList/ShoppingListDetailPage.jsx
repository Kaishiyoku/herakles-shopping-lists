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
        const {isLoading, data} = this.props;
        const {name, shopping_list_entries: shoppingListEntries} = data;

        return (
            <>
                <Typography variant="h3" gutterBottom>
                    {isLoading ? <Skeleton animation="wave" width="30%"/> : name}
                </Typography>

                <AlertDialog
                    buttonTitle="Delete shopping list"
                    buttonComponent={<DeleteButton variant="outlined">{trans('shoppingLists.details.deleteShoppingList')}</DeleteButton>}
                    description={trans('shoppingLists.destroy.confirmation.description', {name})}
                    onConfirm={this.deleteShoppingList}
                />
            </>
        );
    }
}

export default withSnackbar(withFade(withShoppingListLoader(ShoppingListDetailPage)));
