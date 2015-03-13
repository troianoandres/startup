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

  });

  describe("statements tests", function() {

    it("statements must be defined", function() {

      $scope.$digest();

      expect(controller).not.toEqual(undefined);
      expect($state).not.toEqual(undefined);
      expect($scope).not.toEqual(undefined);
      expect(TwitterService).not.toBe(undefined);
      expect(controller.redirectHome).not.toEqual(undefined);
      expect(controller.redirectLogin).not.toEqual(undefined);
    });

  });

  describe("redirectHome() tests", function() {

    it("$state.go must be called with app.home.timeline", function() {

      $scope.$digest();

      controller.redirectHome();

      expect($state.go).toHaveBeenCalledWith("app.home.timeline");

    });

  });

  describe("redirectLogin() tests", function() {

    it("$state.go must be called with access.login", function() {

      $scope.$digest();

      controller.redirectLogin();

      expect($state.go).toHaveBeenCalledWith("access.login");

    });

  });

});