describe("GeolocationService tests", function() {

  var GeolocationService = null,
      windowMock = { },
      browserNotSupportedError = new Error("not supported browser"),
      $rootScope = null;

  beforeEach(function() {

    // Mock the main module dependencies
    angular.mock.module("ui.router");
    angular.mock.module("ui.bootstrap");
    angular.mock.module("ngCookies");
    angular.mock.module("ngSanitize");
    angular.mock.module("app.home");
    angular.mock.module("app.trends");
    angular.mock.module("app.people");
    angular.mock.module("app.statuses");

    // Retrieve the main module
    module("app");    

    module(function($provide) {
      $provide.value("$window", windowMock);
    });

    inject(function(_$injector_, _$rootScope_) {
      GeolocationService = _$injector_.get("GeolocationService");
      $rootScope = _$rootScope_;
    });

  });

  describe("statements tests", function() {

    it("statements must be defined", function() {
      expect(GeolocationService).not.toEqual(undefined);
      expect(GeolocationService.getLocation).not.toEqual(undefined);
      expect(GeolocationService.getLocationDeferred).not.toEqual(undefined);
      expect(GeolocationService.resolveGetCurrentPosition).not.toEqual(undefined);
      expect(GeolocationService.rejectGetCurrentPosition).not.toEqual(undefined);
    });

  });

  describe("getLocation() tests", function() {

    describe("$window.navigator not defined", function() {

      beforeEach(function() {
        windowMock.navigator = undefined;
      });

      it("getLocation promise should be rejected with browserNotSupportedError", function() {

        var errorTest = undefined;

        GeolocationService
          .getLocation()
            .then(
              function(result) { },
              function(error) {
                errorTest = error; 
              }
            );

        $rootScope.$apply();

        expect(errorTest).toEqual(browserNotSupportedError);
        expect(GeolocationService.getLocationDeferred).not.toEqual(null);
      });

    });

    describe("$window.navigator.geolocation not defined", function() {

      beforeEach(function() {
        windowMock.navigator = {
          geolocation: undefined
        };
      });

      it("getLocation promise should be rejected with browserNotSupportedError", function() {

        var errorTest = undefined;

        GeolocationService
          .getLocation()
            .then(
              function(result) { },
              function(error) {
                errorTest = error; 
              }
            );

        $rootScope.$apply();

        expect(errorTest).toEqual(browserNotSupportedError);
        expect(GeolocationService.getLocationDeferred).not.toEqual(null);
      });

    });

    describe("$window.navigator.geolocation defined", function() {

      var positionMock = {
            coords: {
              lat: 1,
              long: 1
            }
          },
          errorMock = new Error("error"),
          deferred = null,
          resolveMock = null;

      beforeEach(function() {

        windowMock.navigator = {
          geolocation: {
            getCurrentPosition: jasmine.createSpy().and.callFake(function() {
              resolveMock();
            })
          }
        };

        GeolocationService.resolveGetCurrentPosition = jasmine.createSpy();
        GeolocationService.rejectGetCurrentPosition = jasmine.createSpy();

      });

      it("getCurrentPosition promise rejected with error getLocation should be rejected too", function() {

        resolveMock = GeolocationService.rejectGetCurrentPosition;

        GeolocationService
          .getLocation();
        
        expect(windowMock.navigator.geolocation.getCurrentPosition.calls.count()).toEqual(1);
        expect(GeolocationService.rejectGetCurrentPosition.calls.count()).toEqual(1);
        expect(GeolocationService.resolveGetCurrentPosition.calls.count()).toEqual(0);
        expect(GeolocationService.getLocationDeferred).not.toEqual(null);

      });

      it("getCurrentPosition promise resolved getLocation too", function() {

        resolveMock = GeolocationService.resolveGetCurrentPosition;

        GeolocationService
          .getLocation();
        
        expect(windowMock.navigator.geolocation.getCurrentPosition.calls.count()).toEqual(1);
        expect(GeolocationService.rejectGetCurrentPosition.calls.count()).toEqual(0);
        expect(GeolocationService.resolveGetCurrentPosition.calls.count()).toEqual(1);
        expect(GeolocationService.getLocationDeferred).not.toEqual(null);

      });

    });    

  });

  describe("resolveGetCurrentPosition() tests", function() {

    var positionMock = {
          coords: {
            lat: 1,
            long: 1
          }
        };

    beforeEach(function() {
      
      GeolocationService.getLocationDeferred = {
        resolve: jasmine.createSpy()
      };

    });

    it("getLocationDeferred should be resolved with positionMock.coords", function() {

      GeolocationService.resolveGetCurrentPosition(positionMock);

      expect(GeolocationService.getLocationDeferred.resolve.calls.count()).toEqual(1);
      expect(GeolocationService.getLocationDeferred.resolve).toHaveBeenCalledWith(positionMock.coords);

    });

  });

  describe("rejectGetCurrentPosition() tests", function() {

    var errorMock = new Error("error");

    beforeEach(function() {
      
      GeolocationService.getLocationDeferred = {
        reject: jasmine.createSpy()
      };

    });

    it("getLocationDeferred should be resolved with positionMock.coords", function() {

      GeolocationService.rejectGetCurrentPosition(errorMock);

      expect(GeolocationService.getLocationDeferred.reject.calls.count()).toEqual(1);
      expect(GeolocationService.getLocationDeferred.reject).toHaveBeenCalledWith(errorMock);

    });

  });

});