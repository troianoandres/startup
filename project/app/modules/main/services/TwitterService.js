app.service('TwitterService', [
  "$q",
  "appKey",
  "GeolocationService",
  "$window",
  function($q, appKey, GeolocationService, $window) {
    
    var that = this;

    this._twitterReference = null;
    this._initialized = false;
    this._connected = false;

    this._generateURL = function(baseURL, parameters) {
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

        url = url + "&exclude=retweets";

      } else {

        url = url + "?exclude=retweets";
        
      }

      return url;
    };

    this.getReference = function() {
      
      return that._twitterReference;
    };

    this.setReference = function(reference) {
      
      that._twitterReference = reference;
    };

    this.isConnected = function() {
      
      return that._connected;
    };

    this.isInitialized = function() {

      return that._initialized;
    };

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

    this.connectionCallback = function() {
      that._connected = true;
      return $window.OAuth.callback("twitter", {cache: true});
    };
    
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

      // If TwitterService is not initialized and connected the deferred will be rejected else will call
      // get method to get the tweets
      if(!that.isInitialized()){
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if(!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else {

        defaults = angular.extend(defaults, parameters);

        url = that._generateURL(url, defaults);        

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

    that.getBlockedPeople = function() {
      var deferred = $q.defer(),
          url = "/1.1/blocks/list.json";

      // If TwitterService is not initialized and connected the deferred will be rejected else will call
      // get method to get the tweets
      if(!that.isInitialized()){
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if(!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else {

        url = that._generateURL(url);        

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

    this.getStatus = function(statusID) {
      var deferred = $q.defer(),
          url = "/1.1/statuses/show.json",
          defaults = {
            id: statusID,
            //trim_user: false,
            include_my_retweet: false
            //include_entities: false
          };
      
      if(!that.isInitialized()){
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if(!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else if(!statusID) {
        deferred.reject(new Error("statusID must be defined"));
      } else {

        url = that._generateURL(url, defaults);

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

    this.getClosestWoeID = function(latitude, longitude) {
      var url = "/1.1/trends/closest.json",          
          defaults = {
            lat: latitude,
            long: longitude
          },
          deferred = $q.defer();      
        
      if(!that.isInitialized()){
        deferred.reject("TwitterService must be initialized");
      } else if (!that.isConnected()){
        deferred.reject("TwitterService must be connected");
      } else if(!longitude || !latitude) {
        deferred.reject(new Error("Latitude and longitude need to be defined"));
      } else {

        url = that._generateURL(url, defaults);        

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

    this.getPosition = function() {
      var deferred = $q.defer();

      // TwitterService must be initialized and connected
      if(!that.isInitialized()){
        deferred.reject("TwitterService must be initialized");
      } else if (!that.isConnected()){
        deferred.reject("TwitterService must be connected");
      } else {
        
        try {
          // Call to the geolocation service to get latitude longitude and acur
          GeolocationService.getLocation()
            .then(
              function(result) {
                deferred.resolve({longitude: result.longitude, latitude: result.latitude});
              }, function(error) {
                deferred.reject(new Error("Could not get geolocation"));
              }
            );
        } catch(error) {
          deferred.reject(error);
        }

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
        deferred.reject(new Error("TwitterService must be initialized"));
      } else if (!that.isConnected()){
        deferred.reject(new Error("TwitterService must be connected"));
      } else {

        that.getPosition()
          .then(
            function(result) {

              that.getClosestWoeID(result.latitude, result.longitude)
                .then(
                  function(result) {

                    defaults.id = result.woeid;

                    url = that._generateURL(url, defaults);
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
                    } catch(error) {
                      deferred.reject(error);
                    }
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

        url = that._generateURL(url, defaults, true);

        try {

        that._twitterReference.get(url)
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
