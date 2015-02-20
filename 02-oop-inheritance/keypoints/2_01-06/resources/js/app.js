/**
 * Into this file is the exercises from number 3 to 6, this file includes:
 * 		01) Create a Movie object
 * 		02) Instantiate some of your favorite movies and play with them in the console. 
 * 		03) Add a MovieObserver class that listens for "playing" and “stopped” events.
 * 		04) Publish "playing" event on Movie.play().
 * 		05) Publish "stopped" event on Movie.stop().
 * 		06) Log to console when each event is fired.
 */

/**
 * 	@name Observer
 * 	
 *  @param 	{Array}   	listensTo 		Array of method-function pair to listen to
 */
var Observer = function Observer(listensTo) {

	// Observer's attributes
	this.attributes = {
		listensTo: listensTo || []
	};
};

/**
 *  @name Observable
 *
 *  @method subscribe(observer) 			Append a subscriber to an array of methods call
 *  @method unsubscribe(observer)			Remove the subscriber from the observable
 *  @method publish(method) 					Call the callback function of the subscriber that listens to the published method
 */
var Observable = function Observable() {
	this.subscribers = [];
};
Observable.prototype = {
	constructor: Observable,
	subscribe: function(observer) {

		// Appends the subscriber to the subscriber's list
		this.subscribers.push(observer);
	},
	unsuscribe: function(observer) {

		// Initialize some of the local variables
    var index = 0;
    var length = this.subscribers.length;
     
    // Looking for the observer into the subscriber's list to remove it
    for (index; index < length; index++) {
      if (this.subscribers[index] === observer) {
        this.subscribers.splice(index, 1);
        return;
      }
    }
	},
	publish: function(method) {

		// Initialize some of the local variables
    var subscriberIndex = 0;
    var subscribersLength = this.subscribers.length;
     
    // Will look for each subscriber into the subscriber's list to look into it's listensTo methods
    for (subscriberIndex; subscriberIndex < subscribersLength; subscriberIndex++) {

    	// Current subscriber
      var observer = this.subscribers[subscriberIndex];

      // Initialize other local variables
      var listensToIndex = 0;
      var listensToLength = observer.attributes.listensTo.length;

      // Will look for each method if is equal to the published method and then call the callback function of the
      // subscriber/observer
      for (listensToIndex; listensToIndex < listensToLength; listensToIndex++) {
      	if(observer.attributes.listensTo[listensToIndex].method === method){
      		observer.attributes.listensTo[listensToIndex].callback(this);
      	}
      }

    }
	}
};

/**
 *  @name Movie
 * 
 * 	@param {[type]} title       [description]
 *  @param {[type]} runtime     [description]
 *  @param {[type]} description [description]
 */
var Movie = function Movie(title, runtime, description) {
	Observable.call(this);
	
	// Movie's attributes
	this.attributes = {
		title: title || "",
		runtime: runtime || 0,
		description: description || ""
	};

};

// Inherit to Movie.prototype the Observable.prototype
extend(Movie, Observable);

Movie.prototype.play = function() {
	this.publish("play");
};

Movie.prototype.stop = function() {
	this.publish("stop");
};

// Creating a Observer that listens to play, stop, and download methods
var movieObserver = new Observer([
	{
		method: "play", 
		callback: function(movie) {
		 	console.log(["Playing ", movie.attributes.title, "..."].join(""));
		}
	},
	{
		method: "stop", 
		callback: function(movie) {
		 	console.log(["Stopped ", movie.attributes.title, "..."].join(""));
		}
	},
	{
		method: "download",
		callback: function(movie) {
		 	console.log(["Downloading ", movie.attributes.title, "..."].join(""));
		}
	}
]);

// Creating 3 movies
var starWarsMovie 		=	new Movie("Star Wars III");
var scaryMovieMovie 	=	new Movie("Scary Movie I");
var harryPotterMovie 	=	new Movie("Harry Potter and the Deadly Hallows");

// Adding the movieObserver to the 3 movies
starWarsMovie.subscribe(movieObserver);
scaryMovieMovie.subscribe(movieObserver);
harryPotterMovie.subscribe(movieObserver);

// Let's have some fun
starWarsMovie.play();
scaryMovieMovie.play();
scaryMovieMovie.stop();
harryPotterMovie.play();
starWarsMovie.stop();
harryPotterMovie.stop();