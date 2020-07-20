import {LOCAL_STORAGE_FIELD_API_TOKEN} from '../localStorage/localStorageKeys';
import isEmpty from 'lodash/isEmpty';

function setApiToken(apiToken) {
    if (isEmpty(apiToken)) {
        return;
    }

    localStorage.setItem(LOCAL_STORAGE_FIELD_API_TOKEN, apiToken);
}

export default setApiToken;
