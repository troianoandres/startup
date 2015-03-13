app.service('GeolocationService', [
  "$q",
  "$window",
  function($q, $window){

    var that = this;
    
    this.getLocationDeferred = null;

    this.resolveGetCurrentPosition = function(position) {
      that.getLocationDeferred.resolve(position.coords);
    };

    this.rejectGetCurrentPosition = function(error) {
      that.getLocationDeferred.reject(error);
    };

    this.getLocation = function() {
      that.getLocationDeferred = $q.defer();

      if($window.navigator && $window.navigator.geolocation) {
        
        $window.navigator.geolocation
          .getCurrentPosition(that.resolveGetCurrentPosition, that.rejectGetCurrentPosition);

      } else {
        that.getLocationDeferred.reject(new Error("not supported browser"));
      }

      return that.getLocationDeferred.promise;
    };

  }
]);
