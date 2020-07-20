import isAuthorized from '../../authorization/isAuthorized';
import authorizedNavItems from './authorizedNavItems';
import unauthorizedNavItems from './unauthorizedNavItems';

const getNavItems = () => isAuthorized() ? authorizedNavItems : unauthorizedNavItems;

export default getNavItems;
