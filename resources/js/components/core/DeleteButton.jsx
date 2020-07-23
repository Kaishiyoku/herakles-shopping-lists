import React from 'react';
import classNames from 'classnames';
import trans from '../../i18n/trans';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {createStyles} from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const useStyles = makeStyles((theme) => createStyles({
    root: {
        '&:hover': {
            backgroundColor: red[50],
        },
        borderColor: red[500],
        color: red[500],
    },
}));

const DeleteButton = ({className, ...otherProps}) => {
    const classes = useStyles();

    return <Button className={classNames(classes.root, className)}{...otherProps}/>;
};

export default DeleteButton;
