import axios from 'axios';
import config from '../config';
import isEmpty from 'lodash/isEmpty';
import getApiToken from '../authorization/getApiToken';
import responseTransformer from './responseTransformer';

const request = (responseFn) => (method, uri, paramsOrData = {}) => {
    // eslint-disable-next-line fp/no-mutation, dot-notation
    axios.defaults.headers.common['Authorization'] = isEmpty(getApiToken()) ? '' : `Bearer ${getApiToken()}`;

    const params = method === 'get' ? paramsOrData : {};
    const data = ['post', 'put'].includes(method) ? paramsOrData : {};

    return new Promise((resolve, reject) => {
        axios({
            baseURL: config.backend.baseUrl,
            data,
            method,
            params,
            url: uri,
        })
            .then((response) => resolve(responseFn(response)))
            .catch((error) => {
                console.error(error);

                reject(error);
            });
    });
};

export default request(responseTransformer);
