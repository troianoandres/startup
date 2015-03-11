describe("GeolocationService tests", function() {

  var GeolocationService = null;

  beforeEach(function() {

    // Mock the main module dependencies
    angular.mock.module("ui.router");
    angular.mock.module("ngCookies");
    angular.mock.module("ngSanitize");
    angular.mock.module("app.home");
    angular.mock.module("app.trends");
    angular.mock.module("app.people");
    angular.mock.module("app.statuses");

    // Retrieve the main module
    module("app");

    inject(function(_GeolocationService_, _$window_) {
      GeolocationService = _GeolocationService_;
      $window = _$window_;
    });

  });

  it("GeolocationService must be defined and not be null", function() {
    expect(GeolocationService).not.toBe(undefined);
    expect(GeolocationService).not.toBe(null);
  });

  it("GeolocationService must be correctly initialied", function() {
    expect(GeolocationService.coords).not.toBe(undefined);
    expect(GeolocationService.coords).toBe(null);
  });

  describe("getLocation() tests", function() {

    beforeEach(function() {

      if(!$window.navigator) {        
        $window.navigator = {
          geolocation: {
            getCurrentPosition: function() { }
          }
        };
      } else if(!$window.navigator.geolocation) {
        $window.navigator.geolocation = {
          getCurrentPosition: function() { }
        };
      }

    });

    describe("$window.navigator not defined", function() {

      beforeEach(function() {

        $window.navigator = undefined;

        spyOn(GeolocationService, "getLocation").and.callThrough();
      });

      it("getLocation should throw error", function() {
        
        GeolocationService
          .getLocation()
            .then(function(result) {
              
            }, function(error) {
              expect(error).toBe(new Error("not supported browser"));
            });

        expect(GeolocationService.getLocation.calls.count()).toBe(1);

      });      

    });

    describe("$window.navigator.geolocation not defined", function() {

      beforeEach(function() {

        $window.navigator.geolocation = undefined;

        spyOn(GeolocationService, "getLocation").and.callThrough();
      });

      it("getLocation should throw error", function() {
        
        GeolocationService
          .getLocation()
            .then(function(result) {
              
            }, function(error) {
              expect(error).toBe(new Error("not supported browser"));
            });

        expect(GeolocationService.getLocation.calls.count()).toBe(1);

      });   

    });

    describe("$window.navigator.geolocation called", function() {

      var error = false,
          deferred = null,
          $q = null, 
          fakeGetCurrentPosition = null,
          responseObj = {
            cords: {
              lat: 0,
              long: 0
            }
          };

      beforeEach(function() {

        inject(function(_$q_) {
          $q = _$q_;
        });

        deferred = $q.defer();

        fakeGetCurrentPosition = function() {

          if(!error) {
            deferred.resolve( responseObj );
          } else {
            deferred.reject(new Error("error"));
          }

          return deferred.promise;
        };

        spyOn($window.navigator.geolocation, "getCurrentPosition").and.callFake(fakeGetCurrentPosition);

      });

      it("getLocation should return coords", function() {
        GeolocationService
          .getLocation()
            .then(function(result) {
              expect(result).toBe( responseObj.coords );
            });
      });

      error = true;

      it("getLocation should return error", function() {
        GeolocationService
          .getLocation()
            .then(function(result) {
            }, function(error) {
              expect(error).toBe( new Error("error") );
            });
      });

    });

  });



});