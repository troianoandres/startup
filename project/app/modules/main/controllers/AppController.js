mainApp.controller('AppController', [
  'logged', 
  "$state",
  function(logged, $state){
    if(!logged) {
      $state.go("access.login");
    }
  }
]);