import React from 'react';
import DefaultGrid from '../core/DefaultGrid';
import merge from '../../core/merge';
import setApiToken from '../../authorization/setApiToken';
import addToastMessage from '../../core/addToastMessage';
import trans from '../../i18n/trans';
import alert$ from '../../rx/alert$';
import Formsy from 'formsy-react';
import TextInput from '../form/TextInput';
import ProgressSubmitButton from '../form/ProgressSubmitButton';
import post from '../../request/post';
import {navigate} from '../../core/routerHistory';

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

            addToastMessage(trans('login.success'));

            navigate('/');
        }).catch((error) => {
            alert$.next(error.toString());
        }).finally(() => {
            this.setState((prevState, props) => {
                return merge(prevState, {isLoading: false});
            });
        });
    }

    render() {
        return (
            <Formsy
                onValidSubmit={this.handleSubmit}
                onValid={this.enableSubmitButton}
                onInvalid={this.disableSubmitButton}
                className="form-1-1-1-1"
            >
                <h1>{trans('login.title')}</h1>

                <TextInput
                    label={trans('validation.attributes.email')}
                    name="email"
                    validations="isEmail"
                    validationError="This is not a valid email"
                    required
                />

                <TextInput
                    label={trans('validation.attributes.password')}
                    type="password"
                    name="password"
                    required
                />

                <ProgressSubmitButton disabled={!this.state.canSubmit} isLoading={this.state.isLoading}>
                    {trans('login.title')}
                </ProgressSubmitButton>
            </Formsy>
        );
    }
}

export default LoginPage;
