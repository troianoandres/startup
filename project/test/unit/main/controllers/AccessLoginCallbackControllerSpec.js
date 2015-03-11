describe("AccessLoginCallbackController tests", function() {

  var $scope = null,
      $controller = null,
      controller = null,
      TwitterService = null,
      $state = null,
      $q = null,
      deferred = null;

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

    inject(function(_$controller_, _$rootScope_, _TwitterService_, _$state_, _$q_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      TwitterService = _TwitterService_;
      $state = _$state_;
      $q = _$q_;
    });

    deferred = $q.defer();

    spyOn(TwitterService, "connectionCallback").and.callFake(function() {
      return deferred.promise;
    });

    spyOn($state, "go").and.callFake(function() {
      return {};
    });

    controller = $controller("AccessLoginCallbackController", {
      $scope: $scope, 
      TwitterService: TwitterService, 
      $state: $state
    });

    $scope.$digest();

  });

  it("Expect all statemest to be correctly resolves", function() {
    expect(controller).not.toBe(undefined);
    expect($state).not.toBe(undefined);
    expect($scope).not.toBe(undefined);
  });

  xit("connectionCallback fail and $state.go must not be called", function() {

    deferred.reject(new Error("error"));

    //$scope.$apply();

    expect($state.go.calls.count()).toBe(0);

  });

  xit("connectionCallback resolved and $state.go must be called once", function() {

    deferred.resolve( {} );

    //$scope.$apply();

    expect($state.go.calls.count()).toBe(1);

  });

});