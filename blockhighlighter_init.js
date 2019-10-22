console.log('--------------- init --------------------');

if(!("webHighlighter" in Window)){
	Window.webHighlighter = {};

// console.log(Window.webHighlighter);
// console.log('before cssPath', Window.webHighlighter.cssPath);

	Window.webHighlighter.cssPath = function(el) {
		if(!(el instanceof Element)) {return false;	}
		let path=[];
		while(!el.hasAttribute('id') && el.nodeName.toLowerCase()!='body'){
			let selector = el.nodeName.toLowerCase(); 
			let sib = el, nth=1;
			while(sib=sib.previousElementSibling){
				if(sib.nodeName.toLowerCase()==selector)nth++;
			}
			if(nth!=1) selector += ':nth-of-type('+nth+')';
			path.unshift(selector);
			el=el.parentNode;
		}
		if(el.nodeName.toLowerCase()!='body') path.unshift('#'+el.id);
		
		if( path.indexOf('#webhighlightpath') > -1) return false;
		
		return encodeURIComponent(path.join(' > '));
	}



	// Window.webHighlighter.storedBackgroundColor = "";
	Window.webHighlighter.toggleClassOver = function(e) {
		e.target.classList.toggle('locHighlightHover');
		// Window.webHighlighter.storedBackgroundColor = window.getComputedStyle(e.target).backgroundColor;
		// e.target.style.backgroundColor = "rgba(60, 60, 255, 0.2)";
	}

	Window.webHighlighter.toggleClassOut = function(e) {
		e.target.classList.toggle('locHighlightHover');
		// let restorBackgroundColor = Window.webHighlighter.storedBackgroundColor == "rgba(60, 60, 255, 0.2)" ? "transparent" : Window.webHighlighter.storedBackgroundColor;
		// e.target.style.backgroundColor = restorBackgroundColor;
	}


	Window.webHighlighter.addLocListener = function(e) {
		e.stopPropagation();
		e.preventDefault();
		let cssPathStr = Window.webHighlighter.cssPath(e.target);
		if(!cssPathStr) return false;
		
		// build target link
		const highlightTest = window.location.href.split("#|_|");
		const fragmentTest = window.location.href.split('#');
		let baseLink = "";
		if(highlightTest.length > 1)  baseLink = highlightTest[0];
		else if(fragmentTest.length > 1) baseLink = fragmentTest[0];
		else baseLink = window.location.href;
		const targetLink = baseLink + "#|_|" + cssPathStr;
		
		// remove existing element if already present
		let testDiv = document.querySelector('#webhighlightpath');
		if(testDiv) testDiv.remove();
		
		// add element to copy link
		let contentDiv = document.createElement("div");
		contentDiv.id = "webhighlightpath";
		
		let linkToHighlight = document.createElement("a");
		linkToHighlight.href = targetLink;
		linkToHighlight.target = "_blank";
		linkToHighlight.textContent = "Link to Highlight";
		contentDiv.append(linkToHighlight);
		
		let copyButton = document.createElement("button");
		copyButton.textContent = "Copy Link to Clipboard";
		contentDiv.append(copyButton);
		
		
		copyButton.addEventListener('click', function(e) {
			e.preventDefault();
			navigator.clipboard.writeText(targetLink).then(function() {
				// done
			}, function() {
				console.log('error');
			});
			
			/*
			let permission = e.target.dataset.permission;
			browser.permissions.request({permissions: ["clipboardWrite"]})
				.then((response) => {
					console.log( 'Call successful.');
				})
				.catch((err) => {
					// Catch the case where the permission cannot be granted.
					console.log( err.message);
				});
			*/

				
		});

		document.querySelector('body').append(contentDiv);
		e.target.classList.add('locHighlight');
		return false;
	}
	



	Window.webHighlighter.removeLocListener = function(cnode) {
		cnode.removeEventListener('click',     Window.webHighlighter.addLocListener);
		cnode.removeEventListener('mouseover', Window.webHighlighter.toggleClassOver);
		cnode.removeEventListener('mouseout',  Window.webHighlighter.toggleClassOut);
		return true;
	}

}


// hack-fix for "result is non-structured-clonable data"-error
b = 20;



