/**
 * Done like http://javascript.crockford.com/private.html says
 * Need to validate it
 */

// List of observers, ObserverList definition
var List 	=	function List() {	
	this.list 	=	[];
};
List.prototype 	=	{
	constructor: List,
	add: 		function add(object) {
		return this.list.push( object );
	},
	count: 	function count() {
		return this.list.length;
	},
	get: 		function get(index) {
	  if( index > -1 && index < this.list.length ){
	    return this.list[ index ];
	  }
	},
	getBy: 	function getBy(value, attr) {
		var index = 0;
	  while( index < this.list.length ){
	    
	    if( this.list[index][attr] === value ){
	      return this.list[index];
	    }

	    index++;
	  }
	  return -1;
	},
	indexOf: 	function indexOf(object, startIndex) {
	  var index = startIndex;
	 
	  while( index < this.list.length ){
	    
	    if( this.list[index] === object ){
	      return index;
	    }

	    index++;
	  }
	  return -1;
	},
	removeAt: function removeAt(index) {
		this.list.splice( index, 1 );
	}
};

// MovieObserver definition
var MovieObserver 	=	 function MovieObserver() { };
MovieObserver.prototype 	=	{
	constructor: MovieObserver,
	movieStopped: 	function (movie) {
		console.log("Stopped " + movie.get("title") + "...");
	},
	moviePlaying: 	function (movie) {
		console.log("Playing " + movie.get("title") + "...");
	},
	movieDownload: 	function (movie) {
		console.log("Downloading " + movie.get("title") + "...");
	}	
};

/**
 * Movie class
 * Methods:
 * @method privileged get(attr), returns the value into members[attr]
 * @method privileged set(attr, value), set value into members[attr]
 * @method public play(), play the movie
 * @method public stop(), stop the movie
 * @param  {String} title) Movie's title
 * @return {Object}
 */
var Movie = (function(hashmap, title) {

	// Constructor
  var Movie = function Movie(hashmap, title) {

  	// Private members
  	var members = {};
  	members.title = title;
  	members.hashmap = hashmap;
  	members.observerList 	=	new List();

  	// Reference to this
		var that = this;

		// Privileged methods
  	this.get =	function(attr) {

  		return members[attr];
  	};
  	this.set = function(attr, value) {

  		members[attr] = value;
  	};

  };

  // Constructor function setup and public methods
	Movie.prototype	=	{
		constructor: Movie,
		play: function() {
			var length 	=	 this.get("observerList").count();
			for(var index = 0; index < length; index++){
				this.get("observerList").get(index).moviePlaying(this);
			}
		},
		stop: function() {
			var length 	=	 this.get("observerList").count();
			for(var index = 0; index < length; index++){
				this.get("observerList").get(index).movieStopped(this);
			}
		}
	};  
	
  return Movie;
})();

/**
 * DownloadableMovie class, extends Movie
 * @method download(), download movie
 * @param  {String} title Movie's title
 * @return {Object}
 */
var DownloadableMovie = (function(hashmap, title){

	// Constructor
	var DownloadableMovie = function DownloadableMovie(hashmap, title) {
		Movie.call(this, hashmap, title);
	};

	// Inherit Movie's prototype
	extend(DownloadableMovie, Movie);

	// Public method download
	DownloadableMovie.prototype.download 	=	function() {
		var length 	=	 this.get("observerList").count();
		for(var index = 0; index < length; index++){
			this.get("observerList").get(index).movieDownload(this);
		}	
	};

	return DownloadableMovie;
})();

// Main process

// Creating the main observer for all moviews
var movieObserver 	=	 new MovieObserver();

// Creating 3 moviews
var starWarsMovie 		=	new Movie(1, "Star Wars III");
var scaryMovieMovie 	=	new DownloadableMovie(2, "Scary Movie I");
var harryPotterMovie 	=	new Movie(3, "Harry Potter and the Deadly Hallows");

// Adding the observer to each of them
starWarsMovie.get("observerList").add(movieObserver);
scaryMovieMovie.get("observerList").add(movieObserver);
harryPotterMovie.get("observerList").add(movieObserver);

// Executing some methods
starWarsMovie.play();
scaryMovieMovie.play();
scaryMovieMovie.stop();
harryPotterMovie.play();
starWarsMovie.stop();
harryPotterMovie.stop();
scaryMovieMovie.download();