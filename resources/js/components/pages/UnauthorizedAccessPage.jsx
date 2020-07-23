import React from 'react';
import withFade from '../core/withFade';
import trans from '../../i18n/trans';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const UnauthorizedAccessPage = () => {
    return (
        <Alert severity="error">
            <AlertTitle>{trans('unauthorizedAccess.title')}</AlertTitle>
            {trans('unauthorizedAccess.description')}
        </Alert>
    );
};

export default withFade(UnauthorizedAccessPage);
