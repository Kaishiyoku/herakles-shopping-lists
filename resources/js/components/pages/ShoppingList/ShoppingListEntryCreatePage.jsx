import React from 'react';
import merge from '../../../core/merge';
import post from '../../../request/post';
import trans from '../../../i18n/trans';
import get from '../../../request/get';
import {Form} from 'react-final-form';
import {TextField} from 'mui-rff';
import * as Yup from 'yup';
import makeValidateSyncWithTranslations from '../../../core/makeValidateSyncWithTranslations';
import {withSnackbar} from 'notistack';
import withFade from '../../core/withFade';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class ShoppingListEntryCreatePage extends React.PureComponent {
    state = {
        isLoading: true,
        isSubmitting: false,
    };

    static propTypes = {
        handleSuccess: PropTypes.func.isRequired,
        shoppingListId: PropTypes.number.isRequired,
        submitButtonRef: PropTypes.object.isRequired,
    };

    componentDidMount() {
        get('/users').then(({data}) => {
            this.setState((prevState, props) => {
                return merge(prevState, {isLoading: false, users: data});
            });
        });
    }

    handleSubmit = (model) => {
        this.setState((prevState, props) => {
            return merge(prevState, {isSubmitting: true});
        }, () => this.sendCreateRequest(model));
    };

    sendCreateRequest(model) {
        const {shoppingListId, handleSuccess} = this.props;

        post(`/shopping_lists/${shoppingListId}/shopping_list_entries`, model).then(({data}) => {
            const action = (key) => (
                <Button color="secondary" onClick={() => this.props.closeSnackbar(key)}>{trans('common.close')}</Button>
            );

            handleSuccess(() => this.props.enqueueSnackbar(trans('shoppingLists.createEntry.success'), {action}));
        }).catch((error) => {
            this.props.enqueueSnackbar(trans('shoppingLists.createEntry.error'), {variant: 'error'});
        }).finally(() => {
            this.setState((prevState, props) => {
                return merge(prevState, {isSubmitting: false});
            });
        });
    }

    static formValidationSchema = Yup.object().shape({
        description: Yup.string().required(),
    });

    handleSubmitButtonRef = (invalid) => {
        if (this.props.submitButtonRef.current) {
            const isCurrentlyInvalid = this.props.submitButtonRef.current.hasAttribute('disabled');

            if (isCurrentlyInvalid !== invalid) {
                if (invalid) {
                    this.props.submitButtonRef.current.setAttribute('disabled', true);
                    this.props.submitButtonRef.current.classList.add('Mui-disabled');
                } else {
                    this.props.submitButtonRef.current.removeAttribute('disabled');
                    this.props.submitButtonRef.current.classList.remove('Mui-disabled');
                }
            }
        }
    };

    renderForm() {
        const validate = makeValidateSyncWithTranslations(ShoppingListEntryCreatePage.formValidationSchema);

        return (
            <>
                <Form
                    onSubmit={this.handleSubmit}
                    initialValues={{}}
                    validate={validate}
                    render={({handleSubmit, values, submitting, pristine, invalid}) => {
                        this.handleSubmitButtonRef(invalid);

                        return (
                            <form id="entryCreateForm" onSubmit={handleSubmit} noValidate>
                                <TextField
                                    label={trans('validation.attributes.description')}
                                    name="description"
                                    required={true}
                                />
                            </form>
                        );
                    }}
                />
            </>
        );
    }

    render() {
        return (
            <>
                <Box m={2}>
                    {this.renderForm()}
                </Box>
            </>
        );
    }
}

export default withSnackbar(withFade(ShoppingListEntryCreatePage));
