app.service('GeolocationService', [
  "$q",
  "$window",
  function($q, $window){

    var that = this;

    this.coords = null;

    this.getLocation = function() {
      var deferred = $q.defer();

      if($window.navigator && $window.navigator.geolocation) {
        
        $window.navigator.geolocation
          .getCurrentPosition(function(position) {


            deferred.resolve(position.coords);
          }, function(error) {
            deferred.reject(error);
          });

      } else {
        deferred.reject(new Error("not supported browser"));
      }

      return deferred.promise;
    };

  }
]);
