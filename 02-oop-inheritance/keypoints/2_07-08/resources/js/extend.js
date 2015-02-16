var extend =	function extend(childObject, parentObject){
  var copyOfParent = Object.create(parentObject.prototype);
  copyOfParent.constructor = childObject;
 	childObject.prototype = copyOfParent;	
};
