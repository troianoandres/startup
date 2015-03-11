describe("PeopleListController tests", function() {

  var $scope = null,
      $controller = null,
      TwitterService = null,
      controller = null,
      listTitle = "Test title",
      $q = null,
      deferred = null;

  beforeEach(function() {

    // Mock the main module dependencies
    angular.mock.module("ui.router");
    angular.mock.module("ngCookies");
    angular.mock.module("ngSanitize");
    angular.mock.module("app.home");
    angular.mock.module("app.trends");

    // Retrieve the main module
    module("app.people");
    module("app");

    inject(function(_$controller_, _$rootScope_, _TwitterService_, _$q_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      TwitterService = _TwitterService_;
      $q = _$q_;
    });

    peopleMock = [{a:1}, {b:2}] ;

    $scope.listTitle = listTitle;

    controller = $controller("PeopleListController", {$scope: $scope, TwitterService: TwitterService});

    $scope.$digest();

  });

  it("Expect all statemest to be correctly resolves", function() {
    expect(controller).not.toBe(undefined);
    expect(controller.listTitle).toBe(listTitle);
    expect(controller.loading).toBe(false);
    expect(typeof controller.people).toBe(typeof []);
    expect(controller.people.length).toBe(0);
  });

  describe("initialize() tests", function() {

    var peopleMock = { users: ["a", "b"] },
        error = new Error("error");

    beforeEach(function() {

      deferred = $q.defer();

      spyOn(TwitterService, "getBlockedPeople").and.callFake(function() {
        return deferred.promise;
      });

    });

    it("getBlockedPeople should fail", function() {
    
      expect(controller.loading).toBe(false);

      controller.initialize();

      expect(controller.loading).toBe(true);
      
      deferred.reject(error);

      $scope.$apply();

      expect(TwitterService.getBlockedPeople.calls.count()).toBe(1);
      expect(controller.loading).toBe(false);

    });

    it("getBlockedPeople should resolve the promise", function() {

      expect(controller.loading).toBe(false);

      controller.initialize();

      expect(controller.loading).toBe(true);
      
      deferred.resolve(peopleMock);

      $scope.$apply();

      expect(controller.people).toBe(peopleMock.users);
      expect(TwitterService.getBlockedPeople.calls.count()).toBe(1);
      expect(controller.loading).toBe(false);

    })

  });


});