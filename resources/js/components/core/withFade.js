import React from 'react';
import Fade from '@material-ui/core/Fade';

function withFade(WrappedComponent, timeout = 500) {
    return class extends React.PureComponent {
        render() {
            return (
                <Fade timeout={timeout} in={true}>
                    <div><WrappedComponent {...this.props}/></div>
                </Fade>
            );
        }
    };
}

export default withFade;
