describe("TweetController tests", function() {

  var $scope = null,
      $controller = null,
      controller = null,
      $state = null,
      $filter = null;

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

    inject(function(_$controller_, _$rootScope_, _$filter_, _$state_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      $state = _$state_;
      $filter = _$filter_;
    });

    $scope.tweet = { text: "#NoSeQuePoner" };

    spyOn($state, "go").and.callFake(function() { });

    controller = $controller("TweetController", {$scope: $scope, $state: $state, $filter: $filter});

    $scope.$digest();

  });

  describe("expect all statements to be defined", function() {

    it("Expect all statemest to be correctly resolves", function() {
      expect(controller).not.toBe(undefined);
      expect($scope).not.toBe(undefined);
      expect($state).not.toBe(undefined);
      expect($filter).not.toBe(undefined);
      expect(controller.tweet).not.toBe(undefined);
      expect(controller.tweet).not.toBe(null);
      expect(controller.tweet.text).not.toBe(undefined);
      expect(controller.showTweetDetail).not.toBe(undefined);
    });

  });

  describe("showTweetDetail() tests", function() {

    it("showTweetDetail should call $state.go", function() {

      controller.showTweetDetail();

      expect($state.go.calls.count()).toBe(1);

    });

  });

});