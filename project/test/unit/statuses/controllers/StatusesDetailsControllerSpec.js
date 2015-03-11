describe("StatusesDetailsController tests", function() {

  var $scope = null,
      $controller = null,
      TwitterService = null,
      controller = null;

  beforeEach(function() {

    // Mock the main module dependencies
    angular.mock.module("ui.router");
    angular.mock.module("ngCookies");
    angular.mock.module("ngSanitize");
    angular.mock.module("app.home");
    angular.mock.module("app.trends");
    angular.mock.module("app.people");

    // Retrieve the main module
    module("app.statuses");
    module("app");

    inject(function(_$controller_, _$rootScope_, _TwitterService_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      TwitterService = _TwitterService_;
    });

    controller = $controller("StatusesDetailsController", {$scope: $scope, TwitterService: TwitterService});

    $scope.$digest();

  });

  it("Expect all statements to be correctly resolved", function() {

    expect(TwitterService).not.toBe(undefined);
    expect(controller).not.toBe(undefined);
    expect(controller.tweet).toBe(null);
    expect(controller.loading).toBe(false);
    expect(controller.initialize).not.toBe(undefined);

  });

  describe("initialize() tests", function() {

    var tweetMock = { },
        errorMock = new Error("error"),
        deferred = null,
        $q = null;

    beforeEach(function() {

      inject(function(_$q_) {
        $q = _$q_;
      });

      deferred = $q.defer();

      spyOn(TwitterService, "getStatus").and.callFake(function() {
        return deferred.promise;
      });

      spyOn(TwitterService, "initialize").and.callFake(function() { });

    });

    it("initialize should fail", function() {

      expect(controller.loading).toBe(false);

      controller.initialize();

      expect(controller.loading).toBe(true);
      
      deferred.reject(errorMock);

      $scope.$apply();

      expect(controller.tweet).toBe(null);
      expect(TwitterService.getStatus.calls.count()).toBe(1);
      expect(controller.loading).toBe(false);

    });

    it("initialize should return a tweet object", function() {

      expect(controller.loading).toBe(false);

      controller.initialize();

      expect(controller.loading).toBe(true);
      
      deferred.resolve(tweetMock);

      $scope.$apply();

      expect(controller.tweet).toBe(tweetMock);
      expect(TwitterService.getStatus.calls.count()).toBe(1);
      expect(controller.loading).toBe(false);

    });

  });

});