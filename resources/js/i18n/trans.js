import Polyglot from 'node-polyglot';
import getTranslationsForUserLocale from './getTranslationsForUserLocale';
import getUserLocale from './getUserLocale';

const polyglot = new Polyglot({locale: getUserLocale(), phrases: getTranslationsForUserLocale()});

const trans = (key, options) => polyglot.t(key, options);

export default trans;
