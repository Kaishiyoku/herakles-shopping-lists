import {createHistory, createMemorySource} from '@reach/router';

const history = createHistory(window);
const {navigate} = history;

export {
    history,
    navigate,
};
