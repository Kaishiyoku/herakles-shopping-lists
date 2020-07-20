import {LOCAL_STORAGE_FIELD_API_TOKEN} from '../localStorage/localStorageKeys';

function setApiToken(apiToken) {
    localStorage.setItem(LOCAL_STORAGE_FIELD_API_TOKEN, apiToken);
}

export default setApiToken;
