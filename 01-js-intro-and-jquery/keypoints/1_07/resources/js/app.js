/**
 *  getWellcomeMessage() returns message from
 *  	http://bootcamp.aws.af.cm/welcome/yourname
 *   @return {void}
 */
var getWellcomeMessage	=	function getWellcomeMessage(callbackFunction) {

	// Calling via AJAX http://bootcamp.aws.af.cm/welcome/yourname to get the wellcome message
	$.ajax({
  	type: 	"GET",
  	url: 		"http://bootcamp.aws.af.cm/welcome/yourname"
	})
  .done(function(data) {
  	wellcomeMessage 	=	data.response;
  })
  .error(function() {

  })
  .complete(function() {

  })
  .always(function() {

  });

};

;$(document).on("ready", function(){
	
	// Get the hidden section to a lookup cache
	var $hiddenSection 	=	$("section.is-hidden");

	// Fadding in the hidden section
	$hiddenSection.fadeIn(800, function(){

		// Get the alias Textbox
		var $aliasTextbox	 =	$(".alias");
		
		// When the fadeIn event finishes i'll take out the is-hidden class
		$(this).removeClass("is-hidden");

		// Now I set the focus to the input with the .alias class
		$aliasTextbox.focus();

	});

	// Get the btn click element
	var $btnClick 	=	$("#btn-click");

	// Adding click event to #btn-click element
	$btnClick.on("click", function(){

			// Now getting the wellcome message from server
			var wellcomeMessage 	=	getWellcomeMessage();
	});

});