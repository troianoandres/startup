define([
	"jquery",
	"underscore",
	"backbone",
	"handlebars",
	"text!templates/movie.html",
	"common"
], function($, _, Backbone, Handlebars, movieTemplate, Common) {

	var MovieListView = Backbone.View.extend({
		template: Handlebars.compile(movieTemplate),	
		events: {
			"click button.edit": "editMovie"
		},		
		initialize: function() {
			this.model.on('change', this.render, this);
		},
		render: function() {
			this.$el.attr("data-object-id", this.model.id);	
			this.$el.html( this.template( this.model.attributes ) );
			return this;
		},
		editMovie: function() {
			if(arguments[0]){
				var movieId = $(arguments[0].currentTarget).attr("data-object-id");

				Common.workspace.navigate(["edit/", movieId].join(""), this);		
			}
		}
	});

	return MovieListView;
});