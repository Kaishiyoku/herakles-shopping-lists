import config from '../config';

function getUserLocale() {
    const fullLocaleStr = window.navigator.languages ? window.navigator.languages[0] : window.navigator.userLanguage || window.navigator.language;
    const shortenedLocaleStr = fullLocaleStr.substr(0, 2);

    return config.availableLocales.includes(shortenedLocaleStr) ? shortenedLocaleStr : config.fallbackLocale;
}

export default getUserLocale;
