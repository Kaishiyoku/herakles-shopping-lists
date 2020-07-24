import {LOCAL_STORAGE_FIELD_USER_ID} from '../localStorage/localStorageKeys';
import {is} from 'ramda';

function setUserId(userId) {
    if (!is(Number, userId)) {
        return;
    }

    localStorage.setItem(LOCAL_STORAGE_FIELD_USER_ID, userId);
}

export default setUserId;
