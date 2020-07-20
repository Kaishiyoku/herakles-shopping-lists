import {LOCAL_STORAGE_FIELD_API_TOKEN} from '../localStorage/localStorageKeys';

function getApiToken() {
    return localStorage.getItem(LOCAL_STORAGE_FIELD_API_TOKEN);
}

export default getApiToken;
