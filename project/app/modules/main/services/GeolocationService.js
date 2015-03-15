/**
 *  @name       GeolocationService
 *
 *  @description                        Provides an interface to access the navigator.geolocation object
 * 
 *  @depends    $q
 *  @depends    $window
 */
app.service('GeolocationService', [
  "$q",
  "$window",
  function($q, $window){

    var that = this;
    
    // Geolocation getLocation deferred
    this.getLocationDeferred = null;

    // Resolve method for getCurrenPosition
    this.resolveGetCurrentPosition = function(position) {
      that.getLocationDeferred.resolve(position.coords);
    };

    // Reject method for getCurrenPosition
    this.rejectGetCurrentPosition = function(error) {
      that.getLocationDeferred.reject(error);
    };

    /**
     *  @name     getLocation
     *  @description              get the current position retrieved via window.navigator.geolocation
     *  @return {Promise}
     */
    this.getLocation = function() {
      that.getLocationDeferred = $q.defer();

      // Check if geolocation is supported into the browser
      if($window.navigator && $window.navigator.geolocation) {
        
        // Retrieve the current position
        $window.navigator.geolocation
          .getCurrentPosition(that.resolveGetCurrentPosition, that.rejectGetCurrentPosition);

      } else {
        that.getLocationDeferred.reject(new Error("not supported browser"));
      }

      return that.getLocationDeferred.promise;
    };

  }
]);
