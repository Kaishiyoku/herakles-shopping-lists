import request from './request';
import {partial} from 'ramda';

/**
 * @function put
 *
 * DELETE request
 *
 * @param {string} uri
 * @param {Object} [data={}]
 * @return {Promise}
 */
const destroy = partial(request, ['delete']);

export default destroy;
