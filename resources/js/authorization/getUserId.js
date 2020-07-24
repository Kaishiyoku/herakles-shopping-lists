import {LOCAL_STORAGE_FIELD_USER_ID} from '../localStorage/localStorageKeys';

function getUserId() {
    return localStorage.getItem(LOCAL_STORAGE_FIELD_USER_ID);
}

export default getUserId;
