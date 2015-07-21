

$(document).ready(function(){
  var name = $(".raw_context_name").text();

  console.log("Agile Docs Loaded");

  // The following code was stolen from John Franklin's Story Tools for Pivotal Tracker extension
  var userToken;
  
  if(localStorage["refreshed"] === null)
  {
      localStorage["refreshed"] = false;
  }
  
  var tokenIsLoadable = true;
  
  getToken = function()
  {
      $.get("https://www.pivotaltracker.com/profile", function(data) {
           
           var v = data.indexOf("<h4>API token</h4>");
           if(v == -1)
           {
               if(!localStorage["refreshed"])//Prevents endless refreshing even if this method doesn't always work.
               {
                   localStorage["refreshed"] = true;
                   location.reload(true);
               }
               else if(tokenIsLoadable)
               {
                   var q = confirm("For this app to work, you need to add an API token to Pivotal Tracker. Clicking OK will open a page where you can do this; just scroll to the bottom and click the bottom button in the API token section.");
                   if(q)
                   {
                       window.open("https://www.pivotaltracker.com/profile");
                   }
                   tokenIsLoadable = false;
               }
               return;
           }
           else
               tokenIsLoadable = true;
               
           
           userToken = $.trim(data.substring(v + 40, data.indexOf("</div>", v) - 1));
           localStorage["Tracker Token"] = userToken;
           localStorage["refreshed"] = false;//allows for refresh if code completes so extension can update.
           
      });
  };
  //getToken();
  
  if(localStorage["Tracker Token"] === null)
  {
       getToken();
  }
  else
  {
      userToken = localStorage["Tracker Token"];
  }
  // end John Franklin code  

  
  MutationObserver = window.WebKitMutationObserver;
  
  var observer = new MutationObserver( function(mutations, observer) {
      // fired when a mutation occurs
      console.log(mutations, observer);

      // if we haven't already added the pdf button
      if ( $(".export_pdf").length === 0 ) {
        // add the PDF button
        $(".tc_page_header .selected_stories_controls").append("<button type='button' title='Export selected stories to PDF' class='export_csv export_pdf' data-reactid='.0.0.0.$-3.7'>PDF</button>");

        // listen to clicks of our PDF button
        $(".export_pdf").click( function() {
          var userToken = localStorage["Tracker Token"];
          var request={apiKey:userToken, projectId:"", stories:[],activity:true, format:"fullDocument"};
          var urlParts = window.location.href.split("/");

          //Send a request for the extension configuration
          chrome.runtime.sendMessage({userToken: userToken}, function(response) {
            if ( typeof response != 'undefined') {
              console.log (response);
              if ( "outputActivityChecked" in response ) {
                request.activity = ( response.outputActivityChecked === 'undefined' ) ? "false" : "true";
              }
              if ( "format" in response ){
                request.format = response.format;
              }
            }
            else
            {
              console.log ( "Agile Docs Extension did not respond.");
            }
          });
      
          request.projectId = urlParts[urlParts.length - 1];
          
          // add the selected stories to the request
          $(".selected").each( function( index ){
            request.stories.push( $(this).parentsUntil("div").parent().attr("data-id") );
          });
             
          console.log (request);
          
          $.ajax({
            type : "POST",
            url : "https://pivotal-pdf.appspot.com/v2/generatePDF", 
            data: JSON.stringify(request),
            success : function ( data, status, xhr ) {
                          
                var win=window.open("data:application/pdf, " + escape(xhr.responseText));
            },
            error : function ( xhr, status, error ) {
              alert ("Agile Docs Generate Error."  );
              alert ("Status: " + status );
              alert ("Error: " + error);
            }
            });    

        });         
      }
      // ...
  });
  
  var header = document.querySelector(".tc_page_header ul[data-reactid='.0.0.0']");

  // define what element should be observed by the observer
  // and what types of mutations trigger the callback
  observer.observe(header, {
    childList: true
    //...
  });
 

});
