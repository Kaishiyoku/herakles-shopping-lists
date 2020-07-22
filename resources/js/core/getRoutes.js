import isAuthorized from '../authorization/isAuthorized';
import getUnauthorizedRoutes from './getUnauthorizedRoutes';
import getAuthorizedRoutes from './getAuthorizedRoutes';

const getRoutes = () => isAuthorized() ? getAuthorizedRoutes() : getUnauthorizedRoutes();

export default getRoutes;
