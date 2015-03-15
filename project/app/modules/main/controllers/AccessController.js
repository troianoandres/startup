/**
 *  @name    AccessController
 *  @depends $scope             
 *  @depends logged             boolean with the current state of the user
 *  @depends $state             instance of $state to redirect if the user is already logged in
 */
app.controller('AccessController', [
  "$scope",
  "logged",
  "$state",
  function($scope, logged, $state){

    // If the user is already logged in, will redirect to home timeline
    if(logged){
      $state.go("app.home.timeline");
    }
  }
]);