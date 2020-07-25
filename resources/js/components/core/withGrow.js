import React from 'react';
import Grow from '@material-ui/core/Grow';

function withGrow(WrappedComponent, timeout = 500) {
    return class extends React.PureComponent {
        render() {
            return (
                <Grow timeout={timeout} in={true}>
                    <div><WrappedComponent {...this.props}/></div>
                </Grow>
            );
        }
    };
}

export default withGrow;
