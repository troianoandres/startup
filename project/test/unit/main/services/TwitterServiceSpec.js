describe("TwitterService tests", function() {

  var apiKey = "WSIEZrXVV9arA1qY-e8IYH6Z3Ro", 
      TwitterService = null;

  beforeEach(function() {

    // Mock the main module dependencies
    angular.mock.module("ui.router");
    angular.mock.module("ngCookies");
    angular.mock.module("app.home");
    angular.mock.module("app.trends");
    angular.mock.module("app.profile");

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

  // Tests for connectTwitter method
  xdescribe("connectTwitter() tests", function() {

    var $q, deferred, $rootScope;

    beforeEach(function() {

      inject(function(_$q_, _$rootScope_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
      });

    });

    describe("connectTwitter must not call redirect", function() {

      beforeEach(function() {

        deferred = $q.defer();

        spyOn(window.OAuth, "redirect").and.callFake(function() {});

      });

      describe("connectTwitter called with TwitterService initialized and connected", function() {

        beforeEach(function() {

          spyOn(TwitterService, "initialize").and.callFake(function() {
            initialized = true;
            connected = true;
          });

        });

        it("connectTwitter must not call redirect", function() {

          TwitterService.connectTwitter();

        });

      });

      describe("connectTwitter called with TwitterService not initialized and not connected", function() {

      });

    });

    it("TwitterService.connectTwitter must be defined", function() {
      expect(TwitterService.connectTwitter).not.toBe(null);
    });


    it("TwitterService.connectTwitter", function() {
      TwitterService.connectTwitter();
      
      deferred.resolve("hola");

      rootScope.$digest();
      

      expect(window.OAuth.popup).toHaveBeenCalled();
      //expect(TwitterService.getReference()).toBe(null);

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