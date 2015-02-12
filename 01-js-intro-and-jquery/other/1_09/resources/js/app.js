/**
 * 	getWellcomeMessage() returns message from
 *   	http://bootcamp.aws.af.cm/welcome/yourname
 *  @return {void}
 */
var getWellcomeMessage	=	function getWellcomeMessage(callbackFunction) {

	// Calling via AJAX http://bootcamp.aws.af.cm/welcome/yourname to get the wellcome message
	$.ajax({
  	type: 			"GET",
  	url: 				"http://bootcampwelcome/yourname",
  	dataType: 	"json"
	})
  .done(function(data) {

  	// Call to the callbackFunction
  	callbackFunction(data.response, false);

  })
  .error(function(xhr, textStatus, errorThrown) {
  	
  	// Error thrown not giving anything, setting custom message for error
  	console.log("Error message: " + errorThrown);
  	console.log(xhr);
  	console.log("Status: " + textStatus);

  	// Call to the callbackFunction
  	callbackFunction("The Ajax call throw up an error", true);
  })
  .complete(function() {

  })
  .always(function() {

  });

};

/**
 *  insertWellcomeMessage() appends the response message into the hiddenSection content-info element
 *  @param  {String} 		message 	String message from server / Error string from server
 *  @param 	{Boolean} 	error 		If there was an error it must be true
 *  @return {void}
 */
var insertWellcomeMessage 	=	function insertWellcomeMessage(message, error) {

	// Get the hidden section to append the response message
	var 	$hiddenSection 	=	$("#hidden-section");

	// Appending to hidden section content-info the response message with correct css format
	$hiddenSection.find(".content-info").html(message);	

	// Setting red color to the section if there was an error
	if(error){
		$hiddenSection.css({color: "red"});
	}
	
}


;$(document).on("ready", function(){
	
	// Get the hidden section to a lookup cache
	var $hiddenSection 	=	$("#hidden-section");

	// Get the btn click element
	var $btnClick 	=	$("#btn-click");	

	// Validate if hiddenSection is actually hidden
	if($hiddenSection.has(".is-hidden")){
	
		// Fadding in the hidden section
		$hiddenSection.fadeIn(800, function(){

			// Get the alias Textbox
			var $aliasTextbox	 =	$(".alias");
			
			// When the fadeIn event finishes i'll take out the is-hidden class
			$(this).removeClass("is-hidden");

			// Now I set the focus to the input with the .alias class
			$aliasTextbox.focus();

		});

	}

	// Adding click event to #btn-click element
	$btnClick.on("click", function(){

			// If the button clicks i'll call getWellcomeMessage, on success it will call insertWellcomeMessage
			// to append the response message to the hidden section content-info element
			getWellcomeMessage(insertWellcomeMessage);
	});

});