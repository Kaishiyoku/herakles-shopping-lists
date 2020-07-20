import React from 'react';
import {Text} from '@react-md/typography';
import merge from '../../core/merge';
import post from '../../request/post';
import addToastMessage from '../../core/addToastMessage';
import trans from '../../i18n/trans';
import alert$ from '../../rx/alert$';
import TextInput from '../form/TextInput';
import ProgressSubmitButton from '../form/ProgressSubmitButton';
import Formsy from 'formsy-react';
import get from '../../request/get';
import Checkbox from '../form/Checkbox';
import {values} from 'ramda';
import {usePanels, ExpansionPanel} from "@react-md/expansion-panel";

class ShoppingListCreatePage extends React.PureComponent {
    state = {
        canSubmit: false,
        isLoading: false,
        isUserSharingPanelExpanded: false,
        users: [],
    };

    componentDidMount() {
        get('/users').then(({data}) => {
            this.setState((prevState, props) => {
                return merge(prevState, {users: data});
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
        const user_ids = values(model.user_ids.reduce((accum, value, key) => {
            if (value === true) {
                return merge(accum, {[key]: key});
            }

            return accum;
        }, {}));

        const adjustedModel = merge(model, {user_ids});

        post('/shopping_lists', adjustedModel).then((response) => {
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

    toggleUserSharingExpansionPanel = () => {
        this.setState((prevState, props) => {
            return merge(prevState, {isUserSharingPanelExpanded: !prevState.isUserSharingPanelExpanded});
        });
    };

    renderUserCheckboxes() {
        return this.state.users.map((user) => {
            return (
                <Checkbox
                    key={user.id}
                    id={`user_ids_${user.id}`}
                    name={`user_ids[${user.id}]`}
                    label={user.name}
                    checkboxValue={user.id}
                />
            );
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

                <ExpansionPanel
                    id="share-with-users-expansion-panel"
                    header={trans('shoppingLists.create.shareWithUsers')}
                    expanded={this.state.isUserSharingPanelExpanded}
                    onExpandClick={this.toggleUserSharingExpansionPanel}
                >
                    {this.renderUserCheckboxes()}
                </ExpansionPanel>

                <ProgressSubmitButton disabled={!this.state.canSubmit} isLoading={this.state.isLoading}>
                    {trans('common.create')}
                </ProgressSubmitButton>
            </Formsy>
        );
    }
}

export default ShoppingListCreatePage;
