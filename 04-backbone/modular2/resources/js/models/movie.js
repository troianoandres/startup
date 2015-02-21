define([
	'underscore',
	'backbone'
], function(_, Backbone) {

	var Movie = Backbone.Model.extend({
		defaults: {
			name: "",
			year: 0,
			description: "",
			genre: "",
			runtime: 0,
			image: ""
		}
	});

	return Movie;
});