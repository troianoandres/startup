/**
 *  @name   MovieCollectionService
 *  @description              Will handle most of the actions to do with the storage service, the main use of it is to fetch
 *                            and manipulate movies data
 *
 * @dependency                localStorageService
 */
angular.module('moviesModule')
	.service('MovieCollectionService', [
		'localStorageService', 
		function(localStorageService) {

      /**
       *  @name               getMovies()  
       *  @description        Returns the movie's array into local storage
       *  @return {Array}     Array of movies
       */
  	 	this.getMovies = function() {
    		return localStorageService.get("movies");
  		};

      /**
       *  @name               getMovie(index)
       *  @description        Return the desired Movie object fetched from the local storage
       *  @param  {Integer}   index
       *  @return {Object}    Movie object
       */
      this.getMovie = function(index) {
        
        // Checking if there is a correct index value provided
        if(index >= 0){
          var movies = this.getMovies();

          // Checking if the index is into the index bounds of the movies array
          if(index < movies.length) {
            return movies[index];
          }

        }

        return null;
      };

      /**
       *  @name               setMovies(movies)
       *  @description        Save into local storage the movies array
       *  @param  {Array}     movies
       */
      this.setMovies = function (movies) {
        localStorageService.set("movies", movies);
      };

      /**
       *  @name               addMovie(movie)
       *  @description        Add the provided movie into the movie's array into local storage
       *  @param  {Object}    movie
       */
      this.addMovie = function(movie) {
        var movies = this.getMovies();
        movies.push(movie);
        this.setMovies(movies);
      };

		}
	]);