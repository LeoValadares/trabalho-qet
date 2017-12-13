const SearchFunctions = require('./SearchFunctions');
const SearchResult = require('./SearchResultEnum');
const ResultType = require('./ResultType');

test('Equals exact', () => {
    expect(SearchFunctions.equals(1,1)).toBe(SearchResult.FoundExact);
});

test('Equals not exact', () => {
    expect(SearchFunctions.equals(1,2)).toBe(SearchResult.NotFound);
});

test('LessThan less', () => {
    expect(SearchFunctions.lessThan(2,3)).toBe(SearchResult.FoundLess);
});

test('LessThan not less', () => {
    expect(SearchFunctions.lessThan(3,2)).toBe(SearchResult.NotFound);
});

test('GreaterThan greater', () => {
    expect(SearchFunctions.greaterThan(3,2)).toBe(SearchResult.FoundGreater);
});

test('LessThan not greater', () => {
    expect(SearchFunctions.greaterThan(2,3)).toBe(SearchResult.NotFound);
});

test('ArrayTraverser left -> right and found', () => {
    let arr = [1,2,3,4,5,6];
    let result = SearchFunctions.arrayTraverser(5, arr, arr.length, false, SearchFunctions.equals);
    expect(result).toEqual(new ResultType(SearchResult.FoundExact, 4, 5));
});

test('ArrayTraverser right -> left and not found', () => {
    let arr = [6,5,4,3,2,1];
    let result = SearchFunctions.arrayTraverser(7, arr, arr.length, true, SearchFunctions.equals);
    expect(result).toEqual(new ResultType(SearchResult.NotFound, null, null));
});