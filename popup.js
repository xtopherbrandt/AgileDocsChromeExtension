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

  getOptions();
  
  $("#outputActivityChecked").change( function () {
    saveOptions( $("#outputActivityChecked").is(':checked'), $("input[name='format']:checked").attr('id') );
  });
    
  $("input[name='format']").change( function () {
    saveOptions( $("#outputActivityChecked").is(':checked'), $("input[name='format']:checked").attr('id') );
  });

});

saveOptions = function (outputActivity, format){
  chrome.storage.sync.set ({
      outputActivity: outputActivity,
      format: format
    });
    
    //Store the options locally too
    localStorage["outputActivityChecked"] = outputActivity;
    localStorage["format"] = format;
};

getOptions = function (outputActivity, format){
  chrome.storage.sync.get ({
      outputActivity: true,
      format : "fullDocument"
    }, function( options ){
      $("#outputActivityChecked").attr('checked', options.outputActivity);
      $("input#" + options.format ).prop('checked', true);
      
      //Store the options locally too
      localStorage["outputActivityChecked"] = options.outputActivity;
      localStorage["format"] = options.format;
  } );

};