# WebHighlighter

Firefox extension to highlight and share links to arbitrary elements on a webpage. 
  
All elements in a DOM-tree of a HTML document are individually addressable - probably best known from addressing CSS elements (cf. CSS specificity). So ... the thought of enhancing the URL-scheme (the fragment-part to be exact) to accomodate a path compatible with `document.querySelector()` was not too far fetched after all. 
  
Ever wanted to link a specific paragraph/image/link/table cell/list item/etc. of a long webpage to a friend/colleague/...webpage? Now you can \o/
  
## Usage
Click the new extension icon (blue icon, black border) to turn on the extension for the current tab. The icon now gets a white boarder to indicate it is active. You now can highlight any element on a webpage by clicking on it. After the click
* a dashed blue border will appear around the element
* a new block near the top right corner of the webpage will appear containing
* a link labeled "Highlight Link"
* a button labeled "Copy Link to Clipboard" 
  
You can copy the link by either using right mouse click --> copy address of link on the "Highlight Link" or  
click the "Copy Link to Clipboard"-Button  
  
You can switch the extenstion off again by clicking the extension icon again.  
  
obligatory permissions:  
* activeTab
  
permission needed for protocol handler to work:  
* storage
  
optional permission:  
* clipboardWrite
  
## TODO

* test, test, test
* prevent self referenced clicks
* fix clipboard permission request
* enhance to link more than one highlighted element
* Upload and sign at AMO


## Roadmap

* enhance to be compatible as Chrome extension
* loosen permission variant for one-click version via protocol handler

