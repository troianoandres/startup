// Get the app if it exists
var app = app || {};

/**
 *  MovieListView class
 *  
 *  @return {Backbone.View}
 */
app.MovieListView = Backbone.View.extend({

	// Template defined by #movie-list-template
	template: Handlebars.compile($('#movie-list-template').html() ),	
	events: {
	},		
	initialize: function() {

		this.$el.html(this.template());
		this.$contentBody = this.$el.find("#movie-list");

		// Listen to the add event into the movieList to look if a new movie is added
		this.listenTo(app.movieList, 'add', this.addOne);

		// Append the movies to the view
		this.addAll();
	},
	render: function() {	
		return this;
	},
	addOne: function( movie ) {
		var movieView = new app.MovieView({ model: movie });
		this.$contentBody.append( movieView.render().el );
	},
	addAll: function() {
		this.$contentBody.empty();
		app.movieList.each(this.addOne, this);
	}
});