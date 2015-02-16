var extend =	function extend(childObject, parentObject){
  var copyOfParent = Object.create(parentObject.prototype);
  copyOfParent.constructor = childObject;
 	childObject.prototype = copyOfParent;	
};

/**
 * implement() extends the destinationClass adding to it the methods included into the interfaceClass
 * @param  {Object} destinationClass Reciving class
 * @param  {Object} interfaceClass   Giving class
 * @return {void}
 */
var implement = function implement(destinationClass, interfaceClass){
	var interfacePrototype = interfaceClass.prototype;
	var destinationPrototype = destinationClass.prototype;

  for (var k in interfacePrototype) {
    if (interfacePrototype.hasOwnProperty(k)) {
      destinationPrototype[k] = interfacePrototype[k];
    }
  }
  destinationClass.prototype = destinationPrototype;
};