const ResultType = require('./ResultType');
const SearchResult = require('./SearchResultEnum');
const SearchType = require('./SearchType');

function equals (item, key) {
    return item === key ? SearchResult.FoundExact : SearchResult.NotFound;
}

function lessThan (item, key) {
    return item < key ? SearchResult.FoundLess : SearchResult.NotFound;
}

function greaterThan (item, key) {
    return item > key ? SearchResult.FoundGreater : SearchResult.NotFound;
}

function arrayTraverser (key, items, size, reverseTraverse, searchFunction) {
	let result = new ResultType();
	let currPos = reverseTraverse ? size : 0;
	let finishingPos = reverseTraverse ? 0 : size;
	let traverseStep = reverseTraverse ? (i) => --i : (i) => ++i;

	while(currPos != finishingPos) {
		let searchFunctionResult = searchFunction(items[currPos], key);
		if (searchFunctionResult !== SearchResult.NotFound) {
			result.searchResult = searchFunctionResult;
			result.resultIndex = currPos;
			result.resultValue = items[currPos];
			return result;
		}
		currPos = traverseStep(currPos);
	}
    return result;
}

function searchArrays (key, items, size, ascending, type) {
    //evitando lógica complexa de guardar estado de iteração anterior para descobrir o maior menor
    //e menor maior fazendo hack entre ascending, tipo de busca e sentido de iteração do array
    if (type === SearchType.LessThan) {
        return arrayTraverser(key, items, size, ascending, lessThan);
    }
    if (type === SearchType.LessThanEquals) {
        let equalsResult = arrayTraverser(key, items, size, !ascending, equals);
        if (equalsResult.searchResult === SearchResult.NotFound)
            return arrayTraverser(key, items, size, ascending, lessThan);
        return equalsResult;
    }
    if (type === SearchType.Equals) {
        return arrayTraverser(key, items, size, !ascending, equals);
    }
    if (type === SearchType.GreaterThan) {
        return arrayTraverser(key, items, size, !ascending, greaterThan);
    }
    if (type === SearchType.GreaterThanEquals) {
        let equalsResult = arrayTraverser(key, items, size, !ascending, equals);
        if (equalsResult.searchResult === SearchResult.NotFound)
            return arrayTraverser(key, items, size, !ascending, greaterThan);
        return equalsResult;
    }
} 

module.exports.equals = equals;
module.exports.lessThan = lessThan;
module.exports.greaterThan = greaterThan;
module.exports.arrayTraverser = arrayTraverser;
module.exports.searchArrays = searchArrays;