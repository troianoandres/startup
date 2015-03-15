/**
 *  @name     ErrorController
 *  @depends  $scope            
 *  @depends  $modalInstance      instance of the modal directive
 *  @depends  error               error provided to the directive
 */
app.controller('ErrorController', [
  "$scope",
  "$modalInstance",
  "error",
  function($scope, $modalInstance, error){
  
    // Default title for the modal directive
    this.title = "An error has ocurred";

    // error provided
    this.error = error;

    // event triggered when the close button of the modal is clicked
    this.close = function() {
      $modalInstance.dismiss('close');
    };

  }
]);