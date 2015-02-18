// Get the app if it exists
var app = app || {};

/**
 * Movie class
 *
 * @extends {Backbone.Model}
 * @param 	{Object}	Contains all the attributes to override
 * @return 	{Backbone.Model}
 */
app.Movie = Backbone.Model.extend({
	
	// Default attributes
	defaults: {
		name: "",
		year: 0,
		description: "",
		genre: "",
		runtime: 0,
		image: ""
	},

	// Will use localStorage
	localStorage : new Backbone.LocalStorage('movies-backbone'),

	// Initialize method
	initialize: function() {

		// Will listen to change event
		this.on("change", function() {
			this.save();
		});
	},
	validate: function(attributes){
	}
});