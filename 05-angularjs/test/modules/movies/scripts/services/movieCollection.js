angular.module('moviesModule')
	.service('MovieCollection', [
		'localStorageService', 
		function(localStorageService) {
  	 	this.get = function() {
    		return localStorageService.get("movies");
  		};

  		this.set = function(data) {
    		localStorageService.set("movies", data);
  		};

  		return this;
		}
	]);