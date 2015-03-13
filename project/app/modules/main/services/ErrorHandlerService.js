app.service('ErrorHandlerService', [
  '$modal', 
  function($modal){
  
    var that = this;

    this.error = null;

    this.resetError = function() {
      that.error = null;
    };

    this.initializeErrorResult = function() {
      
      that.error.result
        .finally(that.resetError); 

    };

    this.displayError = function(error) {
      if(!error) {
        return;
      }

      that.error = $modal.open({
        templateUrl: "modules/main/partials/error.html",
        controller: "ErrorController as errorCtrl",
        resolve: {
          error: function() {
            return error;
          }
        }
      });      

      that.initializeErrorResult();

    };  

  }
]);