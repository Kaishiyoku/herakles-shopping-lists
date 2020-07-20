import React from 'react';
import {Grid, GridCell} from '@react-md/utils';

const DefaultGrid = (props) => {
    return (
        <Grid>
            <GridCell colSpan={12}>
                {props.children}
            </GridCell>
        </Grid>
    );
};

export default DefaultGrid;
