describe("TwitterService tests", function() {

  var apiKey = "WSIEZrXVV9arA1qY-e8IYH6Z3Ro", 
      TwitterService = null;

  beforeEach(function() {

    // Mock the main module dependencies
    angular.mock.module("ui.router");
    angular.mock.module("ngCookies");
    angular.mock.module("ngSanitize");
    angular.mock.module("app.home");
    angular.mock.module("app.trends");
    angular.mock.module("app.people");


    // Retrieve the main module
    module("app");

    inject(function(_TwitterService_, _$window_) {
      TwitterService = _TwitterService_;
      $window = _$window_;
    });

  });

  it("TwitterService must be defined", function() {
    expect(TwitterService).not.toBe(null);
  });

  it("TwitterService must not be initialized or connected", function() {
    expect(TwitterService.isInitialized()).toBe(false);
    expect(TwitterService.isConnected()).toBe(false);
  });

  it("TwitterService twitterReference must be null", function() {
    expect(TwitterService.getReference()).toBe(null);
  });

  describe("getReference() & setReference() tests", function() {

    it("getReference must be defined", function() {
      expect(TwitterService.getReference).not.toBe(null);
    });

    it("setReference must be defined", function() {
      expect(TwitterService.setReference).not.toBe(null);
    });

    it("expect to set and get twitterReference successfuly", function() {

      var obj = {};

      TwitterService.setReference( obj );

      expect(TwitterService.getReference()).toBe(obj);

    });

  });

  describe("isInitialized() tests", function() {

    beforeEach(function() {

      spyOn($window.OAuth, "initialize").and.callFake(function() {});
      spyOn($window.OAuth, "create").and.callFake(function() {
        return {};
      });

    });

    it("must not be initialized", function() {

      expect(TwitterService.isInitialized()).toBe(false);

    });

    it("must be initialized", function() {

      TwitterService.initialize();

      expect(TwitterService.isInitialized()).toBe(true);

    });

  });

  describe("isConnected() tests", function() {

    beforeEach(function() {

      spyOn($window.OAuth, "initialize").and.callFake(function() {});

    });

    it("must not be connected", function() {

      spyOn($window.OAuth, "create").and.callFake(function() {
        return false;
      });

      expect(TwitterService.isConnected()).toBe(false);

    });

    it("must be connected", function() {

      spyOn($window.OAuth, "create").and.callFake(function() {
        return {};
      });

      TwitterService.initialize();

      expect(TwitterService.isConnected()).toBe(true);

    });

  });

  describe("initialize() tests", function() {

    it("initialize() must be defined", function() {
      expect(TwitterService.initialize).not.toBe(null);
    });

    describe("initialize() with already logged in user", function() {

      beforeEach(function() {
        spyOn($window.OAuth, "initialize").and.returnValue( {} );
        spyOn($window.OAuth, "create").and.returnValue( {} );
      });

      it("initialize() must call OAuth.initialize and OAuth.create once", function() {

        // OAuth.initialize OAuth.create must not be called yet
        expect($window.OAuth.initialize.calls.count()).toEqual(0);
        expect($window.OAuth.create.calls.count()).toEqual(0);

        // Initialize TwitterService
        TwitterService.initialize();

        // Expect the two methods to be called once
        expect($window.OAuth.initialize.calls.count()).toEqual(1);
        expect($window.OAuth.create.calls.count()).toEqual(1);

        // Should set the twitterReference to an object
        expect(TwitterService.getReference()).not.toBe(null);

        // Expect TwitterService to be initialized and connected after the initialize() call
        expect(TwitterService.isInitialized()).toBe(true);
        expect(TwitterService.isConnected()).toBe(true);

      });

    });

    describe("initialize() with not logged in user", function() {
      
      beforeEach(function() {
        spyOn($window.OAuth, "initialize").and.returnValue( {} );
        spyOn($window.OAuth, "create").and.returnValue(false);
      });

      it("initialize() must call OAuth.initialize and OAuth.create once", function() {

        // OAuth.initialize OAuth.create must not be called yet
        expect($window.OAuth.initialize.calls.count()).toEqual(0);
        expect($window.OAuth.create.calls.count()).toEqual(0);

        // Initialize TwitterService
        TwitterService.initialize();

        // Expect the two methods to be called once
        expect($window.OAuth.initialize.calls.count()).toEqual(1);
        expect($window.OAuth.create.calls.count()).toEqual(1);

        // Should set the twitterReference to an object
        expect(TwitterService.getReference()).toBe(null);

        // Expect TwitterService to be initialized and connected after the initialize() call
        expect(TwitterService.isInitialized()).toBe(true);
        expect(TwitterService.isConnected()).toBe(false);

      });

    });

  });

  describe("connectTwitter() tests", function() {

    var $q, deferred, $rootScope;

    beforeEach(function() {

      inject(function(_$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
      });

      spyOn($window.OAuth, "redirect").and.callFake(function() { });
      spyOn(TwitterService, "isInitialized").and.callThrough();
      spyOn(TwitterService, "isConnected").and.callThrough();      

    });

    it("TwitterService.connectTwitter must be defined", function() {
      expect(TwitterService.connectTwitter).not.toBe(null);
    });

    describe("connectTwitter called with TwitterService initialized and connected", function() {

      beforeEach(function() {

        spyOn($window.OAuth, "initialize").and.callFake(function() {});
        spyOn($window.OAuth, "create").and.callFake( function() { 
          return {asd: "asd"};
        });

      });

      it("twitterReference must not be null, isConnected and isInitialized calls = 1, redirect calls = 0", function() {

        TwitterService.initialize();

        TwitterService.connectTwitter();

        expect(TwitterService.getReference()).not.toBe(null);
        expect(TwitterService.isConnected.calls.count()).toBe(1);
        expect(TwitterService.isInitialized.calls.count()).toBe(1);
        expect($window.OAuth.redirect.calls.count()).toBe(0);

      });

    });

    describe("connectTwitter called with TwitterService not initialized and not connected", function() {

      it("twitterReference must be null, isConnected and redirect calls = 0, isInitialized calls = 1", function() {

        expect(TwitterService.connectTwitter).toThrow();

        expect(TwitterService.getReference()).toBe(null);
        expect(TwitterService.isConnected.calls.count()).toBe(0);
        expect(TwitterService.isInitialized.calls.count()).toBe(1);
        expect($window.OAuth.redirect.calls.count()).toBe(0);

      });

    });

    describe("connectTwitter called with TwitterService initialized but not connected", function() {
      
      beforeEach(function() {

        spyOn($window.OAuth, "initialize").and.callFake(function() {});
        spyOn($window.OAuth, "create").and.callFake( function() { 
          return false;
        });

      });

      it("twitterReference must be null, isConnected and isInitialized calls = 1, redirect calls = 0", function() {

        TwitterService.initialize();

        TwitterService.connectTwitter();

        expect(TwitterService.getReference()).toBe(null);
        expect(TwitterService.isConnected.calls.count()).toBe(1);
        expect(TwitterService.isInitialized.calls.count()).toBe(1);
        expect($window.OAuth.redirect.calls.count()).toBe(1);

      });

    });
    
  });

  describe("generateURL() tests", function() {

    beforeEach(function() {

    });

    it("generateURL must be defined", function() {
      expect(TwitterService.generateURL).not.toBe(null);
    });

    it("generateURL called with no argument must throw error", function() {
      
      expect(function() { 
        TwitterService.generateURL();
      }).toThrow( new Error("baseUrl must be defined") );

    })

    it("generateURL called with one argument must return the baseURL", function() {

      var url = "http://localhost/app";
  
      expect(TwitterService.generateURL(url)).toBe(url);

    });

    it("generateURL called with two arguments must return a modified url", function() {

      var url = "http://localhost/app";
      var defaults = {
        id: 100,
        trim_user: false
      };

      expect(TwitterService.generateURL(url, defaults)).toBe("http://localhost/app?id=100&trim_user=false");

    });    

  });

  describe("connectionCallback() tests", function() {

    var $q, deferred;

    beforeEach(function() {

      inject(function(_$q_) {
        $q = _$q_;
      });

      deferred = $q.defer();

    });

    describe("connectionCallback error", function() {

    });

    describe("connectionCallback success", function() {

    });

  });

  describe("getHomeTimeline() tests", function() {

    var $q, deferred, $rootScope,
        initialized = false,
        connected = false,
        throwMock = new Error("error"),
        errorMock = new Error("error"),
        OAuthObj = null;


    beforeEach(function() {

      inject(function(_$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
      });

      deferred = $q.defer();

      OAuthObj = {
        get: function() {
          if(throwMock){

          } else {
            if(errorMock) {
              deferred.reject(errorMock);
            } else {
              deferred.resolve( { } );
            }
          }

          return deferred.promise;
        }
      };

      spyOn(TwitterService, "isInitialized").and.callFake(function() {
        return initialized;
      });
      spyOn(TwitterService, "isConnected").and.callFake(function() {
        return connected;
      });      

      spyOn(angular, "extend").and.callFake(function() {
        return {};
      });

      spyOn(TwitterService, "generateURL").and.callFake(function() {
        return "http://asd.com";
      });

      spyOn(TwitterService, "getReference").and.callFake(function() {
        return OAuthObj;
      });

      spyOn(OAuthObj, "get").and.callThrough();

    });

    it("getHomeTimeline must be defined", function() {
      expect(TwitterService.getHomeTimeline).not.toBe(undefined);
    });

    it("getHomeTimeline must reject the promise with an error if TwitterService is not initialized", function() {

      TwitterService
        .getHomeTimeline()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("TwitterService must be initialized"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(0);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(angular.extend.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);
    });

    it("getHomeTimeline must reject the promise with an error if TwitterService is initialized but not connected", function() {      

      initialized = true;

      TwitterService
        .getHomeTimeline()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("TwitterService must be connected"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(angular.extend.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);

    });

    it("getHomeTimeline must be called but get should throw error", function() {      

      initialized = true;
      connected = true;

      TwitterService
        .getHomeTimeline()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(errorMock);
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(angular.extend.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });

    it("getHomeTimeline must be called but should reject the promise with an error on get", function() {      

      initialized = true;
      connected = true;
      throwMock = false;

      TwitterService
        .getHomeTimeline()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(errorMock);
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(angular.extend.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });   

    it("getHomeTimeline must be called but should resolve the promise with { } on get", function() {

      initialized = true;
      connected = true;
      throwMock = false;
      errorMock = false;

      TwitterService
        .getHomeTimeline()
          .then(
            function(result) {
              expect(result).toBe( {} );
            });

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(angular.extend.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });    
   
  });

  describe("getBlockedPeople() tests", function() {

    var $q, deferred, $rootScope,
        initialized = false,
        connected = false,
        throwMock = new Error("error"),
        errorMock = new Error("error"),
        OAuthObj = null;


    beforeEach(function() {

      inject(function(_$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
      });

      deferred = $q.defer();

      OAuthObj = {
        get: function() {
          if(throwMock){

          } else {
            if(errorMock) {
              deferred.reject(errorMock);
            } else {
              deferred.resolve( { } );
            }
          }

          return deferred.promise;
        }
      };

      spyOn(TwitterService, "isInitialized").and.callFake(function() {
        return initialized;
      });
      spyOn(TwitterService, "isConnected").and.callFake(function() {
        return connected;
      });      

      spyOn(TwitterService, "generateURL").and.callFake(function() {
        return "http://asd.com";
      });

      spyOn(TwitterService, "getReference").and.callFake(function() {
        return OAuthObj;
      });

      spyOn(OAuthObj, "get").and.callThrough();

    });

    it("getBlockedPeople must be defined", function() {
      expect(TwitterService.getBlockedPeople).not.toBe(undefined);
    });

    it("getBlockedPeople must reject the promise with an error if TwitterService is not initialized", function() {

      TwitterService
        .getBlockedPeople()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("TwitterService must be initialized"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(0);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);
    });

    it("getBlockedPeople must reject the promise with an error if TwitterService is initialized but not connected", function() {      

      initialized = true;

      TwitterService
        .getBlockedPeople()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("TwitterService must be connected"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);

    });

    it("getBlockedPeople must be called but get should throw error", function() {      

      initialized = true;
      connected = true;

      TwitterService
        .getBlockedPeople()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(errorMock);
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });

    it("getBlockedPeople must be called but should reject the promise with an error on get", function() {      

      initialized = true;
      connected = true;
      throwMock = false;

      TwitterService
        .getBlockedPeople()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(errorMock);
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });   

    it("getBlockedPeople must be called but should resolve the promise with { } on get", function() {

      initialized = true;
      connected = true;
      throwMock = false;
      errorMock = false;

      TwitterService
        .getHomeTimeline()
          .then(
            function(result) {
              expect(result).toBe( {} );
            });

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });    
   
  });

  describe("getStatus() tests", function() {

    var $q, deferred, $rootScope,
        initialized = false,
        connected = false,
        throwMock = new Error("error"),
        errorMock = new Error("error"),
        OAuthObj = null,
        statusID = undefined;


    beforeEach(function() {

      inject(function(_$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
      });

      deferred = $q.defer();

      OAuthObj = {
        get: function() {
          if(throwMock){

          } else {
            if(errorMock) {
              deferred.reject(errorMock);
            } else {
              deferred.resolve( { } );
            }
          }

          return deferred.promise;
        }
      };

      spyOn(TwitterService, "isInitialized").and.callFake(function() {
        return initialized;
      });
      spyOn(TwitterService, "isConnected").and.callFake(function() {
        return connected;
      });      

      spyOn(TwitterService, "generateURL").and.callFake(function() {
        return "http://asd.com";
      });

      spyOn(TwitterService, "getReference").and.callFake(function() {
        return OAuthObj;
      });

      spyOn(OAuthObj, "get").and.callThrough();

    });

    it("getStatus must be defined", function() {
      expect(TwitterService.getStatus).not.toBe(undefined);
    });


    it("getStatus must reject the promise with an error if TwitterService is not initialized", function() {

      TwitterService
        .getStatus()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("TwitterService must be initialized"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(0);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);
    });

    it("getStatus must reject the promise with an error if TwitterService is initialized but not connected", function() {      

      initialized = true;

      TwitterService
        .getStatus()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("TwitterService must be connected"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);

    });

    it("getStatus should reject the promise if no statusID provided", function() {

      initialized = true;
      connected = true;

      TwitterService
        .getStatus(statusID)
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("statusID must be defined"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);
    });


    it("getStatus must be called but get should throw error", function() {      

      initialized = true;
      connected = true;
      statusID = "200";

      TwitterService
        .getStatus(statusID)
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(errorMock);
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });

    it("getStatus must be called but should reject the promise with an error on get", function() {      

      initialized = true;
      connected = true;
      statusID = "200";
      throwMock = false;

      TwitterService
        .getStatus(statusID)
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(errorMock);
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });   

    it("getStatus must be called but should resolve the promise with { } on get", function() {

      initialized = true;
      connected = true;
      statusID = "200";
      throwMock = false;
      errorMock = false;

      TwitterService
        .getHomeTimeline()
          .then(
            function(result) {
              expect(result).toBe( {} );
            });

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });    
   
  });

  describe("getClosestWoeID() tests", function() {

    var $q, deferred, $rootScope,
        initialized = false,
        connected = false,
        throwMock = new Error("error"),
        errorMock = new Error("error"),
        OAuthObj = null,
        geolocationError = new Error("error"),
        GeolocationService = null;


    beforeEach(function() {

      inject(function(_$q_, _$rootScope_, _GeolocationService_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        GeolocationService = _GeolocationService_;
      });

      deferred = $q.defer();

      OAuthObj = {
        get: function() {
          if(throwMock){

          } else {
            if(errorMock) {
              deferred.reject(errorMock);
            } else {
              deferred.resolve( { } );
            }
          }

          return deferred.promise;
        }
      };

      spyOn(TwitterService, "isInitialized").and.callFake(function() {
        return initialized;
      });
      spyOn(TwitterService, "isConnected").and.callFake(function() {
        return connected;
      });      

      spyOn(angular, "extend").and.callFake(function() {
        return {};
      });

      spyOn(TwitterService, "generateURL").and.callFake(function() {
        return "http://asd.com";
      });

      spyOn(TwitterService, "getReference").and.callFake(function() {
        return OAuthObj;
      });

      spyOn(OAuthObj, "get").and.callThrough();

      spyOn(GeolocationService, "getLocation").and.callFake(function() {
        var geolocationDeferred = $q.defer();
        if(geolocationError) {
          geolocationDeferred.reject(geolocationError);
        } else {
          geolocationDeferred.resolve( {} );
        }
        return geolocationDeferred.promise;
      });

    });

    it("getClosestWoeID must be defined", function() {
      expect(TwitterService.getClosestWoeID).not.toBe(undefined);
    });

    it("getClosestWoeID must reject the promise with an error if TwitterService is not initialized", function() {

      TwitterService
        .getClosestWoeID()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("TwitterService must be initialized"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(0);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);      
      expect(angular.extend.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);
      expect(GeolocationService.getLocation.calls.count()).toBe(0);
    });

    it("getClosestWoeID must reject the promise with an error if TwitterService is initialized but not connected", function() {      

      initialized = true;

      TwitterService
        .getClosestWoeID()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("TwitterService must be connected"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(angular.extend.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);
      expect(GeolocationService.getLocation.calls.count()).toBe(0);

    });

    it("getClosestWoeID must reject the promise because geolocation throws error", function() {

      initialized = true;
      connected = true;

      TwitterService
        .getClosestWoeID()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(geolocationError);
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(angular.extend.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);
      expect(GeolocationService.getLocation.calls.count()).toBe(1);

    });

    xit("getClosestWoeID must be called but get should throw error when calling OAuthObj.get", function() {      

      initialized = true;
      connected = true;
      geolocationError = false;

      TwitterService
        .getClosestWoeID()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(throwMock);
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(angular.extend.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);
      expect(GeolocationService.getLocation.calls.count()).toBe(1);

    });

    xit("getClosestWoeID must be called but should reject the promise with an error on get", function() {      

      initialized = true;
      connected = true;
      geolocationError = false;
      throwMock = false;

      TwitterService
        .getClosestWoeID()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(errorMock);
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(angular.extend.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);
      expect(GeolocationService.getLocation.calls.count()).toBe(1);

    });   

    xit("getClosestWoeID must be called but should resolve the promise with { } on get", function() {

      initialized = true;
      connected = true;
      geolocationError = false;
      throwMock = false;
      errorMock = false;


      TwitterService
        .getClosestWoeID()
          .then(
            function(result) {
              expect(result).toBe( {} );
            });

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(angular.extend.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);
      expect(GeolocationService.getLocation.calls.count()).toBe(1);

    });    
   
  });

  xdescribe("getTweetsByQuery() tests", function() {

    var $q, deferred, $rootScope,
        initialized = false,
        connected = false,
        throwMock = new Error("error"),
        errorMock = new Error("error"),
        OAuthObj = null,
        parameters = null;


    beforeEach(function() {

      inject(function(_$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
      });

      deferred = $q.defer();

      OAuthObj = {
        get: function() {
          if(throwMock){

          } else {
            if(errorMock) {
              deferred.reject(errorMock);
            } else {
              deferred.resolve( { } );
            }
          }

          return deferred.promise;
        }
      };

      spyOn(TwitterService, "isInitialized").and.callFake(function() {
        return initialized;
      });
      spyOn(TwitterService, "isConnected").and.callFake(function() {
        return connected;
      });      

      spyOn(angular, "extend").and.callFake(function() {
        return {};
      });

      spyOn(TwitterService, "generateURL").and.callFake(function() {
        return "http://asd.com";
      });

      spyOn(TwitterService, "getReference").and.callFake(function() {
        return OAuthObj;
      });

      spyOn(OAuthObj, "get").and.callThrough();

    });

    it("getTweetsByQuery must be defined", function() {
      expect(TwitterService.getTweetsByQuery).not.toBe(undefined);
    });

    it("getTweetsByQuery must reject the promise with an error if TwitterService is not initialized", function() {

      TwitterService
        .getTweetsByQuery()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("TwitterService must be initialized"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(0);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(angular.extend.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);
    });

    it("getTweetsByQuery must reject the promise with an error if TwitterService is initialized but not connected", function() {      

      initialized = true;

      TwitterService
        .getTweetsByQuery()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("TwitterService must be connected"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(angular.extend.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);

    });

    it("getTweetsByQuery must reject the promise with an error because parameters not defined", function() {      

      initialized = true;

      TwitterService
        .getTweetsByQuery()
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("parameters must be defined"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(angular.extend.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);

    });

    it("getTweetsByQuery must reject the promise with an error because parameters.q not defined", function() {      

      initialized = true;
      parameters =  {};


      TwitterService
        .getTweetsByQuery(parameters)
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(new Error("parameters.q must be defined"));
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(0);
      expect(TwitterService.getReference.calls.count()).toBe(0);
      expect(angular.extend.calls.count()).toBe(0);
      expect(OAuthObj.get.calls.count()).toBe(0);

    });     

    it("getTweetsByQuery must be called but get should throw error", function() {      

      initialized = true;
      connected = true;
      parameters = {
        q: "%search"
      };

      TwitterService
        .getTweetsByQuery(parameters)
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(errorMock);
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(angular.extend.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });

    it("getTweetsByQuery must be called but should reject the promise with an error on get", function() {      

      initialized = true;
      connected = true;
      parameters = {
        q: "%search"
      };
      throwMock = false;

      TwitterService
        .getTweetsByQuery(parameters)
          .then(
            function(result) {

            },
            function(error) {
              expect(error).toBe(errorMock);
            }
          );

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(angular.extend.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });   

    it("getTweetsByQuery must be called but should resolve the promise with { } on get", function() {

      initialized = true;
      connected = true;
      parameters = {
        q: "%search"
      };
      throwMock = false;
      errorMock = false;

      TwitterService
        .getTweetsByQuery(parameters)
          .then(
            function(result) {
              expect(result).toBe( {} );
            });

      expect(TwitterService.isInitialized.calls.count()).toBe(1);
      expect(TwitterService.isConnected.calls.count()).toBe(1);
      expect(TwitterService.generateURL.calls.count()).toBe(1);
      expect(TwitterService.getReference.calls.count()).toBe(1);
      expect(angular.extend.calls.count()).toBe(1);
      expect(OAuthObj.get.calls.count()).toBe(1);

    });    
   
  });

});