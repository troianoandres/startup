mainApp.service('AuthenticationService', [
  "$firebase",
  "$firebaseAuth",
  "firebaseURL",
  function($firebase, $firebaseAuth, firebaseURL){
    this.authObj = $firebaseAuth($firebase( new Firebase(firebaseURL) ));

    this.login = function() {
      this.authObj.$authWithPassword( {email: "troianoandres@gmail.com", password: "11235813"} );
    };

    this.requireAuth = function(){
      return this.authObj.$requireAuth();
    }

	}
]);