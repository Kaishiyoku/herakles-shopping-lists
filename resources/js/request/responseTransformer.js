import {is, isNil, mapObjIndexed} from 'ramda';

/* eslint-disable camelcase */
const rules = {
    finished_at: 'date',
    created_at: 'date',
    updated_at: 'date',
};
/* eslint-enable camelcase */

function transformDate(value) {
    if (isNil(value)) {
        return value;
    }

    return new Date(value);
}

function transformArray(arr) {
    return arr.map((value) => {
        return transform(value);
    });
}

function transformObj(obj) {
    return mapObjIndexed((num, key, mapObj) => {
        const foundRule = rules[key];

        if (foundRule) {
            if (foundRule === 'date') {
                return transformDate(obj[key]);
            }
        }

        return transform(obj[key]);
    }, obj);
}

function transform(value) {
    if (is(Array, value)) {
        return transformArray(value);
    }

    if (is(Object, value)) {
        return transformObj(value);
    }

    return value;
}

function responseTransformer(response) {
    const {data, ...others} = response;

    return mapObjIndexed((num, key, obj) => {
        if (key === 'data') {
            return transform(obj[key]);
        }

        return obj[key];
    }, response);
}

export default responseTransformer;
