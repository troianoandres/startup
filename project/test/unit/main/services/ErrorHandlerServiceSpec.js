describe("ErrorHandlerService tests", function() {

  var ErrorHandlerService = null,
      $rootScope = null,
      modalMock = null;

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

    modalMock = {
      open: jasmine.createSpy().and.returnValue( {} )
    };

    module(function($provide) {
      $provide.value("$modal", modalMock);
    });

    inject(function(_$injector_, _$rootScope_) {
      ErrorHandlerService = _$injector_.get("ErrorHandlerService");
      $rootScope = _$rootScope_;
    });

  });

  describe("statements tests", function() {

    it("statements must be defined", function() {
      expect(ErrorHandlerService).not.toEqual(undefined);
      expect(ErrorHandlerService.error).not.toEqual(undefined);
      expect(ErrorHandlerService.displayError).not.toEqual(undefined);
      expect(ErrorHandlerService.initializeErrorResult).not.toEqual(undefined);
      expect(ErrorHandlerService.resetError).not.toEqual(undefined);
    });

    it("statements must be initialized with the correct data", function() {
      expect(ErrorHandlerService.error).toEqual(null);
    });

  });

  describe("displayError() tests", function() {

    beforeEach(function() {
      ErrorHandlerService.initializeErrorResult = jasmine.createSpy();
    });

    it("displayError() should initialize ErrorHandlerService.error and call ErrorHandlerService.initializeErrorResult", function() {

      ErrorHandlerService.displayError(new Error("error"));

      expect(modalMock.open.calls.count()).toEqual(1);
      expect(ErrorHandlerService.error).toEqual( {} );
      expect(ErrorHandlerService.initializeErrorResult.calls.count()).toEqual(1);

    });

    it("displayError() must not do anything", function() {

      ErrorHandlerService.displayError();

      expect(modalMock.open.calls.count()).toEqual(0);
      expect(ErrorHandlerService.error).toEqual(null);
      expect(ErrorHandlerService.initializeErrorResult.calls.count()).toEqual(0);

    });

  });

  describe("initializeErrorResult() tests", function() {

    var deferred = null;

    beforeEach(function() {

      inject(function(_$q_) {
        deferred = _$q_.defer();
      });

      ErrorHandlerService.resetError = jasmine.createSpy();

      ErrorHandlerService.error = {
        result: deferred.promise
      };
    });

    it("initializeErrorResult should call resetError after promise is rejected", function() {

      ErrorHandlerService.initializeErrorResult();

      deferred.reject(new Error("asd"));

      $rootScope.$apply();

      expect(ErrorHandlerService.resetError.calls.count()).toEqual(1);

    });

    it("initializeErrorResult should call resetError after promise is resolved", function() {

      ErrorHandlerService.initializeErrorResult();

      deferred.resolve( {} );

      $rootScope.$apply();

      expect(ErrorHandlerService.resetError.calls.count()).toEqual(1);

    });

  });

  describe("resetError() tests", function() {

    beforeEach(function() {

      ErrorHandlerService.error = { };

    });

    it("resetError should reset ErrorHandlerService.error", function() {

      ErrorHandlerService.resetError();

      expect(ErrorHandlerService.error).toEqual(null);

    });

  });


});