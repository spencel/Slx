/**
* @author spencel / https://github.com/spencel
*/

// SlxDocument Class
var SlxDocument = {};

// Static (aka Class) Properties
SlxDocument.nextId = 0;

SlxDocument.instancesById = {};

SlxDocument.quantity = 0;

SlxDocument.dockZoneWidth = 10;

SlxDocument.fullScreenZoneStart = 0.375; // 25% percent of window.innerWidth (located at center top of window)

SlxDocument.fullScreenZoneEnd = 0.625; // 25% percent of window.innerWidth (located at center top of window)

SlxDocument.objectInDockZone = undefined;

SlxDocument.inDockZone = undefined;
// End Static Properties

// Constructor
// End Constructor

// Static (aka Class) Methods
SlxDocument.init = function() {

	document.body.id = "__SlxDocumentFullScreen__";

	var element = document.createElement( "div" );
	element.id = "__SlxDocumentTopDockZone__";
	element.className = "__SlxDocumentDockZone__"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "__SlxDocumentTopRightDockZone__";
	element.className = "__SlxDocumentDockZone__"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "__SlxDocumentRightDockZone__";
	element.className = "__SlxDocumentDockZone__"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "__SlxDocumentBottomRightDockZone__";
	element.className = "__SlxDocumentDockZone__"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "__SlxDocumentBottomDockZone__";
	element.className = "__SlxDocumentDockZone__"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "__SlxDocumentBottomLeftDockZone__";
	element.className = "__SlxDocumentDockZone__"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "__SlxDocumentLeftDockZone__";
	element.className = "__SlxDocumentDockZone__"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "__SlxDocumentTopLeftDockZone__";
	element.className = "__SlxDocumentDockZone__"
	document.body.appendChild( element );

}
// End Static Methods

// Instance Methods
// End Instance Methods

// End SlxDocument Class