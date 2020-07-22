import React from 'react';
import trans from '../../i18n/trans';
import Typography from '@material-ui/core/Typography';
import withFade from '../core/withFade';

const NotAuthorizedPage = () => <Typography variant="h5">{trans('notAuthorized.title')}</Typography>;

export default withFade(NotAuthorizedPage);
