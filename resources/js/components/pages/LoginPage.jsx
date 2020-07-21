import React from 'react';
import merge from '../../core/merge';
import setApiToken from '../../authorization/setApiToken';
import trans from '../../i18n/trans';
import post from '../../request/post';
import Button from '@material-ui/core/Button';
import makeValidateSyncWithTranslations from '../../core/makeValidateSyncWithTranslations';
import * as yup from 'yup';
import {Form} from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import {TextField} from 'mui-rff';
import {withSnackbar} from 'notistack';

class LoginPage extends React.PureComponent {
    state = {
        canSubmit: false,
        isLoading: false,
    };

    enableSubmitButton = () => {
        this.setState({canSubmit: true});
    };

    disableSubmitButton = () => {
        this.setState({canSubmit: false});
    };

    handleSubmit = (model) => {
        this.setState((prevState, props) => {
            return merge(prevState, {isLoading: true});
        }, () => this.sendLoginRequest(model));
    };

    sendLoginRequest(model) {
        post('/login', model).then((response) => {
            setApiToken(response.data.api_token);

            this.props.enqueueSnackbar(trans('login.success'));

            this.props.navigate('/');
        }).catch((error) => {
            this.props.enqueueSnackbar(trans('login.error'), {variant: 'error'});
        }).finally(() => {
            this.setState((prevState, props) => {
                return merge(prevState, {isLoading: false});
            });
        });
    }

    static formValidationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    renderForm() {
        const validate = makeValidateSyncWithTranslations(LoginPage.formValidationSchema);

        return (
            <Form
                onSubmit={this.handleSubmit}
                initialValues={{}}
                validate={validate}
                render={({handleSubmit, values, submitting, pristine, invalid}) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container direction="column" alignContent="stretch" justify="space-between" spacing={4}>
                            <Grid item>
                                <TextField type="email" label={trans('validation.attributes.email')} name="email" required={true}/>
                            </Grid>

                            <Grid item>
                                <TextField type="password" label={trans('validation.attributes.password')} name="password" required={true}/>
                            </Grid>

                            <Grid item>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={submitting || pristine || invalid || this.state.isLoading}
                                >
                                    {trans('login.title')}
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
                <h1>{trans('login.title')}</h1>

                {this.renderForm()}
            </>
        );
    }
}

export default withSnackbar(LoginPage);
