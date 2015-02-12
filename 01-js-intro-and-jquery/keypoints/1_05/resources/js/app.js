;$(document).on("ready", function(){
	
	// Get the hidden section to a lookup cache
	var $hiddenSection 	=	$("section.is-hidden");

	// Fadding in the hidden section
	$hiddenSection.fadeIn(800, function(){

		// When the fadeIn event finishes i'll take out the is-hidden class
		$(this).removeClass("is-hidden");
		
	});

});