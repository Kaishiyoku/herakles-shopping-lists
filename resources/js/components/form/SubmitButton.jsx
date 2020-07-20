import React from 'react';
import {Button} from 'react-md';

class SubmitButton extends React.Component {
    render() {
        return (
            <Button type="submit" theme="primary" themeType="contained" disabled={this.props.disabled}>
                {this.props.children}
            </Button>
        );
    }
}

export default SubmitButton;
