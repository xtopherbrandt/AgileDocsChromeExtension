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


  $("#outputActivityChecked").change( function () {
    localStorage["outputActivityChecked"] = $("#outputActivityChecked:checked").val();
  });
    
  $("input[name='format']").change( function () {
    localStorage["format"] = $("input[name='format']:checked").val();
  });

});

