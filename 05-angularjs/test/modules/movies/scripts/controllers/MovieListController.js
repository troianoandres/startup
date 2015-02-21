angular.module('moviesModule')
	.controller('MovieListController', [
		"MovieCollectionService",
		"MovieFactory",
		function(MovieCollectionService, MovieFactory){
		
			this.movies = MovieCollectionService.getMovies();

		}
	]);