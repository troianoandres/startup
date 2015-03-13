describe("ErrorController tests", function() {

  var $scope = null,
      $controller = null,
      controller = null,
      modalInstanceMock = null,
      error = null,
      errorMock = new Error("error");

  beforeEach(function() {

    // Mock the main module dependencies
    angular.mock.module("ui.router");
    angular.mock.module("ui.bootstrap");
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

    modalInstanceMock = { 
      dismiss: function(reason) { }
    };

    controller = $controller("ErrorController", {$scope: $scope, $modalInstance: modalInstanceMock, error: errorMock});

    $scope.$digest();

  });

  describe("statements tests", function() {

    it("statements must be defined", function() {
      expect(controller).not.toEqual(undefined);
      expect($scope).not.toEqual(undefined);
      expect(controller.title).not.toEqual(undefined);
      expect(controller.error).not.toEqual(undefined);
      expect(controller.close).not.toEqual(undefined);
    });

    it("statements must be initialized with the correct data", function() {
      expect(controller.title).toEqual("An error has ocurred");
      expect(controller.error).toEqual(errorMock);
    });

  });

  describe("close() method tests", function() {

    beforeEach(function() {
      spyOn(modalInstanceMock, "dismiss").and.callThrough();
    });

    it("close() must call modalInstanceMock.dismiss with 'close' reason", function() {

      controller.close();

      expect(modalInstanceMock.dismiss.calls.count()).toEqual(1);
      expect(modalInstanceMock.dismiss).toHaveBeenCalledWith("close");

    });

  });

});