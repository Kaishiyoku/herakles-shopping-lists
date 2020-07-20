import {LOCAL_STORAGE_FIELD_API_TOKEN} from '../localStorage/localStorageKeys';

function clearApiToken() {
    localStorage.removeItem(LOCAL_STORAGE_FIELD_API_TOKEN);
}

export default clearApiToken;
