app.service('TwitterService', [
  "$q",
  "appKey",
  "GeolocationService",
  "$window",
  function($q, appKey, GeolocationService, $window) {
    var twitterReference = null,
        initialized = false,
        connected = false,
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
    that.generateURL = function(baseURL, parameters, exludeRetweets) {
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

        if(exludeRetweets) {
          url = url + "&exclude=retweets";
        }

      } else {

        if(exludeRetweets) {
          url = url + "?exclude=retweets";
        }
        
      }

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
     *  @name     isConnected
     *
     *  @description        Return if the service is connected to twitter
     *  @return   {Boolean}
     */
    that.isConnected = function() {
      return connected;
    };

    /**
     *  @name     isInitialized
     *
     *  @description        Return if the service is initialized
     *  @return   {Boolean}
     */
    that.isInitialized = function() {
      return initialized;
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
        throw new Error("TwitterService must be initialized before connecting to Twitter");
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
    
    /**
     * [getHomeTimeline description]
     * @param  {[type]} parameters [description]
     * @return {[type]}            [description]
     */
    that.getHomeTimeline = function(parameters) {
      var deferred = $q.defer(),
          url = "/1.1/statuses/home_timeline.json",
          defaults = {
            count: 40,
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
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if(!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else {

        defaults = angular.extend(defaults, parameters);

        url = that.generateURL(url, defaults, true);        

        try {

          that.getReference().get(url)
            .done(function(data) {
              deferred.resolve(data);
            })
            .fail(function(error) {
              deferred.reject(error);
            });

        } catch (error) {
          deferred.reject(error);
        }

      }

      return deferred.promise;        
    };

    /**
     * [getBlockedPeople description]
     * @return {[type]} [description]
     */
    that.getBlockedPeople = function() {
      var deferred = $q.defer(),
          url = "/1.1/blocks/list.json";

      // If TwitterService is not initialized and connected the deferred will be rejected else will call
      // get method to get the tweets
      if(!that.isInitialized()){
        deferred.reject("TwitterService must be initialized");
      } else if(!that.isConnected()){
        deferred.reject("TwitterService must be connected");
      } else {

        url = that.generateURL(url);        

        try {

        that.getReference().get(url)
          .done(function(data) {
            deferred.resolve(data);
          })
          .fail(function(error) {
            deferred.reject(error);
          });

        } catch (error) {
          deferred.reject(error);
        }

      }

      return deferred.promise;        
    };

    /**
     * [getStatus description]
     * @param  {[type]} statusID [description]
     * @return {[type]}          [description]
     */
    this.getStatus = function(statusID) {
      var deferred = $q.defer(),
          url = "/1.1/statuses/show.json",
          defaults = {
            id: statusID,
            trim_user: false,
            include_my_retweet: false,
            include_entities: false
          };
      
      if(!that.isInitialized()){
        deferred.reject("TwitterService must be initialized");
      } else if(!that.isConnected()){
        deferred.reject("TwitterService must be connected");
      } else if(!statusID) {
        deferred.reject("statusID must be defined");
      } else {

        url = that.generateURL(url, defaults);

        try {

          that.getReference().get(url)
            .done(function(data) {
              deferred.resolve(data);
            })
            .fail(function(error) {
              deferred.reject(error);
            });

        } catch (error) {
          deferred.reject(error);
        }

      }

      return deferred.promise; 
    };
 
    /**
     * [getClosestWoeID description]
     * @return {[type]} [description]
     */
    this.getClosestWoeID = function() {

      var deferred = $q.defer(),
          url = "/1.1/trends/closest.json",
          callback = null,
          defaults = {
            lat: 0,
            long: 0
          };          

      // TwitterService must be initialized and connected
      if(!that.isInitialized()){
        deferred.reject("TwitterService must be initialized");
      } else if (!that.isConnected()){
        deferred.reject("TwitterService must be connected");
      } else {

        // Define the geolocation callback to get the woeid
        callback = function(parameters) {

          // Migrate the parameters (lat, long, acur) to the defaults
          defaults = angular.extend(defaults, parameters);

          // Generate the url
          url = that.generateURL(url, defaults);        


          try {
            that.getReference().get(url)
              .done(function(data) {
                deferred.resolve(data[0]);
              })
              .fail(function(error) {
                deferred.reject(error);
              });

          } catch (error) {
            deferred.reject(error);
          }

        };
        
        // Call to the geolocation service to get latitude longitude and acur
        GeolocationService.getLocation()
          .then(function(result) {

            var parameters = {long: result.longitude, lat: result.latitude};

            callback(parameters);

          }, function(error) {

            deferred.reject("Could not get geolocation");

          });

      }

      return deferred.promise;   
    };

    this.getNearestTrends = function() {

      var deferred = $q.defer(),
          url = "/1.1/trends/place.json",
          callback = null,
          defaults = {
            id: 0
          };          

      // TwitterService must be initialized and connected
      if(!that.isInitialized()){
        deferred.reject("TwitterService must be initialized");
      } else if (!that.isConnected()){
        deferred.reject("TwitterService must be connected");
      } else {

        // Define the getWoeId callback to get the nearest trends
        callback = function(WoeID) {

          defaults.id = WoeID;

          // Generate the url
          url = that.generateURL(url, defaults);        

          try {
            that.getReference().get(url)
              .done(function(data) {
                deferred.resolve(data[0]);
              })
              .fail(function(error) {
                deferred.reject(error);
              });

          } catch (error) {
            deferred.reject(error);
          }

        };

        that.getClosestWoeID()
          .then(function(result) {

            callback(result.woeid);

          }, function(error) {

            console.log(error);

          });

      }

      return deferred.promise;
    };

    /**
     * [getTweetsByQuery description]
     * @param  {[type]} parameters [description]
     * @return {[type]}            [description]
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

      // TwitterService must be initialized and connected
      if(!that.isInitialized()){
        deferred.reject("TwitterService must be initialized");
      } else if(!that.isConnected()){
        deferred.reject("TwitterService must be connected");
      } else if(!parameters) {
        deferred.reject("parameters must be defined");
      } else if(!parameters.q){
        deferred.reject("paramters.q must be defined");
      } else {

        defaults = angular.extend(defaults, parameters);

        url = that.generateURL(url, defaults, true);

        try {

        that.getReference().get(url)
          .done(function(data) {
            deferred.resolve(data);
          })
          .fail(function(error) {
            deferred.reject(error);
          });

        } catch (error) {
          deferred.reject(error);
        }

      }

      return deferred.promise;    
    };

  }
]);
