# WebHighlighter

Firefox extension to highlight and share links to arbitrary elements on a webpage. 
  
All elements in a DOM-tree of a HTML document are individually addressable - probably best known from addressing CSS elements (cf. CSS specificity). So ... the thought of enhancing the URL-scheme (the fragment-part to be exact) to accomodate a path compatible with `document.querySelector()` was not too far fetched after all. 
  
Ever wanted to link a specific paragraph/image/link/table cell/list item/etc. of a long webpage to a friend/colleague/...webpage? Now you can \o/
  
## Installation
Until publishing on AMO: 
1) Download files
2) Got to "about:debugging" in Firefox
3) Click the "This Firefox" link in the top
4) Klick the Button "Add temporary Add-on ..." ("Temporäres Add-On laden ...) and choose the `manifest.json` file

## Usage
Click the new extension icon (blue icon, black border) to turn on the extension for the current tab. Alternative: Keystroke Alt+Shift+S. The icon now gets a white border to indicate it is active. You now can highlight any element on a webpage by clicking on it. After the click
* a dashed blue border will appear around the element
* a new block near the top right corner of the webpage will appear containing
* a link labeled "Highlight Link"
* a button labeled "Copy Link to Clipboard" 
  
You can copy the link by either using right mouse click --> copy address of link on the "Highlight Link" or  
click the "Copy Link to Clipboard"-Button  
  
You can switch the extenstion off again by clicking the extension icon again.  
  
## Permissions
obligatory permissions:  
* activeTab
  
permission needed for protocol handler to work:  
* storage
  
optional permission:  
* clipboardWrite
  
## Caveats
As with anchor links in general, one should keep in mind that they are not `permalinks`, i.e. they might change over time, especially on startpages of highly dynamic websites like newspapers, webshops, etc.
This limitation also applies to
- content that didn't load yet (load on scroll)
- content that isn't visible (collapsed folds)
- content that is individual to the one who links the block
 
  
## TODO

- [ ] test, test, test
- [x] prevent self referenced clicks 
- [x] add keystroke to activate Add-On
- [x] fix problem with reloading webpage -> add-on doesn't work
- [ ] enhance to link more than one highlighted element
- [ ] Upload and sign at AMO

Later
- [ ] fix clipboard permission request


## Roadmap

* enhance to be compatible as Chrome extension
* loosen permission variant for one-click version via protocol handler

