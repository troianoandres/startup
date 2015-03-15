describe("TrendController tests", function() {
  
  var $controller = null,
      controller = null,
      $scope = null,
      trendMock = { id: "030" },
      $state = null;

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

    inject(function(_$controller_, _$rootScope_, _$state_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      $state = _$state_;
    });

    $scope.trend = trendMock;

    controller = $controller("TrendController", {$scope: $scope, $state: $state});

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
      expect(controller.showTrendTimeline).not.toBe(undefined);
    });

    it("expect statements to be defined with the correct data", function() {
      expect(controller.trend).toEqual(trendMock);    
    });

  });

  describe("showTrendTimeline() tests", function() {

    beforeEach(function() {
      spyOn($state, "go").and.callFake(function() {
        return {};
      });

      $scope.$digest();
    });

    it("$state.go must be called into showTrendTimeline()", function() {

      controller.showTrendTimeline();

      expect($state.go.calls.count()).toEqual(1);

    });

  });

});