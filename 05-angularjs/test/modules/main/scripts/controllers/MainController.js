/**
 * 	@name 	MainControler
 *
 *	@description  							
 * 
 * 	@param  {Factory} 			MovieCollection
 */
mainApp.controller('MainController', [
	'MovieCollection', 
	function(MovieCollection) {
		
	  this.set = function() {
	    MovieCollection.set([{title:"asd"},{title:"aaa"}]);
	  };

	  this.get = function() {
	    console.log(MovieCollection.get());
	  };

	  this.shout = function() {
	  	alert();
	  };

	}
]);