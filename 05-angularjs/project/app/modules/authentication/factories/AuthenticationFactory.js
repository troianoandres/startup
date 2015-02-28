angular.module("app.authentication")
  .factory('AuthenticationFactory', [
    "DatastoreFactory",
    "$firebaseAuth",
    function(DatastoreFactory, $firebaseAuth){
      return $firebaseAuth( DatastoreFactory.getReference() );    
    }
  ]);