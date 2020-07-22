import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import merge from '../../core/merge';
import PropTypes from 'prop-types';
import trans from '../../i18n/trans';

class AlertDialog extends React.PureComponent {
    static propTypes = {
        buttonComponent: PropTypes.element.isRequired,
        description: PropTypes.string,
        onConfirm: PropTypes.func.isRequired,
        title: PropTypes.string,
    };

    static defaultProps = {
        description: trans('confirmationDialog.description'),
        title: trans('confirmationDialog.title'),
    };

    state = {
        isOpen: false,
    };

    handleOpen = () => this.setOpen(true);

    handleClose = () => this.setOpen(false);

    handleConfirm = () => {
        this.props.onConfirm();

        this.handleClose();
    };

    setOpen(isOpen) {
        this.setState((prevState, props) => {
            return merge(prevState, {isOpen});
        });
    }

    render() {
        const {title, description, buttonComponent} = this.props;
        const {isOpen} = this.state;

        const button = React.cloneElement(buttonComponent, {onClick: this.handleOpen});

        return (
            <div>
                {button}
                <Dialog
                    open={isOpen}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            {trans('common.cancel')}
                        </Button>
                        <Button onClick={this.handleConfirm} color="secondary" autoFocus>
                            {trans('common.confirm')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;
