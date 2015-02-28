// Import required modules
var Director = require("./director");


/**
 * @name    Movie
 * 
 * @method  play()                        play the movie
 * @method  stop()                        stop the movie
 * @method  getTitle()                    returns movie's title
 * @method  getHashmap()                  returns movie's hashmap
 * @method  setTitle(value)               set the movie's title
 * @method  setHashmap(value)             set the movie's hashmap
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
  createDirector: function(name, quotes) {
    return new Director(name, quotes);
  }, 
  setDirector: function(director) {
    this.set("director", director);
  },
  getDirector: function() {
    return this.get("director");
  },
};

module.exports = Movie;