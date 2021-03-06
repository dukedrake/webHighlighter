

let tabData = {};

// var browser = browser || chrome;

			
browser.browserAction.onClicked.addListener(handleClick);
function handleClick(e) {

	browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
			let activeTab = tabs[0];
			
			const filter = {
				tabId: activeTab.id
			};
			// browser.tabs.onUpdated.addListener(handleUpdated, filter);
			
			
			// init script and CSS
			if(!(activeTab.id in tabData)) {
				console.log('activated tabId ' + activeTab.id);
				tabData[activeTab.id] = { status: false };
			}
			
			
			// if(typeof extLoaded !== undefined) {
				console.log("INIT!");
				const css = "#webhighlightpath { position: fixed; z-index: 2147483649; top: 0px; right: 20px; padding: 10px 14px; border: 4px solid #333; border-top-width: 0px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; min-width: 120px; background: #F2F2FF; font-size: 16px; font-weight: bold;}\
						 #webhighlightpath a { display: inline-block; margin-right: 14px; text-decoration: underline;}\
						 #webhighlightpath button {font-size: 14px;}\
						 .locHighlight { border: 2px dashed #55F; border-radius: 6px; padding: 4px 6px; }\
						 .locHighlightHover { background: rgba(60, 60, 255, 0.2) !important; border-bottom: 2px dashed #55F; }\
						 .remHighlight { border: 4px solid  #00F; border-radius: 6px; padding: 4px 6px; }";
				browser.tabs.insertCSS({code: css});
				browser.tabs.executeScript({
					file: 'blockhighlighter_init.js'
				});

			
			
			// switch off if it's on
			if(tabData[activeTab.id].status) {
				browser.browserAction.setIcon( {"path": "icons/icon_32.png", "tabId" : activeTab.id });
				browser.browserAction.setTitle( {"title": "webHighlighter (off)" });
				console.log("removing listeners ...!");
				browser.tabs.executeScript({
					file: 'blockhighlighter_off.js'
				});
				tabData[activeTab.id] = { status: false };
				return false;

			}
			// switch on if it's off
			else {
				tabData[activeTab.id] = { status: true };
				browser.browserAction.setIcon( {"path": "icons/icon_32_on.png", "tabId" : activeTab.id });
				browser.browserAction.setTitle( {"title": "webHighlighter (on)" });
				console.log('loading Blockhighlighter ... ');
			}
			
			let urlArr = activeTab.url.split('|_|');
			if(urlArr.length == 2) return {"payload" : decodeURIComponent(urlArr[1])};
			else return  browser.storage.local.get(activeTab.url);
    })
		
		
    .then((storedInfo) => {
			if(!storedInfo) return false;
		
			let cssPath = '';
			if(storedInfo.payload) {
				cssPath = storedInfo.payload;
			}
			else {
				const urlob = Object.keys(storedInfo)[0];
				if(!storedInfo[urlob]) {
					console.log('nothing stored yet:',storedInfo);
				} else if(!storedInfo[urlob][0][0]) {
					console.log('storage error, nothing found:',storedInfo);
				} else {
					// let queryPath = storedInfo[urlob][0][0].replace(/\+/g,' ');
					cssPath = decodeURIComponent(storedInfo[urlob][0][0]);
					// console.log(queryPath, storedInfo[urlob][0][1]);
					
				}
			}
			
			// only change DOM if there is something to highlight
			if(cssPath !== '') { 
				const procBlocks = '\
				targetHlEl = document.querySelector("'+cssPath+'");\
				console.log(targetHlEl);\
				console.log("'+cssPath+'");\
				targetHlEl.classList.add("remHighlight");\
				targetHlEl.scrollIntoView({block: "start", behavior: "smooth"});';
				
				browser.tabs.executeScript({
					code: procBlocks
				});
			}
			
			// selecting part
			browser.tabs.executeScript({
				file: 'blockhighlighter_on.js'
			});
			
			
    });
}



function handleUpdated(tabId, changeInfo, tabInfo) {
	console.log(`Updated tab: ${tabId}`);
	console.log("Changed attributes: ", changeInfo);
	console.log("New tab Info: ", tabInfo);
}


browser.runtime.onMessage.addListener(handleMessage);
function handleMessage(message, sender, sendResponse) {

	// console.log(message.url);
	// console.log(message.data);
	// check for valid message
	if(message.url) {
		// store blocks and messages relative to current url
		let contentToStore = {};
		contentToStore[message.url] = [[message.data, 'message new']];
		browser.storage.local.set(contentToStore);
		
	}
	
	sendResponse({response: "Storing done"});
		
}





