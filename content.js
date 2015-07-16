

$(document).ready(function(){
  var name = $(".raw_context_name").text();

  console.log("Agile Docs Loaded");
  
  MutationObserver = window.WebKitMutationObserver;
  
  var observer = new MutationObserver(function(mutations, observer) {
      // fired when a mutation occurs
      console.log(mutations, observer);

      // if we haven't already added the pdf button
      if ( $(".export_pdf").length === 0 ){
        // add the PDF button
        $(".tc_page_header .selected_stories_controls").append("<button type='button' title='Export selected stories to PDF' class='export_csv export_pdf' data-reactid='.0.0.0.$-3.7'>PDF</button>");

        $(".export_pdf").click(function(){
          var request={apiKey:"3e62e57a6b0cb453a7d92de0449ae553", projectId:"", stories:[],activity:true, format:"fullDocument"};
          var urlParts = window.location.href.split("/");
      
          request.projectId = urlParts[urlParts.length - 1];
          
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
