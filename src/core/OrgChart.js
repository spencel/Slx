// OrgChart Class

// Static (aka Class) Properties
OrgChart.nextId = 0;

OrgChart.byId = {};

OrgChart.quantity = 0;

OrgChart.imagePath = "../test/orgChart/i/" // temporary location of image files
// End Static Properties

// Constructor
function OrgChart() {

	OrgChart.byId[ OrgChart.nextId ] = this;
	OrgChart.quantity++;

	// Instance Properties
	this.id = OrgChart.nextId;
	OrgChart.nextId++;
	// End Instance Properties

	return this;

}
// End Constructor

// Methods (organize methods by function and relationship)
OrgChart.staticMethodA = function() {

}

OrgChart.prototype.instanceMethodA = function() {

}
// End Methods

// End Class