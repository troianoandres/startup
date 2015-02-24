angular.module("DatastoreModule")
  .factory('DatastoreFactory', [
    '$firebase', 
    "firebaseURL",
    function($firebase, firebaseURL){
      var exports = {};

      exports.getReference = function(extraRoute) {
        extraRoute = extraRoute || "";
        return new Firebase(firebaseURL + extraRoute);
      };

      exports.bindAngular = function(reference) {
        return $firebase(reference);
      };

      return exports;
    }
  ]);