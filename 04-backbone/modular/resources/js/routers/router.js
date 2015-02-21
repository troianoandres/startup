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
			'create': 	'createMovieView',
			'edit/:id': 'editMovieView',
			'*other': 	'index'
		},
		createMovieView: function() {
			this.closeActiveView(Common.activeView);

			Common.activeView = new MovieCreateView({el:"#main-content"});
		}, 
		editMovieView: function(id) {
			var movie = movies.get(id);

			if(movie){
				this.closeActiveView(Common.activeView);
				Common.activeView = new MovieEditView({el: "#main-content", model: movie});
			} else {
				this.navigate("", true);
			}
		}, 
		index: function() {
			this.closeActiveView(Common.activeView);
			Common.activeView = new MovieListView({el:"#main-content"});
		},
		closeActiveView: function(activeView) {
			if(activeView){
				activeView.close();
			}
		}
	});	

	return Workspace;
});