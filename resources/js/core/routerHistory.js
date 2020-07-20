import {createHistory, createMemorySource} from '@reach/router';

const source = createMemorySource('/');
const history = createHistory(source);
const {navigate} = history;

export {
    history,
    navigate,
};
