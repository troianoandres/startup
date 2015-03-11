app.controller('AppController', [
  "$scope",
  "logged", 
  "$state",
  function($scope, logged, $state){
    if(!logged) {
      $state.go("access.login");
    }
  }
]);