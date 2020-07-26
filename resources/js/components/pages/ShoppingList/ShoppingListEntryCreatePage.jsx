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
import Button from '@material-ui/core/Button';
import FullscreenDialogTransition from '../../core/FullscreenDialogTransition';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import {withStyles} from '@material-ui/core';
import {isEmpty} from 'lodash';
import {navigate} from '../../../core/routerHistory';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';
import ErrorCodeRenderer from '../../ErrorCodeRenderer';
import sequential from '@brianmcallister/sequential-promise';

const styles = (theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        flex: 1,
        marginLeft: theme.spacing(2),
    },
});

class ShoppingListEntryCreatePage extends React.PureComponent {
    state = {
        errorStatusCode: null,
        isDialogOpen: false,
        isLoading: true,
        isSubmitting: false,
        name: null,
    };

    componentDidMount() {
        const requests = [
            () => get(`/shopping_lists/${this.props.id}`),
            () => get('/users'),
        ];

        sequential(requests)
            .then(([shoppingListResponse, usersResponse]) => {
                this.setState((prevState, props) => {
                    return merge(prevState, {isDialogOpen: true, isLoading: false, users: usersResponse.data});
                });
            })
            .catch((error) => {
                this.setState((prevState, props) => {
                    return merge(prevState, {errorStatusCode: error.response.status});
                });
            });
    }

    handleSubmit = (model) => {
        this.setState((prevState, props) => {
            return merge(prevState, {isSubmitting: true});
        }, () => this.sendCreateRequest(model));
    };

    sendCreateRequest(model) {
        const {id} = this.props;

        post(`/shopping_lists/${id}/shopping_list_entries`, model).then(({data}) => {
            this.setState((prevState, props) => {
                return merge(prevState, {isCreateEntryDialogOpen: false});
            }, () => {
                const action = (key) => (
                    <Button color="secondary" onClick={() => this.props.closeSnackbar(key)}>{trans('common.close')}</Button>
                );

                this.props.enqueueSnackbar(trans('shoppingLists.createEntry.success'), {action});

                this.handleCloseCreateEntryDialog();
            });
        }).catch((error) => {
            this.setState((prevState, props) => {
                return merge(prevState, {errorStatusCode: error.response.status});
            }, () => this.props.enqueueSnackbar(trans('shoppingLists.createEntry.error'), {variant: 'error'}));
        }).finally(() => {
            this.setState((prevState, props) => {
                return merge(prevState, {isSubmitting: false});
            });
        });
    }

    static formValidationSchema = Yup.object().shape({
        description: Yup.string().required(),
    });

    handleNameChange = (event) => {
        const {value} = event.target;

        this.setState((prevState, props) => {
            return merge(prevState, {name: value});
        });
    };

    renderForm() {
        const validate = makeValidateSyncWithTranslations(ShoppingListEntryCreatePage.formValidationSchema);

        return (
            <Form
                onSubmit={this.handleSubmit}
                initialValues={{}}
                validate={validate}
                render={({handleSubmit, values, submitting, pristine, invalid}) => {
                    return (
                        <form id="entryCreateForm" onSubmit={handleSubmit} noValidate>
                            <TextField
                                label={trans('validation.attributes.description')}
                                name="description"
                                required={true}
                                onChangeCapture={this.handleNameChange}
                            />
                        </form>
                    );
                }}
            />
        );
    }

    handleCloseCreateEntryDialog = () => {
        this.setState((prevState, props) => {
            return merge(prevState, {isDialogOpen: false});
        }, () => of(true).pipe(delay(100)).subscribe(() => navigate(`/shopping_lists/${this.props.id}`)));
    };

    render() {
        const {classes} = this.props;
        const {isDialogOpen, name, errorStatusCode} = this.state;

        return (
            <ErrorCodeRenderer errorStatusCode={errorStatusCode}>
                <Dialog fullScreen open={isDialogOpen} onClose={this.handleCloseCreateEntryDialog} TransitionComponent={FullscreenDialogTransition}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="close" onClick={this.handleCloseCreateEntryDialog}>
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                {trans('shoppingLists.createEntry.title')}
                            </Typography>
                            <Button disabled={isEmpty(name)} autoFocus color="inherit" onClick={() => document.getElementById('entryCreateForm').dispatchEvent(new Event('submit', {cancelable: true}))}>
                                {trans('common.create')}
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Box m={2}>
                        {this.renderForm()}
                    </Box>
                </Dialog>
            </ErrorCodeRenderer>
        );
    }
}

export default withStyles(styles)(withSnackbar(withFade(ShoppingListEntryCreatePage)));
