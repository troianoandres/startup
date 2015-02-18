// Get the app if it exists
var app = app || {};

/**
 * MovieList class
 * 	Used to contain all the movies of the app
 *  
 * @extends {Backbone.Collection}
 * @return {Backbone.Collection}
 */
var MovieList = Backbone.Collection.extend({
	
	// Model: Movie
	model: app.Movie,

	// Will use localStorage
	localStorage: new Backbone.LocalStorage('movies-backbone')
});

// Create the movies list
app.movieList = new MovieList();