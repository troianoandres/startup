app.controller('ErrorController', [
  "$scope",
  "$modalInstance",
  "error",
  function($scope, $modalInstance, error){
  
    this.title = "An error has ocurred";

    this.error = error;

    this.close = function() {
      $modalInstance.dismiss('close');
    };

  }
]);