;$(document).on("ready", function(){
	
	// Fadding in the hidden section
	$("section.is-hidden").fadeIn(800, function(){

		// When the fadeIn event finishes i'll take out the is-hidden class
		$(this).removeClass("is-hidden");
		
	});

});