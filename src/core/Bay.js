/**
 * @author spencel / https://github.com/spencel
 */

// Bay Class

// Static (aka Class) Properties
Bay.nextId = 0;

Bay.instancesById = {};

Bay.quantity = 0; // The number of currently existing instances
// End Static Properties

// Constructor
function Bay( top, left, width, height ) {

	Bay.instancesById[ Bay.nextId ] = this;
	Bay.quantity++;

	// Instance Properties
	this.id = Bay.nextId;
	Bay.nextId++;

	this.top = top;

	this.left = left;

	this.width = width;

	this.height = height;

	this.isHtml = false; // Set after its html is injected into the document
	// End Instance Properties

	return this;

}
// End Constructor

// Static (aka Class) Methods
Bay.destroy = function ( id ) {

	this.instancesById[ id ] = undefined; // This is a memory leak, because the key remains in memory, but gives the best performance. In order to remove the key from memory, use the delete keyword; however, delete requires more process than setting the key to undefined
	// delete this.instancesById[ id ]; // Reduces performance, however, will not cause a memory leak.

}
// End Static Methods

// Instance Methods
Bay.prototype.toggleHtml = function() {
	
	if ( this.isHtml === false ) {

		var element = document.createElement( "div" );
		element.setAttribute( "id", "Slx-Bay-" + this.id )
		element.setAttribute( "class", "Bay" )
		element.setAttribute( "style",
				"left:" + this.left +
				"px;top:" + this.top +
				"px;width:" + this.width +
				"px;height:" + this.height + "px;" );

		document.getElementsByTagName( "BODY" )[0].appendChild( element );

		var strHtml =
			"<div id='resizeTop'></div>" +
			"<div id='resizeTopRight'></div>" + 
			"<div id='resizeRight'></div>" +
			"<div id='resizeBottomRight'></div>" +
			"<div id='resizeBottom'></div>" +
			"<div id='resizeBottomLeft'></div>" +
			"<div id='resizeLeft'></div>" +
			"<div id='resizeTopLeft'></div>";

		element.innerHTML = strHtml;

		this.isHtml = true;

	} else {

		document.getElementById( "Slx-Bay-" + this.id ).outerHTML = "";

		this.isHtml = false;

	}

}

Bay.prototype.close = function () {

	document.getElementById( this.id ).outerHTML = "";

	Bay.destroy( this.id );

}
// End Instance Methods

// End Bay Class