/**
* @author spencel / https://github.com/spencel
*/

// Version 0.3

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

Bay.currentlyResizingInstance = undefined; // Set to instance of Bay that is being resized

Bay.resizeDirection = undefined; // A string constant that indicates the resize type, e.g., top, bottom right, mirrored, etc.

Bay.currentlyDraggingInstance = undefined; // Set to instance of Bay that is being dragged

Bay.cursorCurrentlyInDockZone = undefined;
// End Static Properties

// Constructor
function Bay( left, top, width, height ) {

	Bay.instancesById[ Bay.nextId ] = this;
	Bay.quantity++;

	// Instance Properties
	this.id = Bay.nextId;
	Bay.nextId++;

	this.left = left; // Of root element
	this.previousLeft = undefined;

	this.top = top; // Of root element
	this.previousTop = undefined;

	this.width = width; // Of root element
	this.previousWidth = undefined;

	this.height = height; // Of root element
	this.previousHeight = undefined;

	this.currentlyDockedAt = undefined;

	this.isHtml = false; // Set after its html is injected into the document

	this.rootHtmlElement = undefined;

	this.contentHtmlElement = undefined;
	// End Instance Properties

	return this;

}
// End Constructor

// Methods
Bay.destroy = function ( id ) {

	this.instancesById[ id ] = undefined; // This is a memory leak, because the key remains in memory, but gives the best performance. In order to remove the key from memory, use the delete keyword; however, delete requires more process than setting the key to undefined
	// delete this.instancesById[ id ]; // Reduces performance, however, will not cause a memory leak.

}

Bay.prototype.toggleHtml = function() {
	
	if ( this.isHtml === false ) {

		var element = document.createElement( "div" );
		this.rootHtmlElement = element;
		element.id = "__Bay__-" + this.id;
		element.className = "__Bay__";
		element.style.left = this.left + "px";
		element.style.top = this.top + "px";
		element.style.width = ( this.width - Bay.borderWidthX2 ) + "px"; // 
		element.style.height = ( this.height - Bay.borderWidthX2 ) + "px"; // 
		focus( element );

		document.body.appendChild( element );

		/*var elementChild = document.createElement( "div" );
		elementChild.id = "__topBar__";
		element.appendChild( elementChild );

		var elementChildChild = document.createElement( "div" );
		elementChildChild.id = "__drag__";
		elementChild.appendChild( elementChildChild );
		elementChildChild = document.createElement( "div" );
		elementChildChild.id = "__close__";
		elementChild.appendChild( elementChildChild );
		var text = document.createTextNode( "X" );
		elementChildChild.appendChild( text );*/

		var elementChild = document.createElement( "div" );
		elementChild.id = "__overflowHidden__";
		element.appendChild( elementChild );

		var elementChildChild = document.createElement( "div" );
		elementChildChild.id = "__content__";
		elementChild.appendChild( elementChildChild );

		var elementChildChildText = document.createTextNode("JavaScript (/ˈdʒævəˌskrɪpt/[5]) is a high-level, dynamic, untyped, and interpreted programming language.[6] It has been standardized in the ECMAScript language specification.[7] Alongside HTML and CSS, it is one of the three core technologies of World Wide Web content production; the majority of websites employ it and it is supported by all modern Web browsers without plug-ins.[6] JavaScript is prototype-based with first-class functions, making it a multi-paradigm language, supporting object-oriented,[8] imperative, and functional programming styles.[6] It has an API for working with text, arrays, dates and regular expressions, but does not include any I/O, such as networking, storage, or graphics facilities, relying for these upon the host environment in which it is embedded.[7] Although there are strong outward similarities between JavaScript and Java, including language name, syntax, and respective standard libraries, the two are distinct languages and differ greatly in their design. JavaScript was influenced by programming languages such as Self and Scheme.[9] JavaScript is also used in environments that are not Web-based, such as PDF documents, site-specific browsers, and desktop widgets. Newer and faster JavaScript virtual machines (VMs) and platforms built upon them have also increased the popularity of JavaScript for server-side Web applications. On the client side, JavaScript has been traditionally implemented as an interpreted language, but more recent browsers perform just-in-time compilation. It is also used in game development, the creation of desktop and mobile applications, and server-side network programming with run-time environments such as Node.js.");
		elementChildChild.appendChild( elementChildChildText );

		elementChild = document.createElement( "div" );
		elementChild.id = "__Bay__-__resizeTop__-" + this.id;
		elementChild.className = "__Bay__-__resizeTop__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__Bay__-__resizeTopRight__-" + this.id;
		elementChild.className = "__Bay__-__resizeTopRight__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__Bay__-__resizeRight__-" + this.id;
		elementChild.className = "__Bay__-__resizeRight__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__Bay__-__resizeBottomRight__-" + this.id;
		elementChild.className = "__Bay__-__resizeBottomRight__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__Bay__-__resizeBottom__-" + this.id;
		elementChild.className = "__Bay__-__resizeBottom__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__Bay__-__resizeBottomLeft__-" + this.id;
		elementChild.className = "__Bay__-__resizeBottomLeft__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__Bay__-__resizeLeft__-" + this.id;
		elementChild.className = "__Bay__-__resizeLeft__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__Bay__-__resizeTopLeft__-" + this.id;
		elementChild.className = "__Bay__-__resizeTopLeft__";
		element.appendChild( elementChild );
		elementChild = document.createElement( "div" );
		elementChild.id = "__Bay__-__drag__-" + this.id;
		elementChild.className = "__Bay__-__drag__";
		element.appendChild( elementChild );


		this.contentHtmlElement = element.childNodes[ 9 ];

			console.log( this.contentHtmlElement );

		this.isHtml = true;

	} else {

		document.getElementById( "__SlxBay__-" + this.id ).outerHTML = "";

		this.isHtml = false;

	}

}

Bay.eventHandler = function( event, arEvent_target_id ) {

	switch ( arEvent_target_id[ 1 ] ) {

		case "__resizeTop__":
		case "__resizeTopRight__":
		case "__resizeRight__":
		case "__resizeBottomRight__":
		case "__resizeBottom__":
		case "__resizeBottomLeft__":
		case "__resizeLeft__":
		case "__resizeTopLeft__":

			Bay.handleResize( event, arEvent_target_id );

		break;
		case "__drag__":

			Bay.handleDrag( event, arEvent_target_id );

		break;

	}

}

Bay.handleResize = function ( event, arEvent_target_id ) {

	event.preventDefault(); // Prevent text selection and dragging

	switch ( event.type ) {

		case "mousedown":

			this.initializeResize( arEvent_target_id );
			
		break;

		case "mousemove":

			this.currentlyResizingInstance.resize( event.clientX, event.clientY );

		break;

		case "mouseup":

			this.currentlyResizingInstance.finishResizing();

		break;

	}

}

Bay.initializeResize = function ( arEvent_target_id ) {

	var resizeDirection = arEvent_target_id[ 1 ]
	var instanceId = arEvent_target_id[ 2 ]
	this.currentlyResizingInstance = this.instancesById[ instanceId ];
	focus( this.currentlyResizingInstance.rootHtmlElement ); // Bring it to the front of the view
	this.resizeDirection = resizeDirection;
	Input.userIs = "__RESIZING_BAY__";

	console.log( "Bay.resizeDirection: " + Bay.resizeDirection );

}

Bay.prototype.resize = function( left, top ) {

	switch ( this.currentlyDockedAt ) {
		case "__SlxDocumentFullScreenDockZone__":
			switch ( Bay.resizeDirection ) {
				case "__resizeTop__": this.currentlyDockedAt = "__SlxDocumentBottomDockZone__"; break;
				case "__resizeTopRight__": this.currentlyDockedAt = "__SlxDocumentBottomLeftDockZone__"; break;
				case "__resizeRight__": this.currentlyDockedAt = "__SlxDocumentLeftDockZone__"; break;
				case "__resizeBottomRight__": this.currentlyDockedAt = "__SlxDocumentTopLeftDockZone__"; break;
				case "__resizeBottom__": this.currentlyDockedAt = "__SlxDocumentTopDockZone__"; break;
				case "__resizeBottomLeft__": this.currentlyDockedAt = "__SlxDocumentTopLeftDockZone__"; break;
				case "__resizeLeft__": this.currentlyDockedAt = "__SlxDocumentRightDockZone__"; break;
				case "__resizeTopLeft__": this.currentlyDockedAt = "__SlxDocumentBottomRightDockZone__"; break;
			}
		break;
		case "__SlxDocumentTopDockZone__":
			switch ( Bay.resizeDirection ) {
				case "__resizeRight__":
				case "__resizeBottomRight__": this.currentlyDockedAt = "__SlxDocumentTopLeftDockZone__"; break;
				case "__resizeBottom": break;
				case "__resizeBottomLeft__":
				case "__resizeLeft__": this.currentlyDockedAt = "__SlxDocumentTopRightDockZone__"; break;
				default: this.currentlyDockedAt = undefined;
			}
		break;
		case "__SlxDocumentTopRightDockZone__":
		break;
		case "__SlxDocumentRightDockZone__":
		break;
		case "__SlxDocumentBottomRightDockZone__":
		break;
		case "__SlxDocumentBottomDockZone__":
		break;
		case "__SlxDocumentBottomLeftDockZone__":
		break;
		case "__SlxDocumentLeftDockZone__":
		break;
		case "__SlxDocumentTopLeftDockZone__":
		break;
	}

	switch ( Bay.resizeDirection ) {

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
			// 							  58 =           60         
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

	console.log( "Bay.resizeDirection: " + Bay.resizeDirection);

	// Quick Mouse Up
	if ( Input.isMouseupQuick === true ) {

		this.handleDocking();

	// Not A Quick Mouse Up
	} else {

		this.left = parseInt( this.rootHtmlElement.style.left );
		this.top = parseInt( this.rootHtmlElement.style.top );
		this.width = this.rootHtmlElement.offsetWidth; // offsetWidth includes border
		this.height = this.rootHtmlElement.offsetHeight; // offsetWidth includes border

	}

	Bay.currentlyResizingInstance = undefined;
	Bay.resizeDirection = undefined;
	Input.userIs = undefined;

}

Bay.handleDrag = function( event, arEvent_target_id ) {

	event.preventDefault(); // Prevent text selection and dragging

	switch ( event.type ) {

		case "mousedown":

			var instanceId = arEvent_target_id[ 2 ]
			this.initializeDrag( instanceId );
			
		break;

		case "mousemove":

			this.currentlyDraggingInstance.drag( event.clientX, event.clientY );

		break;

		case "mouseup":

			this.currentlyDraggingInstance.finishDragging();

		break;

	}

}

Bay.initializeDrag = function( instanceId ) {

	this.currentlyDraggingInstance = this.instancesById[ instanceId ];
	focus( this.currentlyDraggingInstance.rootHtmlElement ); // Bring it to the front of the view
	Input.userIs = "__DRAGGING_BAY__";

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

			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {

				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;

			}

			console.log( "dock top left" );

			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;

			Bay.cursorCurrentlyInDockZone = "__SlxDocumentTopLeftDockZone__";

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";

		} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {

			// Bottom Left

			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {

				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;

			}

			console.log( "dock bottom left" );

			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;

			Bay.cursorCurrentlyInDockZone = "__SlxDocumentBottomLeftDockZone__";

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";

		} else {

			// Left

			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {

				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;

			}

			console.log( "dock left" );

			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;

			Bay.cursorCurrentlyInDockZone = "__SlxDocumentLeftDockZone__";

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";

		}

	} else if ( left > ( window.innerWidth - SlxDocument.dockZoneWidth ) ) {

		if ( top < SlxDocument.dockZoneWidth ) {

			// Top Right

			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {

				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;

			}

			console.log( "dock top right" );

			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;

			Bay.cursorCurrentlyInDockZone = "__SlxDocumentTopRightDockZone__";

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";

		} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {

			// Bottom Right

			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {

				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;

			}

			console.log( "dock bottom right" );

			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;

			Bay.cursorCurrentlyInDockZone = "__SlxDocumentBottomRightDockZone__";

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";

		} else {

			// Right

			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {

				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;

			}

			console.log( "dock right" );

			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;

			Bay.cursorCurrentlyInDockZone = "__SlxDocumentRightDockZone__";

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";

		}

	} else if ( left > ( SlxDocument.fullScreenZoneStart * window.innerWidth ) && left < ( SlxDocument.fullScreenZoneEnd * window.innerWidth ) && top < SlxDocument.dockZoneWidth ) {

		// Fullscreen

		if ( Bay.cursorCurrentlyInDockZone !== undefined ) {

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;

		}

		console.log( "dock top" );

		SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;

		Bay.cursorCurrentlyInDockZone = "__SlxDocumentFullScreen__";

		document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";

	} else if ( top < SlxDocument.dockZoneWidth ) {

		// Top

		if ( Bay.cursorCurrentlyInDockZone !== undefined ) {

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;

		}

		console.log( "dock top" );

		SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;

		Bay.cursorCurrentlyInDockZone = "__SlxDocumentTopDockZone__";

		document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";

	}  else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ){

		// Bottom

		if ( Bay.cursorCurrentlyInDockZone !== undefined ) {

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;

		}

		console.log( "dock bottom" );

		SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;

		Bay.cursorCurrentlyInDockZone = "__SlxDocumentBottomDockZone__";

		document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";

	} else if ( Bay.cursorCurrentlyInDockZone !== undefined ) {

		// None

		document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null; // removes a style from element

		SlxDocument.objectInDockZone = undefined;

		Bay.cursorCurrentlyInDockZone = undefined;

	}
	
}

Bay.prototype.finishDragging = function( left, top ) {

	this.currentlyDockedAt = Bay.cursorCurrentlyInDockZone;

	switch ( Bay.cursorCurrentlyInDockZone ) {

		case "__SlxDocumentTopDockZone__":

			if ( this.currentlyDockedAt === undefined ) {

				this.previousLeft = this.left;
				this.previousTop = this.top;
				this.previousWidth = this.width;
				this.previousHeight = this.height;

			}

			this.currentlyDockedAt = Bay.cursorCurrentlyInDockZone;

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			Bay.cursorCurrentlyInDockZone = undefined;
			Input.userIs = undefined;

			
			

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;

		break;

		case "__SlxDocumentTopRightDockZone__":

			if ( this.currentlyDockedAt === undefined ) {

				this.previousLeft = this.left;
				this.previousTop = this.top;
				this.previousWidth = this.width;
				this.previousHeight = this.height;

			}

			this.currentlyDockedAt = Bay.cursorCurrentlyInDockZone;

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			Bay.cursorCurrentlyInDockZone = undefined;
			Input.userIs = undefined;

			this.rootHtmlElement.style.left = window.innerWidth / 2 + "px";
			this.left = window.innerWidth / 2;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;

		break;

		case "__SlxDocumentRightDockZone__":

			if ( this.currentlyDockedAt === undefined ) {
				
				this.previousLeft = this.left;
				this.previousTop = this.top;
				this.previousWidth = this.width;
				this.previousHeight = this.height;

			}

			this.currentlyDockedAt = Bay.cursorCurrentlyInDockZone;

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			Bay.cursorCurrentlyInDockZone = undefined;
			Input.userIs = undefined;

			this.rootHtmlElement.style.left = ( window.innerWidth / 2 ) + "px";
			this.left = window.innerWidth / 2;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight;

		break;

		case "__SlxDocumentBottomRightDockZone__":

			if ( this.currentlyDockedAt === undefined ) {

				this.previousLeft = this.left;
				this.previousTop = this.top;
				this.previousWidth = this.width;
				this.previousHeight = this.height;

			}

			this.currentlyDockedAt = Bay.cursorCurrentlyInDockZone;

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			Bay.cursorCurrentlyInDockZone = undefined;
			Input.userIs = undefined;

			this.rootHtmlElement.style.left = ( window.innerWidth / 2 ) + "px";
			this.left = window.innerWidth / 2;
			this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
			this.top = window.innerHeight / 2;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;

		break;

		case "__SlxDocumentBottomDockZone__":

			if ( this.currentlyDockedAt === undefined ) {

				this.previousLeft = this.left;
				this.previousTop = this.top;
				this.previousWidth = this.width;
				this.previousHeight = this.height;

			}

			this.currentlyDockedAt = Bay.cursorCurrentlyInDockZone;

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			Bay.cursorCurrentlyInDockZone = undefined;
			Input.userIs = undefined;

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
			this.top = window.innerHeight / 2;

			this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;

		break;

		case "__SlxDocumentBottomLeftDockZone__":

			if ( this.currentlyDockedAt === undefined ) {

				this.previousLeft = this.left;
				this.previousTop = this.top;
				this.previousWidth = this.width;
				this.previousHeight = this.height;

			}

			this.currentlyDockedAt = Bay.cursorCurrentlyInDockZone;

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			Bay.cursorCurrentlyInDockZone = undefined;
			Input.userIs = undefined;

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
			this.top = window.innerHeight / 2;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;

		break;

		case "__SlxDocumentLeftDockZone__":

			if ( this.currentlyDockedAt === undefined ) {

				this.previousLeft = this.left;
				this.previousTop = this.top;
				this.previousWidth = this.width;
				this.previousHeight = this.height;

			}

			this.currentlyDockedAt = Bay.cursorCurrentlyInDockZone;

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			Bay.cursorCurrentlyInDockZone = undefined;
			Input.userIs = undefined;

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight;
			
		break;

		case "__SlxDocumentTopLeftDockZone__":

			if ( this.currentlyDockedAt === undefined ) {

				this.previousLeft = this.left;
				this.previousTop = this.top;
				this.previousWidth = this.width;
				this.previousHeight = this.height;

			}

			this.currentlyDockedAt = Bay.cursorCurrentlyInDockZone;

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			Bay.cursorCurrentlyInDockZone = undefined;
			Input.userIs = undefined;

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth / 2;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2- Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;
			
		break;

		case "__SlxDocumentFullScreen__":

			if ( this.currentlyDockedAt === undefined ) {

				this.previousLeft = this.left;
				this.previousTop = this.top;
				this.previousWidth = this.width;
				this.previousHeight = this.height;

			}

			this.currentlyDockedAt = Bay.cursorCurrentlyInDockZone;

			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
			SlxDocument.objectInDockZone = undefined;
			Bay.cursorCurrentlyInDockZone = undefined;
			Input.userIs = undefined;

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth;
			this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight;
			
		break;

		default:

			this.left = parseInt( this.rootHtmlElement.style.left );
			this.top = parseInt( this.rootHtmlElement.style.top );

	}

	Bay.currentlyDraggingInstance = undefined;

	Input.userIs = undefined;

}

Bay.prototype.handleDocking = function() {

	var dockZone = undefined;
	var savePreviousDimensions = true;

	if ( this.currentlyDockedAt !== undefined ) {

		savePreviousDimensions = false;

	}

	console.log( "Bay.resizeDirection: " + Bay.resizeDirection);

	switch ( Bay.resizeDirection ) {

		case "__resizeTop__":
			switch ( this.currentlyDockedAt ) {
				case "__SlxDocumentFullScreenDockZone__":
					dockZone = "__SlxDocumentTopDockZone__";
				break;
				case "__SlxDocumentTopDockZone__":
					this.restorePreviousDimensions();
					return; // prevent this.toggleDock from being called below
				break;
				default:
					dockZone = "__SlxDocumentFullScreenDockZone__";
			}			
		break;
		case "__resizeTopRight__":
			dockZone = "__SlxDocumentTopRightDockZone__";
		break;
		case "__resizeRight__":
			dockZone = "__SlxDocumentRightDockZone__";
		break;
		case "__resizeBottomRight__":
			dockZone = "__SlxDocumentBottomRightDockZone__";
		break;
		case "__resizeBottom__":
			dockZone = "__SlxDocumentBottomDockZone__";
		break;
		case "__resizeBottomLeft__":
			dockZone = "__SlxDocumentBottomLeftDockZone__";
		break;
		case "__resizeLeft__":
			dockZone = "__SlxDocumentLeftDockZone__";
		break;
		case "__resizeTopLeft__":
			dockZone = "__SlxDocumentTopLeftDockZone__";
		break;

	}

	console.log( "dockZone: " + dockZone );

	this.toggleDock( dockZone, savePreviousDimensions );

}

Bay.prototype.toggleDock = function( dockZone, savePreviousDimensions ) {

	console.log( dockZone + " === " + this.currentlyDockedAt + "; savePreviousDimensions: " + savePreviousDimensions );

	if ( dockZone === this.currentlyDockedAt ) {
		this.restorePreviousDimensions();
	} else {
		this.dock( dockZone, savePreviousDimensions );
	}

}

Bay.prototype.dock = function ( dockZone, savePreviousDimensions ) {

	if ( savePreviousDimensions === true ) {

		this.previousLeft = this.left;
		this.previousTop = this.top;
		this.previousWidth = this.width;
		this.previousHeight = this.height;

	}

	switch ( dockZone ) {

		case "__SlxDocumentFullScreenDockZone__":

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth;
			this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight;

		break;

		case "__SlxDocumentTopDockZone__":

			this.rootHtmlElement.style.left = 0 + "px";
			this.left = 0;
			this.rootHtmlElement.style.top = 0 + "px";
			this.top = 0;

			this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
			this.width = window.innerWidth;
			this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
			this.height = window.innerHeight / 2;
			
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
			
		break;

	}

	this.currentlyDockedAt = dockZone;

}

Bay.handleQuickMouseup = function( arEvent_target_id ) {

	console.log( arEvent_target_id );

	switch ( arEvent_target_id[1] ) {

		case "__resizeTop__":
		case "__resizeTopRight__":
		case "__resizeRight__":
		case "__resizeBottomRight__":
		case "__resizeBottom__":
		case "__resizeBottomLeft__":
		case "__resizeLeft__":
		case "__resizeTopLeft__": 
			this.instancesById[ arEvent_target_id[ 2 ] ].handleDocking( arEvent_target_id[1] );
		break;

	}

}

Bay.prototype.close = function () {

	console.log( this.id )

	document.getElementById( "__SlxBay__-" + this.id ).outerHTML = "";

	Bay.destroy( this.id );

}

Bay.prototype.restorePreviousDimensions = function() {

	// Change root left and top and content width and height
	this.left = this.previousLeft;
	this.rootHtmlElement.style.left = ( this.previousLeft ) + "px";
	this.previousLeft = undefined;
	this.top = this.previousTop;
	this.rootHtmlElement.style.top = ( this.previousTop ) + "px";
	this.previousTop = undefined;
	this.width = this.previousWidth;
	this.rootHtmlElement.style.width = ( this.previousWidth - Bay.borderWidthX2 ) + "px";
	this.previousWidth = undefined;
	this.height = this.previousHeight;
	this.rootHtmlElement.style.height = ( this.previousHeight - Bay.borderWidthX2 ) + "px";
	this.previousHeight = undefined;

	this.currentlyDockedAt = undefined;

}
// End Methods

// End Bay Class