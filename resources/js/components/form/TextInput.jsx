import React from 'react';
import {withFormsy} from 'formsy-react';
import {TextField} from 'react-md';
import {FormMessage} from '@react-md/form';
import {Visible} from 'somereactcomponents';

class TextInput extends React.Component {
    static defaultProps = {
        type: 'text',
    };

    constructor(props) {
        super(props);

        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        this.props.setValue(event.currentTarget.value);
    }

    render() {
        const {type, name, label, value, errorMessage, ...otherProps} = this.props;

        return (
            <div>
                <TextField
                    type={type}
                    id={name}
                    name={name}
                    label={label}
                    onChange={this.changeValue}
                    value={value || ''}
                    error={errorMessage !== null}
                    autoComplete="off"

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

export default withFormsy(TextInput);
