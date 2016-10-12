/**
* @author spencel / https://github.com/spencel
*/

// Version 0.1

// Bay Class

// Static (aka Class) Properties
Bay.nextId = 0;

Bay.instancesById = {};

Bay.quantity = 0; // The number of currently existing instances

Bay.resizeHandlePosition = -4; // (px)

Bay.resizeHandleWidth = 7; // (px)

Bay.borderWidth = 1; // (px)

Bay.borderWidthX2 = Bay.borderWidth * 2; // (px)

Bay.contentMargin = Bay.resizeHandleWidth + Bay.resizeHandlePosition; // (px) (3 px)

Bay.contentSizeModifier = 2 * Bay.contentMargin + 2 * Bay.borderWidth; // (px) (4 px); modifies size of content div so that the root div is the specified width from input parameter

Bay.nowResizing = undefined; // Set to instance of Bay that is being resized

Bay.resizeType = undefined; // A string constant that indicates the resize type, e.g., top, bottom right, mirrored, etc.

Bay.nowDragging = undefined; // Set to instance of Bay that is being dragged
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
		element.style.width = ( this.width - Bay.borderWidthX2 ) + "px"; // 
		element.style.height = ( this.height - Bay.borderWidthX2 ) + "px"; // 
		focus( element );

		document.body.appendChild( element );

		var elementChild = document.createElement( "div" );
		elementChild.id = "__overflowHidden__";
		element.appendChild( elementChild );

		var elementChildChild = document.createElement( "div" );
		elementChildChild.id = "__topBar__";
		elementChild.appendChild( elementChildChild );

		var elementChildChildChild = document.createElement( "div" );
		elementChildChildChild.id = "__drag__";
		elementChildChild.appendChild( elementChildChildChild );
		elementChildChildChild = document.createElement( "div" );
		elementChildChildChild.id = "__close__";
		elementChildChild.appendChild( elementChildChildChild );
		var text = document.createTextNode( "X" );
		elementChildChildChild.appendChild( text );

		elementChildChild = document.createElement( "div" );
		elementChildChild.id = "__content__";
		elementChild.appendChild( elementChildChild );

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
			this.rootHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.borderWidthX2 ) + "px";

		break;

		case "__resizeTopRight__":

			// Change root top and content width and height
			this.rootHtmlElement.style.top =  ( this.top - Input.mousedownClientY + top ) + "px";
			this.rootHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.borderWidthX2 ) + "px";
			this.rootHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.borderWidthX2 ) + "px";

		break;

		case "__resizeRight__":

			// Change content width
			this.rootHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.borderWidthX2 ) + "px";
			
		break;

		case "__resizeBottomRight__":

			// Change content width and height
			this.rootHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.borderWidthX2 ) + "px";
			this.rootHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.borderWidthX2 ) + "px";

		break;

		case "__resizeBottom__":

			// Change content height
			this.rootHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.borderWidthX2 ) + "px";

		break;

		case "__resizeBottomLeft__":

			// Change root left and content width and height
			this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
			this.rootHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.borderWidthX2 ) + "px";
			this.rootHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.borderWidthX2 ) + "px";

		break;

		case "__resizeLeft__":

			// Change root left and content width
			this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
			this.rootHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.borderWidthX2 ) + "px";

		break;

		case "__resizeTopLeft__":

			// Change root left and top and content width and height
			this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
			this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
			this.rootHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.borderWidthX2 ) + "px";
			this.rootHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.borderWidthX2 ) + "px";

		break;

	}

}

Bay.prototype.finishResizing = function() {

	this.left = parseInt( this.rootHtmlElement.style.left );
	console.log( "this.left :" + this.left );
	this.top = parseInt( this.rootHtmlElement.style.top );
	console.log( "this.top :" + this.top );
	this.width = this.rootHtmlElement.offsetWidth + Bay.borderWidthX2;
	console.log( "this.width :" + this.width );
	this.height = this.rootHtmlElement.offsetHeight + Bay.borderWidthX2;
	console.log( "this.height :" + this.height );

	Bay.nowResizing = undefined;
	Bay.resizeType = undefined;

}

Bay.prototype.initDrag = function() {

	focus( this.rootHtmlElement ); // Bring it to the front of the view

	Bay.nowDragging = this;

}

Bay.prototype.drag = function( left, top ) {

	this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
	this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";

	//console.log( mouseLeft + " > " + ( window.innerWidth - SlxDocument.dockZoneWidth ) );
	//console.log( mouseTop + " > " + ( window.innerHeight - SlxDocument.dockZoneWidth ) );

	// This could be optimized
	if ( left < SlxDocument.dockZoneWidth ) {

		if ( top < SlxDocument.dockZoneWidth ) {

			// Top Left

			if ( SlxDocument.inDockZone !== undefined ) {

				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;

			}

			console.log( "dock top left" );

			SlxDocument.objectInDockZone = Bay.nowDragging;

			SlxDocument.inDockZone = "__SlxDocumentTopLeftDockZone__";

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";

		} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {

			// Bottom Left

			if ( SlxDocument.inDockZone !== undefined ) {

				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;

			}

			console.log( "dock bottom left" );

			SlxDocument.objectInDockZone = Bay.nowDragging;

			SlxDocument.inDockZone = "__SlxDocumentBottomLeftDockZone__";

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";

		} else {

			// Left

			if ( SlxDocument.inDockZone !== undefined ) {

				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;

			}

			console.log( "dock left" );

			SlxDocument.objectInDockZone = Bay.nowDragging;

			SlxDocument.inDockZone = "__SlxDocumentLeftDockZone__";

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";

		}

	} else if ( left > ( window.innerWidth - SlxDocument.dockZoneWidth ) ) {

		if ( top < SlxDocument.dockZoneWidth ) {

			// Top Right

			if ( SlxDocument.inDockZone !== undefined ) {

				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;

			}

			console.log( "dock top right" );

			SlxDocument.objectInDockZone = Bay.nowDragging;

			SlxDocument.inDockZone = "__SlxDocumentTopRightDockZone__";

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";

		} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {

			// Bottom Right

			if ( SlxDocument.inDockZone !== undefined ) {

				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;

			}

			console.log( "dock bottom right" );

			SlxDocument.objectInDockZone = Bay.nowDragging;

			SlxDocument.inDockZone = "__SlxDocumentBottomRightDockZone__";

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";

		} else {

			// Right

			if ( SlxDocument.inDockZone !== undefined ) {

				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;

			}

			console.log( "dock right" );

			SlxDocument.objectInDockZone = Bay.nowDragging;

			SlxDocument.inDockZone = "__SlxDocumentRightDockZone__";

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";

		}

	} else if ( left > ( SlxDocument.fullScreenZoneStart * window.innerWidth ) && left < ( SlxDocument.fullScreenZoneEnd * window.innerWidth ) && top < SlxDocument.dockZoneWidth ) {

		// Fullscreen

		if ( SlxDocument.inDockZone !== undefined ) {

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;

		}

		console.log( "dock top" );

		SlxDocument.objectInDockZone = Bay.nowDragging;

		SlxDocument.inDockZone = "__SlxDocumentFullScreen__";

		document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";

	} else if ( top < SlxDocument.dockZoneWidth ) {

		// Top

		if ( SlxDocument.inDockZone !== undefined ) {

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;

		}

		console.log( "dock top" );

		SlxDocument.objectInDockZone = Bay.nowDragging;

		SlxDocument.inDockZone = "__SlxDocumentTopDockZone__";

		document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";

	}  else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ){

		// Bottom

		if ( SlxDocument.inDockZone !== undefined ) {

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;

		}

		console.log( "dock bottom" );

		SlxDocument.objectInDockZone = Bay.nowDragging;

		SlxDocument.inDockZone = "__SlxDocumentBottomDockZone__";

		document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";

	} else if ( SlxDocument.inDockZone !== undefined ) {

		// None

		document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null; // removes a style from element

		SlxDocument.objectInDockZone = undefined;

		SlxDocument.inDockZone = undefined;

	}
	
}

Bay.prototype.finishDragging = function( left, top ) {

	switch ( SlxDocument.inDockZone ) {

		case "__SlxDocumentTopDockZone__":

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			SlxDocument.inDockZone = undefined;

		break;

		case "__SlxDocumentTopRightDockZone__":

			this.rootHtmlElement.style.left = window.innerWidth / 2 + "px";
			this.left = window.innerWidth / 2;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			SlxDocument.inDockZone = undefined;

		break;

		case "__SlxDocumentRightDockZone__":

			this.rootHtmlElement.style.left = ( window.innerWidth / 2 ) + "px";
			this.left = window.innerWidth / 2;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight;

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			SlxDocument.inDockZone = undefined;

		break;

		case "__SlxDocumentBottomRightDockZone__":

			this.rootHtmlElement.style.left = ( window.innerWidth / 2 ) + "px";
			this.left = window.innerWidth / 2;
			this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
			this.top = window.innerHeight / 2;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			SlxDocument.inDockZone = undefined;

		break;

		case "__SlxDocumentBottomDockZone__":

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
			this.top = window.innerHeight / 2;

			this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			SlxDocument.inDockZone = undefined;

		break;

		case "__SlxDocumentBottomLeftDockZone__":

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
			this.top = window.innerHeight / 2;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			SlxDocument.inDockZone = undefined;

		break;

		case "__SlxDocumentLeftDockZone__":

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight;

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			SlxDocument.inDockZone = undefined;
			
		break;

		case "__SlxDocumentTopLeftDockZone__":

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2- Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			SlxDocument.inDockZone = undefined;
			
		break;

		case "__SlxDocumentFullScreen__":

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth;
			this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight;

			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			SlxDocument.inDockZone = undefined;
			
		break;

		default:

			this.left = parseInt( this.rootHtmlElement.style.left );
			this.top = parseInt( this.rootHtmlElement.style.top );

	}

	Bay.nowDragging = undefined;

}
// End Instance Methods

// End Bay Class