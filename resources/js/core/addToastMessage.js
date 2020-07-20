import toast$ from '../rx/toast$';

function addToastMessage(message) {
    toast$.next({children: message});
}

export default addToastMessage;
