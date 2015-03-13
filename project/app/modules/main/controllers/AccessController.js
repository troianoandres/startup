app.controller('AccessController', [
  "$scope",
  "logged",
  "$state",
  function($scope, logged, $state){

    if(logged){
      $state.go("app.home.timeline");
    }
  }
]);