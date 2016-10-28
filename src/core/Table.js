// Table Class

// Static (aka Class) Properties
Table.nextId = 0;

Table.byId = {};

Table.quantity = 0;
// End Static Properties

// Constructor
function Table(  ) {

	Table.byId[ Table.nextId ] = this;
	Table.quantity++;

	// Instance Properties
	this.id = Table.nextId;
	Table.nextId++;
	// End Instance Properties

	return this;

}
// End Constructor

// Methods (organize methods by function and relationship)
Table.staticMethodA = function() {

}

Table.prototype.instanceMethodA = function() {

}
// End Methods

// End Class