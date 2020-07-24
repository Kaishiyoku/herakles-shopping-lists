import {LOCAL_STORAGE_FIELD_USER_ID} from '../localStorage/localStorageKeys';

function clearUserId() {
    localStorage.removeItem(LOCAL_STORAGE_FIELD_USER_ID);
}

export default clearUserId;
