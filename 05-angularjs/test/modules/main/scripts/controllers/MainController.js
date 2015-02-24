/**
 * 	@name 	MainControler
 *
 *	@description  							
 * 
 * 	@param  {Factory} 			MovieCollection
 */
mainApp.controller('MainController', [
	"Authentication", 
	function(Authentication) {
		//Authentication.$unauth();
			Authentication.$authWithPassword({
  email: "troianoandres@gmail.com",
  password: "11235813"
}).then(function(authData) {
  console.log("Logged in as:", authData.uid);
}).catch(function(error) {
  console.error("Authentication failed:", error);
});
	

	}
]);