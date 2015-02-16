var extend =	function extend(childObject, parentObject){
  var copyOfParent = Object.create(parentObject.prototype);
  copyOfParent.constructor = childObject;
 	childObject.prototype = copyOfParent;	
};

var implement = function implement(destination, source){
  for (var k in source) {
    if (source.hasOwnProperty(k)) {
      destination[k] = source[k];
    }
  }
  return destination; 	
}