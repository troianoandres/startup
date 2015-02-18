/**
 * @name 		Actor
 * 
 * @method 	getFullName() 						return the full name of the actor
 * @method 	getAge() 									return the age of the actor
 * @method 	setFullName(value) 				set the actor's full name of the actor
 * @method 	setAge(value) 						set the actor's age
 * 
 * @param 	{String} 	fullName 				Full name of the actor
 * @param 	{Integer} age 						Age of the actor
 * @return 	{Object}
 */
var Actor = (function() {

	//Constructor
	var Actor = function Actor(fullName, age) {

  	// Private members
  	var attributes = {};
  	attributes.fullName = fullName || "";
  	attributes.age = age || 0;

		// Privileged methods
  	this.get =	function(attr) {
  		return attributes[attr];
  	};
  	this.set = function(attr, value) {
  		attributes[attr] = value;
  	};
	};

	// Constructor name setup
	Actor.prototype = {
		constructor: Actor,
		getFullName: function () {
			return this.get("fullName");
		},
		setFullName: function (value) {
			this.set("fullName", value);
		},		
		getAge: function() {
			return this.get("age");
		},
		setAge: function(value) {
			this.set("age", value);
		}		
	};

	return Actor;
})();

module.exports = Actor;