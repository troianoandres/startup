// Import required modules
var Director  =  require("./director");

/**
 * Movie class
 *
 * @method privileged get(attr), returns the value into members[attr]
 * @method privileged set(attr, value), set value into members[attr]
 * @method public play(), play the movie
 * @method public stop(), stop the movie
 * @param  {String} 	title Movie's title
 * @return {Object}
 */
module.exports = (function(title, director) {

	// Constructor
  var Movie = function Movie(title, director) {  	

  	// Private members
  	var members = {};
  	members.title = title;
  	members.director = director || null;

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
		},
		stop: function() {
		}
	};
	
  return Movie;
})();