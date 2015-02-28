angular.module("app.access")
	.controller('TSignupController', [
		"$scope",
		"AuthenticationFactory",
    "DatastoreFactory",
		function($scope, AuthenticationFactory, DatastoreFactory){
		
			var auth = AuthenticationFactory;
			var datastore = DatastoreFactory;
			var reference = datastore.getReference();

			/**
			 * 	@name signup()
			 *  @description 		called when the sign up button is clicked initializing the sign up process
			 */
			this.signup = function() {
				var user;
				
				// Initialize the user object to register the auth into firebase
				user = {
					email: 		$scope.data.email,
					password: $scope.data.password
				};

				// Looking if the username picked is available
				reference.child("users").child($scope.data.username)
					.once("value", function(snap) {
						
						// If the snap.val() is null the username is availeable so continue
						if(snap.val() === null){
							createUser();
						} else {
							$scope.showError("Username taken");
						}
					});              
			};

			/**
			 *  @name createUser()
			 */
			var createUser = function() {
				var obj, user;
	      		
    		// New user object to persist into the datastore
				user = {
					email: 		$scope.data.email,
					name: 		$scope.data.name,
					username: $scope.data.username
				};
    		

    		obj = datastore.bindAngular( reference.child("users").child($scope.data.username) );
    		
    		// Set the user data into the datastore's path
    		obj.$set(user).then(function() {

    		})
    		.catch(function(error) {
    			$scope.showError(error.message);
    		});				

			};

			var createCredentials = function() {

				// Start creating the user's credentials
				auth.$createUser(user)
					.then(createUser())
					.catch(function(error) {
						$scope.showError(error.message);
					}); 
			};

			this.passworsdMatches = function() {
				return ($scope.data.password == $scope.data.confirmPassword);
			};

		}
	]);