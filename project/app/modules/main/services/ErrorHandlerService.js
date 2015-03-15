/**
 *  @name     ErrorHandlerService
 *
 *  @description                      Used to handle errors into the application. The service will spawn a modal
 *                                    if displayError is called
 * 
 *  @depends  $modal
 */
app.service('ErrorHandlerService', [
  '$modal', 
  function($modal){
  
    var that = this;

    // Error instance
    this.error = null;

    /**
     *  @name     resetError
     *  @description      resets the error instance
     */
    this.resetError = function() {
      that.error = null;
    };

    /**
     *  @name     initializeErrorResult
     *  @description                register the events of the modal result promise
     */
    this.initializeErrorResult = function() {
      
      that.error.result
        .finally(that.resetError); 

    };

    /**
     *  @name     displayError
     *  @param    {Object}  error   Error to display into the modal
     */
    this.displayError = function(error) {

      // If no error provided will return undefined
      if(!error) {
        return;
      }

      // Generate the error modal instance and shows it up into the window
      that.error = $modal.open({
        templateUrl: "modules/main/partials/error.html",
        controller: "ErrorController as errorCtrl",
        resolve: {
          error: function() {
            return error;
          }
        }
      });      

      // Initialize the error modal instance callbacks
      that.initializeErrorResult();

    };  

  }
]);