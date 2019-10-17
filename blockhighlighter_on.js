console.log('Blockhighlighter loaded!');

topEl = document.querySelector('#content');
if(!topEl) topEl = document.querySelector('body');

walk = document.createTreeWalker(topEl, NodeFilter.SHOW_TEXT, null, false);
allNodes = [];

while(n = walk.nextNode()){
	let nTest = n.nodeValue.replace(/( |\t)/g,'');
	// avoid multiple listeners for siblings
	if(nTest && (allNodes.indexOf(n.parentNode)===-1)){
		allNodes.push(n.parentNode);
		n.parentNode.addEventListener('click', addLocListener, false);
		n.parentNode.addEventListener('mouseover', toggleClassOver, false);
		n.parentNode.addEventListener('mouseout', toggleClassOut, false);
	}
}






