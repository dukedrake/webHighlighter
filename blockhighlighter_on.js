console.log('Blockhighlighter loaded!');

Window.webHighlighter.topEl = document.querySelector('#content');
if(!Window.webHighlighter.topEl) Window.webHighlighter.topEl = document.querySelector('body');


walkNodes = document.createTreeWalker(Window.webHighlighter.topEl, NodeFilter.SHOW_TEXT, null, false);
allNodes = [];

while(curNode = walkNodes.nextNode()){
	let nTest = curNode.nodeValue.replace(/( |\t)/g,'');

	// avoid multiple listeners for siblings
	if(nTest && (allNodes.indexOf(curNode.parentNode)===-1)){
		allNodes.push(curNode.parentNode);
		curNode.parentNode.classList.add('webh');
		curNode.parentNode.addEventListener('click',     Window.webHighlighter.addLocListener, true);
		curNode.parentNode.addEventListener('mouseover', Window.webHighlighter.toggleClassOver);
		curNode.parentNode.addEventListener('mouseout',  Window.webHighlighter.toggleClassOut);
	}
}






