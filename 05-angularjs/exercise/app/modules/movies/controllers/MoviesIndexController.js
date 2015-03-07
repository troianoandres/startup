moviesModule.controller('MoviesIndexController', [
  "$scope",
  "$state", 
  "localStorageService",
  function($scope, $state, localStorageService){
  
    var that = this,
        moviesCache = localStorageService.get("movies");
    
    that.movies = [];

    if(moviesCache) {
      that.movies = moviesCache;
    }

    console.log(that.movies);

    var saveMovies = function() {
      localStorageService.set("movies", that.movies);  
    };

    that.deleteMovie = function(index) {
      that.movies.splice(index, 1);
      saveMovies();
    };

  }
]);