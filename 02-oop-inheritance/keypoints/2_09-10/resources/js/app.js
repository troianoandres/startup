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

// Social definition
var Social = function Social() { 
	//this.socialObserver = new SocialObserver();
};
Social.prototype 	=	{
	constructor: Social,
	share: function(friendName) {

	},
	like: function() {

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

// Movie definition
var Movie = function Movie(hashmap, title) {
	this.hashmap = hashmap;
	this.title = title;
	this.observerList 	=	 new List();
};
Movie.prototype = {
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
	set: function(attr, value) {
		this[attr] 	=	value;
	},
	get: function(attr) {
		return this[attr];
	}
};
implement(Movie, Social);

// DownloadableMovie definition
var DownloadableMovie = function DownloadableMovie(hashmap, title) {
	Movie.call(this, hashmap, title);
};
extend(DownloadableMovie, Movie);
DownloadableMovie.prototype.download 	=	function() {
	var length 	=	 this.observerList.count();
	for(var index = 0; index < length; index++){
		this.observerList.get(index).movieDownload(this);
	}	
};

// Creating the main observer for all moviews
var movieObserver 	=	 new MovieObserver();

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

starWarsMovie.play();
scaryMovieMovie.play();
scaryMovieMovie.stop();
harryPotterMovie.play();
starWarsMovie.stop();
harryPotterMovie.stop();
scaryMovieMovie.download();



var Movie2 = (function(title) {
	var properties 	=	{};
	properties.title;
	properties.hashmap;

  function Movie2(title) {
  	properties.title = title;
  };

  Movie2.prototype.constructor = Movie2;
	Movie2.prototype.get 	=	function(attr) {
		return properties[attr];
	};
	
  return Movie2;
})();

var moviee = new Movie2("asd");

var DownloadableMovie2 = (function(title) {
	var properties 	=	{};
	properties.title;
	properties.hashmap;

  function DownloadableMovie2(title) {
  	Movie2.call(this, title);
  };
  extend(DownloadableMovie2, Movie2);
	DownloadableMovie2.prototype.constructor = DownloadableMovie2;
	DownloadableMovie2.prototype.download 	=	function(attr) {
		return properties[attr];
	};
	
  return DownloadableMovie2;
})();