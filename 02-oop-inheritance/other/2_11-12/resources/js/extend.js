var extend =	function extend(childObject, parentObject){
  var copyOfParent = Object.create(parentObject.prototype);
  copyOfParent.constructor = childObject;
 	childObject.prototype = copyOfParent;	
};

/**
 * augment() will add, if provided methods, the methods of the giving class prototype into the
 * receiving class prototype. If not provided methods it will add them all if not into the 
 * receiving class. augment() must be called after setting the prototype to the receivingClass, else it will be overrited
 * and the augmentation will not work
 * 
 * @param  {Object} receivingClass Class that will receive the methods from givingClass
 * @param  {Object} givingClass    Class that will give it's methods to the receivingClass
 * @param  {Array}  methods        Arrays of methods names or undefined if all methods will be added
 * @return {void}
 */
function augment(receivingClass, givingClass, methods) {
  if (arguments[2]) {
    for(var index = 0, length = methods.length; index < length; index++ ) {
      receivingClass.prototype[methods[index]] = givingClass.prototype[methods[index]];
    }
  } else {
    for (var methodName in givingClass.prototype ) {
      // Checking if the receiving class do nos have a method with the same name
      if (!Object.hasOwnProperty.call(receivingClass.prototype, methodName)) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }
      // Alternatively (check prototype chain as well):
      // if ( !receivingClass.prototype[methodName] ) {
      //  receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      // }
    }
  }
}