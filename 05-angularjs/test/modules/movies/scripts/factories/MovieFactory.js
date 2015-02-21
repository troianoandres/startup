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
			 *	@method getTitle() 					Returns the Movie's title
			 *	@method getRuntime() 				Returns the Movie's runtime
			 *	@method getyear() 					Returns the Movie's year
			 *	@method getPlot() 					Returns the Movie's plot
			 *	@method getImage() 					Returns the Movie's image
			 *	@method setTile(title)			Set up the Movie's title
			 *	@method setRuntime(runtime)	Set up the Movie's runtime
			 *	@method setYear(year)				Set up the Movie's year
			 *	@method setPlot(plot)				Set up the Movie's plot
			 *	@method setImage(image)			Set up the Movie's image
			 * 
			 *  @param 	{String} 	title
			 *  @param 	{Integer} runtime
			 *  @param 	{Integer} year
			 *  @param 	{String} 	plot
			 *  @param 	{String} 	image
			 */
			
			// TODO - TOFIX: 	Ask if AngularJS uses private properties and how is the proper way to extend the var attributes with an
			// 								literal object passed by argument

			/*
  		var Movie = function Movie(title, runtime, year, plot, image) {

  			var attributes = {};

  			attributes.title 		= title 	|| "";
				attributes.runtime 	= runtime || "";
  			attributes.year 		= year 		|| "";
  			attributes.plot	 		= plot 		|| "";
  			this.attributes.image	 	= image 	|| "";

  			this.get = function(attr) {
  				return attributes[attr];
  			};

  			this.set = function(attr, value) {
  				attributes[attr] = value;
  			}

  		};
  		*/
  	
			var Movie = function Movie(title, runtime, year, plot, image) {

  			this.attributes = {};

  			this.attributes.title 	= title 	|| "";
				this.attributes.runtime = runtime || "";
  			this.attributes.year 		= year 		|| "";
  			this.attributes.plot	 	= plot 		|| "";
  			this.attributes.image	 	= image 	|| "";


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
  			this.set("title", title);
  		};
  		Movie.prototype.getRuntime = function() {
  			return this.get("runtime");
  		};
  		Movie.prototype.setRuntime = function(runtime) {
  			this.set("runtime", runtime);
  		};
  		Movie.prototype.getYear = function() {
  			return this.get("year");
  		};
  		Movie.prototype.setYear = function(year) {
  			this.set("year", year);
  		};
  		Movie.prototype.getPlot = function() {
  			return this.get("plot");
  		};
  		Movie.prototype.setPlot = function(plot) {
  			this.set("plot", plot);
  		}; 
  		Movie.prototype.getImage = function() {
  			return this.get("image");
  		};
  		Movie.prototype.setImage = function(image) {
  			this.set("image", image);
  		}; 

  		// Creating the exports object that exposes the interface of the Factory
  		var exports = {};

  		/**
  		 *  createMovie(title)	Return a created Movie object
  		 *  @param  {String} 		title
  		 *  @return {Object}    
  		 */
  		exports.createMovie = function(title, runtime, year, plot, image) {
  			return new Movie(title, runtime, year, plot, image);
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
