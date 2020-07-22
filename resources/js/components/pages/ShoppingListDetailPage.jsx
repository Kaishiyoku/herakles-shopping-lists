import React from 'react';
import get from '../../request/get';
import merge from '../../core/merge';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import withFade from '../core/withFade';
import Button from '@material-ui/core/Button';
import AlertDialog from '../core/ConfirmationDialog';
import trans from '../../i18n/trans';
import destroy from '../../request/destroy';
import {navigate} from '../../core/routerHistory';
import {withSnackbar} from 'notistack';

class ShoppingListDetailPage extends React.PureComponent {
    state = {
        isLoading: true,
        shoppingList: {},
    };

    componentDidMount() {
        get(`/shopping_lists/${this.props.id}`).then(({data}) => {
            this.setState((prevState, props) => {
                return merge(prevState, {isLoading: false, shoppingList: data});
            });
        });
    }

    deleteShoppingList = () => {
        destroy(`/shopping_lists/${this.props.id}`).then(() => {
            this.props.enqueueSnackbar(trans('shoppingLists.destroy.success', {name: this.state.shoppingList.name}));

            navigate('/shopping_lists');
        });
    };

    render() {
        const {isLoading} = this.state;

        return (
            <>
                <Typography variant="h3" gutterBottom>
                    {isLoading ? <Skeleton animation="wave" width="30%"/> : this.state.shoppingList.name}
                </Typography>

                <AlertDialog
                    buttonTitle="Delete shopping list"
                    buttonComponent={<Button variant="outlined" color="secondary">{trans('shoppingLists.details.deleteShoppingList')}</Button>}
                    description={trans('shoppingLists.destroy.confirmation.description', {name: this.state.shoppingList.name})}
                    onConfirm={this.deleteShoppingList}
                />
            </>
        );
    }
}

export default withSnackbar(withFade(ShoppingListDetailPage));
