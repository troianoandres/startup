angular.module("app").service('TwitterService', [
  "$q",
  "appKey",
  "$window",
  "$cookies",
  function($q, appKey, $window, $cookies) {
    var twitterReference = null,
        initialized = false,
        connected = false,
        cookies = $cookies,
        that = this;

    /**
     *  @name     generateURL
     *
     *  @description          Provided a baseURL and an object with arguments
     *                        generateURL will generate a complete url with the provided arguments
     * 
     *  @param    {String}    baseURL   Base URL to make the request
     *  @param    {Object}    arguments Object with the parameters to add to the url
     *  @return   {String}              Parsed url to make the request
     */
    that.generateURL = function(baseURL, arguments) {
      var keys,
          index = 0;
          queryStringParameters = [];
      
      // Get the keys of the arguments
      keys = Object.keys(arguments);

      // For each argument i will append it
      for(index; index < keys.length; index++){
        if(arguments[keys[index]]){
          queryStringParameters.push( [keys[index], "=", arguments[keys[index]]].join("") );
        }
      }      
      // Join the url
      var url = [baseURL, queryStringParameters.join("&")].join("?");

      return url;
    };

    /**
     *  @name     getReference
     *  
     *  @return   {Object}  Twitter auth object
     */
    that.getReference = function() {
      return twitterReference;
    };

    /**
     *  @name     setReference
     *  
     *  @param    {Object}  reference   Twitter auth object
     */
    that.setReference = function(reference) {
      twitterReference = reference;
    };

    /**
     *  @name     initialize
     *
     *  @description          Initialize the TwitterService with a twitter reference if already logged in
     *                        If not it will only create the OAuth object to connect to twitter with the 
     *                        connectTwitter method.
     * 
     *  @return   {void}    
     */
    that.initialize = function() {
      
      // Initialize the OAuth object with the appKey and the twitter provider
      $window.OAuth.initialize(appKey);
      var objTemp = $window.OAuth.create('twitter');
      
      // If already logged in it objTemp must be an object and this should set the twitter reference
      if(objTemp) {
        that.setReference(objTemp);
        connected = true;
      }

      // The TwitterService is initialized
      initialized = true;
    };

    /**
     *  @name     connectTwitter
     *
     *  @description          Must be called when the OAuth object it's initialized, this will redirect the user to
     *                        the twitter login page and then it will redirect back to access/callback expecting
     *                        to be handled with the connectionCallback method
     *                        If is already connected to twitter it will just skype the process
     * 
     *  @return {void}
     */
    this.connectTwitter = function() {
      
      // If TwitterService is not initialized then throw error
      if(!that.isInitialized()) {
        // TODO: ADD ERROR
        return;
      }

      // If there is already a twitter reference generated this should be skyped
      if(!that.isConnected()) {

        // Redirect the user to twitter's login page and then redirect back 
        $window.OAuth.redirect("twitter", {cache: true}, "#/access/callback");
      }
    };

    /**
     *  @name      connectionCallback
     *
     *  @description          User to handle the redirect method of OAuth, expect to be handled like a promise
     *                        when used
     *                        
     *  @return {Promise}
     */
    that.connectionCallback = function() {
      connected = true;
      return $window.OAuth.callback("twitter", {cache: true});
    };


    that.saveTweets = function(tweetsType, tweets) {
      cookies.put(["tweets",tweetsType].join("-"), tweets);
    };

    that.isConnected = function() {
      return connected;
    };

    that.isInitialized = function() {
      return initialized;
    };
    
    that.getTweets = function(parameters) {
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
        include_entities: false
      };

      // If TwitterService is not initialized and connected the deferred will be rejected else will call
      // get method to get the tweets
      if(!that.isInitialized()){
        deferred.reject("TwitterService must be initialized");
      } else if(!that.isConnected()){
        deferred.reject("TwitterService must be connected");
      } else {

        defaults = angular.extend(defaults, parameters);

        url = that.generateURL(url, defaults);        

        that.getReference().get(url)
          .done(function(data) {
            deferred.resolve(data);
          })
          .fail(function(error) {
            console.log(error);
          });

      }

      return deferred.promise;        
    };

    this.getTweet = function(tweetID) {
      var deferred = $q.defer(),
          url = "/1.1/statuses/show.json",
          arguments = [],
          defaults = {
            id: tweetID,
            trim_user: false,
            include_my_retweet: true,
            include_entities: true
          };

      url = generateURL(url, defaults);

      twitterReference.get(url)
        .done(function(data) {
          deferred.resolve(data);
        })
        .fail(function(error) {
          //console.log(error)
        });

      return deferred.promise; 
    };

  }
]);
