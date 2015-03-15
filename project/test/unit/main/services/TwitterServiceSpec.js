describe("TwitterService tests", function() {

  var windowMock = null,
      TwitterService = null,
      referenceMock = null,
      geolocationServiceMock = {};

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

    windowMock = {
      OAuth: undefined
    };

    module(function($provide) {
      $provide.value("$window", windowMock);
      $provide.value("GeolocationService", geolocationServiceMock);
      $provide.value("appKey", "WSIEZrXVV9arA1qY-e8IYH6Z3Ro");
    });

    inject(function(_$injector_, _$rootScope_) {
      TwitterService = _$injector_.get("TwitterService");
      $rootScope = _$rootScope_;
    });

  });

  describe("statements tests", function() {

    beforeEach(function() {

      windowMock = { };

    });

    it("statements must be defined", function() {
      expect(TwitterService).not.toEqual(undefined);
      expect(TwitterService._generateURL).not.toEqual(undefined);
      expect(TwitterService.getReference).not.toEqual(undefined);
      expect(TwitterService.setReference).not.toEqual(undefined);
      expect(TwitterService.isConnected).not.toEqual(undefined);
      expect(TwitterService.isInitialized).not.toEqual(undefined);
      expect(TwitterService.initialize).not.toEqual(undefined);
      expect(TwitterService.connectTwitter).not.toEqual(undefined);
      expect(TwitterService.connectionCallback).not.toEqual(undefined);
      expect(TwitterService.getHomeTimeline).not.toEqual(undefined);
      expect(TwitterService.getBlockedPeople).not.toEqual(undefined);
      expect(TwitterService.getStatus).not.toEqual(undefined);
      expect(TwitterService.getClosestWoeID).not.toEqual(undefined);
      expect(TwitterService.getPosition).not.toEqual(undefined);
      expect(TwitterService.getNearestTrends).not.toEqual(undefined);
      expect(TwitterService.getTweetsByQuery).not.toEqual(undefined);
      expect(TwitterService._twitterReference).not.toEqual(undefined);      
      expect(TwitterService._initialized).not.toEqual(undefined);
      expect(TwitterService._connected).not.toEqual(undefined);
    });

    it("statements must be initialized with the correct data", function() {
      expect(TwitterService._twitterReference).toEqual(null);      
      expect(TwitterService._initialized).toEqual(false);
      expect(TwitterService._connected).toEqual(false);
    });

  });

  describe("_generateURL() tests", function() {

    var baseUrl = null,
        parameters = null,
        exludeRetweets = null;        

    it("_generateURL throws error because baseUrl is undefined", function() {

      baseUrl = undefined;

      expect(function() {
        TwitterService._generateURL(baseUrl);
      }).toThrow(new Error("baseUrl must be defined"));

    });

    it("_generateURL must return the same url as baseUrl", function() {
      
      baseUrl = "http://asd.com";

      expect(TwitterService._generateURL(baseUrl)).toEqual(baseUrl + "?exclude=retweets");

    });

    it("_generateURL must return a formated url", function() {
      
      baseUrl = "http://asd.com";
      parameters = {
        id: 1,
        asd: null,
        aaa: "ddd"
      };

      expect(TwitterService._generateURL(baseUrl, parameters)).toEqual(baseUrl + "?id=1&aaa=ddd&exclude=retweets");

    });

    afterEach(function() {
      baseUrl = null;
      parameters = null;
      exludeRetweets = null;
    });

  });

  describe("getReference() & setReference() tests", function() {

    beforeEach(function() {

      referenceMock = { }

    });

    it("getReference must return null because no twitterReference is set", function() {
      expect(TwitterService.getReference()).toEqual(null);
    });

    it("setReference must set twitterReference as referenceMock and then getReference should return it", function() {
      
      TwitterService.setReference(referenceMock);
      expect(TwitterService._twitterReference).toEqual(referenceMock);
      expect(TwitterService.getReference()).toEqual(referenceMock);

    });

  });

  describe("isInitialized() & isConnected() tests", function() {

    beforeEach(function() {

    });

    it("isInitialized and isConnected should return false because is not initialized or connected", function() {
      expect(TwitterService.isInitialized()).toEqual(false);
      expect(TwitterService.isConnected()).toEqual(false);
    });

    it("isInitialized and isConnected should return true because TwitterService is connected and initialized", function() {
      TwitterService._initialized = true;
      TwitterService._connected = true;

      expect(TwitterService.isInitialized()).toEqual(true);
      expect(TwitterService.isConnected()).toEqual(true);
    });

  });

  describe("initialize() tests", function() {

    var OAuthObjMock = null;

    beforeEach(function() {

      windowMock.OAuth = { };
      windowMock.OAuth.initialize = jasmine.createSpy();
      
      spyOn(TwitterService, "setReference").and.callThrough();      

    });

    describe("OAuthObjMock will be false", function() {

      beforeEach(function() {
        windowMock.OAuth.create = jasmine.createSpy().and.callFake(function() {
          return OAuthObjMock
        });
      });

      it("initialize() should initialize TwitterService but do not connect it", function() {
        
        TwitterService.initialize();

        expect(windowMock.OAuth.initialize.calls.count()).toEqual(1);
        expect(windowMock.OAuth.create.calls.count()).toEqual(1);
        expect(TwitterService.setReference.calls.count()).toEqual(0);
        expect(TwitterService._initialized).toEqual(true);
        expect(TwitterService._connected).toEqual(false);

      });

    });

    describe("OAuthObjMock will be an object", function() {

      beforeEach(function() {
        OAuthObjMock = { };
        windowMock.OAuth.create = jasmine.createSpy().and.callFake(function() {
          return OAuthObjMock
        });
      });      

      it("initialize() should initialize and connect TwitterService", function() {
              
        TwitterService.initialize();

        expect(windowMock.OAuth.initialize.calls.count()).toEqual(1);
        expect(windowMock.OAuth.create.calls.count()).toEqual(1);
        expect(TwitterService.setReference.calls.count()).toEqual(1);
        expect(TwitterService._initialized).toEqual(true);
        expect(TwitterService._connected).toEqual(true);
        expect(TwitterService._twitterReference).toEqual(OAuthObjMock);

      });

    });

    afterEach(function() {
      OAuthObjMock = null;
    })

  });

  describe("connectTwitter() tests", function() {

    beforeEach(function() {

      windowMock.OAuth = {
        redirect: jasmine.createSpy()
      };

      spyOn(TwitterService, "isInitialized").and.callThrough();
      spyOn(TwitterService, "isConnected").and.callThrough();

    });

    it("connectTwitter() should throw error because is not initialized", function() {

      expect(function() {

        TwitterService.connectTwitter();

      }).toThrow(new Error("TwitterService must be initialized before connecting to Twitter"));

      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(0);
      expect(windowMock.OAuth.redirect.calls.count()).toEqual(0);

    });

    it("connectTwitter() not to call redirect because TwitterService is already connected to twitter", function() {

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.connectTwitter();

      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(windowMock.OAuth.redirect.calls.count()).toEqual(0);

    });

    it("connectTwitter() should call redirect", function() {

      TwitterService._initialized = true;

      TwitterService.connectTwitter();

      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(windowMock.OAuth.redirect.calls.count()).toEqual(1);
      expect(windowMock.OAuth.redirect).toHaveBeenCalledWith("twitter", {cache: true}, "#/access/callback");

    });    

  });

  describe("connectionCallback() tests", function() {

    beforeEach(function() {
      windowMock.OAuth = {
        callback: jasmine.createSpy()
      };
    });

    it("connectionCallback should connect TwitterService and OAuth.callback must be called", function() {

      TwitterService.connectionCallback();

      expect(TwitterService._connected).toEqual(true);
      expect(windowMock.OAuth.callback.calls.count()).toEqual(1);
      expect(windowMock.OAuth.callback).toHaveBeenCalledWith("twitter", {cache: true});

    });

  });

  describe("getHomeTimeline() tests", function() {

    var url = "/1.1/statuses/home_timeline.json",
        twitterReferenceMock = null,
        deferred = null,
        errorMock = new Error("error");

    beforeEach(function() {

      inject(function(_$q_) {
        deferred = _$q_.defer();
      });

      twitterReferenceMock = {
        get: jasmine.createSpy().and.returnValue(deferred.promise)
      };



      spyOn(TwitterService, "isInitialized").and.callThrough();
      spyOn(TwitterService, "isConnected").and.callThrough();
      TwitterService._generateURL = jasmine.createSpy().and.returnValue( url );
      spyOn(angular, "extend").and.returnValue( {} );

      TwitterService._twitterReference = twitterReferenceMock;
    });

    it("getHomeTimeline promise should be rejected because TwitterService is not initialized", function() {

      var errorTest = null;

      TwitterService.getHomeTimeline()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be initialized"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(0);
      expect(angular.extend.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(twitterReferenceMock.get.calls.count()).toEqual(0);

    });

    it("getHomeTimeline promise should be rejected because TwitterService is not connected", function() {

      var errorTest = null;

      TwitterService._initialized = true;

      TwitterService.getHomeTimeline()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be connected"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(angular.extend.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(twitterReferenceMock.get.calls.count()).toEqual(0);

    });

    it("getHomeTimeline promise should be rejected because twitterReference.get throws error", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;
      TwitterService._twitterReference.get = jasmine.createSpy().and.throwError(errorMock);

      TwitterService.getHomeTimeline()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(angular.extend.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);

    });

    it("getHomeTimeline promise should be rejected because twitterReference.get promise was rejected", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getHomeTimeline()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      deferred.reject(errorMock);

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(angular.extend.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);

    });

    it("getHomeTimeline promise should be resolved", function() {

      var resultTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getHomeTimeline()
        .then(function(result) {
          resultTest = result;
        });

      deferred.resolve( {} );

      $rootScope.$apply();
      
      expect(resultTest).toEqual( {} );
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(angular.extend.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);      

    });

  });

  describe("getBlockedPeople() tests", function() {

    var url = "/1.1/blocks/list.json",
        twitterReferenceMock = null,
        deferred = null,
        errorMock = new Error("error");

    beforeEach(function() {

      inject(function(_$q_) {
        deferred = _$q_.defer();
      });

      twitterReferenceMock = {
        get: jasmine.createSpy().and.returnValue(deferred.promise)
      };

      spyOn(TwitterService, "isInitialized").and.callThrough();
      spyOn(TwitterService, "isConnected").and.callThrough();
      TwitterService._generateURL = jasmine.createSpy().and.returnValue( url );
      TwitterService._twitterReference = twitterReferenceMock;

    });

    it("getBlockedPeople promise should be rejected because TwitterService is not initialized", function() {

      var errorTest = null;

      TwitterService.getBlockedPeople()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be initialized"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(twitterReferenceMock.get.calls.count()).toEqual(0);

    });

    it("getBlockedPeople promise should be rejected because TwitterService is not connected", function() {

      var errorTest = null;

      TwitterService._initialized = true;

      TwitterService.getBlockedPeople()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be connected"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(twitterReferenceMock.get.calls.count()).toEqual(0);

    });

    it("getBlockedPeople promise should be rejected because twitterReference.get throws error", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;
      TwitterService._twitterReference.get = jasmine.createSpy().and.throwError(errorMock);

      TwitterService.getBlockedPeople()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);

    });

    it("getBlockedPeople promise should be rejected because twitterReference.get promise was rejected", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getBlockedPeople()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      deferred.reject(errorMock);

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);

    });

    it("getHomeTimeline promise should be resolved", function() {

      var resultTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getBlockedPeople()
        .then(function(result) {
          resultTest = result;
        });

      deferred.resolve( {} );

      $rootScope.$apply();
      
      expect(resultTest).toEqual( {} );
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);      

    });

  });

  describe("getStatus() tests", function() {

    var url = "/1.1/statuses/show.json",
        twitterReferenceMock = null,
        deferred = null,
        errorMock = new Error("error");

    beforeEach(function() {

      inject(function(_$q_) {
        deferred = _$q_.defer();
      });

      twitterReferenceMock = {
        get: jasmine.createSpy().and.returnValue(deferred.promise)
      };

      spyOn(TwitterService, "isInitialized").and.callThrough();
      spyOn(TwitterService, "isConnected").and.callThrough();
      TwitterService._generateURL = jasmine.createSpy().and.returnValue( url );
      TwitterService._twitterReference = twitterReferenceMock;

    });

    it("getStatus promise should be rejected because TwitterService is not initialized", function() {

      var errorTest = null;

      TwitterService.getStatus()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be initialized"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(twitterReferenceMock.get.calls.count()).toEqual(0);

    });

    it("getStatus promise should be rejected because TwitterService is not connected", function() {

      var errorTest = null;

      TwitterService._initialized = true;

      TwitterService.getStatus()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be connected"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(twitterReferenceMock.get.calls.count()).toEqual(0);

    });

    it("getStatus promise should be rejected because no statusID is provided", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getStatus()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("statusID must be defined"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(twitterReferenceMock.get.calls.count()).toEqual(0);

    });

    it("getStatus promise should be rejected because twitterReference.get throws error", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;
      TwitterService._twitterReference.get = jasmine.createSpy().and.throwError(errorMock);

      TwitterService.getStatus(1)
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);

    });

    it("getStatus promise should be rejected because twitterReference.get promise was rejected", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getStatus(1)
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      deferred.reject(errorMock);

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);

    });

    it("getStatus promise should be resolved", function() {

      var resultTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getStatus(1)
        .then(function(result) {
          resultTest = result;
        });

      deferred.resolve( {} );

      $rootScope.$apply();
      
      expect(resultTest).toEqual( {} );
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);      

    });

  });

  describe("getClosestWoeID() tests", function() {

    var url = "/1.1/trends/closest.json",
        twitterReferenceMock = null,
        deferred = null,
        errorMock = new Error("error");

    beforeEach(function() {

      inject(function(_$q_) {
        deferred = _$q_.defer();
      });

      twitterReferenceMock = {
        get: jasmine.createSpy().and.returnValue(deferred.promise)
      };

      spyOn(TwitterService, "isInitialized").and.callThrough();
      spyOn(TwitterService, "isConnected").and.callThrough();
      TwitterService._generateURL = jasmine.createSpy().and.returnValue( url );
      TwitterService._twitterReference = twitterReferenceMock;

    });

    it("getClosestWoeID promise should be rejected because TwitterService is not initialized", function() {

      var errorTest = null;

      TwitterService.getClosestWoeID()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be initialized"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(twitterReferenceMock.get.calls.count()).toEqual(0);

    });

    it("getClosestWoeID promise should be rejected because TwitterService is not connected", function() {

      var errorTest = null;

      TwitterService._initialized = true;

      TwitterService.getClosestWoeID()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be connected"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(twitterReferenceMock.get.calls.count()).toEqual(0);

    });

    it("getClosestWoeID promise should be rejected because no statusID is provided", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getClosestWoeID()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("Latitude and longitude need to be defined"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(twitterReferenceMock.get.calls.count()).toEqual(0);

    });

    it("getClosestWoeID promise should be rejected because twitterReference.get throws error", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;
      TwitterService._twitterReference.get = jasmine.createSpy().and.throwError(errorMock);

      TwitterService.getClosestWoeID(1, 1)
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);

    });

    it("getClosestWoeID promise should be rejected because twitterReference.get promise was rejected", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getClosestWoeID(1, 1)
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      deferred.reject(errorMock);

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);

    });

    it("getClosestWoeID promise should be resolved", function() {

      var resultTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getClosestWoeID(1, 1)
        .then(function(result) {
          resultTest = result;
        });

      deferred.resolve( [ {a:1}, {b:2} ] );

      $rootScope.$apply();
      
      expect(resultTest).toEqual( {a:1} );
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(twitterReferenceMock.get.calls.count()).toEqual(1);      

    });

  });

  describe("getPosition() tests", function() {

    var deferred = null,
        errorMock = new Error("error");

    beforeEach(function() {

      inject(function(_$q_) {
        deferred = _$q_.defer();
      });

      spyOn(TwitterService, "isInitialized").and.callThrough();
      spyOn(TwitterService, "isConnected").and.callThrough();
      geolocationServiceMock.getLocation = jasmine.createSpy().and.returnValue(deferred.promise);
    });

    it("getPosition promise should be rejected because TwitterService is not initialized", function() {

      var errorTest = null;

      TwitterService.getPosition()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be initialized"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(0);
      expect(geolocationServiceMock.getLocation.calls.count()).toEqual(0);

    });

    it("getPosition promise should be rejected because TwitterService is not connected", function() {

      var errorTest = null;

      TwitterService._initialized = true;

      TwitterService.getPosition()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be connected"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(geolocationServiceMock.getLocation.calls.count()).toEqual(0);

    });

    it("getPosition promise should be rejected because GeolocationService.getLocation throws error", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;
      geolocationServiceMock.getLocation = jasmine.createSpy().and.throwError(errorMock);

      TwitterService.getPosition()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(geolocationServiceMock.getLocation.calls.count()).toEqual(1);

    });

    it("getPosition promise should be rejected because geolocationServiceMock.getLocation promise was rejected", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getPosition()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      deferred.reject(errorMock);

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(geolocationServiceMock.getLocation.calls.count()).toEqual(1);

    });

    it("getClosestWoeID promise should be resolved", function() {

      var resultTest = null,
          responseMock = {longitude: 1, latitude: 1};


      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getPosition()
        .then(function(result) {
          resultTest = result;
        });

      deferred.resolve(responseMock);

      $rootScope.$apply();
      
      expect(resultTest).toEqual( {longitude: responseMock.longitude, latitude: responseMock.latitude} );
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(geolocationServiceMock.getLocation.calls.count()).toEqual(1);

    });

  });

  describe("getNearestTrends() tests", function() {

    var url = "/1.1/trends/place.json",
        twitterReferenceMock = { },
        errorMock = new Error("error"),
        getPositionDeferred = null,
        getClosestWoeIDDeferred = null,
        getDeferred = null;

    beforeEach(function() {

      inject(function(_$q_) {
        getPositionDeferred = _$q_.defer();
        getClosestWoeIDDeferred = _$q_.defer();
        getDeferred = _$q_.defer();
      });

      twitterReferenceMock.get = jasmine.createSpy().and.returnValue(getDeferred.promise);

      spyOn(TwitterService, "isInitialized").and.callThrough();
      spyOn(TwitterService, "isConnected").and.callThrough();
      TwitterService._generateURL = jasmine.createSpy().and.returnValue( url );
      TwitterService._twitterReference = twitterReferenceMock;
      TwitterService.getPosition = jasmine.createSpy().and.returnValue(getPositionDeferred.promise);
      TwitterService.getClosestWoeID = jasmine.createSpy().and.returnValue(getClosestWoeIDDeferred.promise);

    });

    it("getNearestTrends promise should be rejected because TwitterService is not initialized", function() {

      var errorTest = null;

      TwitterService.getNearestTrends()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be initialized"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(0);
      expect(TwitterService.getPosition.calls.count()).toEqual(0);
      expect(TwitterService.getClosestWoeID.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(0);

    });

    it("getNearestTrends promise should be rejected because TwitterService is not connected", function() {

      var errorTest = null;

      TwitterService._initialized = true;

      TwitterService.getNearestTrends()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be connected"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService.getPosition.calls.count()).toEqual(0);
      expect(TwitterService.getClosestWoeID.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(0);

    });

    it("getNearestTrends promise should be rejected because twitterReference.get throws error", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;
      TwitterService.getPosition = jasmine.createSpy().and.throwError(errorMock);

      TwitterService.getNearestTrends()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService.getPosition.calls.count()).toEqual(1);
      expect(TwitterService.getClosestWoeID.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(0);

    });

    it("getNearestTrends promise should be rejected because TwitterService.getPosition promise was rejected", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getNearestTrends()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      getPositionDeferred.reject(errorMock);

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService.getPosition.calls.count()).toEqual(1);
      expect(TwitterService.getClosestWoeID.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(0);

    });

    it("getNearestTrends promise should be rejected because TwitterService.getClosestWoeID promise was rejected", function() {

      var errorTest = null;

      positionResultMock = {latitude:1, longitude:1};

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getNearestTrends()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      getPositionDeferred.resolve(positionResultMock);
      getClosestWoeIDDeferred.reject(errorMock);

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService.getPosition.calls.count()).toEqual(1);
      expect(TwitterService.getClosestWoeID.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(0);

    });

    it("getNearestTrends promise should be rejected because TwitterService._twitterReference promise was rejected", function() {

      var errorTest = null;

      positionResultMock = {latitude:1, longitude:1};
      woeIDResultMock = {woeid: 1};

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getNearestTrends()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      getPositionDeferred.resolve(positionResultMock);
      getClosestWoeIDDeferred.resolve(woeIDResultMock);
      getDeferred.reject(errorMock)

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService.getPosition.calls.count()).toEqual(1);
      expect(TwitterService.getClosestWoeID.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(1);

    });

    it("getNearestTrends promise should be resolved", function() {

      var resultTest = null;

      positionResultMock = {latitude:1, longitude:1};
      woeIDResultMock = {woeid: 1};
      getResultMock = [ {a: 1}, {b:2} ];

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getNearestTrends()
        .then(function(result) {
          resultTest = result;
        });

      getPositionDeferred.resolve(positionResultMock);
      getClosestWoeIDDeferred.resolve(woeIDResultMock);
      getDeferred.resolve(getResultMock)

      $rootScope.$apply();

      expect(resultTest).toEqual( {a:1} );
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(TwitterService.getPosition.calls.count()).toEqual(1);
      expect(TwitterService.getClosestWoeID.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(1);

    });

  });

  describe("getTweetsByQuery() tests", function() {

    var url = "/1.1/search/tweets.json",
        twitterReferenceMock = { },
        errorMock = new Error("error"),
        getDeferred = null;

    beforeEach(function() {

      inject(function(_$q_) {
        getDeferred = _$q_.defer();
      });

      twitterReferenceMock.get = jasmine.createSpy().and.returnValue(getDeferred.promise);

      spyOn(TwitterService, "isInitialized").and.callThrough();
      spyOn(TwitterService, "isConnected").and.callThrough();
      TwitterService._generateURL = jasmine.createSpy().and.returnValue( url );
      TwitterService._twitterReference = twitterReferenceMock;
      spyOn(angular, "extend").and.returnValue( {} );

    });

    it("getTweetsByQuery promise should be rejected because TwitterService is not initialized", function() {

      var errorTest = null;

      TwitterService.getTweetsByQuery()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be initialized"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(0);
      expect(angular.extend.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(0);

    });

    it("getTweetsByQuery promise should be rejected because TwitterService is not connected", function() {

      var errorTest = null;

      TwitterService._initialized = true;

      TwitterService.getTweetsByQuery()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("TwitterService must be connected"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(angular.extend.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(0);

    });

    it("getTweetsByQuery promise should be rejected because parameters is not defined", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getTweetsByQuery()
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("parameters must be defined"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(angular.extend.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(0);

    });

    it("getTweetsByQuery promise should be rejected because parameters.q is not defined", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getTweetsByQuery( {} )
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(new Error("paramters.q must be defined"));
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(angular.extend.calls.count()).toEqual(0);
      expect(TwitterService._generateURL.calls.count()).toEqual(0);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(0);

    });    

    it("getTweetsByQuery promise should be rejected because TwitterService._twitterReference.get throws error", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;
      TwitterService._twitterReference.get = jasmine.createSpy().and.throwError(errorMock);

      TwitterService.getTweetsByQuery( {q: "%asd"} )
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(angular.extend.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(1);

    });

    it("getTweetsByQuery promise should be rejected because TwitterService._twitterReference.get promise was rejected", function() {

      var errorTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getTweetsByQuery( {q: "%asd"} )
        .then(
          function() { },
          function(error) {
            errorTest = error;
          }
        );

      getDeferred.reject(errorMock)

      $rootScope.$apply();

      expect(errorTest).toEqual(errorMock);
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(angular.extend.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(1);

    });

    it("getTweetsByQuery promise should be resolved", function() {

      var resultTest = null;

      TwitterService._initialized = true;
      TwitterService._connected = true;

      TwitterService.getTweetsByQuery( {q: "%asd"} )
        .then(function(result) { 
          resultTest = result;
        });

      getDeferred.resolve( {} )

      $rootScope.$apply();

      expect(resultTest).toEqual( {} );
      expect(TwitterService.isInitialized.calls.count()).toEqual(1);
      expect(TwitterService.isConnected.calls.count()).toEqual(1);
      expect(angular.extend.calls.count()).toEqual(1);
      expect(TwitterService._generateURL.calls.count()).toEqual(1);
      expect(TwitterService._twitterReference.get.calls.count()).toEqual(1);

    });

  });

});