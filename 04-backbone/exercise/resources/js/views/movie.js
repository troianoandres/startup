// Get the app if it exists
var app = app || {};

/**
 * 	MovieView
 *  	Will handle the movie item 
 *  
 *  @return {Backbone.View}
 */
app.MovieView = Backbone.View.extend({

	// Template defined by #movie-template
	template: Handlebars.compile($('#movie-template').html()),
	events: {
	},
	initialize: function() {

		// Will listen to the model attributes changes to display the updated data
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {

		// Creating the html markup with the model attributes
		this.$el.html( this.template( this.model.attributes ) );
		return this;
	}
});