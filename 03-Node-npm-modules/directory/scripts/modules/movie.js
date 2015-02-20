// Import required modules
var List = require("./list");
var Director = require("./director");
var Actor = require("./actor");


/**
 * @name    Movie
 * 
 * @method  play()                        play the movie
 * @method  stop()                        stop the movie
 * @method  getTitle()                    returns movie's title
 * @method  getHashmap()                  returns movie's hashmap
 * @method  getActors()                   returns all the movie actors
 * @method  getActor(index)               returns the actor at index
 * @method  setTitle(value)               set the movie's title
 * @method  setHashmap(value)             set the movie's hashmap
 * @method  addActor(actor)               add the provided instance of Actor to actorList
 * @method  removeActor(actor)            remove the provided Actor if founded 
 * @method  setDirector(director)         add the provided instance of Director as director
 * @method  getDirector()                 returns movie's director
 *
 * @param  {String}                       title Movie's title
 * @param  {Integer}                      hashmap Movie's hashmap
 * @return {Object}
 */
var Movie = function Movie(hashmap, title) {

  // Private members
  var attributes = {};
  attributes.title = title || "";
  attributes.hashmap = hashmap || 0;
  attributes.director  = null;
  attributes.actorList  = new List();

  // Privileged methods
  this.get =  function(attr) {
    return attributes[attr];
  };
  this.set = function(attr, value) {
    attributes[attr] = value;
  };
};

// Constructor function setup and public methods
Movie.prototype = {
  constructor: Movie,
  play: function() {

  },
  stop: function() {

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
  },
  setDirector: function(director) {
    this.set("director", director);
  },
  getDirector: function() {
    return this.get("director");
  }
};

module.exports = Movie;