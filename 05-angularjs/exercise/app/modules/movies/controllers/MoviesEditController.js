moviesModule.controller('MoviesEditController', [
  "$scope",
  '$stateParams', 
  function($scope, $stateParams){
  
    var that = this,
        moviesCache = localStorageService.get("movies");
    that.movie = null;

    if(moviesCache) {
      
      angular.forEach(moviesCache, function(movieObj, key) {
        if($stateParams.movieIMDB === movieObj.imdb) {
          that.movie = movieObj;
        }
      });

  }
]);