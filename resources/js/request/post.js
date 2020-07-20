import request from './request';
import {partial} from 'ramda';

/**
 * @function post
 *
 * POST request
 *
 * @param {string} uri
 * @param {Object} [data={}]
 * @return {Promise}
 */
const post = partial(request, ['post']);

export default post;
