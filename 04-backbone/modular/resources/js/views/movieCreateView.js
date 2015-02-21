define([
	"jquery",
	"underscore",
	"backbone",
	"handlebars",
	"text!templates/movieCreate.html",
	"models/movie",
	"collections/movieCollection",
	"common"
], function($, _, Backbone, Handlebars, movieCreateTemplate, Movie, movies, Common) {

	var MovieCreateView = Backbone.View.extend({
		template: Handlebars.compile(movieCreateTemplate),
		events: {
			'submit form': 'saveMovie',
			"click 	.back": 'showMoviesList'
		},		
		initialize: function() {
			this.$contentHeader = this.$el.find(".content-header h2");
	 	 	this.$contentBody = this.$el.find(".content-body");
	 	 	this.$contentFooter = this.$el.find(".content-footer");			

			this.render();
		},
		render: function() {
			this.$contentHeader.html("New movie");
			this.$contentHeader.append("<button class=\"btn btn-primary pull-right back\">Go to the list!</button>");			
			this.$contentBody.html(this.template());
		},
		saveMovie: function() {
			
			var $form  = this.$contentBody.find("form");

			var movie = new Movie({
				name: 	 			$form.find("#txt-movie-name").val(),
				year: 				parseInt($form.find("#txt-movie-year").val()),
				description: 	$form.find("#txt-movie-description").val(),
				genre: 				$form.find("#txt-movie-genre").val(),
				runtime: 			$form.find("#txt-movie-runtime").val(),
				image: 				$form.find("#txt-movie-image").val()
			});	

			movies.add(movie);
			movie.save();							
			$form.trigger("reset");
			
		},
		showMoviesList: function() {
			Common.workspace.navigate("", this);
		}
	});

	return MovieCreateView;
});