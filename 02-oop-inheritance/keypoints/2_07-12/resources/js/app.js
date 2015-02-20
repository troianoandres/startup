/**
 *	Exercises:
 * 		07) Refactor Movie class as a Module keeping your previous code for reference.
 *    08) Create a DownloadableMovie that extends from Movie adding a download method.
 *    09) Create a mixin object called Social with the methods: share(friendName) and like().
 *    10) Apply the mixin to Movie object and play with the console output. You should be able to do something like this in the console:
 *		11) Create an Actor class and create some actors from one of your favorite movies.
 *		12) Show how you would add an array of actors to a Movie object.
 */

/**
 * 	@name 	Observer
 *
 *	@method getListensTo() 						Returns the listensTo array
 *	@method addListenTo(listensTo)		Add a listens to method-function pair
 *	@method setListensTo(listensTo)		Set the listensTo array
 * 
 *  @param 	{Array}   	listensTo 		Array of method-function pair to listen to
 */
var Observer = function Observer(listensTo) {

	var attributes = { };
	attributes.listensTo = listensTo || [];

	this.get = function(attr) {
		return attributes[attr];
	};

	this.set = function(attr, value) {
		attributes[attr] = value;
	};
};
Observer.prototype.getListensTo = function() {
	return this.get("listensTo");
};
Observer.prototype.addListenTo = function(listensTo) {
	return this.get("listensTo").push(listensTo);
};
Observer.prototype.setListensTo = function(listensTo) {
	this.set("listensTo", listensTo);
};

/**
 *  @name 	Observable
 *
 *  @method subscribe(observer) 			Append a subscriber to an array of methods call
 *  @method unsubscribe(observer)			Remove the subscriber from the observable
 *  @method publish(method) 					Call the callback function of the subscriber that listens to the published method
 */
var Observable = function Observable() {
	
	// Fix to not overwrite attributes if not null or undefined
	// this.get() will return and check the caller class attributes	
	var attributes = { };
	if("get" in this){
		if(this.get()){
			attributes = this.get();
		}
	}
	attributes.subscribers = [];

	this.get = function(attr) {
		if(attr === undefined){
			return attributes;
		} else {
			return attributes[attr];	
		}		
	};

	this.set = function(attr, value) {
		attributes[attr] = value;
	};
};
Observable.prototype.subscribe = function(observer) {

	// Appends the subscriber to the subscriber's list
	this.get("subscribers").push(observer);
};
Observable.prototype.unsuscribe = function(observer) {

	// Initialize some of the local variables
	var subscribers = this.get("subscribers");
  var index = 0;
  var length = subscribers.length;
   
  // Looking for the observer into the subscriber's list to remove it
  for (index; index < length; index++) {
    if (subscribers[index] === observer) {
      subscribers.splice(index, 1);
      return;
    }
  }
};
Observable.prototype.publish = function(method, args) {

	// Initialize some of the local variables
	var subscribers = this.get("subscribers");
  var subscriberIndex = 0;
  var subscribersLength = subscribers.length;

   
  // Will look for each subscriber into the subscriber's list to look into it's listensTo methods
  for (subscriberIndex; subscriberIndex < subscribersLength; subscriberIndex++) {

  	// Current subscriber
    var observer = subscribers[subscriberIndex];

    // Initialize other local variables
    var listensToIndex = 0;
    var listensToLength = observer.getListensTo().length;

    // Will look for each method if is equal to the published method and then call the callback function of the
    // subscriber/observer
    for (listensToIndex; listensToIndex < listensToLength; listensToIndex++) {
    	if(observer.getListensTo()[listensToIndex].method === method){
    		observer.getListensTo()[listensToIndex].callback(this, args);
    	}
    }

  }
};

/**
 * @name 		Social
 * 
 * @method  share(friendName)					share movie with a friend
 * @method  like()										like the movie
 */
var Social = function Social() { };
Social.prototype.share = function(friendName) { 
	if("publish" in this){
		var message = ["Sharing with ", friendName, "..."].join("");	
		this.publish("share", message);
	}
	
};
Social.prototype.like = function() { };

/**
 * @name 		Actor
 * 
 * @method 	getFullName() 						return the full name of the actor
 * @method 	getAge() 									return the age of the actor
 * @method 	setFullName(fullname) 		set the actor's full name of the actor
 * @method 	setAge(age) 							set the actor's age
 * 
 * @param 	{String} 	fullName 				Full name of the actor
 * @param 	{Integer} age 						Age of the actor
 */
var Actor = function Actor(fullName, age) {

	var attributes = { };
	attributes.fullName = fullName || "";
	attributes.age = age || 0;

	// Privileged methods
	this.get =	function(attr) {
		if(attr === undefined){
			return attributes;
		} else {
			return attributes[attr];
		}
	};
	this.set = function(attr, value) {
		attributes[attr] = value;
	};
};

Actor.prototype.getFullName = function () {
	return this.get("fullName");
};
Actor.prototype.setFullName = function (fullname) {
	this.set("fullName", fullname);
};
Actor.prototype.getAge = function() {
	return this.get("age");
};
Actor.prototype.setAge = function(age) {
		this.set("age", age);
};

/**
 *  @name Movie
 *  @implements {Social}
 *  @extends 		{Observable}
 * 
 * 	@method 	play() 												play the movie
 *  @method 	stop() 												stop the movie
 *  @method 	getTitle() 										returns movie's title
 *  @method 	getRuntime() 									returns movie's runtime
 *  @method 	getDescription()							returns movie's description
 *  @method 	getActors() 									returns all the movie actors
 *  @method 	getActor(index) 							returns the actor at index
 *  @method 	setTitle(title) 							set the movie's title
 *  @method 	setRuntime(runtime) 					set the movie's runtime
 *  @method 	setDescription(description) 	set the movie's description
 *  @method 	addActor(actor) 							add the provided instance of Actor to actorList
 * 
 * 	@param {String} 	title       	Movie's title
 *  @param {Integer} 	runtime     	Movie's runtime
 *  @param {String} 	description 	Movie's description
 */
var Movie = (function() {

	function Movie(title, runtime, description) {
		
		var attributes = { };
		attributes.title = title || "";
		attributes.runtime = runtime || 0;
		attributes.description = description || "";
		attributes.actors = [];

		this.get = function(attr) {
			if(attr === undefined){
				return attributes;
			} else {
				return attributes[attr];	
			}		
		};

		this.set = function(attr, value) {
			attributes[attr] = value;
		};

		Observable.call(this);	
	};

	return Movie;
})();

// Inherit to Movie.prototype the Observable.prototype
extend(Movie, Observable);
augment(Movie, Social, ["share", "like"]);

Movie.prototype.play = function() {
	if( (typeof this.publish) !== "undefined" ){
		this.publish("play");
	}
};
Movie.prototype.stop = function() {
	if( (typeof this.publish) !== "undefined" ){
		this.publish("stop");
	}
};
Movie.prototype.getTitle = function() {
	return this.get("title");
};
Movie.prototype.getRuntime = function() {
	return this.get("runtime");
};
Movie.prototype.getDescription = function() {
	return this.get("description");
};
Movie.prototype.setTitle = function(title) {
	this.set("title", title);
};
Movie.prototype.setRuntime = function(runtime) {
	this.set("runtime", runtime);
};
Movie.prototype.setDescription = function(description) {
	this.set("description", description);
};
Movie.prototype.addActor = function(actor) {
	this.get("actors").push(actor);
};
Movie.prototype.getActor = function(index) {
	return this.get("actors")[index];
};
Movie.prototype.getActors = function() {
	return this.get("actors");
};

/**
 *  @name DownloadableMovie
 * 	@extends {Movie}
 *
 * 	@method 	download() 								download movie
 *  
 * 	@param 		{String} 		title       	Movie's title
 *  @param 		{Integer} 	runtime     	Movie's runtime
 *  @param 		{String} 		description 	Movie's description
 */
var DownloadableMovie = function DownloadableMovie(title, runtime, description) {

	var attributes = { };
	if(this.hasOwnProperty("get")){
		if(this.get()){
			attributes = this.get();
		}
	}

	// Inherit Movie's attributes and methods
	Movie.call(this, title, runtime, description);
};

// Inherit to DownloadableMovie.prototype the Movie.prototype
extend(DownloadableMovie, Movie);

DownloadableMovie.prototype.download = function() {
	if( (typeof this.publish) !== "undefined" ){
		this.publish("download");
	}
};

// Creating a Observer that listens to play, stop, and download methods
var movieObserver = new Observer([
	{
		method: "play", 
		callback: function(movie) {
		 	console.log(["Playing ", movie.getTitle(), "..."].join(""));
		}
	},
	{
		method: "stop", 
		callback: function(movie) {
		 	console.log(["Stopped ", movie.getTitle(), "..."].join(""));
		}
	},
	{
		method: "download",
		callback: function(movie) {
		 	console.log(["Downloading ", movie.getTitle(), "..."].join(""));
		}
	}
]);

// Creating a Observer that listens to share method
var shareObserver = new Observer([
	{
		method: "share", 
		callback: function(social, message) {
		 	console.log(message);
		}
	}
]);

// Creating some of the actors
var ianMcdiarmid = new Actor("Ian McDiarmid", 70);
var christopherLee = new Actor("Christopher Frank Carandini Lee", 92);
var annaKay = new Actor("Anna Kay Faris", 38);
var jonAvery = new Actor("Jon Avery Abrahams", 37);

// Creating 3 movies
var starWarsMovie 		=	new Movie("Star Wars III");
var scaryMovieMovie 	=	new DownloadableMovie("Scary Movie I");
var harryPotterMovie 	=	new Movie("Harry Potter and the Deadly Hallows");

//Adding the actors to movies
starWarsMovie.addActor(ianMcdiarmid);
starWarsMovie.addActor(christopherLee);
scaryMovieMovie.addActor(annaKay);
scaryMovieMovie.addActor(jonAvery);

// Adding the movieObserver to the 3 movies
starWarsMovie.subscribe(movieObserver);
scaryMovieMovie.subscribe(movieObserver);
harryPotterMovie.subscribe(movieObserver);

// Adding the shareObserver to the 3 movies
starWarsMovie.subscribe(shareObserver);
scaryMovieMovie.subscribe(shareObserver);
harryPotterMovie.subscribe(shareObserver);

// Let's have some fun
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

// Get the full names of the first 2 actors of Star Wars III
console.log("First actor into " + starWarsMovie.getTitle() + " is " + starWarsMovie.getActor(0).get("fullName"));
console.log("Second actor into " + starWarsMovie.getTitle() + " is " + starWarsMovie.getActor(1).get("fullName"));