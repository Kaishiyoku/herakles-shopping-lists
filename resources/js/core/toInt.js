import {partialRight} from 'ramda';

const toInt = partialRight(parseInt, [10]);

export default toInt;
