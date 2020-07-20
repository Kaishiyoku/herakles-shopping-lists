import React from 'react';
import alert$ from '../../rx/alert$';
import merge from '../../core/merge';
import {Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter} from '@react-md/dialog';
import trans from '../../i18n/trans';
import {Text} from '@react-md/typography';
import {Button} from '@react-md/button';

class ErrorDialog extends React.PureComponent {
    state = {
        isVisible: false,
        text: '',
    };

    componentDidMount() {
        alert$.subscribe({
            next: (v) => {
                this.handleShowErrorDialog(v);
            },
        });
    }

    handleShowErrorDialog = (text) => {
        this.setState((prevState, props) => {
            return merge(prevState, {isVisible: true, text});
        });
    };

    handleHideErrorDialog = () => {
        this.setState((prevState, props) => {
            return merge(prevState, {isVisible: false, text: ''});
        });
    };

    render() {
        return (
            <Dialog
                id="error-dialog"
                visible={this.state.isVisible}
                onRequestClose={this.handleHideErrorDialog}
                aria-labelledby="error-dialog-title"
            >
                <DialogHeader>
                    <DialogTitle id="error-dialog-title">{trans('common.error')}</DialogTitle>
                </DialogHeader>
                <DialogContent>
                    <Text margin="none">{this.state.text}</Text>
                </DialogContent>
                <DialogFooter>
                    <Button id="error-dialog-close" onClick={this.handleHideErrorDialog}>
                        {trans('common.close')}
                    </Button>
                </DialogFooter>
            </Dialog>
        );
    }
}

export default ErrorDialog;
