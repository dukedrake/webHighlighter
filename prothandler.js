
let payloadArr = decodeURIComponent(window.location.hash).split('//');
payloadArr.shift();
const payload = payloadArr.join('//');

let hrefdataArr = payload.split('#_#');
const url = hrefdataArr[0];
const data = hrefdataArr[1];

browser.tabs.getCurrent().then((tabInfo) => {
	var sending = browser.runtime.sendMessage({
		url: url,
		data: data,
		tabInfo: tabInfo
	});
	sending.then(handleResponse, handleError);  
});

function handleResponse(message) {
	window.location.href = url;
}

function handleError(error) {
	console.log('Error: ',error);
}

