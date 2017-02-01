chrome.extension.onMessage.addListener(function(msg, sender) {
	var matches = msg > 0 ? msg.toString() : '';
	chrome.browserAction.setBadgeText({ text: matches, tabId: sender.tab.id });
});
