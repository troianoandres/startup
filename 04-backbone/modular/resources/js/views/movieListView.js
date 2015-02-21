define([
	"jquery",
	"underscore",
	"backbone",
	"handlebars",
	"text!templates/movieList.html",
	"collections/movieCollection",
	"views/movieView",
	"common"
], function($, _, Backbone, Handlebars, movieListTemplate, movies, MovieView, Common) {

	var MovieListView = Backbone.View.extend({
		template: Handlebars.compile(movieListTemplate),	
		events: {
			"click .new": "showCreateMovie"
		},		
		initialize: function() {
	 	 	movies.fetch();

			this.$contentHeader = this.$el.find(".content-header h2");
	 	 	this.$contentBody = this.$el.find(".content-body");
	 	 	this.$contentFooter = this.$el.find(".content-footer");	 	

	 	 	//movies.on("add", this.addMovie, this);
	 	 	//movies.on("all", this.addMovies, this);
	 	 	//movies.on("reset", this.addMovies, this);

	 	 	this.render();
		},
		render: function() {			
	 	 	this.$contentHeader.html("Movie list");
			this.$contentHeader.append("<button class=\"btn btn-primary pull-right new\">New movie</button>");
			this.$contentBody.html(this.template());				 	 	
			
			this.addMovies();
		},
		addMovie: function(movie) {
			var movieView = new MovieView({ model: movie });
			movieView.render();
			this.$contentBody.append( movieView.el );
		},
		addMovies: function() {
			this.$contentBody.empty();
			movies.each(this.addMovie, this);
		},
		showCreateMovie: function() {
			Common.workspace.navigate("create", this);
		}
	});

	return MovieListView;
});
