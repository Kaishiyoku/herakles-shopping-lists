import React from 'react';
import withFade from '../core/withFade';
import trans from '../../i18n/trans';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const NotFoundPage = () => {
    return (
        <Alert severity="error">
            <AlertTitle>{trans('notFound.title')}</AlertTitle>
            {trans('notFound.description')}
        </Alert>
    );
};

export default withFade(NotFoundPage);
