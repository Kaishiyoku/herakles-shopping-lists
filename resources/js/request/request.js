import axios from 'axios';
import config from '../config';
import isEmpty from 'lodash/isEmpty';
import getApiToken from '../authorization/getApiToken';
import responseTransformer from './responseTransformer';

const request = (responseFn) => (method, uri, paramsOrData = {}) => {
    if (!isEmpty(getApiToken())) {
        // eslint-disable-next-line fp/no-mutation, dot-notation
        axios.defaults.headers.common['Authorization'] = `Bearer ${getApiToken()}`;
    } else {
        // eslint-disable-next-line fp/no-mutation, dot-notation
        axios.defaults.headers.common['Authorization'] = '';
    }

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
            .catch((error) => reject(error));
    });
};

export default request(responseTransformer);
