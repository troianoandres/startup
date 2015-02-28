/**
 *  @name   MovieCollectionService
 *  @description              Will handle most of the actions to do with the storage service, the main use of it is to fetch
 *                            and manipulate movies data
 *
 * @dependency                localStorageService
 */
angular.module('app.movies')
	.service('MovieCollectionService', [
    "firebaseURL",
    "$firebase",
		function(firebaseURL, $firebase) {      
      
      this.firebase = $firebase( new Firebase(firebaseURL + "movies"));
      this.movies 	= this.firebase.$asArray();

      /**
       *  @name               getMovies()  
       *  @description        Returns the movie's array into local storage
       *  @return {Array}     Array of movies
       */
  	 	this.getMovies = function() {
    		return this.movies;
  		};

      /**
       *  @name               getMovie(key)
       *  @description        Return the desired Movie object fetched from the local storage
       *  @param  {Integer}   index
       *  @return {Object}    Movie object
       */
      this.getMovie = function(key) {
        return this.movies.$getRecord(key);
      };

      /**
       *  @name               setMovies(movies)
       *  @description        Save into local storage the movies array
       *  @param  {Array}     movies
       */
      this.setMovies = function (movies) {
      	var index;
				for(index = 0; index < movies.length; index++){
					this.addMovie(movies[index]);
				}
      };

      /**
       *  @name               addMovie(movie)
       *  @description        Add the provided movie into the movie's array into local storage
       *  @param  {Object}    movie
       */
      this.addMovie = function(movie) {
        this.movies.$add(movie).then(function(reference) {

        });

      };

		}
	]);