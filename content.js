chrome.runtime.onMessage.addListener(function(msg) {
	var matches = runWalker(msg);
	chrome.extension.sendMessage(matches);
})

function runWalker(searchWord) {
	var nodes = [];
	var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, function(node) {
		var foundWordIndex = matchWord(searchWord, node.textContent);
		if(foundWordIndex !== -1) {
			return NodeFilter.FILTER_ACCEPT;
		} else {
			if(node.parentNode.classList.contains('match')) {
				node.parentNode.classList.remove('match');
			}
			return NodeFilter.FILTER_SKIP;
		}

	}, false);

	while (walker.nextNode()) {
		nodes.push(walker.currentNode);
	}

	nodes.forEach(function(node) {
		var addThis = replaceTextNode(node, searchWord);
		node.parentNode.replaceChild(addThis.what, node.splitText(addThis.where));
	});
	return nodes.length;
}

function matchWord(searchWord, textNode) {
	return textNode.indexOf(searchWord)
}


function createReplacementText(searchWord) {
	var textContainer = createSpan();
	var highlightedWord = createSpan();
	highlightedWord.classList.add('match');
	highlightedWord.appendChild(createTextNode(searchWord));
	textContainer.appendChild(highlightedWord);
	return textContainer
}

function createSpan() {
	return document.createElement('span');
}

function createTextNode(text) {
	return document.createTextNode(text);
}

function replaceTextNode(node, searchWord) {
	var foundWordIndex = matchWord(searchWord, node.textContent);
	var replacement = createReplacementText(searchWord);
	replacement.appendChild(createTextNode(node.textContent.substring(foundWordIndex + searchWord.length)));
	return { what: replacement, where: foundWordIndex };
}
