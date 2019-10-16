# WebHighlighter

Firefox extension to highlight and share links to arbitrary elements on a webpage. 
  
All elements in a DOM-tree of a HTML document are individually addressable - probably best known from addressing CSS elements (cf. CSS specificity). So ... the thought of enhancing the URL-scheme (the fragment-part to be exact) to accomodate a path compatible with `document.querySelector()` was not too far fetched after all.  
  
Ever wanted to link a specific paragraph/image/link/table cell/list item/etc. of a long webpage to a friend/colleague/...webpage? Now you can \o/

Klick Extension Icon to turn on extension. You now can highlight
  
obligatory permissions:  
* activeTab
  
permission needed for protocol handler to work:  
* storage
  
optional permission:  
* clipboardWrite
  
## TODO

* test, test, test
* fix clipboard permission request
* enhance to link more than one highlighted element
* Upload and sign at AMO


## Roadmap

* enhance to be compatible as Chrome extension
* loosen permission variant for one-click version via protocol handler

