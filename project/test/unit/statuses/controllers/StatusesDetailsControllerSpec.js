/**
 *  Mostrar
 */
describe("StatusesDetailsController tests", function() {

  var $scope = null,
      $stateParams = null,
      $filter = null,
      TwitterService = null,
      ErrorHandlerService = null,
      controller = null,
      tweetMock = {
        text: "asd" 
      },
      deferred = null,
      tweetLinkMock = null,
      errorMock = new Error("error");

  beforeEach(function() {

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

    inject(function(_$rootScope_, _$controller_, _$q_) {
      
      $scope = _$rootScope_.$new();
      
      $stateParams = {statusID: 1};    

      $filter = jasmine.createSpy().and.callFake(function() { return tweetLinkMock; });

      ErrorHandlerService = { };
      ErrorHandlerService.displayError = jasmine.createSpy();

      deferred = _$q_.defer();

      TwitterService = {
        initialize: jasmine.createSpy(),
        getStatus: jasmine.createSpy().and.returnValue(deferred.promise)
      };

      controller = _$controller_("StatusesDetailsController", {
        $scope: $scope,
        $stateParams: $stateParams,
        $filter: $filter,
        TwitterService: TwitterService,
        ErrorHandlerService: ErrorHandlerService
      });

    });

  });

  describe("statements tests", function() {

    it("statements must be defined", function() {

      expect(controller).not.toEqual(undefined);
      expect($scope).not.toEqual(undefined);
      expect($stateParams).not.toEqual(undefined);
      expect($filter).not.toEqual(undefined);
      expect(TwitterService).not.toEqual(undefined);
      expect(ErrorHandlerService).not.toEqual(undefined);
      expect(controller.tweet).not.toEqual(undefined);
      expect(controller.loading).not.toEqual(undefined);
      expect(controller.initialize).not.toEqual(undefined);
      expect(controller.setTweet).not.toEqual(undefined);

    });

    it("statements must be initialized with the correct data", function() {

      expect(controller.tweet).toEqual(null);
      expect(controller.loading).toEqual(false);
      expect(typeof controller.initialize).toEqual(typeof function() {});
      expect(typeof controller.setTweet).toEqual(typeof function() {});

    });

  });

  describe("initialize() tests", function() {

    beforeEach(function() {
      controller.setTweet = jasmine.createSpy();
    });

    it("TwitterService should resolve the promise", function() {

      controller.initialize();

      expect(TwitterService.initialize.calls.count()).toEqual(1);
      expect(controller.loading).toEqual(true);
      expect(TwitterService.getStatus.calls.count()).toEqual(1);
      expect(TwitterService.getStatus).toHaveBeenCalledWith($stateParams.statusID);

      deferred.resolve( {} );

      $scope.$apply();

      expect(controller.setTweet.calls.count()).toEqual(1);
      expect(controller.setTweet).toHaveBeenCalledWith( {} );
      expect(ErrorHandlerService.displayError.calls.count()).toEqual(0);
      expect(controller.loading).toEqual(false);

    });

    it("TwitterService should reject the promise", function() {

      controller.initialize();

      expect(TwitterService.initialize.calls.count()).toEqual(1);
      expect(controller.loading).toEqual(true);
      expect(TwitterService.getStatus.calls.count()).toEqual(1);
      expect(TwitterService.getStatus).toHaveBeenCalledWith($stateParams.statusID);

      deferred.reject( errorMock );

      $scope.$apply();

      expect(controller.setTweet.calls.count()).toEqual(0);
      expect(ErrorHandlerService.displayError.calls.count()).toEqual(1);
      expect(ErrorHandlerService.displayError).toHaveBeenCalledWith(errorMock);
      expect(controller.loading).toEqual(false);

    });

  });

  describe("setTweet() tests", function() {

    describe("tweetLinkMock throws error", function() {

      beforeEach(function() {

        tweetLinkMock = jasmine.createSpy().and.throwError(errorMock.message);

      });

      it("ErrorHandlerService.displayError must be called because $filter throws error", function() {

        controller.setTweet(tweetMock);

        expect(ErrorHandlerService.displayError.calls.count()).toEqual(1);
        expect(controller.tweet).toEqual(tweetMock);

      });

    });

    describe("tweetLinkMock should format the tweet.text", function() {

      beforeEach(function() {

        tweetLinkMock = jasmine.createSpy().and.returnValue("asd");

      });

      it("tweetLinkMock should be called and tweet.text must be 'asd' ", function() {

        controller.setTweet(tweetMock);

        expect(ErrorHandlerService.displayError.calls.count()).toEqual(0);
        expect(tweetLinkMock.calls.count()).toEqual(1);
        expect(controller.tweet.text).toEqual("asd");

      });

    });

  });

});


