/**
 * @author spencel / https://github.com/spencel
 * @version 0.3
 */



// Input Class
var Input = {}; // Singleton

// Static (aka Class) Properties
Input.mousedownTimestamp = null;

Input.mouseupTimestamp = null;

Input.isMousedown = true;

Input.mousemoveX = undefined;

Input.mousemoveY = undefined;

Input.mousedownClientX = undefined;

Input.mousedownClientY = undefined;

Input.mouseupClientX = undefined;

Input.mouseupClientY = undefined;

Input.userIs = undefined;
// End Static Properties

// Constructor
// End Constructor

// Instance Methods
// End Instance Methods

// Static (aka Class) Methods
Input.activateEventHandlers = function() {

	// Key Released
	jQuery( document ).on( "keyup", function( event ) {

		event.stopPropagation();

		var event_target_id = event.target.id;
		//console.log(event_target_id);

		switch ( event_target_id ) {

			case "ConvertUnits":

				//console.log('test');

				convertUnits( event_target_id );

			break;

		}
	});

	document.onmousemove =  function( event ) {

		Input.mousemoveX = event.clientX;
		Input.mousemoveY = event.clientY;

		switch ( Input.userIs ) {

			case "__RESIZING_BAY__":

				Bay.handleResize( event );

			break;

			case "__DRAGGING_BAY__":

				Bay.handleDrag( event );

			break;

			default:

		}

	};

	document.onmousedown = function( event ) {

		Input.mousedownTimestamp = performance.now();
		Input.isMousedown = true;
		Input.mousedownClientX = event.clientX;
		Input.mousedownClientY = event.clientY;

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

		
		switch ( event.button ) {

			// Left Mouse Button is Down
			case 0:

				//console.log( arEvent_target_id[0] );

				switch ( arEvent_target_id[0] ) {

					// Handle Resize Buttons

					case "__Bay__":

						Bay.eventHandler( event, arEvent_target_id );

					break;
		
				}

			break;

		}

	};

	document.onmouseup = function( event ) {

		Input.mouseupTimestamp = performance.now();
		Input.isMouseDown = false;
		Input.mouseupClientX = event.clientX;
		Input.mouseupClientY = event.clientY;

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

		switch ( Input.userIs ) {

			case "__RESIZING_BAY__":

				Bay.handleResize( event );

			break;

			case "__DRAGGING_BAY__":

				Bay.handleDrag( event );

			break;

		}

		// Quick Mouseup
		/*if ( ( Input.mouseupTimestamp - Input.mousedownTimestamp ) < 200 ) {

			// Left mouse button is up
			if ( event.button === 0 ) {

				switch ( arEvent_target_id[0] ) {

					case "panelHeader":

						//console.log( Input.mouseupTimestamp - Input.mousedownTimestamp );

						if ( ( Input.mouseupTimestamp - Input.mousedownTimestamp ) < 200 ) { // if less than 100 ms has elapsed

							var id = arEvent_target_id[ 1 ];

								//console.log( "id: " + id );

								//console.log( Panel.byId[ id ] );

							Panel.byId[ id ].cycleDisplay();

						} else {

							if  ( Panel.isDraggable === true ) {

								var id = arEvent_target_id[ 1 ];

									//console.log( Panel.byId[ id ] );

								Panel.draggingPanel = Panel.byId[ id ];

									//console.log( Panel.draggingPanel );

							}

						}

					break;

					case "__Bay__": 

						Bay.handleQuickMouseup( arEvent_target_id );

					break;

				}

			// Right mouse button is up
			} else if ( event.button === 2 ) {

				switch ( arEvent_target_id[0] ) {

					// Resize Handles become Open Menu button on right click
					case "__resizeTop__":
					case "__resizeTopRight__":
					case "__resizeRight__":
					case "__resizeBottomRight__":
					case "__resizeBottom__":
					case "__resizeBottomLeft__":
					case "__resizeLeft__":
					case "__resizeTopLeft__":

					break;

				}

			}

		}*/

	};

	document.oncontextmenu = function( event ) {

		if ( ( Input.mouseupTimestamp - Input.mousedownTimestamp ) < 200 ) {

			var strEvent_target_id = event.target.id;
			var arEvent_target_id = strEvent_target_id.split("-");

			//console.log( event );

			switch ( arEvent_target_id[0] ) {

				// Resize Handles become Open Menu button on right click
				case "__resizeTop__":
				case "__resizeTopRight__":
				case "__resizeRight__":
				case "__resizeBottomRight__":
				case "__resizeBottom__":
				case "__resizeBottomLeft__":
				case "__resizeLeft__":
				case "__resizeTopLeft__":

					event.preventDefault();
					return false;

				break;

			}

		}

	}

	// Mouse Click
	jQuery( document ).on( "click", function( event ) {

		//console.log( event );

		event.stopPropagation();

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

		if ( arEvent_target_id[0] === "Slx" ) {

			switch ( arEvent_target_id[1] ) {

				case "menu":

					document.getElementById( "panels_container" ).innerHTML = "";
					Panel.unloadAll();

					var panelType = arEvent_target_id[ 2 ];

					Panel.initialize();
					Panel.loadAllOfType( panelType );
					Panel.displayAll( jQuery( "div#panels_container" ) );

				break;

				case "setting":

					var setting = arEvent_target_id[ 2 ];

					Panel.makeAllDraggable();

				break;

			}

		}

		switch ( arEvent_target_id[0] ) {

			// Handle Close Buttons

			case "__close__":

				var element = event.target.parentNode.parentNode;

					//console.log( element );

				var arrElementId = element.id.split("-");

					//console.log( arrElementId );

				switch ( arrElementId[0] ) {

					case "__SlxBay__":

						var id = arrElementId[1]

						Bay.instancesById[ id ].close();

					break;

				}

			break;

		}

	});

	// Mouse Double Click
	jQuery( document ).on( "dblclick", function( event ) {

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

		if ( event.button === 0 ) { 

			switch ( arEvent_target_id[0] ) {

				// Auto dock on click instead of double click
				/*case "__resizeTop__":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

							SlxDocument.inDockZone = "__SlxDocumentFullScreen__"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "__resizeTopRight__":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

							SlxDocument.inDockZone = "__SlxDocumentTopRightDockZone__"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "__resizeRight__":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

							SlxDocument.inDockZone = "__SlxDocumentRightDockZone__"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "__resizeBottomRight__":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

							SlxDocument.inDockZone = "__SlxDocumentBottomRightDockZone__"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;
				
				case "__resizeBottom__":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

							SlxDocument.inDockZone = "__SlxDocumentBottomDockZone__"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;
				
				case "__resizeBottomLeft__":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

							SlxDocument.inDockZone = "__SlxDocumentBottomLeftDockZone__"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "__resizeLeft__":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

							SlxDocument.inDockZone = "__SlxDocumentLeftDockZone__"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "__resizeTopLeft__":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

							SlxDocument.inDockZone = "__SlxDocumentTopLeftDockZone__"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;*/

				// Resize Handles double as fullscreen button on double click
				/*case "__topBar__": // also a drag button

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

							SlxDocument.inDockZone = "__SlxDocumentFullScreen__"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "__drag__": // ensures some amount of space of the topbar is showing

					var element = event.target.parentNode.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

							SlxDocument.inDockZone = "__SlxDocumentFullScreen__"

							Bay.instancesById[ id ].finishDragging();	

						break;

					}

				break;*/

			}

		}

	});

}

Input.isMouseupQuick = function() {

	if ( ( Input.mouseupTimestamp - Input.mousedownTimestamp ) < 200 ) {

		return true;

	} else {

		return false;

	}

}
// End Static Methods

// End Input Class