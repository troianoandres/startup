// Get the app if it exists
var app = app || {};

/**
 * 	MovieCreateView class
 * 		Will handle the MovieList object of the app into app.movieList
 *
 * 	
 *  @return {Backbone.View}
 */
app.MovieCreateView = Backbone.View.extend({

	// Template defined by #movie-crud-template
	template: Handlebars.compile($('#movie-crud-template').html()),

	// Will listen to the submit event of the form
	events: {
		'submit form': 'saveMovie'
	},		
	initialize: function() {

		// Creating the html markup with the title from the currect section
		this.$el.html(this.template({title: "New Movie"}));

		// Get the reference to the form into the new markup to reset after the submit event
		this.$form = $(this.$el.find("form"));
	},
	render: function() {	
		return this;
	},

	// Triggered when the form is submited
	saveMovie: function() {

		// Create the new movie with the new values, received from the from
		var movie = new app.Movie({
			name: this.$form.find("#txt-movie-name").val(),
			year: parseInt(this.$form.find("#txt-movie-year").val()),
			description: this.$form.find("#txt-movie-description").val(),
			genre: this.$form.find("#txt-movie-genre").val(),
			runtime: this.$form.find("#txt-movie-runtime").val(),
			image: this.$form.find("#txt-movie-image").val()
		});	

		// TODO: ADD MODEL VALIDATION
		//if(movie.isValid()){
		// Save the move, add it to the moviesList and then trigger the reset event of the form
			movie.save();			
			app.movieList.add(movie);
			this.$form.trigger("reset");
		/*
		} else {
			movie = null;
		}
		*/
	}
});