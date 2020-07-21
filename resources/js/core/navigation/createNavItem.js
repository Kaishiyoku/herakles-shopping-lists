import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {slugify} from 'transliteration';
import {Link} from '@reach/router';
import config from '../../config';

function createNavItem(to, title, icon = null) {
    return (
        <ListItem button key={slugify(title)} to={to} component={Link} getProps={({isCurrent}) => (isCurrent ? {style: {backgroundColor: config.activeNavItemColor}} : null)}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={title}/>
        </ListItem>
    );
}

export default createNavItem;
