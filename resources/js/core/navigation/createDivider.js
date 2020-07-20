function createDivider(key) {
    return {[key]: {itemId: key, parentId: null, children: key, divider: true}};
}

export default createDivider;
