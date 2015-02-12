/**
 * 	getWellcomeMessage() returns message from
 *   	http://bootcamp.aws.af.cm/welcome/yourname
 *  @return {void}
 */
var getWellcomeMessage	=	function getWellcomeMessage(callbackFunction) {

	// Calling via AJAX http://bootcamp.aws.af.cm/welcome/yourname to get the wellcome message
	$.ajax({
  	type: 			"GET",
  	url: 				"http://bootcamp.aws.af.cm/welcome/yourname",
  	dataType: 	"json"
	})
  .done(function(data) {


  	callbackFunction(data);


  })
  .error(function() {

  })
  .complete(function() {

  })
  .always(function() {

  });

};

/**
 *  insertWellcomeMessage() appends the response message into the hiddenSection content-info element
 *  @param  {Json} 		data 	Json object containing the response data from the server
 *  @return {void}
 */
var insertWellcomeMessage 	=	function insertWellcomeMessage(data) {

	// Get the hidden section to append the response message
	var 	$hiddenSection 	=	$("#hidden-section");

	// Appending to hidden section content-info the response message
	$hiddenSection.find(".content-info").html(data.response);

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