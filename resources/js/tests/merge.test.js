import merge from '../core/merge';

describe('merge', () => {
    it('should merge two simple objects', () => {
        const objA = {a: 1};
        const objB = {b: 'b'};

        expect(merge(objA, objB)).toStrictEqual({a: 1, b: 'b'});
    });

    it('should merge child objects', () => {
        const objA = {a: {aa: 1}};
        const objB = {b: {bb: 'b'}};
        const objC = {b: {cc: 'c'}};

        expect(merge(objA, objB, objC)).toStrictEqual({a: {aa: 1}, b: {bb: 'b', cc: 'c'}});
    });

    it('should only merge if there are at least two objects to be merged', () => {
        expect(merge()).toBeNull();
        expect(merge({})).toBeNull();
    });

    it('shouldn\'t merge arrays but override them', () => {
        expect(merge([1, 2, 3], [4, 5, 6])).toStrictEqual([4, 5, 6]);
    });

    it('shouldn\'t merge anything else than objects or arrays', () => {
        expect(merge('a', 'b', 'c')).toBeNull();
        expect(merge(1, 2, 3)).toBeNull();
        expect(merge(1, 'a', 2.5)).toBeNull();
        expect(merge(null, 'a', 2.5)).toBeNull();
    });

    it('should only merge if all parameters are from the same kind', () => {
        expect(merge({}, [], [])).toBeNull();
        expect(merge([], {}, {})).toBeNull();
        expect(merge([], 'a', 1)).toBeNull();
        expect(merge({}, 'a', 1)).toBeNull();
    });
});
