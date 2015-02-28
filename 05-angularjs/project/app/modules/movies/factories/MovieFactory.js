/**
 * 	@name MovieFactory
 * 	@description  						Factory of movies, create instances of multiple movie types
 */
angular.module("app.movies")
	.factory('MovieFactory', [
    "firebaseURL",
    "$firebase",
		function(firebaseURL, $firebase){

      var exports = {};
      exports.ref = new Firebase(firebaseURL + "movies");

      exports.movies   = $firebase( exports.ref ).$asArray();
      
/*
      exports.movies.$loaded().then(function() {

      })
*/

      exports.getMovie = function(IMDB) {
        exports.moviesNode.startAt(IMDB).endAt(IMDB);
      };

      exports.addMovie = function(movie) {
        var obj = $firebase( exports.ref.child(movie.IMDB) );
        obj.$set(movie);

        //exports.movies.$add( object );
      };

  		return exports;
		}
	]);
