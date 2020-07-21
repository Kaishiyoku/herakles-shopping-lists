import React from 'react';
import merge from '../../core/merge';
import post from '../../request/post';
import trans from '../../i18n/trans';
import get from '../../request/get';
import {range} from 'ramda';
import Typography from '@material-ui/core/Typography';
import {Form} from 'react-final-form';
import {Checkboxes, TextField} from 'mui-rff';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import Skeleton from '@material-ui/lab/Skeleton';
import makeValidateSyncWithTranslations from '../../core/makeValidateSyncWithTranslations';
import {withSnackbar} from 'notistack';

class ShoppingListCreatePage extends React.PureComponent {
    state = {
        canSubmit: false,
        isLoading: true,
        isUserSharingPanelExpanded: false,
        users: [],
    };

    componentDidMount() {
        get('/users').then(({data}) => {
            this.setState((prevState, props) => {
                return merge(prevState, {isLoading: false, users: data});
            });
        });
    }

    enableSubmitButton = () => {
        this.setState({canSubmit: true});
    };

    disableSubmitButton = () => {
        this.setState({canSubmit: false});
    };

    handleSubmit = (model) => {
        this.setState((prevState, props) => {
            return merge(prevState, {isLoading: true});
        }, () => this.sendCreateRequest(model));
    };

    sendCreateRequest(model) {
        post('/shopping_lists', model).then((response) => {
            this.props.enqueueSnackbar(trans('shoppingLists.create.success'));

            this.props.navigate('/');
        }).catch((error) => {
            this.props.enqueueSnackbar(trans('shoppingLists.create.error'), {variant: 'error'});
        }).finally(() => {
            this.setState((prevState, props) => {
                return merge(prevState, {isLoading: false});
            });
        });
    }

    getShareWithUsersCheckboxData() {
        return this.state.users.map((user) => {
            return {label: user.name, value: user.id};
        });
    }

    static formValidationSchema = Yup.object().shape({
        name: Yup.string().required(),
    });

    renderForm() {
        const validate = makeValidateSyncWithTranslations(ShoppingListCreatePage.formValidationSchema);

        return (
            <Form
                onSubmit={this.handleSubmit}
                initialValues={{}}
                validate={validate}
                render={({handleSubmit, values, submitting, pristine, invalid}) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container direction="column" alignContent="stretch" justify="space-between" spacing={4}>
                            <Grid item>
                                <TextField label={trans('validation.attributes.name')} name="name" required={true}/>
                            </Grid>

                            <Grid item>
                                {
                                    this.state.isLoading
                                        ? range(0, 5).map((i) => <Skeleton key={i} animation="wave" width="30%"/>)
                                        : <Checkboxes
                                            label={trans('shoppingLists.create.shareWithUsers')}
                                            name="user_ids"
                                            data={this.getShareWithUsersCheckboxData()}
                                        />
                                }
                            </Grid>

                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={submitting || pristine || invalid || this.state.isLoading}
                                >
                                    {trans('common.create')}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        );
    }

    render() {
        return (
            <>
                <Typography variant="h3" gutterBottom>
                    {trans('shoppingLists.create.title')}
                </Typography>

                {this.renderForm()}
            </>
        );
    }
}

export default withSnackbar(ShoppingListCreatePage);
