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
		element.id = "SlxBay-" + this.id;
		element.className = "Bay";
		element.style.left = this.left + "px";
		element.style.top = this.top + "px";
		focus( element );

		document.getElementsByTagName( "BODY" )[0].appendChild( element );

		var strHtml =
			"<div id='resizeTop'></div>" +
			"<div id='resizeTopRight'></div>" + 
			"<div id='resizeRight'></div>" +
			"<div id='resizeBottomRight'></div>" +
			"<div id='resizeBottom'></div>" +
			"<div id='resizeBottomLeft'></div>" +
			"<div id='resizeLeft'></div>" +
			"<div id='resizeTopLeft'></div>" +
			"<div id='topBar'>" +
				"<div id='move'></div>" +
				"<div id='close'>x</div>" + 
			"</div>" +
			"<div id='content' style='width:" + ( this.width - 6 ) + "px;height:" + ( this.height - 6 ) + "px;'>test</div>"; // has 2px reserved for border and 4px reserved for margin

		element.innerHTML = strHtml;

		this.contentHtmlElement = element.childNodes[ 9 ];

			console.log( this.contentHtmlElement );

		this.isHtml = true;

	} else {

		document.getElementById( "SlxBay-" + this.id ).outerHTML = "";

		this.isHtml = false;

	}

}

Bay.prototype.close = function () {

		console.log( this.id )

	document.getElementById( "SlxBay-" + this.id ).outerHTML = "";

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

		case "resizeTop":

			//console.log( "resizeTop" );

			// Change root top and content height

			this.rootHtmlElement.setAttribute( "style",
				"left:" + this.left + "px;top:" + ( this.top - Input.mousedownClientY + top ) + "px;" );

			var height = ( this.height + Input.mousedownClientY - top - 6 );

			//console.log( "height: " + height );

			this.contentHtmlElement.setAttribute( "style",
				"width:" + ( this.width - 6 ) + "px;height:" + height + "px;" );

		break;

		case "resizeTopRight":

			// Change root top and content width and height

			this.rootHtmlElement.setAttribute( "style",
				"left:" + this.left + "px;top:" + ( this.top - Input.mousedownClientY + top ) + "px;" );

			this.contentHtmlElement.setAttribute( "style",
				"width:" + ( this.width - Input.mousedownClientX + left - 6 ) + "px;height:" + ( this.height + Input.mousedownClientY - top - 6 ) + "px;" );

		break;

		case "resizeRight":

			// Change content width

			this.contentHtmlElement.setAttribute( "style",
				"width:" + ( this.width - Input.mousedownClientX + left - 6 ) + "px;height:" + ( this.height - 6 ) + "px;" );

		break;

		case "resizeBottomRight":

			// Change content width and height

			this.contentHtmlElement.setAttribute( "style",
				"width:" + ( this.width - Input.mousedownClientX + left - 6 ) + "px;height:" + ( this.height - Input.mousedownClientY + top - 6 ) + "px;" );

		break;

		case "resizeBottom":

			// Change content height

			this.contentHtmlElement.setAttribute( "style",
				"width:" + ( this.width - 6 ) + "px;height:" + ( this.height - Input.mousedownClientY + top - 6 ) + "px;" );

		break;

		case "resizeBottomLeft":

			// Change root left and content width and height

			this.rootHtmlElement.setAttribute( "style",
				"left:" + ( this.left - Input.mousedownClientX + left ) + "px;top:" + this.top + "px;" );

			this.contentHtmlElement.setAttribute( "style",
				"width:" + ( this.width + Input.mousedownClientX - left - 6 ) + "px;height:" + ( this.height - Input.mousedownClientY + top - 6 ) + "px;" );

		break;

		case "resizeLeft":

			// Change root left and content width

			this.rootHtmlElement.setAttribute( "style",
				"left:" + ( this.left - Input.mousedownClientX + left ) + "px;top:" + this.top + "px;" );

			this.contentHtmlElement.setAttribute( "style",
				"width:" + ( this.width + Input.mousedownClientX - left - 6 ) + "px;height:" + ( this.height - 6 ) + "px;" );

		break;

		case "resizeTopLeft":

			// Change root left and top and content width and height

			this.rootHtmlElement.setAttribute( "style",
				"left:" + ( this.left - Input.mousedownClientX + left ) + "px;top:" + ( this.top - Input.mousedownClientY + top ) + "px;" );

			this.contentHtmlElement.setAttribute( "style",
				"width:" + ( this.width + Input.mousedownClientX - left - 6 ) + "px;height:" + ( this.height + Input.mousedownClientY - top - 6 ) + "px;" );

		break;

	}

}

Bay.prototype.finishResizing = function() {

	this.left = parseInt( this.rootHtmlElement.style.left );
	console.log( "this.left :" + this.left );
	this.top = parseInt( this.rootHtmlElement.style.top );
	console.log( "this.top :" + this.top );
	this.width = this.contentHtmlElement.offsetWidth + 2;
	console.log( "this.width :" + this.width );
	this.height = this.contentHtmlElement.offsetHeight + 2;
	console.log( "this.height :" + this.height );

	Bay.nowResizing = undefined;
	Bay.resizeType = undefined;

}
// End Instance Methods

// End Bay Class