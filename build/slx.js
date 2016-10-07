// Version 0.1

var Slx = (function() {

	// Globals
	
	// Variables
	var globalTestVariable = "test";
	// End Variables
	
	// Functions
	doMathJax = function() {
	
		var slxMathJax = {
	
			makeVisible: function () {
				
				// Alternative A (instant display, however no fade in is possible)
				//jQuery( ".slxMathJax" ).css({ "visibility": "visible" });
	
				// Alternative B (works only for display:none, however div is collapsed until MathJax is done)
				//jQuery( ".slxMathJax" ).fadeIn( 500 );
	
				// Alternative C (animating text color requires jQuery UI and does not have the drawbacks of Alternativs A and B)
				jQuery( ".slxMathJax" ).css( "display", "inline-block" ).animate(
					{
						"color": "hsl(0, 0%, 25%)"
					},
					150,
					"swing"
				);
	
			},
	
			// This is a jQuery test
			getMjxCharElements: function () {
	
				//console.log( jQuery( ".mjx-char" ) );
	
			}
	
		};
	
		MathJax.Hub.Queue(
	
			[ "Typeset", MathJax.Hub, document ],
	
			[ "makeVisible", slxMathJax ],
	
			[ "getMjxCharElements", slxMathJax ] // This is a jQuery test
	
		);
	
	}
	// End Functions
	
	// End Globals
	
	// Classes
	
	/**
	 * @author spencel / https://github.com/spencel
	 */
	
	// Bay Class
	
	// Static (aka Class) Properties
	Bay.nextId = 0;
	
	Bay.instancesById = {};
	
	Bay.quantity = 0; // The number of currently existing instances
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
			element.setAttribute( "id", "Slx-Bay-" + this.id )
			element.setAttribute( "class", "Bay" )
			element.setAttribute( "style",
					"left:" + this.left +
					"px;top:" + this.top +
					"px;width:" + this.width +
					"px;height:" + this.height + "px;" );
	
			document.getElementsByTagName( "BODY" )[0].appendChild( element );
	
			var strHtml =
				"<div id='resizeTop'></div>" +
				"<div id='resizeTopRight'></div>" + 
				"<div id='resizeRight'></div>" +
				"<div id='resizeBottomRight'></div>" +
				"<div id='resizeBottom'></div>" +
				"<div id='resizeBottomLeft'></div>" +
				"<div id='resizeLeft'></div>" +
				"<div id='resizeTopLeft'></div>";
	
			element.innerHTML = strHtml;
	
			this.isHtml = true;
	
		} else {
	
			document.getElementById( "Slx-Bay-" + this.id ).outerHTML = "";
	
			this.isHtml = false;
	
		}
	
	}
	
	Bay.prototype.close = function () {
	
		document.getElementById( this.id ).outerHTML = "";
	
		Bay.destroy( this.id );
	
	}
	// End Instance Methods
	
	// End Bay Class
	
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
	
	/**
	 * @author spencel / https://github.com/spencel
	 */
	
	// Panel Class
	
	// Static (aka Class) Properties
	Panel.nextId = 0;
	
	Panel.instances = [];
	
	Panel.byId = {};
	
	Panel.draggingPanel = null;
	
	Panel.isDraggable = false;
	// End Static Properties
	
	// Constructor
	function Panel( name, displays ) {
	
		Panel.instances.push( this );
		Panel.byId[ Panel.nextId ] = this;
	
		// Instance Properties
		this.id = Panel.nextId;
		Panel.nextId++;
	
		this.name = name;
	
		this.iDisplay = 0;
	
		this.displays = displays;
	
		this.isShowing = false;
	
		this.htmlElement = null;
		// End Instance Properties
	
		return this;
	
	}
	// End Constructor
	
	// Instance Methods
	Panel.prototype.show = function( jQueryElement ) {
	
		if ( this.isShowing === false ) {
	
			this.isShowing = true;
	
			var displayHtml = this.displays[ this.iDisplay ].replace( /{NAME}/g, this.name ).replace( /{ID}/g, this.id );
	
				console.log( displayHtml );
	
			jQueryElement.append( displayHtml );
	
			this.htmlElement = document.getElementById( "div-panel-" + this.name );
	
			doMathJax();
	
		}
	
	}
	
	Panel.prototype.cycleDisplay = function( elementId ) {
	
		this.iDisplay++;
		if ( this.iDisplay === this.displays.length ) {
			this.iDisplay = 0;
		}
	
			console.log( this + ": " + this.displays[ this.iDisplay ] );
	
		var displayHtml = this.displays[ this.iDisplay ].replace( /{NAME}/g, this.name ).replace( /{ID}/g, this.id );
	
			console.log( displayHtml );
	
		if ( Panel.isDraggable === true ) {
	
			displayHtml.replace( "class='div-panel'", "class='div-panel-draggable'" );
	
		}
	
		document.getElementById( "div-panel-" + this.id ).outerHTML = displayHtml;
	
		this.htmlElement = document.getElementById( "div-panel-" + this.name ); // need this if outerHTML is used
	
		doMathJax();
	
	}
	
	Panel.prototype.buildDisplay = function() {
	
		var strHtml = "<div id='div-panel-" + this.name + "'";
	
		if ( isDraggable === true ) { strHtml += "class='div-panel-draggable'>"; }
		else 						{ strHtml += "class='div-panel'>"; }
	
		/*strHtml += "<table id='panel' class='panel1'>"\
						<tr>\
							<th id='panelHeader'>
	*/
	}
	// End Instance Methods
	
	// Static (aka Class) Methods
	Panel.initialize = function() {
	
		var strHtml = 
			"<table class='panel1'>\
				<tbody class='th-border'>\
					<tr>\
						<th id='menu-Units_Of_Measurement'>Units of Measurement</th>\
						<th id='menu-Chemistry'>Chemistry</th>\
						<th id='menu-Assembly_Language'>Assembly Language</th>\
						<th id='setting-makePanelsDraggable'>Make Draggable</th>\
					</tr>\
				</tbody>\
			</table>";
	
		document.getElementById( "menu" ).innerHTML = strHtml;
	
		doMathJax();
	
	}
	
	Panel.loadAllOfType = function( panelType ) {
	
		var panelList = Data.panelLists[ panelType ];
	
			console.log( panelList );
	
		var panelData = Data.panelData;
	
			console.log( panelData );
	
		for ( var i = 0; i < panelList.length; i++ ) {
	
			var panelName = panelList[ i ];
	
			var panel = panelData[ panelName ];
	
			new Panel( panel.name, panel.displays );
	
		}
	
	}
	
	Panel.unloadAll = function() {
		
		document.getElementById( "panels_container" ).innerHTML = "";
	
		Panel.nextId = 0;
		Panel.instances = [];
		Panel.byId = {};
	
	}
	
	Panel.displayAll = function( jQueryElement ) {
	
		for ( var i = 0; i < Panel.instances.length; i++ ) {
	
			var panel = Panel.instances[ i ];
			panel.show( jQueryElement );
	
		}
	
	}
	
	// Should this method but a member of ConvertUnits?
	Panel.convertUnits = function( event_target_id ) {
	
		var strInputValue = jQuery( "input#" + event_target_id ).val();
	
		var arInputValue = strInputValue.split(" ");
	
		var quantity;
		var uniqueKey;
	
		if ( arInputValue.length == 4 ) {
			quantity = arInputValue[0];
			uniqueKey = arInputValue[1] + ">" + arInputValue[3];
		} else if ( arInputValue.length == 3 ) {
			quantity = arInputValue[0];
			uniqueKey = arInputValue[1] + ">" + arInputValue[2];
		} else if ( arInputValue.length == 2 ) {
			quantity = 1;
			uniqueKey = arInputValue[0] + ">" + arInputValue[1];
		}
	
		var result = UnitConversions.byKey( quantity, uniqueKey );
	
		if (result != false) {
			jQuery( "td#convertUnits-result" ).html( result );
		} else {
			jQuery( "td#convertUnits-result" ).html( "-" );
		}
	
	}
	
	Panel.makeAllDraggable = function() {
	
		var divTableElements = jQuery( ".div-panel" );
	
			console.log( divTableElements );
	
			console.log( divTableElements.length );
	
		for ( var i = 0; i < divTableElements.length; i++ ) {
	
				console.log( "i: " + i );
				console.log( "divTableElements[ " + i + " ]: " + divTableElements[ i ].innerHTML );
				console.log( "divTableElements[ " + i + " ].offsetLeft: " + divTableElements[ i ].offsetLeft );
				console.log( "divTableElements[ " + i + " ].offsetTop: " + divTableElements[ i ].offsetTop );
	
			divTableElements[ i ].setAttribute( "style",
				"left: " + divTableElements[ i ].offsetLeft + "px;" +
				"top: " + divTableElements[ i ].offsetTop + "px;"
			);
	
		}
	
			console.log( divTableElements.length );
	
		for ( var i = 0; i < divTableElements.length; i++ ) {
	
				console.log( "i: " + i );
				console.log( divTableElements[ i ] );
				console.log( divTableElements[ i ].className );
	
			divTableElements[ i ].className = "div-panel-draggable";
	
				console.log( divTableElements[ i ].className );
	
		}
	
		divTableElements.attr( "class", "div-panel-draggable" );
		
			console.log( divTableElements );
	
		isDraggable = true;
	
			console.log( "isDraggable: " + isDraggable );
	
	}
	// End Static Methods
	
	// End Panel Class
	
	// End Classes
	
	return {
		
		globalTestVariable: globalTestVariable,
		
		doMathJax: doMathJax,
		
		Bay: Bay,
		
		Panel: Panel,
		
		Input: Input,
		
		//Menu: Menu,
		
		//ViewPort: ViewPort
		
	}

}());