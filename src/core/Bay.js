/**
* @author spencel / https://github.com/spencel
*/

// Bay Class

// Static (aka Class) Properties
Bay.nextId = 0;

Bay.instancesById = {};

Bay.quantity = 0; // The number of currently existing instances

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

	this.left = left;

	this.top = top;

	this.width = width;

	this.height = height;

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
		element.id = "_-SlxBay-_-" + this.id;
		element.className = "_-Bay-_";
		element.style.left = this.left + "px";
		element.style.top = this.top + "px";
		focus( element );

		document.getElementsByTagName( "BODY" )[0].appendChild( element );

		elementChild = document.createElement( "div" );
		elementChild.id = "_-resizeTop-_";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "_-resizeTopRight-_";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "_-resizeRight-_";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "_-resizeBottomRight-_";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "_-resizeBottom-_";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "_-resizeBottomLeft-_";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "_-resizeLeft-_";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "_-resizeTopLeft-_";
		element.appendChild( elementChild );

		elementChild = document.createElement( "div" );
		elementChild.id = "_-topBar-_";
		element.appendChild( elementChild );

		elementChildChild = document.createElement( "div" );
		elementChildChild.id = "_-move-_";
		elementChild.appendChild( elementChildChild );
		elementChildChild = document.createElement( "div" );
		elementChildChild.id = "_-close-_";
		elementChild.appendChild( elementChildChild );
		var text = document.createTextNode( "X" );
		elementChildChild.appendChild( text );

		elementChild = document.createElement( "div" );
		elementChild.id = "_-content-_";
		elementChild.style.width = ( this.width - 10 ) + "px"; // 10 px reserved for resize handles
		elementChild.style.height = ( this.height - 10 ) + "px"; // 10 px reserved for resize handles
		element.appendChild( elementChild );

		this.contentHtmlElement = element.childNodes[ 9 ];

			console.log( this.contentHtmlElement );

		this.isHtml = true;

	} else {

		document.getElementById( "_-SlxBay-_-" + this.id ).outerHTML = "";

		this.isHtml = false;

	}

}

Bay.prototype.close = function () {

		console.log( this.id )

	document.getElementById( "_-SlxBay-_-" + this.id ).outerHTML = "";

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

		case "_-resizeTop-_":

			//console.log( "resizeTop" );

			// Change root top and content height
			this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
			this.contentHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - 8 ) + "px";

		break;

		case "_-resizeTopRight-_":

			// Change root top and content width and height
			this.rootHtmlElement.style.top =  ( this.top - Input.mousedownClientY + top ) + "px";
			this.contentHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - 8 ) + "px";
			this.contentHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - 8 ) + "px";

		break;

		case "_-resizeRight-_":

			// Change content width
			this.contentHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - 8 ) + "px";
			
		break;

		case "_-resizeBottomRight-_":

			// Change content width and height
			this.contentHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - 8 ) + "px";
			this.contentHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - 8 ) + "px";

		break;

		case "_-resizeBottom-_":

			// Change content height
			this.contentHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - 8 ) + "px";

		break;

		case "_-resizeBottomLeft-_":

			// Change root left and content width and height
			this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
			this.contentHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - 8 ) + "px";
			this.contentHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - 8 ) + "px";

		break;

		case "_-resizeLeft-_":

			// Change root left and content width
			this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
			this.contentHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - 8 ) + "px";

		break;

		case "_-resizeTopLeft-_":

			// Change root left and top and content width and height
			this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
			this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
			this.contentHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - 8 ) + "px";
			this.contentHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - 8 ) + "px";

		break;

	}

}

Bay.prototype.finishResizing = function() {

	this.left = parseInt( this.rootHtmlElement.style.left );
	console.log( "this.left :" + this.left );
	this.top = parseInt( this.rootHtmlElement.style.top );
	console.log( "this.top :" + this.top );
	this.width = this.contentHtmlElement.offsetWidth + 10;
	console.log( "this.width :" + this.width );
	this.height = this.contentHtmlElement.offsetHeight + 10;
	console.log( "this.height :" + this.height );

	Bay.nowResizing = undefined;
	Bay.resizeType = undefined;

}
// End Instance Methods

// End Bay Class