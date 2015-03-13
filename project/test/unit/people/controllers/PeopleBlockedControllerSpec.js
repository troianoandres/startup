describe("PeopleBlockedController tests", function() {

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
    angular.mock.module("app.statuses");

    // Retrieve the main module
    module("app.people");
    module("app");

    inject(function(_$controller_, _$rootScope_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
    });

    controller = $controller("PeopleBlockedController", {$scope: $scope});

    $scope.$digest();

  });

  it("controller must be defined", function() {

    expect(controller).not.toEqual(undefined);
    expect(controller).not.toEqual(null);
    expect($scope).not.toEqual(undefined);
    expect($scope).not.toEqual(null);

  });

});