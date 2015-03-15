describe("TweetListController tests", function() {

  var $scope = null,
      $controller = null,
      TwitterService = null,
      title = "test title",
      errorMock = new Error("error"),
      ErrorHandlerService = null;

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

    inject(function(_$controller_, _$rootScope_, _TwitterService_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      TwitterService = _TwitterService_;
      ErrorHandlerService = { };
      ErrorHandlerService.displayError = jasmine.createSpy();      
    });

    spyOn(TwitterService, "initialize").and.callFake(function() { });

    $scope.title = title;

  });

  describe("tests for home_timeline", function() {

    var source = "home_timeline",
        query = undefined,
        tweetsMock = [{id:1}, {id:2}];

    beforeEach(function() {

      $scope.query = query;
      $scope.source = source;

      controller = $controller("TweetListController", {$scope: $scope, TwitterService: TwitterService, ErrorHandlerService: ErrorHandlerService});      

    });

    it("statements must be defined", function() {

      $scope.$digest();

      expect(controller).not.toBe(undefined);
      expect(controller).not.toBe(null);
      expect(controller.directive).not.toBe(null);
      expect(controller.directive).toEqual({
        title:    title,
        source:   source,
        query:    query,
        error:    false,
        loading:  false,
        tweets:   []
      });
      expect(controller.initialize).not.toBe(undefined);
      expect(controller.initialize).not.toBe(null);
      expect(controller.loadTweets).not.toBe(undefined);
      expect(controller.loadTweets).not.toBe(null);      

    });

    describe("loadTweets() tests", function() {

      beforeEach(function() {

        spyOn(controller, "loadHomeTimeline").and.callFake(function() {});
        spyOn(controller, "loadTrendTimeline").and.callFake(function() {});

        $scope.$digest();

      });

      it("loadTweets must call loadHomeTimeline once and none loadTrendTimeline", function() {      

        controller.loadTweets();

        expect(controller.loadHomeTimeline.calls.count()).toEqual(1);
        expect(controller.loadTrendTimeline.calls.count()).toEqual(0);
      
      });

    });

    describe("loadHomeTimeline() tests", function() {

      var $q = null,
          deferred = null;

      beforeEach(function() {

        inject(function(_$q_) {
          $q = _$q_;
        });

        deferred = $q.defer();

        spyOn(TwitterService, "getHomeTimeline").and.callFake(function() {
          return deferred.promise;
        });

        $scope.$digest();

      });

      it("loadHomeTimeline() resolve the promise with no tweets yet", function() {

        controller.loadHomeTimeline();

        expect(controller.directive.loading).toEqual(true);

        deferred.resolve(tweetsMock);

        $scope.$apply();

        expect(controller.directive.tweets).toEqual(tweetsMock);
        expect(controller.directive.loading).toEqual(false);
        expect(TwitterService.getHomeTimeline.calls.count()).toEqual(1);

      });

      it("loadHomeTimeline() reject the promise with no tweets yet", function() {

        controller.loadHomeTimeline();

        expect(controller.directive.loading).toEqual(true);

        deferred.reject(errorMock);

        $scope.$apply();

        expect(controller.directive.tweets).toEqual([]);
        expect(controller.directive.loading).toEqual(false);
        expect(TwitterService.getHomeTimeline.calls.count()).toEqual(1);
        expect(ErrorHandlerService.displayError.calls.count()).toEqual(1);

      });      

      it("loadHomeTimeline() resolve the promise with tweets already loaded", function() {

        controller.directive.tweets = tweetsMock;

        controller.loadHomeTimeline();

        expect(controller.directive.loading).toEqual(true);

        deferred.resolve(tweetsMock);

        $scope.$apply();

        expect(controller.directive.tweets).toEqual( tweetsMock.concat(tweetsMock) );
        expect(controller.directive.loading).toEqual(false);
        expect(TwitterService.getHomeTimeline.calls.count()).toEqual(1);

      });      

      it("loadHomeTimeline() reject the promise with tweets already loaded", function() {

        controller.directive.tweets = tweetsMock;

        controller.loadHomeTimeline();

        expect(controller.directive.loading).toEqual(true);

        deferred.reject(errorMock);

        $scope.$apply();

        expect(controller.directive.tweets).toEqual( tweetsMock );
        expect(controller.directive.loading).toEqual(false);
        expect(TwitterService.getHomeTimeline.calls.count()).toEqual(1);
        expect(ErrorHandlerService.displayError.calls.count()).toEqual(1);

      });  

    });

  });

  describe("tests for trend_timeline", function() {

    var source = "trend_timeline",
        query = "%hello",
        tweetsMock = {
          statuses: [{id:1}, {id:2}]
        };

    beforeEach(function() {

      $scope.query = query;
      $scope.source = source;

      controller = $controller("TweetListController", {$scope: $scope, TwitterService: TwitterService, ErrorHandlerService: ErrorHandlerService});      

    });

    it("statements must be defined", function() {

      $scope.$digest();

      expect(controller).not.toBe(undefined);
      expect(controller).not.toBe(null);
      expect(controller.directive).not.toBe(null);
      expect(controller.directive).toEqual({
        title:    title,
        source:   source,
        query:    query,
        error:    false,
        loading:  false,
        tweets:   []
      });
      expect(controller.initialize).not.toBe(undefined);
      expect(controller.initialize).not.toBe(null);
      expect(controller.loadTweets).not.toBe(undefined);
      expect(controller.loadTweets).not.toBe(null);      

    });

    describe("loadTweets() tests", function() {

      beforeEach(function() {

        spyOn(controller, "loadHomeTimeline").and.callFake(function() {});
        spyOn(controller, "loadTrendTimeline").and.callFake(function() {});

        $scope.$digest();

      });

      it("loadTweets must call loadHomeTimeline once and none loadTrendTimeline", function() {      

        controller.loadTweets();

        expect(controller.loadHomeTimeline.calls.count()).toEqual(0);
        expect(controller.loadTrendTimeline.calls.count()).toEqual(1);
      
      });

    });

    describe("loadHomeTimeline() tests", function() {

      var $q = null,
          deferred = null;

      beforeEach(function() {

        inject(function(_$q_) {
          $q = _$q_;
        });

        deferred = $q.defer();

        spyOn(TwitterService, "getTweetsByQuery").and.callFake(function() {
          return deferred.promise;
        });

        $scope.$digest();

      });

      it("loadTrendTimeline() resolve the promise with no tweets yet", function() {

        controller.loadTrendTimeline();

        expect(controller.directive.loading).toEqual(true);

        deferred.resolve(tweetsMock);

        $scope.$apply();

        expect(controller.directive.tweets).toEqual(tweetsMock.statuses);
        expect(controller.directive.loading).toEqual(false);
        expect(TwitterService.getTweetsByQuery.calls.count()).toEqual(1);

      });

      it("loadTrendTimeline() reject the promise with no tweets yet", function() {

        controller.loadTrendTimeline();

        expect(controller.directive.loading).toEqual(true);

        deferred.reject(errorMock);

        $scope.$apply();

        expect(controller.directive.tweets).toEqual( [] );
        expect(controller.directive.loading).toEqual(false);
        expect(TwitterService.getTweetsByQuery.calls.count()).toEqual(1);
        expect(ErrorHandlerService.displayError.calls.count()).toEqual(1);

      });      

      it("loadTrendTimeline() resolve the promise with tweets already loaded", function() {

        controller.directive.tweets = tweetsMock.statuses;

        controller.loadTrendTimeline();

        expect(controller.directive.loading).toEqual(true);

        deferred.resolve(tweetsMock);

        $scope.$apply();

        expect(controller.directive.tweets).toEqual( tweetsMock.statuses.concat(tweetsMock.statuses) );
        expect(controller.directive.loading).toEqual(false);
        expect(TwitterService.getTweetsByQuery.calls.count()).toEqual(1);

      });      

      it("loadTrendTimeline() reject the promise with tweets already loaded", function() {

        controller.directive.tweets = tweetsMock.statuses;

        controller.loadTrendTimeline();

        expect(controller.directive.loading).toEqual(true);

        deferred.reject(errorMock);

        $scope.$apply();

        expect(controller.directive.tweets).toEqual( tweetsMock.statuses );
        expect(controller.directive.loading).toEqual(false);
        expect(TwitterService.getTweetsByQuery.calls.count()).toEqual(1);
        expect(ErrorHandlerService.displayError.calls.count()).toEqual(1);

      });  

    });

  });

  describe("initialize() tests", function() {

    beforeEach(function() {

      controller = $controller("TweetListController", {$scope: $scope, TwitterService: TwitterService});      

      spyOn(controller, "loadTweets").and.callFake(function() { });

      $scope.$digest();
    });

    it("loadTweets must be defined and called after calling initialize", function() {      

      controller.initialize();

      expect(TwitterService.initialize.calls.count()).toEqual(1);
      expect(controller.loadTweets.calls.count()).toEqual(1);

    });

  });

});