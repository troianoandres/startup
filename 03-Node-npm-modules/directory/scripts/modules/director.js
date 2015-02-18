/**
 * Director class
 *
 * @method privileged get(attr), returns the value into members[attr]
 * @method privileged set(attr, value), set value into members[attr]
 * @method public speak(), make the director speak
 * @param  {String} 	name   Director's name
 * @param  {Array} 		quotes Director's quotes
 * @return {Object}
 */
module.exports = (function(name, quotes) {

	// Constructor
  var Director = function Director(name, quotes) {

  	// Private members
  	var members = {};
  	members.name = name;
  	members.quotes = quotes || [];

  	// Reference to this
		var that = this;

		// Privileged methods
  	this.get =	function(attr) {

  		return members[attr];
  	};
  	this.set = function(attr, value) {

  		members[attr] = value;
  	};
  };

  // Constructor function setup and public methods
	Director.prototype	=	{
		constructor: Director,
		speak: function() {
      var message = this.get("name") + " says: ";


      console.log(message);
		}
	};
	
  return Director;
})();