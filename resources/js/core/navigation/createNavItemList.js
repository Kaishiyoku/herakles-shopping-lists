import React from 'react';
import List from '@material-ui/core/List';

const createNavItemList = (key, navItems) => (
    <List key={key}>
        {navItems}
    </List>
);

export default createNavItemList;
