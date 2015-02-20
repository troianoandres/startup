/**
 * @name 		List
 * 
 * @method 	add(object) 								adds an item to the next index of the array
 * @method 	count() 										returns the length of the item's array
 * @method 	get(index) 									return the item into list[index], if not found returns undefined
 * @method 	getBy(value, attr) 					return the item that matches the value into the attr member, if not 
 *          															found returns null
 * @method 	indexOf(object, startIndex) returns the index of the object to find, starting from startIndex. If not found
 *          															returns -1
 * @method 	removeAt(index) 						removes the item on index
 * 
 * @return 	{Object}
 */
var List = function List() {
	this.list = [];
};

// Constructor name setup & public methods
List.prototype 	=	{
	constructor: List,
	add: 		function (object) {
		return this.list.push( object );
	},
	count: 	function () {
		return this.list.length;
	},
	get: 		function (index) {
	  if( index > -1 && index < this.list.length ){
	    return this.list[ index ];
	  }		  
	},
	getBy: 	function (value, attr) {
		var index = 0;
	  while( index < this.list.length ){
	    
	    if( this.list[index][attr] === value ){
	      return this.list[index];
	    }

	    index++;
	  }
	  return null;
	},
	indexOf: 	function (object, startIndex) {
	  var index = startIndex || 0;
	 
	  while( index < this.list.length ){
	    
	    if( this.list[index] === object ){
	      return index;
	    }

	    index++;
	  }
	  return -1;
	},
	removeAt: function (index) {
		this.list.splice( index, 1 );
	}
};

module.exports = List;