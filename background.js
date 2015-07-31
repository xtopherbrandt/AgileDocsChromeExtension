// Listen for messages from the page
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {

  sendResponse( {outputActivityChecked: localStorage["outputActivityChecked"], format: localStorage["format"] } );
});

// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }

    // regardless of the reason, reload the Pivotal Tracker tab
    chrome.tabs.query({
      "url":"https://www.pivotaltracker.com/*"
    }, function( tabs ){
      for ( var i = 0; i < tabs.length; i++ ){
        chrome.tabs.reload( tabs[i].id );
      }
    });
});