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
		},
    jasmine: {
      exports: "jasmine"
    },
    "jasmine-html": {
      deps: ["jasmine"],
      exports: "jasmine-html"
    }		
	},
	paths: {
		jquery: 	 			"libs/jquery/jquery.min",
		underscore: 		"libs/underscore/underscore",
		backbone: 			"libs/backbone/backbone",
		text: 	 	 			"libs/require/text",
		handlebars: 		"libs/handlebars/handlebars",
		localStorage: 	"libs/backbone/localStorage",
    jasmine: 	 	 		"libs/jasmine/jasmine",
    "jasmine-html": "libs/jasmine/jasmine-html"		
	}
});
