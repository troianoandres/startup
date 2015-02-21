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
		},		
		initialize: function() {
			this.model.on('change', this.render, this);
		},
		render: function() {	
			this.$el.html( this.template( this.model.attributes ) );
		}
	});

	return MovieListView;
});