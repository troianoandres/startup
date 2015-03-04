mainApp.controller('AccessController', [
  "logged",
  "$state",
  function(logged, $state){
    if(logged){
      $state.go("app.home.timeline");
    }
  }
]);