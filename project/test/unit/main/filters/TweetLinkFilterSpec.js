describe("TweetLinkFilter tests", function() {

  var $filter = null;

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

    inject(function(_$filter_) {
      $filter = _$filter_;
    });

  });

  describe("statements tests", function() {

    it("statements must be defined", function() {

      expect($filter("tweetLink")).not.toEqual(undefined);
      expect($filter("tweetLink")).not.toEqual(null);

    });

  });

  describe("tweetLink tests", function() {

    it("if no text provided should return undefined", function() {

      expect($filter("tweetLink")()).toEqual(undefined);

    });

    it("if '$$#%% &&' provided should return '$$<a>#%%</a>&&' ", function() {

      expect($filter("tweetLink")("#asd")).toEqual("<a>#asd</a>");
      expect($filter("tweetLink")("#asd ddd")).toEqual("<a>#asd</a> ddd");
      expect($filter("tweetLink")("wer #asd")).toEqual("wer <a>#asd</a>");
      expect($filter("tweetLink")("wer #asd ddd")).toEqual("wer <a>#asd</a> ddd");

    });

    it("if '$$@%% &&' provided should return '$$<a>@%%</a>&&' ", function() {

      expect($filter("tweetLink")("@asd")).toEqual("<a>@asd</a>");
      expect($filter("tweetLink")("@asd ddd")).toEqual("<a>@asd</a> ddd");
      expect($filter("tweetLink")("wer @asd")).toEqual("wer <a>@asd</a>");
      expect($filter("tweetLink")("wer @asd ddd")).toEqual("wer <a>@asd</a> ddd");

    });

    it("if '$$@%% &&' provided should return '$$<a>@%%</a>&&' ", function() {

      expect($filter("tweetLink")("@asd #asd")).toEqual("<a>@asd</a> <a>#asd</a>");
      expect($filter("tweetLink")("@asd #asd ddd")).toEqual("<a>@asd</a> <a>#asd</a> ddd");
      expect($filter("tweetLink")("wer @asd #asd")).toEqual("wer <a>@asd</a> <a>#asd</a>");
      expect($filter("tweetLink")("wer @asd #asd ddd")).toEqual("wer <a>@asd</a> <a>#asd</a> ddd");
      expect($filter("tweetLink")("#asd @asd")).toEqual("<a>#asd</a> <a>@asd</a>");
      expect($filter("tweetLink")("#asd @asd ddd")).toEqual("<a>#asd</a> <a>@asd</a> ddd");
      expect($filter("tweetLink")("wer #asd @asd")).toEqual("wer <a>#asd</a> <a>@asd</a>");
      expect($filter("tweetLink")("wer #asd @asd ddd")).toEqual("wer <a>#asd</a> <a>@asd</a> ddd");
      expect($filter("tweetLink")("#asd ccc @asd")).toEqual("<a>#asd</a> ccc <a>@asd</a>");
      expect($filter("tweetLink")("#asd ccc @asd ddd")).toEqual("<a>#asd</a> ccc <a>@asd</a> ddd");
      expect($filter("tweetLink")("wer #asd ccc @asd")).toEqual("wer <a>#asd</a> ccc <a>@asd</a>");
      expect($filter("tweetLink")("wer #asd ccc @asd ddd")).toEqual("wer <a>#asd</a> ccc <a>@asd</a> ddd");

    });    

  });

});