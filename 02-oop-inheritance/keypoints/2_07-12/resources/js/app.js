/**
 *	Exercises:
 *		11) Create an Actor class and create some actors from one of your favorite movies.
 *		12) Show how you would add an array of actors to a Movie object.
 */

/**
 * @name 		List
 * 
 * @method 	add(object) 								adds an item to the next index of the array
 * @method 	count() 										returns the length of the item's array
 * @method 	get(index) 									return the item into list[index], if not found returns undefined
 * @method 	getBy(value, attr) 					return the item that matches the value into the attr member, if not 
 *          															found returns null
 * @method 	indexOf(object, startIndex) returns the index of the object to find, starting from startIndex. If not found
 *          															returns -1
 * @method 	removeAt(index) 						removes the item on index
 * 
 * @return 	{Object}
 */
var List = (function() {

	// Constructor
	var List = function List() {
		this.list = [];
	};

	// Constructor name setup & public methods
	List.prototype 	=	{
		constructor: List,
		add: 		function (object) {
			return this.list.push( object );
		},
		count: 	function () {
			return this.list.length;
		},
		get: 		function (index) {
		  if( index > -1 && index < this.list.length ){
		    return this.list[ index ];
		  }		  
		},
		getBy: 	function (value, attr) {
			var index = 0;
		  while( index < this.list.length ){
		    
		    if( this.list[index][attr] === value ){
		      return this.list[index];
		    }

		    index++;
		  }
		  return null;
		},
		indexOf: 	function (object, startIndex) {
		  var index = startIndex || 0;
		 
		  while( index < this.list.length ){
		    
		    if( this.list[index] === object ){
		      return index;
		    }

		    index++;
		  }
		  return -1;
		},
		removeAt: function (index) {
			this.list.splice( index, 1 );
		}
	};

	return List;
})();

/**
 * @name 		MovieObserver
 * 
 * @method 	movieStopped(movie) 			show message when movie has stopped
 * @method 	moviePlaying(movie) 			show message when movie starts playing
 * @method 	movieDownload(movie)			show message when start to download the movie
 * 
 * @return 	{Object}
 */
var MovieObserver = (function () {

	// Constructor
	var MovieObserver 	=	 function MovieObserver() { };

	// Constructor name setup and public methods
	MovieObserver.prototype 	=	{
		constructor: MovieObserver,
		movieStopped: 	function (movie) {
			console.log(["Stopped ", movie.getTitle(), "..."].join(""));
		},
		moviePlaying: 	function (movie) {
			console.log(["Playing ", movie.getTitle(), "..."].join(""));
		},
		movieDownload: 	function (movie) {
			console.log(["Downloading ", movie.getTitle(), "..."].join(""));
		}	
	};

	return MovieObserver;
})();

/**
 * @name 		Social
 * 
 * @method  share(friendName)					share movie with a friend
 * @method  like()										like the movie
 * 
 * @return  {Object}
 */
var Social = (function() {
	
	// Constructor
	var Social = function Social() { };

	// Constructor function setup and public methods
	Social.prototype 	=	{
		constructor: Social,
		share: function(friendName) { 
			console.log(["Sharing ", this.get("title"), " with ", friendName, "..."].join(""));
		},
		like: function() { }
	};

	return Social;
})();

/**
 * @name 		Actor
 * 
 * @method 	getFullName() 						return the full name of the actor
 * @method 	getAge() 									return the age of the actor
 * @method 	setFullName(value) 				set the actor's full name of the actor
 * @method 	setAge(value) 						set the actor's age
 * 
 * @param 	{String} 	fullName 				Full name of the actor
 * @param 	{Integer} age 						Age of the actor
 * @return 	{Object}
 */
var Actor = (function() {

	//Constructor
	var Actor = function Actor(fullName, age) {

  	// Private members
  	var attributes = {};
  	attributes.fullName = fullName || "";
  	attributes.age = age || 0;

		// Privileged methods
  	this.get =	function(attr) {
  		return attributes[attr];
  	};
  	this.set = function(attr, value) {
  		attributes[attr] = value;
  	};
	};

	// Constructor name setup
	Actor.prototype = {
		constructor: Actor,
		getFullName: function () {
			return this.get("fullName");
		},
		setFullName: function (value) {
			this.set("fullName", value);
		},		
		getAge: function() {
			return this.get("age");
		},
		setAge: function(value) {
			this.set("age", value);
		}		
	};

	return Actor;
})();

/**
 * @name 		Movie
 * @implements {Social}
 * 
 * @method 	play() 												play the movie
 * @method 	stop() 												stop the movie
 * @method 	getTitle() 										returns movie's title
 * @method 	getHashmap() 									returns movie's hashmap
 * @method 	getMovieObservers() 					returns all the movie observers
 * @method 	getMovieObserver(index) 			returns the movie observers at index
 * @method 	getActors() 									returns all the movie actors
 * @method 	getActor(index) 							returns the actor at index
 * @method 	setTitle(value) 							set the movie's title
 * @method 	setHashmap(value) 						set the movie's hashmap
 * @method 	addMovieObserver(observer) 		add the provided instance of MovieObserver to the observerList
 * @method 	addActor(actor) 							add the provided instance of Actor to actorList
 * @method 	removeMovieObserver(observer) remove the provided MovieObserver if founded
 * @method 	removeActor(actor) 						remove the provided Actor if founded 
 *
 * @param  {String} 											title Movie's title
 * @param  {Integer} 											hashmap Movie's hashmap
 * @return {Object}
 */
var Movie = (function() {

	// Constructor
  var Movie = function Movie(hashmap, title) {

  	// Private members
  	var attributes = {};
  	attributes.title = title || "";
  	attributes.hashmap = hashmap || 0;
  	attributes.observerList 	=	new List();
  	attributes.actorList 	=	new List();

		// Privileged methods
  	this.get =	function(attr) {
  		return attributes[attr];
  	};
  	this.set = function(attr, value) {
  		attributes[attr] = value;
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
		},
		getTitle: function() {
			return this.get("title");
		},
		setTitle: function(value) {
			return this.set("title", value);
		},
		getHashmap: function() {
			return this.get("hashmap");
		},
		setHashmap: function(value) {
			return this.set("hashmap", value);
		},
		getMovieObservers: function() {
			return this.get("observerList");
		},
		getMovieObserver: function(index) {
			return this.get("observerList").get(index);
		},		
		addMovieObserver: function(observer) {
			this.get("observerList").add(observer);
		},
		removeMovieObserver: function(observer) {
			var observers = this.get("observerList");
			observers.removeAt(observers.indexOf(observer));
		},
		getActors: function() {
			return this.get("actorList");
		},
		getActor: function(index) {
			return this.get("actorList").get(index);
		},		
		addActor: function(actor) {
			this.get("actorList").add(actor);
		},
		removeActor: function(actor) {
			var actors = this.get("actorList");
			actors.removeAt(actors.indexOf(actor));
		}
	};

  augment(Movie, Social, ["share", "like"]);	
	
  return Movie;
})();

/**
 * @name 		DownloadableMovie
 * @extends {Movie}
 * 
 * @method 	download() 										download movie
 * 
 * @param  	{String} 		title 						Movie's title
 * @return 	{Object}
 */
var DownloadableMovie = (function() {

	// Constructor
	var DownloadableMovie = function DownloadableMovie(hashmap, title) {
		Movie.call(this, hashmap, title);
	};

	// Inherit Movie's prototype
	extend(DownloadableMovie, Movie);

	// Public method download
	DownloadableMovie.prototype.download 	=	function() {
		var observers = this.getMovieObservers();

		var length 	=	 observers.count();
		for(var index = 0; index < length; index++){
			observers.get(index).movieDownload(this);
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

// Creating some of the actors
var ianMcdiarmid = new Actor("Ian McDiarmid", 70);
var christopherLee = new Actor("Christopher Frank Carandini Lee", 92);
var annaKay = new Actor("Anna Kay Faris", 38);
var jonAvery = new Actor("Jon Avery Abrahams", 37);


// Adding the observer to each of them
starWarsMovie.addMovieObserver(movieObserver);
scaryMovieMovie.addMovieObserver(movieObserver);
harryPotterMovie.addMovieObserver(movieObserver);

//Adding the actors to movies
starWarsMovie.addActor(ianMcdiarmid);
starWarsMovie.addActor(christopherLee);
scaryMovieMovie.addActor(annaKay);
scaryMovieMovie.addActor(jonAvery);

// Get the full names of the first 2 actors of Star Wars III
console.log("First actor into " + starWarsMovie.getTitle() + " is " + starWarsMovie.getActor(0).get("fullName"));
console.log("Second actor into " + starWarsMovie.getTitle() + " is " + starWarsMovie.getActor(1).get("fullName"));

// Executing some methods
starWarsMovie.play();
scaryMovieMovie.play();
scaryMovieMovie.stop();
harryPotterMovie.play();
starWarsMovie.stop();
harryPotterMovie.stop();
scaryMovieMovie.download();

// Sharing movies
scaryMovieMovie.share("Damian Cardona");
starWarsMovie.share("Ivan L");
