// Imports
var Movie = require("./modules/movie");
var Director = require("./modules/director");
var $ = require("../node_modules/jquery/dist/jquery");


// Creating movie & it's director
var alien = new Movie("Alien vs Depredator");
var ridleyScott = new Director("Ridley Scott", ['Cast is everything.', 'Do what ...']);

alien.set('director', ridleyScott);
alien.get('director').speak();

$(document).on("ready", function() {

	// Adding the quotes to the body
	$.each(alien.get('director').get("quotes"), function(index, quote) {

		var body 	=	 $("body");

		body.append(quote + "<br/>");

	});

});

