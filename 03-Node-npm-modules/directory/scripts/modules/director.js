/**
 * @name    Director
 *
 * @method  getName()         Returns the director name
 * @method  getQuote(index)   Returns the director quote in quotes[index]
 * @method  setName(name)     Sets the director name
 * @method  addQuote(quote)   Add a quote to the director's quotes 
 * @method  speak()           Make the director speak
 * 
 * @param   {String}  name    Director's name
 * @param   {Array} 	quotes  Director's quotes
 * @return  {Object}
 */
var Director = function Director(name, quotes) {

	// Private members
	var members = {};
	members.name = name;
	members.quotes = quotes || [];

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
  getName: function() {
    return this.get("name");
  },
  setName: function(name) {
    this.set("name", name);
  },
  getQuote: function(index) {
    return this.get("quotes")[index];
  },
  addQuote: function(quote) {
    this.get("quotes").push(quote);
  },
	speak: function() {      
    var message = [this.getName(), " says: "];
    message.push( this.get("quotes").join(", ") );
    console.log(message.join(""));
	}
};

module.exports = Director;