/**
 *  @name       AppController
 *  @depends    $scope           
 *  @depends    logged          Boolean represents if the user is logged in
 *  @depends    $state          $state instance to redirect the user if needed
 */
app.controller('AppController', [
  "$scope",
  "logged", 
  "$state",
  function($scope, logged, $state){

    // If the user is not logged in, redirect to the login page
    if(!logged) {
      $state.go("access.login");
    }
  }
]);