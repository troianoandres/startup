/**
 *  @name       TwitterService
 *
 *  @description                      Provides an interface to the twitter api 1.1
 * 
 *  @depends    $q
 *  @depends    appKey                OAuthio application key
 *  @depends    GeolocationService
 *  @depends    $window
 */
app.service('TwitterService', [
  "$q",
  "appKey",
  "GeolocationService",
  "$window",
  function($q, appKey, GeolocationService, $window) {
    
    var that = this;

    // Private attributes of TwitterService
    this._twitterReference = null;
    this._initialized = false;
    this._connected = false;

    /**
     *  @name      _generateURL
     *  @param     {String}                 baseUrl for the current resource
     *  @param     {Object}   parameters    object with parameters to format the baseURL
     *  @return    {String}                 Resource formated URL
     */
    this._generateURL = function(baseURL, parameters) {
      
      // baseURL must be defined
      if(!baseURL) {
        throw new Error("baseUrl must be defined");
      }

      var keys,
          index = 0,
          queryStringParameters = [],
          url = baseURL;
      
      // Get the keys of the parameters
      if(parameters !== undefined) {
        keys = Object.keys(parameters);
      

        // For each argument i will append it
        for(index; index < keys.length; index++){
          if(parameters[keys[index]] !== null && parameters[keys[index]] !== undefined){
            queryStringParameters.push( [keys[index], "=", parameters[keys[index]]].join("") );
          }
        }      
        // Join the url
        url = [baseURL, queryStringParameters.join("&")].join("?");

        // Excludes the retweets
        url = url + "&exclude=retweets";

      } else {

        // Excludes the retweets
        url = url + "?exclude=retweets";
        
      }

      return url;
    };

    /**
     *  @name      getReference
     *  @return    {Object}                 stored twitterReference instance
     */
    this.getReference = function() {
      
      return that._twitterReference;
    };

    /**
     *  @name      setReference
     *  @param     {Object}   reference     set the twitterReference instance
     */
    this.setReference = function(reference) {
      
      that._twitterReference = reference;
    };

    /**
     *  @name      isConnected
     *  @return   {Boolean}
     */
    this.isConnected = function() {
      
      return that._connected;
    };

    /**
     *  @name      isInitialized
     *  @return   {Boolean}
     */
    this.isInitialized = function() {

      return that._initialized;
    };

    /**
     *  @name     initialize
     *  @description                  initialize the current service with the OAuth authentication object if connected
     */
    this.initialize = function() {

      // Initialize the OAuth object with the appKey and the twitter provider
      $window.OAuth.initialize(appKey);
      var objTemp = $window.OAuth.create('twitter');
      
      // If already logged in it objTemp must be an object and this should set the twitter reference
      if(objTemp) {
        that.setReference(objTemp);
        that._connected = true;
      }

      // The TwitterService is initialized
      that._initialized = true;
    };

    /**
     *  @name     connectTwitter
     *  @description                  connects the current instance of the service with the twitter api via a redirect method
     */
    this.connectTwitter = function() {
      
      // If TwitterService is not initialized then throw error
      if(!that.isInitialized()) {
        throw new Error("TwitterService must be initialized before connecting to Twitter");
      }

      // If there is already a twitter reference generated this should be skyped
      if(!that.isConnected()) {

        // Redirect the user to twitter's login page and then redirect back 
        $window.OAuth.redirect("twitter", {cache: true}, "#/access/callback");
      }
    };

    /**
     *  @name     connectionCallback
     *  @return {Promise}             OAuthio redirect method callback
     */
    this.connectionCallback = function() {
      
      // Initialize the current service instance
      that._connected = true;

      // Returns the redirect method callback
      return $window.OAuth.callback("twitter", {cache: true});
    };
    
    /**
     *  @name   getHomeTimeline
     *
     *  @description                  Gets the user home timeline via an AJAX call to the twitter api
     * 
     *  @param  {Object}  parameters  Parameters to overwrite the defaults values
     *  @return {Promise}
     */
    that.getHomeTimeline = function(parameters) {
      var deferred = $q.defer(),
          url = "/1.1/statuses/home_timeline.json",
          defaults = {
            count: 40,
            since_id: null,
            max_id: null,
            //trim_user: false,
            exclude_replies: true
            //contributor_details: false,
            //include_entities: false
          };

      // If TwitterService is not initialized and connected the deferred will be rejected
      if(!that.isInitialized()){
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if(!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else {

        // Extends the defaults values with the parameters object
        defaults = angular.extend(defaults, parameters);

        // Format the base url for the resource with the extended values
        url = that._generateURL(url, defaults);        

        // Try to get the tweets for the user home timeline
        try {

          that._twitterReference.get(url)
            .then(
              function(data) {
                deferred.resolve(data);
              },
              function(error) {
                deferred.reject(error);
              }
            );

        } catch (error) {
          deferred.reject(error);
        }

      }

      return deferred.promise;        
    };

    /**
     *  @name   getBlockedPeople
     *
     *  @description                  Gets the user blocked people via an AJAX call to the twitter api
     * 
     *  @param  {Object}  parameters  Parameters to overwrite the defaults values
     *  @return {Promise}
     */
    that.getBlockedPeople = function() {
      var deferred = $q.defer(),
          url = "/1.1/blocks/list.json";

      // If TwitterService is not initialized and connected the deferred will be rejected
      if(!that.isInitialized()){
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if(!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else {

        url = that._generateURL(url);        

        // Try to get the user's blocked people
        try {

          that._twitterReference.get(url)
            .then(
              function(data) {
                deferred.resolve(data);
              },
              function(error) {
                deferred.reject(error);
              }
            );

        } catch (error) {
          deferred.reject(error);
        }

      }

      return deferred.promise;        
    };

    /**
     *  @name   getStatus
     *
     *  @description                  Gets the tweet related to the provided statusID via an AJAX call to the twitter api
     * 
     *  @return {Promise}
     */
    this.getStatus = function(statusID) {
      var deferred = $q.defer(),
          url = "/1.1/statuses/show.json",
          defaults = {
            id: statusID,
            //trim_user: false,
            include_my_retweet: false
            //include_entities: false
          };
      
      // If the TwitterService is not initialized, connected and the statusID is not provided will reject the promise
      if(!that.isInitialized()){
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if(!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else if(!statusID) {
        deferred.reject(new Error("statusID must be defined"));
      } else {

        // Format the resource url with the defaults values
        url = that._generateURL(url, defaults);

        // Try to get the tweet related to the provided statusID
        try {

          that._twitterReference.get(url)
            .then(
              function(data) {
                deferred.resolve(data);
              },
              function(error) {
                deferred.reject(error);
              }
            );

        } catch (error) {
          deferred.reject(error);
        }

      }

      return deferred.promise; 
    };

    /**
     *  @name   getClosestWoeID
     *
     *  @description                  get the closest woeid for the latitude and longitude provided
     *
     *  @param    {decimal}   latitude  
     *  @param    {decimal}   longitude  
     *  @return   {Promise}
     */
    this.getClosestWoeID = function(latitude, longitude) {
      var url = "/1.1/trends/closest.json",          
          defaults = {
            lat: latitude,
            long: longitude
          },
          deferred = $q.defer();      
      
      if(!that.isInitialized()){
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if (!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else if(!longitude || !latitude) {
        deferred.reject(new Error("Latitude and longitude need to be defined"));
      } else {

        // FOrmat the resource url with the defaults values
        url = that._generateURL(url, defaults);        

        // Try to get the closest woeid
        try {
          
          that._twitterReference.get(url)
            .then(
              function(data) {
                deferred.resolve(data[0]);
              },
              function(error) {
                deferred.reject(error);
              }
            );

        } catch (error) {
          deferred.reject(error);
        }

      }

      return deferred.promise;
    };

    /**
     *  @name    getPosition
     *
     *  @description                  get the latitude & longitude for the current position using the GeolocationService 
     *                                injected
     * 
     *  @return   {Promise}
     */
    this.getPosition = function() {
      var deferred = $q.defer();

      // TwitterService must be initialized and connected
      if(!that.isInitialized()){
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if (!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else {
        
        // Try to get the latitude & longitude for the geolocation
        try {

          GeolocationService.getLocation()
            .then(
              function(result) {
                deferred.resolve({longitude: result.longitude, latitude: result.latitude});
              }, function(error) {
                deferred.reject(error);
              }
            );
        } catch(error) {
          deferred.reject(error);
        }

      }

      return deferred.promise;   
    };

    /**
     *  @name       getNearestTrends
     * 
     *  @description                  get the nearest trends to the current woeid. Woeid will be retrieved with the
     *                                latitude & longitude provided from the getPosition method
     *                                
     *  @return     {Promise}
     */
    this.getNearestTrends = function() {

      var deferred = $q.defer(),
          url = "/1.1/trends/place.json",
          defaults = {
            id: 0
          };

      // TwitterService must be initialized and connected
      if(!that.isInitialized()){
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if (!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else {

        // Try to get the 10 nearest trends
        try {

          // First will get the latitude & longitude of the user
          that.getPosition()
            .then(
              function(result) {
                
                // Then will get the woeid
                that.getClosestWoeID(result.latitude, result.longitude)
                  .then(
                    function(result) {

                      defaults.id = result.woeid;

                      // Format the url with the defaults values
                      url = that._generateURL(url, defaults);
                    
                      // Finally will get the trends from the twitter api
                      that._twitterReference.get(url)
                        .then(
                          function(data) {
                            deferred.resolve(data[0]);
                          },
                          function(error) {
                            deferred.reject(error);
                          }
                        );

                    },
                    function(error) {
                      deferred.reject(error);
                    }
                  );
              },
              function(error) {
                deferred.reject(error);
              }
            );
        
        } catch(error) {
          deferred.reject(error);
        }          

      }

      return deferred.promise;
    };

    /**
     *  @name       getTweetsByQuery
     *
     *  @description                  get the timeline for the trend query provided into the parameters object
     * 
     *  @param      {Object}    parameters
     *  @return     {Promise}
     */
    this.getTweetsByQuery = function(parameters) {
      var deferred = $q.defer(),
          url = "/1.1/search/tweets.json",
          defaults = {
            q: "",
            count: 40,
            since_id: null,
            max_id: null
          };

      // TwitterService must be initialized, connected & parameters must be defined
      if(!that.isInitialized()){
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if(!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else if(!parameters) {
        deferred.reject(new Error("parameters must be defined"));
      } else if(!parameters.q){
        deferred.reject(new Error("paramters.q must be defined"));
      } else {

        // Extends the default values with the provided parameters
        defaults = angular.extend(defaults, parameters);

        // Format the url with the default values
        url = that._generateURL(url, defaults);

        // Try to get the timeline for the trend
        try {

          that._twitterReference.get(url)
            .then(
              function(data) {
                deferred.resolve(data);
              },
              function(error) {
                deferred.reject(error);
              }
            );

        } catch (error) {
          deferred.reject(error);
        }

      }

      return deferred.promise;    
    };

  }
]);
