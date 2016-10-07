/**
 * @author spencel / https://github.com/spencel
 */

// Input Class
var Input = {}; // Singleton

// Static (aka Class) Properties
Input.mousedownTimestamp = null;

Input.mouseupTimestamp = null;

Input.isMousedown = true;

Input.test = 1;
// End Static Properties

// Constructor
// End Constructor

// Instance Methods
// End Instance Methods

// Static (aka Class) Methods
Input.activateEventHandlers = function() {

	// Key Released
	jQuery( document ).on( "keyup", function( event ) {

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

		var draggingPanel = Panel.draggingPanel;

		if ( draggingPanel !== null ) {

			draggingPanel.htmlElement.setAttribute( "style",
				"left: " + event.clientX + "px;" +
				"top: " + event.clientY + "px;"
			);

		}

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

	});

	jQuery( document ).on( "mousedown", function( event) {

			console.log( event );

		Input.mousedownTimestamp = performance.now();
		Input.isMousedown = true;

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

		// If left mouse button is down
		if ( event.button === 1 ) {

			switch ( arEvent_target_id[0] ) {

				case "div":

					case "panel":

					break;

				break;

			}

		}

	});

	jQuery( document ).on( "mouseup", function( event ) {

			console.log( event );

		Input.mouseupTimestamp = performance.now();
		Input.isMouseDown = false;

			console.log( "mouseup delta: " + ( Input.mouseupTimestamp - Input.mousedownTimestamp ) );

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

		// If left mouse button is up
		if ( event.button === 1 ) {

			switch ( arEvent_target_id[0] ) {

				case "div":

					case "panel":

					break;

				break;

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

			}

		}

	});

	// Mouse Click
	jQuery( document ).on( "click", function( event ) {

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

				case "Bay":

					var id = arEvent_target_id[ 2 ];

					switch ( arEvent_target_id[ 3 ] ) {

						case "close":

							Bay.byId( id ).close();

						break;

					}

				break;

			}

		}

	});

	// Mouse Double Click
	jQuery( document ).on( "dblclick", function( event ) {

		var strEvent_target_id = event.target.id;
		var arEvent_target_id = strEvent_target_id.split("-");

		switch ( arEvent_target_id[0] ) {

		}

	});

}
// End Static Methods

// End Input Class