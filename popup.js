function search() {
	var searchWord = document.getElementById('word').value;
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, searchWord);
	});
}

document.getElementById('find').onclick = search;
