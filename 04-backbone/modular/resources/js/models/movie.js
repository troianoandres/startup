define([
	'underscore',
	'backbone'
], function(_, Backbone) {

	var Movie = Backbone.Model.extend({
		defaults: {

		},
		initialize: function() {
			this.on("change", function() {
				this.save();
			});
		}

	});

	return Movie;
});