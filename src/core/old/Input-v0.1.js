/**
 * @author spencel / https://github.com/spencel
 * @version 0.1
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
		console.log(event_target_id);

		switch ( event_target_id ) {

			case "ConvertUnits":

				console.log('test');

				convertUnits( event_target_id );

			break;

		}
	});

	/*
	// Mouse Move (does not bubble like mouseenter event)
	jQuery( "body" ).on( "mousemove", function( event ) {

		var jQuery_targert = jQuery(event.target);

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");
		var id = arEvent_target_id[1];

		// Handle this stuff first
		// Hide any context menus if any are visible
		if ( jQuery_targert.hasClass( "button" ) === false &&  slxPanel.ContextMenu.isShowing === true ) {

			slxPanel.hideContextMenu();

		}

		// Now handle input
		switch ( arEvent_target_id[0] ) {

			case "panelHeader":

				slxPanel.showPanelButtons( id );

			break;

		}

	});
	*/

	jQuery( document ).on( "mousemove", function( event ) {

		event.stopPropagation();

		//console.log( event );
		//console.log( "event.clientX: " + event.clientX );
		//console.log( "event.clientY: " + event.clientY );

		Input.mousemoveX = event.clientX;
		Input.mousemoveY = event.clientY;

		var draggingPanel = Panel.draggingPanel;

		if ( draggingPanel !== null ) {

			draggingPanel.htmlElement.setAttribute( "style",
				"left: " + event.clientX + "px;" +
				"top: " + event.clientY + "px;"
			);

		}

		switch ( Input.userIs ) {

			case "__RESIZING_BAY__":

				event.preventDefault(); // Prevent text selection and dragging

				Bay.nowResizing.resize( event.clientX, event.clientY );

			break;

			case "__DRAGGING_BAY__":

				event.preventDefault(); // Prevent text selection and dragging

				Bay.nowDragging.drag( event.clientX, event.clientY );

			break;

		}

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

	});

	document.onmousedown = function( event ) {

		event.stopPropagation();

		console.log( event );

		Input.mousedownTimestamp = performance.now();
		Input.isMousedown = true;
		Input.mousedownClientX = event.clientX;
		Input.mousedownClientY = event.clientY;

		console.log( "Input.mousedownClientX: " + Input.mousedownClientX );
		console.log( "Input.mousedownClientY: " + Input.mousedownClientY );

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

		// Left Mouse Button is Down
		if ( event.button === 0 ) { 

			console.log( arEvent_target_id[0] );

			switch ( arEvent_target_id[0] ) {

				// Handle Resize Buttons

				case "__resizeTop__":
				case "__resizeTopRight__":
				case "__resizeRight__":
				case "__resizeBottomRight__":
				case "__resizeBottom__":
				case "__resizeBottomLeft__":
				case "__resizeLeft__":
				case "__resizeTopLeft__":

					event.preventDefault(); // Prevent text selection and dragging

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					console.log( arrElementId );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							var resizeType = arEvent_target_id[0];

							Bay.instancesById[ id ].initResize( resizeType );

							Input.userIs = "__RESIZING_BAY__"

						break;

					}

				break;

				case "__topBar__": // also a drag button

					var element = event.target.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

						break;

					}

				break;

				case "__drag__": // ensures some amount of space of the topbar is showing

					var element = event.target.parentNode.parentNode.parentNode;

					var arrElementId = element.id.split( "-" );

					switch ( arrElementId[0] ) {

						case "__SlxBay__":

							var id = arrElementId[1]

							Bay.instancesById[ id ].initDrag();

							Input.userIs = "__DRAGGING_BAY__"

						break;

					}

				break;

				case "panelHeader":

					//event.preventDefault(); // Prevent text selection and dragging

				break;
	
			}

		}

	};

	document.onmouseup = function( event ) {

		event.stopPropagation();

		//console.log( event );

		Input.mouseupTimestamp = performance.now();
		Input.isMouseDown = false;
		Input.mouseupClientX = event.clientX;
		Input.mouseupClientY = event.clientY;

		switch ( Input.userIs ) {

			case "__RESIZING_BAY__":

				event.preventDefault(); // Prevent text selection and dragging

				Bay.nowResizing.finishResizing( event.clientX, event.clientY );

			break;

			case "__DRAGGING_BAY__":

				event.preventDefault(); // Prevent text selection and dragging

				Bay.nowDragging.finishDragging( event.clientX, event.clientY );

			break;

		}

		console.log( "mouseup delta: " + ( Input.mouseupTimestamp - Input.mousedownTimestamp ) );

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

		if ( ( Input.mouseupTimestamp - Input.mousedownTimestamp ) < 200 ) {

			// Left mouse button is up
			if ( event.button === 0 ) {

				switch ( arEvent_target_id[0] ) {

					case "panelHeader":

						console.log( Input.mouseupTimestamp - Input.mousedownTimestamp );

						if ( ( Input.mouseupTimestamp - Input.mousedownTimestamp ) < 200 ) { // if less than 100 ms has elapsed

							var id = arEvent_target_id[ 1 ];

								console.log( "id: " + id );

								console.log( Panel.byId[ id ] );

							Panel.byId[ id ].cycleDisplay();

						} else {

							if  ( Panel.isDraggable === true ) {

								var id = arEvent_target_id[ 1 ];

									console.log( Panel.byId[ id ] );

								Panel.draggingPanel = Panel.byId[ id ];

									console.log( Panel.draggingPanel );

							}

						}

					break;

					case "__resizeTop__":

						var element = event.target.parentNode;

						var arrElementId = element.id.split( "-" );

						switch ( arrElementId[0] ) {

							case "__SlxBay__":

								var id = arrElementId[1]

								if ( Bay.instancesById[ id ].currentlyDockedAt === arEvent_target_id[0] ) {

									Bay.instancesById[ id ].restorePreviousDimensions();

								} else {

									Bay.instancesById[ id ].initDrag();

									Input.userIs = "__DRAGGING_BAY__"

									SlxDocument.inDockZone = "__SlxDocumentFullScreen__"

									Bay.instancesById[ id ].finishDragging();

								}

							break;

						}

					break;

					case "__resizeTopRight__":

						var element = event.target.parentNode;

						var arrElementId = element.id.split( "-" );

						switch ( arrElementId[0] ) {							

							case "__SlxBay__":

								var id = arrElementId[1]

								if ( Bay.instancesById[ id ].currentlyDockedAt === arEvent_target_id[0] ) {

									Bay.instancesById[ id ].restorePreviousDimensions();

								} else {


									Bay.instancesById[ id ].initDrag();

									Input.userIs = "__DRAGGING_BAY__"

									SlxDocument.inDockZone = "__SlxDocumentTopRightDockZone__"

									Bay.instancesById[ id ].finishDragging();

							}

							break;

						}

					break;

					case "__resizeRight__":

						var element = event.target.parentNode;

						var arrElementId = element.id.split( "-" );

						switch ( arrElementId[0] ) {

							case "__SlxBay__":

								var id = arrElementId[1]

								if ( Bay.instancesById[ id ].currentlyDockedAt === arEvent_target_id[0] ) {

									Bay.instancesById[ id ].restorePreviousDimensions();

								} else {

									Bay.instancesById[ id ].initDrag();

									Input.userIs = "__DRAGGING_BAY__"

									SlxDocument.inDockZone = "__SlxDocumentRightDockZone__"

									Bay.instancesById[ id ].finishDragging();

								}

							break;

						}

					break;

					case "__resizeBottomRight__":

						var element = event.target.parentNode;

						var arrElementId = element.id.split( "-" );

						switch ( arrElementId[0] ) {

							case "__SlxBay__":

								var id = arrElementId[1]

								if ( Bay.instancesById[ id ].currentlyDockedAt === arEvent_target_id[0] ) {

									Bay.instancesById[ id ].restorePreviousDimensions();

								} else {

									Bay.instancesById[ id ].initDrag();

									Input.userIs = "__DRAGGING_BAY__"

									SlxDocument.inDockZone = "__SlxDocumentBottomRightDockZone__"

									Bay.instancesById[ id ].finishDragging();

								}

							break;

						}

					break;
					
					case "__resizeBottom__":

						var element = event.target.parentNode;

						var arrElementId = element.id.split( "-" );

						switch ( arrElementId[0] ) {

							case "__SlxBay__":

								var id = arrElementId[1]

								if ( Bay.instancesById[ id ].currentlyDockedAt === arEvent_target_id[0] ) {

									Bay.instancesById[ id ].restorePreviousDimensions();

								} else {

									Bay.instancesById[ id ].initDrag();

									Input.userIs = "__DRAGGING_BAY__"

									SlxDocument.inDockZone = "__SlxDocumentBottomDockZone__"

									Bay.instancesById[ id ].finishDragging();

								}

							break;

						}

					break;
					
					case "__resizeBottomLeft__":

						var element = event.target.parentNode;

						var arrElementId = element.id.split( "-" );

						switch ( arrElementId[0] ) {

							case "__SlxBay__":

								var id = arrElementId[1]

								if ( Bay.instancesById[ id ].currentlyDockedAt === arEvent_target_id[0] ) {

									Bay.instancesById[ id ].restorePreviousDimensions();

								} else {

									Bay.instancesById[ id ].initDrag();

									Input.userIs = "__DRAGGING_BAY__"

									SlxDocument.inDockZone = "__SlxDocumentBottomLeftDockZone__"

									Bay.instancesById[ id ].finishDragging();

								}

							break;

						}

					break;

					case "__resizeLeft__":

						var element = event.target.parentNode;

						var arrElementId = element.id.split( "-" );

						switch ( arrElementId[0] ) {

							case "__SlxBay__":

								var id = arrElementId[1]

								if ( Bay.instancesById[ id ].currentlyDockedAt === arEvent_target_id[0] ) {

									Bay.instancesById[ id ].restorePreviousDimensions();

								} else {

									Bay.instancesById[ id ].initDrag();

									Input.userIs = "__DRAGGING_BAY__"

									SlxDocument.inDockZone = "__SlxDocumentLeftDockZone__"

									Bay.instancesById[ id ].finishDragging();

								}

							break;

						}

					break;

					case "__resizeTopLeft__":

						var element = event.target.parentNode;

						var arrElementId = element.id.split( "-" );

						switch ( arrElementId[0] ) {

							case "__SlxBay__":

								var id = arrElementId[1]

								if ( Bay.instancesById[ id ].currentlyDockedAt === "__SlxDocumentTopLeftDockZone__" ) {

									Bay.instancesById[ id ].restorePreviousDimensions();

								} else {

									Bay.instancesById[ id ].initDrag();

									Input.userIs = "__DRAGGING_BAY__"

									SlxDocument.inDockZone = "__SlxDocumentTopLeftDockZone__"

									Bay.instancesById[ id ].finishDragging();

								}

							break;

						}

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

		}

	};

	document.oncontextmenu = function( event ) {

		if ( ( Input.mouseupTimestamp - Input.mousedownTimestamp ) < 200 ) {

			var strEvent_target_id = event.target.id;
			var arEvent_target_id = strEvent_target_id.split("-");

			console.log( event );

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

		console.log( event );

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

					console.log( element );

				var arrElementId = element.id.split("-");

					console.log( arrElementId );

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
// End Static Methods

// End Input Class