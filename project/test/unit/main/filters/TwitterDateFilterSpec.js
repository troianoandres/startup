describe("TwitterDateFilter tests", function() {

  var $filter = null,
      windowMock = null,
      formNowMock = null;

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

    fromNowMock = {
      fromNow: jasmine.createSpy()
    };

    windowMock = {
      moment: jasmine.createSpy().and.returnValue(fromNowMock)
    };

    module(function(_$provide_) {
      _$provide_.value("$window", windowMock);
    });

    inject(function(_$filter_) {
      $filter = _$filter_;
    });

  });

  describe("statements tests", function() {

    it("statements must be defined", function() {

      expect($filter("twitterDate")).not.toEqual(undefined);
      expect($filter("twitterDate")).not.toEqual(null);

    });

  });

  describe("twitterDate tests", function() {

    it("if no text provided should return undefined", function() {

      expect($filter("twitterDate")()).toEqual(undefined);

    });

    it("expect windowMock.moment called once and fromNowMock called once", function() {

      var date = "Thu Mar 12 20:52:13 +0000 2015";

      time = date.split(" ");

      $filter("twitterDate")(date)

      expect(windowMock.moment.calls.count()).toEqual(1);
      expect(windowMock.moment).toHaveBeenCalledWith(new Date(Date.parse(time[1]+" "+time[2]+", "+time[5]+" "+time[3]+" UTC")));
      expect(fromNowMock.fromNow.calls.count()).toEqual(1);

    });

  });

});