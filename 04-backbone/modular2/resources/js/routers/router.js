define([
	"jquery",	
	"backbone",
	"views/movieListView",
	"views/movieCreateView",
	"views/movieEditView",
	"collections/movieCollection",
	"common",
], function($, Backbone, MovieListView, MovieCreateView, MovieEditView, movies, Common) {

	/**
	 *  @name Workspace
	 *
	 *	@description Contains all the routes mapping for the backbone app
	 */
	var Workspace = Backbone.Router.extend({
		routes:{
			'edit/:id': 'editMovieView',
			'*other': 	'index'
		},
		editMovieView: function(id) {
			var movie = movies.get(id);

			if(movie){
				Common.objectView.closeView();
				
				Common.objectListView = new MovieListView({el:"#right-column"});
				Common.objectView = new MovieEditView({el:"#left-column", model: movie});
			} else {
				this.navigate("", true);
			}
		}, 
		index: function() {
			Common.objectListView = new MovieListView({el:"#right-column"});
			Common.objectView = new MovieCreateView({el:"#left-column"});
		}
	});	

	return Workspace;
});