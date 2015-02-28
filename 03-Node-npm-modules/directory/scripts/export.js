// Imports
var Movie = require("./modules/movie");
var $ = require("../node_modules/jquery/dist/jquery");

// Creating movie & it's director
var alien = new Movie("Alien vs Depredator");
var ridleyScott = alien.createDirector("Ridley Scott", ['Cast is everything.', 'Do what ...']);
alien.setDirector(ridleyScott);
alien.getDirector().speak();

$(document).on("ready", function() {

	// Adding the quotes to the body
	$.each(alien.get('director').get("quotes"), function(index, quote) {

		var body 	=	 $("body");

		body.append(quote + "<br/>");

	});

});

