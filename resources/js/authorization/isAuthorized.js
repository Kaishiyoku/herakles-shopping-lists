import getApiToken from './getApiToken';
import isEmpty from 'lodash/isEmpty';

function isAuthorized() {
    return !isEmpty(getApiToken());
}

export default isAuthorized;
