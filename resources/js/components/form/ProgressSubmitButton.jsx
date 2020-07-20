import React from 'react';
import SubmitButton from './SubmitButton';
import {CircularProgress} from 'react-md';

class ProgressSubmitButton extends React.Component {
    static defaultProps = {
        isLoading: false,
    };

    renderChildren() {
        const {isLoading, children} = this.props;

        return isLoading ? (
            <div className="flex">
                <CircularProgress id="progress-submit-button" className="loading-button-progress"/>
                {children}
            </div>
        ) : children;
    }

    render() {
        const {disabled, isLoading} = this.props;

        return (
            <SubmitButton disabled={disabled || isLoading}>
                {this.renderChildren()}
            </SubmitButton>
        );
    }
}

export default ProgressSubmitButton;
