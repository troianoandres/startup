;$(document).on("ready", function(){

	// Create $link
	var $link 	=	 $("<link>", {
		rel: 		"stylesheet",
		type: 	"text/css",
		href: 	"resources/css/style.css"		
	});

	// Adding $link to the body
	$("head").append($link);
	//$link.appendTo("head");

});