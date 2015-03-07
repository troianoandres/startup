
require([
	"routers/router",
	"common",
  'jasmine-html'
], function(Workspace, Common, jasmineHTML) {
	
  
  var jasmineEnv = jasmineHTML.getEnv();
  jasmineEnv.updateInterval = 1000;
 
  /*

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
  */

});
/*

require(['underscore', 'jquery', ], function(_, $, jasmine){
 
 
});
*/