moviesModule.controller('MoviesEditController', [
  "$scope",
  '$stateParams', 
  "localStorageService",
  function($scope, $stateParams, localStorageService){
  
    var that = this,
        moviesCache = localStorageService.get("movies");
    
    that.movie = null;
    that.movies = [];

    if(moviesCache) {
      that.movies = moviesCache;
    }    

    if(that.movies) {
      
      angular.forEach(that.movies, function(movieObj, key) {
        if(parseInt($stateParams.movieIMDB, 10) === movieObj.imdb) {
          that.movie = movieObj;
        }
      });

    }

    that.saveMovie = function() {

      angular.forEach(that.movies, function(movieObj, key) {
        if(parseInt($stateParams.movieIMDB, 10) === movieObj.imdb) {
          movieObj = that.movie;
        }
      });      

      localStorageService.set("movies", that.movies);

    };

  }
]);