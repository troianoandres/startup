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

/**
 * Movie module, used to manipulate movies.
 * Add, delete, get movies.
 */
var moviesModule 	=	 (function () {
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
		this.observerList 	=	 new List();
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

	//Private vars
	var movieObserver 	=	 new MovieObserver();
	var nextHashMap	=	1;
	var movies 			=	new List();	

	/**
	 * createMovie() create a new movie with the title provided by argument
	 * @param  {String} title
	 * @return {Movie}
	 */
	function createMovie(title) {
		var movie 	=	 new Movie(nextHashMap, title);
		movie.get("observerList").add(movieObserver);
		movies.add(movie);
		nextHashMap++;
		return movie;
	};

	/**
	 * deleteMovie() delete a movie if founded into the movies list
	 * @param  {Movie} 	movie
	 * @return {Boolean}
	 */
	function deleteMovie(movie) {
		var index = 0;

		// Search into the list if there is the current movie
	  while( index < movies.count() ){
	    
	    if( movies.get(index) === movie ){
	     	movies.removeAt(index);
	     	return true;
	    }

	    index++;
	  }
	  return false;
	};

	/**
	 * getMovie() returns the movie that matches into the attr provided by argument with the value given
	 * @param  {String} 	attr
	 * @param  {mixed} 		value
	 * @return {Movie}
	 */
	function getMovie(attr, value) {
		var index = 0;
	  while( index < movies.count() ){
	    
	    if( movies.get(index)[attr] === value ){
	      return movies.get(index);
	    }

	    index++;
	  }
	  return null;
	};

	return {
		createMovie: 	createMovie,
		getMovie: 		getMovie,
		deleteMovie: 	deleteMovie
	};
}());

moviesModule.createMovie("Star Wars III");
moviesModule.createMovie("Scary Movie I");
moviesModule.createMovie("Harry Potter and the Deadly Hallows");

var movie 	=	moviesModule.getMovie("title", "Star Wars III");
if(movie !== null){
	 movie.play();
	 movie.stop();
}
