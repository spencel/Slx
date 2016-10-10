/**
* @author spencel / https://github.com/spencel
*/

// Version 0.1

// Bay Class

// Static (aka Class) Properties
Bay.nextId = 0;

Bay.instancesById = {};

Bay.quantity = 0; // The number of currently existing instances

Bay.resizeHandleWidth = 7; // (px)

Bay.borderWidth = 1; // (px)

Bay.contentMargin = Bay.resizeHandleWidth - Bay.borderWidth; // (px)
Bay.contentMarginTimes2 = 2 * Bay.contentMargin

Bay.nowResizing = undefined; // Set to instance that is being resized

Bay.resizeType = undefined; // A string constant that indicates the resize type, e.g., top, bottom right, mirrored, etc.
// End Static Properties

// Constructor
function Bay( left, top, width, height ) {

	Bay.instancesById[ Bay.nextId ] = this;
	Bay.quantity++;

	// Instance Properties
	this.id = Bay.nextId;
	Bay.nextId++;

	this.left = left; // Of root element

	this.top = top; // Of root element

	this.width = width; // Of content element

	this.height = height; // Of content element

	this.isHtml = false; // Set after its html is injected into the document

	this.rootHtmlElement = undefined;

	this.contentHtmlElement = undefined;
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
		this.rootHtmlElement = element;
		element.id = "__SlxBay__-" + this.id;
		element.className = "__Bay__";
		element.style.left = this.left + "px";
		element.style.top = this.top + "px";
		focus( element );

		document.getElementsByTagName( "BODY" )[0].appendChild( element );

		elementChild = document.createElement( "div" );
		elementChild.id = "__resizeTop__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__resizeTopRight__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__resizeRight__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__resizeBottomRight__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__resizeBottom__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__resizeBottomLeft__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__resizeLeft__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__resizeTopLeft__";
		element.appendChild( elementChild );

		elementChild = document.createElement( "div" );
		elementChild.id = "__topBar__";
		element.appendChild( elementChild );

		elementChildChild = document.createElement( "div" );
		elementChildChild.id = "__move__";
		elementChild.appendChild( elementChildChild );
		elementChildChild = document.createElement( "div" );
		elementChildChild.id = "__close__";
		elementChild.appendChild( elementChildChild );
		var text = document.createTextNode( "X" );
		elementChildChild.appendChild( text );

		elementChild = document.createElement( "div" );
		elementChild.id = "__content__";
		elementChild.style.width = ( this.width - 2 * Bay.resizeHandleWidth ) + "px"; // 10 px reserved for resize handles
		elementChild.style.height = ( this.height - 2 * Bay.resizeHandleWidth ) + "px"; // 10 px reserved for resize handles
		element.appendChild( elementChild );

		this.contentHtmlElement = element.childNodes[ 9 ];

			console.log( this.contentHtmlElement );

		this.isHtml = true;

	} else {

		document.getElementById( "__SlxBay__-" + this.id ).outerHTML = "";

		this.isHtml = false;

	}

}

Bay.prototype.close = function () {

		console.log( this.id )

	document.getElementById( "__SlxBay__-" + this.id ).outerHTML = "";

	Bay.destroy( this.id );

}

Bay.prototype.initResize = function( resizeType ) {



	focus( this.rootHtmlElement ); // Bring it to the front of the view

	Bay.nowResizing = this;

	Bay.resizeType = resizeType;

}

Bay.prototype.resize = function( left, top ) {

	//console.log( "left: " + left + "; top: " + top + ";");

	switch ( Bay.resizeType ) {

		case "__resizeTop__":

			//console.log( "resizeTop" );

			// Change root top and content height
			this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
			this.contentHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.contentMarginTimes2 ) + "px";

		break;

		case "__resizeTopRight__":

			// Change root top and content width and height
			this.rootHtmlElement.style.top =  ( this.top - Input.mousedownClientY + top ) + "px";
			this.contentHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.contentMarginTimes2 ) + "px";
			this.contentHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.contentMarginTimes2 ) + "px";

		break;

		case "__resizeRight__":

			// Change content width
			this.contentHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.contentMarginTimes2 ) + "px";
			
		break;

		case "__resizeBottomRight__":

			// Change content width and height
			this.contentHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.contentMarginTimes2 ) + "px";
			this.contentHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.contentMarginTimes2 ) + "px";

		break;

		case "__resizeBottom__":

			// Change content height
			this.contentHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.contentMarginTimes2 ) + "px";

		break;

		case "__resizeBottomLeft__":

			// Change root left and content width and height
			this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
			this.contentHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.contentMarginTimes2 ) + "px";
			this.contentHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.contentMarginTimes2 ) + "px";

		break;

		case "__resizeLeft__":

			// Change root left and content width
			this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
			this.contentHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.contentMarginTimes2 ) + "px";

		break;

		case "__resizeTopLeft__":

			// Change root left and top and content width and height
			this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
			this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
			this.contentHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.contentMarginTimes2 ) + "px";
			this.contentHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.contentMarginTimes2 ) + "px";

		break;

	}

}

Bay.prototype.finishResizing = function() {

	this.left = parseInt( this.rootHtmlElement.style.left );
	console.log( "this.left :" + this.left );
	this.top = parseInt( this.rootHtmlElement.style.top );
	console.log( "this.top :" + this.top );
	this.width = this.contentHtmlElement.offsetWidth + Bay.contentMarginTimes2;
	console.log( "this.width :" + this.width );
	this.height = this.contentHtmlElement.offsetHeight + Bay.contentMarginTimes2;
	console.log( "this.height :" + this.height );

	Bay.nowResizing = undefined;
	Bay.resizeType = undefined;

}

Bay.prototype.initMove = function() {



}

Bay.prototype.move = function() {
	
}
// End Instance Methods

// End Bay Class