

allNodes.map(Window.webHighlighter.removeLocListener);


Window.webHighlighter.testEl = document.querySelector('#webhighlightpath');
if(Window.webHighlighter.testEl) Window.webHighlighter.testEl.remove();
document.querySelectorAll('.remHighlight').forEach(curItem => {curItem.classList.remove('remHighlight');	});
document.querySelectorAll('.locHighlight').forEach(curItem => {curItem.classList.remove('locHighlight');	});

