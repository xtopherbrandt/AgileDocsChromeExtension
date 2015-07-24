// Listen for messages from the page
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  sendResponse( {outputActivityChecked: localStorage["outputActivityChecked"], format: localStorage["format"] } );
});
