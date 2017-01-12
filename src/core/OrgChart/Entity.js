// Entity Class

// Static (aka Class) Properties
Entity.nextId = 0;

Entity.byId = {};

Entity.quantity = 0;

Entity.imagePath = "../test/orgChart/i/" // temporary location of image files
// End Static Properties

// Constructor
function Entity( name, acronym, logoImage ) {

	Entity.byId[ Entity.nextId ] = this;
	Entity.quantity++;

	// Instance Properties
	this.id = Entity.nextId;
	Entity.nextId++;

	this.name = name;

	this.acronym = acronym;

	this.logoImage = logoImage;
	// End Instance Properties

	return this;

}
// End Constructor

// Methods (organize methods by function and relationship)
Entity.staticMethodA = function() {

}

Entity.prototype.instanceMethodA = function() {

}
// End Methods

// End Class