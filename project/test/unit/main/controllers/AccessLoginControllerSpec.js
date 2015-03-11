describe("AccessLoginController tests", function() {

  var $scope = null,
      $controller = null,
      controller = null,
      TwitterService = null;

  beforeEach(function() {

    // Mock the main module dependencies
    angular.mock.module("ui.router");
    angular.mock.module("ngCookies");
    angular.mock.module("ngSanitize");
    angular.mock.module("app.home");
    angular.mock.module("app.trends");
    angular.mock.module("app.people");

    // Retrieve the main module
    module("app");

    inject(function(_$controller_, _$rootScope_, _TwitterService_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      TwitterService = _TwitterService_;
    });

    controller = $controller("AccessLoginController", {$scope: $scope, TwitterService: TwitterService});        

    $scope.$digest();

  });

  it("Expect all statemest to be correctly resolves", function() {
    expect(controller).not.toBe(undefined);
    expect(controller.login).not.toBe(undefined);
    expect($scope).not.toBe(undefined);
    expect(TwitterService).not.toBe(undefined);
    expect(TwitterService.connectTwitter).not.toBe(undefined);
  });

  describe("login() tests", function() {

    beforeEach(function() {

      spyOn(TwitterService, "connectTwitter").and.callFake(function() { });

    });

    it("login should call connectTwitter", function() {

      controller.login();

      expect(TwitterService.connectTwitter.calls.count()).toBe(1);

    });

  });

});