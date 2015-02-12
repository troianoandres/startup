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
	
	// Fadding in the hidden section
	$("section.is-hidden").fadeIn(800, function(){
		
		// When the fadeIn event finishes i'll take out the is-hidden class
		$(this).removeClass("is-hidden");

		// Now I set the focus to the input with the .alias class
		$(".alias").focus();

	});

	// Adding click event to #btn-click element
	$("#btn-click").on("click", function(){

			// Now getting the wellcome message from server
			var wellcomeMessage 	=	getWellcomeMessage();
	});


});