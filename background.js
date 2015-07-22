// Called when the user clicks on the browser action.
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  sendResponse( {outputActivityChecked: localStorage["outputActivityChecked"], format: localStorage["format"] } );
});    
