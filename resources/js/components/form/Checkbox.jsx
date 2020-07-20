import React from 'react';
import {withFormsy} from 'formsy-react';
import {Checkbox as BaseCheckbox, FormMessage} from '@react-md/form';
import {Visible} from 'somereactcomponents';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);

        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        this.props.setValue(event.currentTarget.checked);
    }

    render() {
        const {id, name, label, checkboxValue, value, errorMessage, ...otherProps} = this.props;

        return (
            <div>
                <BaseCheckbox
                    type="checkbox"
                    id={id}
                    name={name}
                    label={label}
                    value={checkboxValue}
                    checked={value === true}
                    onChange={this.changeValue}
                    error={errorMessage !== null}

                />

                <Visible when={errorMessage !== null}>
                    <FormMessage id={`${name}-message`} error>
                        {errorMessage}
                    </FormMessage>
                </Visible>
            </div>
        );
    }
}

export default withFormsy(Checkbox);
