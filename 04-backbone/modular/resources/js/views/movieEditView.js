define([
	"jquery",
	"underscore",
	"backbone",
	"handlebars",
	"text!templates/movieEdit.html",
	"models/movie",
	"collections/movieCollection",
	"common"
], function($, _, Backbone, Handlebars, movieEditTemplate, Movie, movies, Common) {

	var MovieEditView = Backbone.View.extend({
		template: Handlebars.compile(movieEditTemplate),
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
			this.$contentHeader.html("Edit movie");
			this.$contentHeader.append("<button class=\"btn btn-primary pull-right back\">Go to the list!</button>");			
			this.$contentBody.html(this.template({movie: this.model}));
		},
		saveMovie: function() {
			var $form  = this.$contentBody.find("form");

			this.model.set({
				name: 				$form.find("#txt-movie-name").val(), 
				year: 				parseInt($form.find("#txt-movie-year").val()),
				description: 	$form.find("#txt-movie-description").val(), 
				genre: 				$form.find("#txt-movie-genre").val(),
				runtime: 			$form.find("#txt-movie-runtime").val(), 
				image: 				$form.find("#txt-movie-image").val()
			});	
		},
		showMoviesList: function() {
			Common.workspace.navigate("", this);
		}
	});

	return MovieEditView;
});