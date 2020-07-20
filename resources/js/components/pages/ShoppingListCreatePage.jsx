import React from 'react';
import {Text} from '@react-md/typography';
import merge from '../../core/merge';
import post from '../../request/post';
import setApiToken from '../../authorization/setApiToken';
import addToastMessage from '../../core/addToastMessage';
import trans from '../../i18n/trans';
import alert$ from '../../rx/alert$';
import TextInput from '../form/TextInput';
import ProgressSubmitButton from '../form/ProgressSubmitButton';
import Formsy from 'formsy-react';

class ShoppingListCreatePage extends React.PureComponent {
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
        }, () => this.sendCreateRequest(model));
    };

    sendCreateRequest(model) {
        post('/shopping_lists', model).then((response) => {
            addToastMessage(trans('shoppingLists.create.success'));

            this.props.navigate('/');
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
                <Text type="headline-3">{trans('shoppingLists.create.title')}</Text>

                <TextInput
                    label={trans('validation.attributes.name')}
                    name="name"
                    // validations=""
                    validationError="This is not a valid name"
                    required
                />

                <ProgressSubmitButton disabled={!this.state.canSubmit} isLoading={this.state.isLoading}>
                    {trans('common.create')}
                </ProgressSubmitButton>
            </Formsy>
        );
    }
}

export default ShoppingListCreatePage;
