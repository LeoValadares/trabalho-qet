const SearchResult = require('./SearchResultEnum');

const ResultType = function (searchResult, resultIndex, resultValue) {
    this.searchResult = searchResult === undefined ? SearchResult.NotFound : searchResult;
    this.resultIndex = resultIndex === undefined ? null : resultIndex;
    this.resultValue = resultValue === undefined ? null : resultValue;
}

module.exports = ResultType;