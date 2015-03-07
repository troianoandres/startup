// Get the app if it exists
var app = app || {};

/**
 * 	MovieEditView
 * 		Will handle the movie edit process
 * 		
 *  @return {Backbone.View}
 */
app.MovieEditView = Backbone.View.extend({

	// Template defined by #movie-crud-template
	template: Handlebars.compile($('#movie-crud-template').html() ),

	// Will listen to the submit event of the form
	events: {
		'submit form': 'saveMovie'
	},	
	initialize: function() {

		// Creating the html markup with the title from the currect section and the current model related to the view
		this.$el.html(this.template({title: "Edit Movie:", movie: this.model}));
		this.$form = $(this.$el.find("form"));
	},
	render: function() {	
		return this;
	},

	// Triggered when the form is submited
	saveMovie: function() {
		this.model.set({
			name: this.$form.find("#txt-movie-name").val(), 
			year: parseInt(this.$form.find("#txt-movie-year").val()),
			description: this.$form.find("#txt-movie-description").val(), 
			genre: this.$form.find("#txt-movie-genre").val(),
			runtime: this.$form.find("#txt-movie-runtime").val(), 
			image: this.$form.find("#txt-movie-image").val()
		});

    app.router.navigate("index", true);
	}
});