moviesModule.controller('MoviesCreateController', [
  "$scope", 
  "localStorageService",
  function($scope, localStorageService){
  
    var that = this;

    that.movie = {
      imdb:  0,
      title: "",
      runtime: 0,
      plot: ""
    };

    this.message = "";

    that.movies = localStorageService.get("movies");

    that.saveMovie = function() {
      that.movies.push(that.movie);
      
      that.movie = {
        imdb: 0,
        title: "",
        runtime: 0,
        plot: ""        
      };

      localStorageService.set("movies", that.movies);

      that.message = "Movie created";
    };

  }
]);