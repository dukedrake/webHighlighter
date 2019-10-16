



let targetEl,
		n,
		allNodes,
		walk,
		topEl; 


let cssPath = (el) => {
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
	return encodeURIComponent(path.join(' > '));
}



let addLocListener = (e) => {
	e.stopPropagation();
	e.preventDefault();
	let cssPathStr = cssPath(e.target);
	const curHrefArr = window.location.href.split("#_#");
	const baseLink = curHrefArr.length > 1 ? curHrefArr[0] : window.location.href;
	const targetLink = baseLink + "#_#" + cssPathStr;
	
	// remove existing element if already present
	let testDiv = document.querySelector('#webhighlightpath');
	if(testDiv) testDiv.remove();
	
	// add element to copy link
	let contentDiv = document.createElement("div");
	contentDiv.id = "webhighlightpath";
	
	let linkToHighlight = document.createElement("a");
	linkToHighlight.href = targetLink;
	linkToHighlight.target = "_blank";
	linkToHighlight.textContent = "Highlight Link";
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


let removeLocListener = (cnode) => {
	cnode.removeEventListener('click', addLocListener, false);
  return true;
}


