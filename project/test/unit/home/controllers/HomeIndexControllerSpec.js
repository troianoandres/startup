describe("HomeIndexController tests", function() {

  var $scope = null,
      $controller = null,
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
    module("app.home");
    module("app");

    inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
    });

    controller = $controller("HomeIndexController", {$scope: $scope});

    $scope.$digest();

  });

  it("Expect all statemest to be correctly resolves", function() {
    expect(controller).not.toBe(undefined);
  });

});