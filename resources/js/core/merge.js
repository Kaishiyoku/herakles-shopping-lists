import * as deepMerge from 'deepmerge';
import isPlainObject from 'is-plain-object';

const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray;

function merge(...objects) {
    return deepMerge.all(objects, {
        arrayMerge: overwriteMerge,
        isMergeableObject: isPlainObject,
    });
}

export default merge;
