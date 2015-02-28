angular.module('twitter')
  .service('TwitterService', [
    "$q",
    "appKey",
    "$window",
    function($q, appKey, $window) {

      var twitterReference = null;

      var generateURL = function(baseURL, arguments) {
        var keys;
        var index = 0;
        var queryStringParameters = [];
        
        keys = Object.keys(arguments);

        for(index; index < keys.length; index++){
          if(arguments[keys[index]]){
            queryStringParameters.push( [keys[index], "=", arguments[keys[index]]].join("") );
          }
        }      

        var url = [baseURL, queryStringParameters.join("&")].join("?");

        return url;
      };


      this.initialize = function() {
        $window.OAuth.initialize(appKey);
        twitterReference = $window.OAuth.create('twitter');
      };

      this.getReference = function() {
        return twitterReference;
      };


      this.connectTwitter = function() {
        var deferred = $q.defer();

        var algo = $window.OAuth.popup('twitter', {cache: false})
          .then(function(result) {
            twitterReference = result;

            console.log(result);

            deferred.resolve(result);
          }, function(error) {


            deferred.reject(error);
          });

        return deferred.promise;
      };

      
      this.getTweets = function(parameters) {
        var deferred = $q.defer();
        var url = "/1.1/statuses/home_timeline.json";
        var arguments = [];
        var defaults = {
          count: 20,
          since_id: null,
          max_id: null,
          trim_user: false,
          exclude_replies: true,
          contributor_details: false,
          include_entities: true
        };

        defaults = angular.extend(defaults, parameters);

        url = generateURL(url, defaults);        

        twitterReference.get(url)
          .done(function(data) {
            deferred.resolve(data);
          })
          .fail(function(error) {
            console.log(error)
          });

        return deferred.promise;        
      };

      this.getNearestTrends = function() {

      };

      this.getFriends = function(parameters) {
        var deferred = $q.defer();
        var url = "/1.1/friends/list.json";
        var arguments = [];
        var defaults = {
          user_id: null,
          screen_name: null,
          cursor: -1,
          count: 20,
          skip_status: false,
          include_user_entities: false
        };

        defaults = angular.extend(defaults, parameters);

        url = generateURL(url, defaults);

        twitterReference.get(url)
          .done(function(data) {
            deferred.resolve(data);
          })
          .fail(function(error) {
            console.log(error)
          });

        return deferred.promise;
      };    

    }
  ]);
