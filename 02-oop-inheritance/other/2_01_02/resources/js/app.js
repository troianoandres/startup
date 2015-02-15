var Movie = function Movie(hashmap, title) {
	this.hashmap = hashmap;
	this.title = title;
};

Movie.prototype	=	{
	constructor: Movie,
	play: function() {

	},
	stop: function() {

	},
	set: function(attr, value){
		this[attr] 	=	value;
	},
	get: function(attr){
		return this[attr];
	}
};

var movie1 	=	new Movie(1, "Star Wars III");
var movie2 	=	new Movie(2, "Scary Movie I");
var movie3 	=	new Movie(3, "Harry Potter and the Deadly Hallows");