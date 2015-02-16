/**
 * Into this file is the exercises from number 3 to 6, this file includes:
 * 		-->Add a MovieObserver class that listens for "playing" and “stopped” events.
 * 		-->Publish "playing" event on Movie.play(). You should be able to do something like this in the console:
 * 		-->Publish "stopped" event on Movie.stop().
 * 		-->Log to console when each event is fired.
 */

// List of observers, ObserverList definition
var ObserverList 	=	function ObserverList() {	

	this.observerList 	=	[];
};
ObserverList.prototype 	=	{
	constructor: ObserverList,
	add: 		function add(observer) {
		return this.observerList.push( observer );
	},
	count: 	function count() {
		return this.observerList.length;
	},
	get: 		function get(index) {
	  if( index > -1 && index < this.observerList.length ){
	    return this.observerList[ index ];
	  }
	},
	indexOf: 	function indexOf(observer, startIndex) {
	  var index = startIndex;
	 
	  while( index < this.observerList.length ){
	    
	    if( this.observerList[index] === observer ){
	      return index;
	    }

	    index++;
	  }
	  return -1;
	}, 
	removeAt: function removeAt(index) {
		this.observerList.splice( index, 1 );
	}
};

// MovieObserver definition
var MovieObserver 	=	 function MovieObserver() { };
MovieObserver.prototype 	=	{
	constructor: MovieObserver,
	movieStopped: 	function movieStopped(movie) {
		console.log("Stopped " + movie.get("title") + "...");
	},
	moviePlaying: 	function moviePlaying(movie) {
		console.log("Playing " + movie.get("title") + "...");
	}
};

// Movie definition
var Movie = function Movie(hashmap, title) {
	this.hashmap = hashmap;
	this.title = title;
	this.observerList 	=	 new ObserverList();
};
Movie.prototype	=	{
	constructor: Movie,
	play: function() {
		var length 	=	 this.observerList.count();
		for(var index = 0; index < length; index++){
			this.observerList.get(index).moviePlaying(this);
		}
	},
	stop: function() {
		var length 	=	 this.observerList.count();
		for(var index = 0; index < length; index++){
			this.observerList.get(index).movieStopped(this);
		}
	},
	set: function(attr, value){
		this[attr] 	=	value;
	},
	get: function(attr){
		return this[attr];
	}
};

// Creating the main observer for all moviews
var movieObserver 	=	 new MovieObserver();

// Creating 3 movies
var starWarsMovie 		=	new Movie(1, "Star Wars III");
var scaryMovieMovie 	=	new Movie(2, "Scary Movie I");
var harryPotterMovie 	=	new Movie(3, "Harry Potter and the Deadly Hallows");

// Adding the observer to each of them
starWarsMovie.get("observerList").add(movieObserver);
scaryMovieMovie.get("observerList").add(movieObserver);
harryPotterMovie.get("observerList").add(movieObserver);

starWarsMovie.play();
scaryMovieMovie.play();
scaryMovieMovie.stop();
harryPotterMovie.play();
starWarsMovie.stop();
harryPotterMovie.stop();