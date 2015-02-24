angular.module("AuthenticationModule")
  .factory('AuthenticationFactory', [
    "DatastoreFactory",
    "$firebaseAuth",
    function(DatastoreFactory, $firebaseAuth){
      return $firebaseAuth( DatastoreFactory.getReference() );    
    }
  ]);