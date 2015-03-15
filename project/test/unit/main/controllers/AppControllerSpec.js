describe("AppController tests", function() {

  var $scope = null,
      $controller = null,
      controller = null,
      $state = null,
      logged = false;

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

    inject(function(_$controller_, _$rootScope_, _$state_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      $state = _$state_;
    });

    spyOn($state, "go").and.callFake(function() { });

  });

  describe("expect all statements to be defined", function() {

    beforeEach(function() {
      controller = $controller("AppController", {$scope: $scope, logged: logged, $state: $state});        

      $scope.$digest();
    });


    it("Expect all statemest to be correctly resolves", function() {
      expect(controller).not.toBe(undefined);
      expect($state).not.toBe(undefined);
      expect($scope).not.toBe(undefined);
    });

  });

  describe("user is not logged in", function() {

    beforeEach(function() {
      logged = false;
      controller = $controller("AppController", {$scope: $scope, logged: logged, $state: $state});        
      $scope.$digest();
    });

    it("expect $state.go to have been called 1 times", function() {

      expect($state.go.calls.count()).toBe(1);

    });

  });

  describe("user is logged in", function() {

    beforeEach(function() {
      logged = true;
      controller = $controller("AppController", {$scope: $scope, logged: logged, $state: $state});        
      $scope.$digest();
    });

    it("expect $state.go to have been called 0 times", function() {

      expect($state.go.calls.count()).toBe(0);

    });

  });

});