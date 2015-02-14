;$(document).on("ready", function(){
	
	// Get the hidden section to a lookup cache
	var $hiddenSection 	=	$("section.is-hidden");

	// Fadding in the hidden section
	$hiddenSection.fadeIn(800, function(){

		// Get the alias Textbox
		var $aliasTextbox	 =	$(".alias");
		
		// When the fadeIn event finishes i'll take out the is-hidden class
		$(this).removeClass("is-hidden");

		if($aliasTextbox.length){
			
			// Now I set the focus to the input with the .alias class
			$aliasTextbox.eq(1).focus();
		}

	});

});