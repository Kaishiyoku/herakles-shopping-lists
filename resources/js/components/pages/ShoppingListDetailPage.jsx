import React from 'react';
import get from '../../request/get';
import merge from '../../core/merge';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

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

    render() {
        const {isLoading} = this.state;

        return (
            <>
                <Typography variant="h3" gutterBottom>
                    {isLoading ? <Skeleton animation="wave" width="30%"/> : this.state.shoppingList.name}
                </Typography>
            </>
        );
    }
}

export default ShoppingListDetailPage;
