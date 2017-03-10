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

			case "_s_RESIZING_BAY_e_":

				Bay.handleResize( event );

			break;

			case "_s_DRAGGING_BAY_e_":

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

				switch ( arEvent_target_id[0] ) {

					case "_s_Bay_e_":

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

			case "_s_RESIZING_BAY_e_":

				Bay.handleResize( event );

			break;

			case "_s_DRAGGING_BAY_e_":

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

					case "_s_Bay_e_": 

						Bay.handleQuickMouseup( arEvent_target_id );

					break;

				}

			// Right mouse button is up
			} else if ( event.button === 2 ) {

				switch ( arEvent_target_id[0] ) {

					// Resize Handles become Open Menu button on right click
					case "_s_resizeTop_e_":
					case "_s_resizeTopRight_e_":
					case "_s_resizeRight_e_":
					case "_s_resizeBottomRight_e_":
					case "_s_resizeBottom_e_":
					case "_s_resizeBottomLeft_e_":
					case "_s_resizeLeft_e_":
					case "_s_resizeTopLeft_e_":

					break;

				}

			}

		}*/

	};

	document.oncontextmenu = function( event ) {

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

		switch ( arEvent_target_id[0] ) {

			case "_s_Bay_e_":

				Bay.eventHandler( event, arEvent_target_id );

			break;
		
		}

	};

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

			case "_s_close_e_":

				var element = event.target.parentNode.parentNode;

					//console.log( element );

				var arrElementId = element.id.split("-");

					//console.log( arrElementId );

				switch ( arrElementId[0] ) {

					case "_s_SlxBay_e_":

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
				/*case "_s_resizeTop_e_":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "_s_SlxBay_e_":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "_s_DRAGGING_BAY_e_"

							SlxDocument.inDockZone = "_s_SlxDocumentFullScreen_e_"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "_s_resizeTopRight_e_":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "_s_SlxBay_e_":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "_s_DRAGGING_BAY_e_"

							SlxDocument.inDockZone = "_s_SlxDocumentTopRightDockZone_e_"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "_s_resizeRight_e_":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "_s_SlxBay_e_":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "_s_DRAGGING_BAY_e_"

							SlxDocument.inDockZone = "_s_SlxDocumentRightDockZone_e_"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "_s_resizeBottomRight_e_":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "_s_SlxBay_e_":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "_s_DRAGGING_BAY_e_"

							SlxDocument.inDockZone = "_s_SlxDocumentBottomRightDockZone_e_"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;
				
				case "_s_resizeBottom_e_":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "_s_SlxBay_e_":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "_s_DRAGGING_BAY_e_"

							SlxDocument.inDockZone = "_s_SlxDocumentBottomDockZone_e_"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;
				
				case "_s_resizeBottomLeft_e_":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "_s_SlxBay_e_":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "_s_DRAGGING_BAY_e_"

							SlxDocument.inDockZone = "_s_SlxDocumentBottomLeftDockZone_e_"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "_s_resizeLeft_e_":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "_s_SlxBay_e_":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "_s_DRAGGING_BAY_e_"

							SlxDocument.inDockZone = "_s_SlxDocumentLeftDockZone_e_"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "_s_resizeTopLeft_e_":

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "_s_SlxBay_e_":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "_s_DRAGGING_BAY_e_"

							SlxDocument.inDockZone = "_s_SlxDocumentTopLeftDockZone_e_"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;*/

				// Resize Handles double as fullscreen button on double click
				/*case "_s_topBar_e_": // also a drag button

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "_s_SlxBay_e_":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "_s_DRAGGING_BAY_e_"

							SlxDocument.inDockZone = "_s_SlxDocumentFullScreen_e_"

							Bay.instancesById[ id ].finishDragging();

						break;

					}

				break;

				case "_s_drag_e_": // ensures some amount of space of the topbar is showing

					var element = event.target.parentNode.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "_s_SlxBay_e_":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "_s_DRAGGING_BAY_e_"

							SlxDocument.inDockZone = "_s_SlxDocumentFullScreen_e_"

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