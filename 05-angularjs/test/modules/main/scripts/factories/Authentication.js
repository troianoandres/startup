mainApp.service('Authentication', [
  "$firebase",
  "$firebaseAuth",
  "firebaseURL",
  function($firebase, $firebaseAuth, firebaseURL){
    var ref = new Firebase(firebaseURL);
    return $firebaseAuth(ref);    
	}
]);