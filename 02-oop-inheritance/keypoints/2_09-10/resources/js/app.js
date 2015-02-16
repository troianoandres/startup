/**
 *	Exercises:
 *		09) Create a mixin object called Social with the methods: share(friendName) and like().
 *		10) Apply the mixin to Movie object and play with the console output.
 *
 * 	To do:
 * 		Ask about the definition of share into the Social class (interface). Should overwrite it?
 */

/**
 * List class
 *
 * @method add(object) adds an item to the next index of the array
 * @method count() returns the length of the item's array
 * @method get(index) return the item into list[index], if not found returns undefined
 * @method getBy(value, attr) return the item that matches the value into the attr member, if not found returns null
 * @method indexOf(object, startIndex) returns the index of the object to find, starting from startIndex. If not found
 *         returns -1
 * @method removeAt(index) removes the item on index
 * @return {Object}
 */
var List = (function() {

	// Constructor
	var List = function List() {
		this.list = [];
	};

	// Constructor name setup & public methods
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
		  return null;
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

	return List;
})();

/**
 * MovieObserver class
 * 
 * @method movieStopped(movie), 	show message when movie has stopped
 * @method moviePlaying(movie), 	show message when movie starts playing
 * @method movieDownload(movie),	show message when start to download the movie
 * @return {Object}
 */
var MovieObserver = (function () {

	// Constructor
	var MovieObserver 	=	 function MovieObserver() { };

	// Constructor name setup and public methods
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

	return MovieObserver;
})();

/**
 * Social class
 * 
 * @method share(friendName)
 * @method like()
 * @return {Object}
 */
var Social = (function() {
	
	// Constructor
	var Social = function Social() { };

	// Constructor function setup and public methods
	Social.prototype 	=	{
		constructor: Social,
		share: function(friendName) { 
			console.log("Sharing " + this.get("title") + " with " + friendName + "...");
		},
		like: function() { }
	};

	return Social;
})();

/**
 * Movie class
 *
 * @implements {Social}
 * @method privileged get(attr), returns the value into members[attr]
 * @method privileged set(attr, value), set value into members[attr]
 * @method public play(), play the movie
 * @method public stop(), stop the movie
 * @param  {String} 	title Movie's title
 * @param  {Integer} 	hashmap Movie's hashmap
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

  augment(Movie, Social, ["share", "like"]);	
	
  return Movie;
})();

/**
 * DownloadableMovie class
 * 
 * @extends {Movie}
 * @method download(), download movie
 * @param  {String} title Movie's title
 * @return {Object}
 */
var DownloadableMovie = (function(hashmap, title) {

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

scaryMovieMovie.share("Damian Cardona");
starWarsMovie.share("Ivan L");