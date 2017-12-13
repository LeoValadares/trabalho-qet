const SearchFunctions = require('./SearchFunctions');
const SearchResult = require('./SearchResultEnum');
const ResultType = require('./ResultType');
const SearchType = require('./SearchType');

const arr1 = [1,2,3,4,5,6];
const arr2 = [6,5,4,3,2,1];

//1-2-4
test('Equals exact', () => {
    expect(SearchFunctions.equals(1,1)).toBe(SearchResult.FoundExact);
});

//1-3-4
test('Equals not exact', () => {
    expect(SearchFunctions.equals(1,2)).toBe(SearchResult.NotFound);
});

//1-2-4
test('LessThan less', () => {
    expect(SearchFunctions.lessThan(2,3)).toBe(SearchResult.FoundLess);
});

//1-3-4
test('LessThan not less', () => {
    expect(SearchFunctions.lessThan(3,2)).toBe(SearchResult.NotFound);
});

//1-2-4
test('GreaterThan greater', () => {
    expect(SearchFunctions.greaterThan(3,2)).toBe(SearchResult.FoundGreater);
});

//1-3-4
test('LessThan not greater', () => {
    expect(SearchFunctions.greaterThan(2,3)).toBe(SearchResult.NotFound);
});

//1-2-3-4-6-7-8-10-11-12-14-15-16-17-19-20
test('ArrayTraverser left -> right and found', () => {
    let arr = [1,2,3,4,5,6];
    let result = SearchFunctions.arrayTraverser(5, arr, arr.length, false, SearchFunctions.equals);
    expect(result).toEqual(new ResultType(SearchResult.FoundExact, 4, 5));
});

//1-2-3-5-6-7-9-10-11-13-14-15-16-17-18-15-20 
test('ArrayTraverser right -> left and not found', () => {
    let arr = [6,5,4,3,2,1];
    let result = SearchFunctions.arrayTraverser(7, arr, arr.length, true, SearchFunctions.equals);
    expect(result).toEqual(new ResultType(SearchResult.NotFound, null, null));
});

//1-2-3-16
test('SearchArrays lt', () => {
    let result = SearchFunctions.searchArrays(3, arr1, arr1.length, true, SearchType.LessThan);
    expect(result).toEqual(new ResultType(SearchResult.FoundLess, 1, 2));
});

//1-4-5-7-16
test('SearchArrays lte lt', () => {
    let result = SearchFunctions.searchArrays(7, arr1, arr1.length, true, SearchType.LessThanEquals);
    expect(result).toEqual(new ResultType(SearchResult.FoundLess, 5, 6));
});

//1-3-5-6-7-16
test('SearchArrays lte eq', () => {
    let result = SearchFunctions.searchArrays(6, arr1, arr1.length, true, SearchType.LessThanEquals);
    expect(result).toEqual(new ResultType(SearchResult.FoundExact, 5, 6));
});

//1-8-9-16
test('SearchArrays eq', () => {
    let result = SearchFunctions.searchArrays(6, arr1, arr1.length, true, SearchType.Equals);
    expect(result).toEqual(new ResultType(SearchResult.FoundExact, 5, 6));
});

//1-10-11-16
test('SearchArrays gt', () => {
    let result = SearchFunctions.searchArrays(0, arr1, arr1.length, true, SearchType.GreaterThan);
    expect(result).toEqual(new ResultType(SearchResult.FoundGreater, 0, 1));
});

//1-12-13-15-16
test('SearchArrays gte gt', () => {
    let result = SearchFunctions.searchArrays(0, arr1, arr1.length, true, SearchType.GreaterThanEquals);
    expect(result).toEqual(new ResultType(SearchResult.FoundGreater, 0, 1));
});

//1-12-13-14-15-16
test('SearchArrays gte eq', () => {
    let result = SearchFunctions.searchArrays(1, arr1, arr1.length, true, SearchType.GreaterThanEquals);
    expect(result).toEqual(new ResultType(SearchResult.FoundExact, 0, 1));
});