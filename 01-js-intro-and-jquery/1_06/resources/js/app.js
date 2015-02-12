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
	

	// Create $section
	var $section	=		$("<section>", {
		style: 	"display:none;",
		id: 		"main-section"
	});

	// Appending the text to the section
	$section.append("Hello World!");
	//$section.html("Hello World!");
	
	// Appending $section to the body
	$section.appendTo("body");
	//$("body").append($section);

	// Create $button
	var $button	=		$("<button>");

	// Appending the text to the button
	$button.html("Show section!");
	
	// Appending $button to the body
	$button.appendTo("body");
	//$("body").append($button);

	// Fading in the main section of the page
	$("#main-section").fadeIn(1800, function(){
		$(".alias").focus();
	});

});