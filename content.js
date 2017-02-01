console.log('hello content');

chrome.runtime.onMessage.addListener(function(msg, sender) {
	console.log(msg, sender);
	runWalker(msg);
})

function runWalker(searchWord) {
	var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, function(node) {
		var foundWord = matchWord(searchWord, node.textContent);
		if(foundWord !== -1) {
			console.log(node.textContent);
		}
		return NodeFilter.FILTER_SKIP;
	}, false);
	walker.nextNode();
}

function matchWord(searchWord, textNode) {
	return textNode.indexOf(searchWord)
}
