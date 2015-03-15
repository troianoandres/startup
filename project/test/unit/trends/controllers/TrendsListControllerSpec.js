describe("TrendsListController tests", function() {
  
  var $controller = null,
      controller = null,
      $scope = null,
      TwitterService = null,
      listTitleMock = "test title",
      ErrorHandlerService = null;

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

    inject(function(_$controller_, _$rootScope_, _TwitterService_) {
      $scope = _$rootScope_.$new();
      $controller = _$controller_;
      TwitterService = _TwitterService_;
      
      ErrorHandlerService = {
        displayError: jasmine.createSpy()
      };

    });

    $scope.listTitle = listTitleMock;

    controller = $controller("TrendsListController", {$scope: $scope, TwitterService: TwitterService, ErrorHandlerService: ErrorHandlerService});

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
      
      expect(controller.initialize).not.toEqual(undefined);
      expect(controller.loading).not.toEqual(undefined);
      expect(controller.listTitle).not.toEqual(undefined);
      expect(controller.trends).not.toEqual(undefined);
    });

    it("expect statements to be defined with the correct data", function() {
      expect(controller.loading).toEqual(false);
      expect(controller.listTitle).toEqual(listTitleMock);
      expect(controller.trends).toEqual([]);
    });

  });

  describe("initialize() tests", function() {

    var $q = null,
        deferred = null,
        trendsResultMock = {
          trends: [{id:1}, {id:2}]
        },
        errorMock = new Error("error");

    beforeEach(function() {

      inject(function(_$q_) {
        $q = _$q_;
      });

      deferred = $q.defer();

      spyOn(TwitterService, "getNearestTrends").and.callFake(function() {
        return deferred.promise;
      });

      $scope.$digest();

    });

    it("initialize should resolve the promise and should set the trends attribute", function() {

      expect(controller.loading).toEqual(false);

      controller.initialize();

      deferred.resolve(trendsResultMock);

      expect(controller.loading).toEqual(true);

      $scope.$apply();

      expect(controller.loading).toEqual(false);
      expect(controller.trends).toEqual(trendsResultMock.trends);

    });

    it("initialize should reject the promise and should set the trends attribute", function() {

      expect(controller.loading).toEqual(false);

      controller.initialize();

      deferred.reject(errorMock);

      expect(controller.loading).toEqual(true);

      $scope.$apply();

      expect(controller.loading).toEqual(false);
      expect(controller.trends).toEqual([]);
      expect(ErrorHandlerService.displayError.calls.count()).toEqual(1);
      expect(ErrorHandlerService.displayError).toHaveBeenCalledWith(errorMock);

    });

  });

});