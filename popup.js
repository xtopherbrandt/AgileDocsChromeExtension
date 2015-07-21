$(document).ready(function(){
  
  $.ajax({
          type : "GET",
          url : "https://www.pivotaltracker.com/services/v5/me", 
          success : function ( data, status, xhr ) {
                        
              $("#user-name strong").text(data.username);
          },
          error : function ( xhr, status, error ) {
            alert ("Get User Error.\n" + "Status: " + status + "\nError: " + error  );
          }
          });   
            
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {outputActivityChecked: $("#outputActivityChecked").val(), format: $("#format").val()}, function(response) {
      console.log("page response: " + response );
    });
  });
});
