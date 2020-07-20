import request from './request';
import {partial} from 'ramda';

/**
 * @function put
 *
 * PUT request
 *
 * @param {string} uri
 * @param {Object} [data={}]
 * @return {Promise}
 */
const put = partial(request, ['put']);

export default put;
