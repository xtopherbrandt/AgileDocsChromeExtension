$(document).ready(function(){
  $("#set").click(function(){
    $.ajax({
            type : "GET",
            url : "https://www.pivotaltracker.com/services/v5/me", 
            success : function ( data, status, xhr ) {
                          
                $("#user-name strong").text(data.name);
            },
            error : function ( xhr, status, error ) {
              alert ("Get User Error.\n" + "Status: " + status + "\nError: " + error  );
            }
            });   
  });
});