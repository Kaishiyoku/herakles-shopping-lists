function createNavItem(to, title, icon = null) {
    return {[to]: {itemId: to, parentId: null, to, children: title, leftAddon: icon}};
}

export default createNavItem;
