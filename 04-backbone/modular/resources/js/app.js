require.config({
	shim: {
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: [
				"underscore",
				"jquery"
			],
			exports: "Backbone"
		},
		"handlebars": {
			exports: "Handlebars"
		}
	},
	paths: {
		jquery: 	 		"libs/jquery/jquery.min",
		underscore: 	"libs/underscore/underscore",
		backbone: 		"libs/backbone/backbone",
		text: 	 	 		"libs/require/text",
		handlebars: 	"libs/handlebars/handlebars",
		localStorage: "libs/backbone/localStorage"
	}
});

require([
	"routers/router",
	"common",
], function(Workspace, Common) {
	
	Backbone.View.prototype.close = function(){
		this.$contentBody.empty();
		this.$contentHeader.empty();
  	this.unbind();
	}

	Common.workspace = new Workspace();
	Backbone.history.start();

});
