import {slugify} from 'transliteration';

function createSubheader(title) {
    return {[slugify(title)]: {itemId: slugify(title), parentId: null, children: title, subheader: true}};
}

export default createSubheader;
