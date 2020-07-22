import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = (theme) => ({
    buttonProgress: {
        marginRight: '10px',
    },
});

class LoadingButton extends React.PureComponent {
    static propTypes = {
        isLoading: PropTypes.bool,
    };

    static defaultProps = {
        isLoading: false,
    };

    render() {
        const {children, classes, isLoading, ...otherProps} = this.props;

        return (
            <Button {...otherProps}>
                {isLoading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                {children}
            </Button>
        );
    }
}

export default withStyles(styles)(LoadingButton);
