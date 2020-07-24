import {LOCAL_STORAGE_FIELD_USER_ID} from '../localStorage/localStorageKeys';
import toInt from '../core/toInt';

function getUserId() {
    return toInt(localStorage.getItem(LOCAL_STORAGE_FIELD_USER_ID));
}

export default getUserId;
