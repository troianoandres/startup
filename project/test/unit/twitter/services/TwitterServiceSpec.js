
// First declare test suite for TwitterService
describe("\nTests for TwitterService\n", function() {

  var apiKey, TwitterService;

  beforeEach(function() {

    module("twitter");

    inject(function(_TwitterService_) {
      TwitterService = _TwitterService_;
      apiKey = "WSIEZrXVV9arA1qY-e8IYH6Z3Ro";
    });

  });


  // Test suite for TwitterService structure
  describe("TwitterService structure tests\n", function() {

    // Must be defined
    it("TwitterService should be defined\n", function() {
      expect(TwitterService).not.toEqual(null);      
    });

    // Must be null when created
    it("TwitterService.twitterReference should be null when created\n", function() {

      expect(TwitterService.getReference()).toEqual(null);

    });

  });

  // Tests for the initialize method
  describe("TwitterService initialize method tests\n", function() {


    beforeEach(function() {

      // Will spy on initialize and create from the OAuth library to mock the result
      spyOn(window.OAuth, "initialize").and.returnValue( {} );
      spyOn(window.OAuth, "create").and.returnValue( {} );

    });

    it("TwitterService.initialize must be defined", function() {
      expect(TwitterService.initialize).not.toBe(null);
    });

    // Expect to initialize and create to be called and the the twitterReference 
    // must be an Object
    it("Expect initialize and create to be called\n", function() {

      TwitterService.initialize();

      expect(window.OAuth.initialize).toHaveBeenCalledWith(apiKey);
      expect(window.OAuth.create).toHaveBeenCalled();
      expect(TwitterService.getReference()).toEqual( {} );

    });

  });

  // Tests for connectTwitter method
  describe("TwitterService connectTwitter method tests", function() {

    var $q, deferred, rootScope;

    beforeEach(function() {

      inject(function(_$q_, _$rootScope_) {
        $q = _$q_;
        rootScope = _$rootScope_;
      });

      deferred = $q.defer();

      spyOn(window.OAuth, "popup").and.callFake(function() {
        return deferred.promise;
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