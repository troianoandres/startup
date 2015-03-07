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

  xdescribe("TwitterService.getTweets method tests", function() {

    var $q, deferred;

    beforeEach(function() {

      inject(function(_$q_) {
        $q = _$q_;
      });

      deferred = $q.defer();
      deferred.resolve("ok")
      

      TwitterService.twitterReference = {
        get: function() { }
      };

      spyOn(TwitterService.twitterReference, "get").and.returnValue(deferred.promise);

    });

  });



});