import request from './request';
import {partial} from 'ramda';

/**
 * @function get
 *
 * GET request
 *
 * @param {string} uri
 * @param {Object} [params={}]
 * @return {Promise}
 */
const get = partial(request, ['get']);

export default get;
