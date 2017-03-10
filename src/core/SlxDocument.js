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

	document.body.id = "_s_SlxDocumentFullScreenDockZone_e_"

	var element = document.createElement( "div" );
	element.id = "_s_SlxDocumentTopDockZone_e_";
	element.className = "_s_SlxDocumentDockZone_e_"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "_s_SlxDocumentTopRightDockZone_e_";
	element.className = "_s_SlxDocumentDockZone_e_"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "_s_SlxDocumentRightDockZone_e_";
	element.className = "_s_SlxDocumentDockZone_e_"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "_s_SlxDocumentBottomRightDockZone_e_";
	element.className = "_s_SlxDocumentDockZone_e_"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "_s_SlxDocumentBottomDockZone_e_";
	element.className = "_s_SlxDocumentDockZone_e_"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "_s_SlxDocumentBottomLeftDockZone_e_";
	element.className = "_s_SlxDocumentDockZone_e_"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "_s_SlxDocumentLeftDockZone_e_";
	element.className = "_s_SlxDocumentDockZone_e_"
	document.body.appendChild( element );

	var element = document.createElement( "div" );
	element.id = "_s_SlxDocumentTopLeftDockZone_e_";
	element.className = "_s_SlxDocumentDockZone_e_"
	document.body.appendChild( element );

}
// End Static Methods

// Instance Methods
// End Instance Methods

// End SlxDocument Class