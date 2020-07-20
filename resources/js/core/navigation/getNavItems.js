import isAuthorized from '../../authorization/isAuthorized';
import getAuthorizedNavItems from './getAuthorizedNavItems';
import getUnauthorizedNavItems from './getUnauthorizedNavItems';

const getNavItems = () => isAuthorized() ? getAuthorizedNavItems() : getUnauthorizedNavItems();

export default getNavItems;
