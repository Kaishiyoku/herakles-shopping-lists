import React from 'react';
import Slide from '@material-ui/core/Slide';

const FullscreenDialogTransition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default FullscreenDialogTransition;