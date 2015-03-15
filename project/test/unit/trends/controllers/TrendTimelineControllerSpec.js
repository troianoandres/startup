describe("TrendTimelineController tests", function() {
  
  var $controller = null,
      controller = null,
      $scope = null,
      stateParamsMock = {
        trendQuery: "asd",
        title: "Tweets for the selected trend",
        source: "trend_timeline"
      },
      TwitterService = null;

  beforeEach(function() {

    // Mock the main module dependencies
    angular.mock.module("ui.router");
    angular.mock.module("ngCookies");
    angular.mock.module("ngSanitize");
    angular.mock.module("app.home");
    angular.mock.module("app.people");
    angular.mock.module("app.statuses");

    // Retrieve the main module
    module("app.trends");
    module("app");

    inject(function(_$controller_, _$rootScope_, _TwitterService_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      TwitterService = _TwitterService_;
    });

    controller = $controller("TrendTimelineController", {$scope: $scope, $stateParams: stateParamsMock, TwitterService: TwitterService});

  });

  describe("statements tests", function() {

    beforeEach(function() {
      $scope.$digest();
    });

    it("expect statements to be defined", function() {
      expect(controller).not.toEqual(undefined);
      expect(controller).not.toEqual(null);
      expect($scope).not.toEqual(undefined);
      expect($scope).not.toEqual(null);
      expect(controller.tweetListConfig).not.toBe(undefined);
      expect(controller.tweetListConfig).not.toBe(null);
    });

    it("expect statements to be defined with the correct data", function() {
      expect(controller.tweetListConfig.query).toEqual(stateParamsMock.trendQuery);
      expect(controller.tweetListConfig.title).toEqual(stateParamsMock.title);
      expect(controller.tweetListConfig.source).toEqual(stateParamsMock.source);
    });

  });

});