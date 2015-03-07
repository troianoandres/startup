
/**
 * 	Workspace class
 * 		Used as router of the app
 *
 *  @return {Backbone.Router}
 */
var Workspace = Backbone.Router.extend({
	
	/**
	 * Routes:
	 * crate: 		../#create
	 * edit/:id: 	../#edit/1
	 * *other: 		../*
	 */
	routes:{
		'create': 	'createMovieView',
		'edit/:id': 'editMovieView',
    'delete/:id': 'deleteMovieView',
		'*other': 	'index'
	},
	createMovieView: function() {

		// Creates a new MovieCreateView that will handle the movie creation process
		app.movieCreateView = new app.MovieCreateView({el: "#main-content .content-body"});
		app.movieCreateView.render();	
	}, 
	editMovieView: function(id) {

		// Retrieve the movie from the movieList with the provided id
		var movie = app.movieList.get(id);

		// If movie was found this will be true, else movie will be undefined and this will fail redirecting 
		// the user to the index page
		if(movie){

			// Creates a new MovieEditView that will handle the movie update process
			app.movieEditView = new app.MovieEditView({el: "#main-content .content-body", model: movie});
			app.movieEditView.render();				
		} else {

      var movie = app.movieList.get(id);

			// Redirect to index
			this.navigate("", true);
		}
	},
  deleteMovieView: function(id) {

    var movie = app.movieList.get(id);
    movie.destroy();

    this.navigate("index", true);

  },
	index: function() {

		// Creates a new MovieListView that shows all the movies into the browser localStorage
		app.movieListView = new app.MovieListView({el: "#main-content .content-body"});
		app.movieListView.render();
	}
});

app.router = new Workspace();