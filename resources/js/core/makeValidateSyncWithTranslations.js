import React from 'react';
import {makeValidateSync} from 'mui-rff';
import trans from '../i18n/trans';

function makeValidateSyncWithTranslations(schema) {
    return makeValidateSync(schema, (error) => {
        const {type, path} = error;

        const options = {field: trans(`validation.attributes.${path}`)};

        return (
            <span className='error' key={Math.random()}>
                {trans(`validation.errors.${type}`, options)}
            </span>
        );
    })
}

export default makeValidateSyncWithTranslations;
