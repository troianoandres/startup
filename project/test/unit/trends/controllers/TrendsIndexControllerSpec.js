describe("TrendIndexController tests", function() {
  
  var $controller = null,
      controller = null,
      $scope = null,
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

    controller = $controller("TrendsIndexController", {$scope: $scope});

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
      expect(TwitterService).not.toEqual(undefined);
      expect(TwitterService).not.toEqual(null);
    });

  });

});