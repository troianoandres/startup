require([
	"routers/router",
	"common"
], function(Workspace, Common) {
	
	Backbone.View.prototype.close = function(){
		this.$contentBody.empty();
		this.$contentHeader.empty();
  	this.unbind();
	}

	Common.workspace = new Workspace();
	Backbone.history.start();

});

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){
 
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;
 
  var htmlReporter = new jasmine.HtmlReporter();
 
  jasmineEnv.addReporter(htmlReporter);
 
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };
 
  var specs = [];
 
  //specs.push('spec/models/TodoSpec');
  specs.push('spec/views/movieViewSpec');
 
  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });
 
});