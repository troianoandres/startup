/**
 * 	@name MovieFactory
 * 	@description  						Factory of movies, create instances of multiple movie types
 */
angular.module("moviesModule")
	.factory('MovieFactory', [
		function(){

			/**
			 *  @name 	Movie
			 *
			 *	@method getTitle() 			Returns the Movie's title
			 *	@method setTile(title)	Set up the Movie's title
			 * 
			 *  @param 	{String} 	title
			 */
			
			// TODO - TOFIX: 	Ask if AngularJS uses private properties and how is the proper way to extend the var attributes with an
			// 								literal object passed by argument

			/*
  		var Movie = function Movie(title) {

  			var attributes = {};

  			attributes.title = title || "";

  			this.get = function(attr) {
  				return attributes[attr];
  			};

  			this.set = function(attr, value) {
  				attributes[attr] = value;
  			}

  		};
  		*/
  	
			var Movie = function Movie(title) {

  			this.attributes = {};

  			this.attributes.title = title || "";

  			this.get = function(attr) {
  				return this.attributes[attr];
  			};

  			this.set = function(attr, value) {
  				this.attributes[attr] = value;
  			}

  		};
  		Movie.prototype.getTile = function() {
  			return this.get("title");
  		};
  		Movie.prototype.setTile = function(title) {
  			return this.set("title", title);
  		};  		

  		// Creating the exports object that exposes the interface of the Factory
  		var exports = {};

  		/**
  		 *  createMovie(title)	Return a created Movie object
  		 *  @param  {String} 		title
  		 *  @return {Object}    
  		 */
  		exports.createMovie = function(title) {
  			return new Movie(title);
  		};

  		/**
  		 *  getMovieClass() 		Will return the Movie class
  		 *  @return {Function}
  		 */
  		exports.getMovieClass = function() {
  			return Movie;
  		}

  		return exports;
		}
	]);