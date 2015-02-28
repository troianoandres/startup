angular.module('app.movies')
	.controller('MovieIndexController', [
		"MovieFactory",
		function(MovieFactory){

      this.movies = MovieFactory.movies;

      this.clickMovie = function(index) {
        this.movies[index].likes++;
        this.movies.$save(index);
        
        //MovieFactory.addMovie({IMDB: 1, title: "Pelicula 4", rating: 0, likes: 0, runtime: 50});
      };

		}
	]);