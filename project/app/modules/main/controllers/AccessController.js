app.controller('AccessController', [
  "$scope",
  "logged",
  "$state",
  function($scope, logged, $state){

    /*
    console.log(logged);
    console.log($state);
    */

    if(logged){
      $state.go("app.home.timeline");
    }
  }
]);