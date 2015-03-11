describe("LoadingOverlayController tests", function() {

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
    angular.mock.module("app.statuses");

    // Retrieve the main module
    module("app");

    inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
    });

    controller = $controller("LoadingOverlayController", {$scope: $scope});

    $scope.$digest()

  });

  describe("expect all statements to be defined", function() {

    it("Expect all statemest to be correctly resolves", function() {
      expect(controller).not.toBe(undefined);
      expect($scope).not.toBe(undefined);
    });

  });

});