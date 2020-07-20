import allTranslations from './allTranslations';
import getUserLocale from './getUserLocale';

function getTranslationsForUserLocale() {
    return allTranslations[getUserLocale()];
}

export default getTranslationsForUserLocale;
