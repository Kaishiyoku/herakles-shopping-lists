import React from 'react';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import {createStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import brown from '@material-ui/core/colors/brown';

const useStyles = makeStyles((theme) => createStyles({
    root: {
        backgroundColor: brown[400],
    },
}));

const ShoppingListNumberAvatar = ({className, ...otherProps}) => {
    const classes = useStyles();

    return <Avatar className={classNames(classes.root, className)}{...otherProps}/>;
};

export default ShoppingListNumberAvatar;
