const SearchFunctions = require('./SearchFunctions');
const SearchResult = require('./SearchResultEnum');
const ResultType = require('./ResultType');
const SearchType = require('./SearchType');

const arr1 = [1,2,3,4,5,6];
const arr2 = [6,5,4,3,2,1];

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

test('SearchArrays lt', () => {
    let result = SearchFunctions.searchArrays(3, arr1, arr1.length, true, SearchType.LessThan);
    expect(result).toEqual(new ResultType(SearchResult.FoundLess, 1, 2));
});

test('SearchArrays lte lt', () => {
    let result = SearchFunctions.searchArrays(7, arr1, arr1.length, true, SearchType.LessThanEquals);
    expect(result).toEqual(new ResultType(SearchResult.FoundLess, 5, 6));
});

test('SearchArrays lte eq', () => {
    let result = SearchFunctions.searchArrays(6, arr1, arr1.length, true, SearchType.LessThanEquals);
    expect(result).toEqual(new ResultType(SearchResult.FoundExact, 5, 6));
});

test('SearchArrays eq', () => {
    let result = SearchFunctions.searchArrays(6, arr1, arr1.length, true, SearchType.Equals);
    expect(result).toEqual(new ResultType(SearchResult.FoundExact, 5, 6));
});

test('SearchArrays gt', () => {
    let result = SearchFunctions.searchArrays(0, arr1, arr1.length, true, SearchType.GreaterThan);
    expect(result).toEqual(new ResultType(SearchResult.FoundGreater, 0, 1));
});

test('SearchArrays gte gt', () => {
    let result = SearchFunctions.searchArrays(0, arr1, arr1.length, true, SearchType.GreaterThanEquals);
    expect(result).toEqual(new ResultType(SearchResult.FoundGreater, 0, 1));
});

test('SearchArrays gte eq', () => {
    let result = SearchFunctions.searchArrays(1, arr1, arr1.length, true, SearchType.GreaterThanEquals);
    expect(result).toEqual(new ResultType(SearchResult.FoundExact, 0, 1));
});