// MyClass Class
var MyClass = {}; // Remove this statement if Class is not Abstract (can be Instantiated)

// Static (aka Class) Properties
MyClass.nextId = 0;		// remove this if Class is Abstract

MyClass.byId = {};		// remove this if Class is Abstract

MyClass.quantity = 0;	// remove this if Class is Abstract
// End Static Properties

// Constructor (remove Constructor if Class is Abstract)
function MyClass( parameterA, parameterB ) {

	MyClass.byId[ MyClass.nextId ] = this;
	MyClass.quantity++;

	// Instance Properties
	this.id = MyClass.nextId;
	MyClass.nextId++;
	// End Instance Properties

	return this;

}
// End Constructor

// Methods (organize methods by function and relationship)
MyClass.staticMethodA = function() {

}

MyClass.prototype.instanceMethodA = function() {
	// there are no Instance Methods if this Class is Abstract
}
// End Methods

// End Class