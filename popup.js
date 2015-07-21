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


  $("#outputActivityChecked:checked").val( localStorage["outputActivityChecked"] );
    
  $("#outputActivityChecked").change( function () {
    localStorage["outputActivityChecked"] = $("#outputActivityChecked:checked").val();
  });
    
  $("#format").change( function () {
    localStorage["format"] = $("#format:selected").val();
  });

});

