console.log('hello content');

chrome.runtime.onMessage.addListener(function(msg, sender) {
	console.log(msg, sender);
})
