// Version 0.1

var Slx = (function() {

	// Globals
	
	// Variables
	var zIndexHigh = 0;
	// End Variables
	
	// Functions
	function doMathJax() {
	
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
	
	function focus( element ) {
	
		if ( element.style.zIndex !== zIndexHigh.toString() ) {
	
			zIndexHigh++
			element.style.zIndex = zIndexHigh;
	
		}
	
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
	
	Bay.nowResizing = undefined; // Set to instance that is being resized
	
	Bay.resizeType = undefined; // A string constant that indicates the resize type, e.g., top, bottom right, mirrored, etc.
	// End Static Properties
	
	// Constructor
	function Bay( left, top, width, height ) {
	
		Bay.instancesById[ Bay.nextId ] = this;
		Bay.quantity++;
	
		// Instance Properties
		this.id = Bay.nextId;
		Bay.nextId++;
	
		this.left = left;
	
		this.top = top;
	
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
			element.id = "_0-" + this.id;
			element.className = "_1";
			element.style.left = this.left + "px";
			element.style.top = this.top + "px";
			focus( element );
	
			document.getElementsByTagName( "BODY" )[0].appendChild( element );
	
			elementChild = document.createElement( "div" );
			elementChild.id = "_2";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_3";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_4";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_5";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_6";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_7";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_8";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_9";
			element.appendChild( elementChild );
	
			elementChild = document.createElement( "div" );
			elementChild.id = "_10";
			element.appendChild( elementChild );
	
			elementChildChild = document.createElement( "div" );
			elementChildChild.id = "_11";
			elementChild.appendChild( elementChildChild );
			elementChildChild = document.createElement( "div" );
			elementChildChild.id = "_12";
			elementChild.appendChild( elementChildChild );
			var text = document.createTextNode( "X" );
			elementChildChild.appendChild( text );
	
			elementChild = document.createElement( "div" );
			elementChild.id = "_13";
			elementChild.style.width = ( this.width - 10 ) + "px"; // 10 px reserved for resize handles
			elementChild.style.height = ( this.height - 10 ) + "px"; // 10 px reserved for resize handles
			element.appendChild( elementChild );
	
			this.contentHtmlElement = element.childNodes[ 9 ];
	
				console.log( this.contentHtmlElement );
	
			this.isHtml = true;
	
		} else {
	
			document.getElementById( "_0-" + this.id ).outerHTML = "";
	
			this.isHtml = false;
	
		}
	
	}
	
	Bay.prototype.close = function () {
	
			console.log( this.id )
	
		document.getElementById( "_0-" + this.id ).outerHTML = "";
	
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
	
			case "_2":
	
				//console.log( "resizeTop" );
	
				// Change root top and content height
				this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
				this.contentHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - 8 ) + "px";
	
			break;
	
			case "_3":
	
				// Change root top and content width and height
				this.rootHtmlElement.style.top =  ( this.top - Input.mousedownClientY + top ) + "px";
				this.contentHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - 8 ) + "px";
				this.contentHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - 8 ) + "px";
	
			break;
	
			case "_4":
	
				// Change content width
				this.contentHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - 8 ) + "px";
				
			break;
	
			case "_5":
	
				// Change content width and height
				this.contentHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - 8 ) + "px";
				this.contentHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - 8 ) + "px";
	
			break;
	
			case "_6":
	
				// Change content height
				this.contentHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - 8 ) + "px";
	
			break;
	
			case "_7":
	
				// Change root left and content width and height
				this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
				this.contentHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - 8 ) + "px";
				this.contentHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - 8 ) + "px";
	
			break;
	
			case "_8":
	
				// Change root left and content width
				this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
				this.contentHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - 8 ) + "px";
	
			break;
	
			case "_9":
	
				// Change root left and top and content width and height
				this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
				this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
				this.contentHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - 8 ) + "px";
				this.contentHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - 8 ) + "px";
	
			break;
	
		}
	
	}
	
	Bay.prototype.finishResizing = function() {
	
		this.left = parseInt( this.rootHtmlElement.style.left );
		console.log( "this.left :" + this.left );
		this.top = parseInt( this.rootHtmlElement.style.top );
		console.log( "this.top :" + this.top );
		this.width = this.contentHtmlElement.offsetWidth + 10;
		console.log( "this.width :" + this.width );
		this.height = this.contentHtmlElement.offsetHeight + 10;
		console.log( "this.height :" + this.height );
	
		Bay.nowResizing = undefined;
		Bay.resizeType = undefined;
	
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
	
	Input.mousedownClientX = undefined;
	
	Input.mousedownClientY = undefined;
	
	Input.mouseupClientX = undefined;
	
	Input.mouseupClientY = undefined;
	
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
	
			var eventtargetid = event.target.id;
			console.log(eventtargetid);
	
			switch ( eventtargetid ) {
	
				case "ConvertUnits":
	
					console.log('test');
	
					convertUnits( eventtargetid );
	
				break;
	
			}
		});
	
		/*
		// Mouse Move (does not bubble like mouseenter event)
		jQuery( "body" ).on( "mousemove", function( event ) {
	
			var jQuerytargert = jQuery(event.target);
	
			var strEventtargetid = event.target.id;
			var arEventtargetid = strEventtargetid.split("-");
			var id = arEventtargetid[1];
	
			// Handle this stuff first
			// Hide any context menus if any are visible
			if ( jQuerytargert.hasClass( "button" ) === false &&  slxPanel.ContextMenu.isShowing === true ) {
	
				slxPanel.hideContextMenu();
	
			}
	
			// Now handle input
			switch ( arEventtargetid[0] ) {
	
				case "panelHeader":
	
					slxPanel.showPanelButtons( id );
	
				break;
	
			}
	
		});
		*/
	
		jQuery( document ).on( "mousemove", function( event ) {
	
			//console.log( event );
			//console.log( "event.clientX: " + event.clientX );
			//console.log( "event.clientY: " + event.clientY );
	
			var draggingPanel = Panel.draggingPanel;
	
			if ( draggingPanel !== null ) {
	
				draggingPanel.htmlElement.setAttribute( "style",
					"left: " + event.clientX + "px;" +
					"top: " + event.clientY + "px;"
				);
	
			}
	
			if ( Bay.nowResizing !== undefined ) {
	
				event.preventDefault(); // Prevent text selection and dragging
	
				Bay.nowResizing.resize( event.clientX, event.clientY );
	
			}
	
			var strEventtargetid = event.target.id;
			var arEventtargetid = strEventtargetid.split("-");
	
		});
	
		jQuery( document ).on( "mousedown", function( event ) {
	
			console.log( event );
	
			Input.mousedownTimestamp = performance.now();
			Input.isMousedown = true;
			Input.mousedownClientX = event.clientX;
			Input.mousedownClientY = event.clientY;
	
			console.log( "Input.mousedownClientX: " + Input.mousedownClientX );
			console.log( "Input.mousedownClientY: " + Input.mousedownClientY );
	
			var strEventtargetid = event.target.id;
			var arEventtargetid = strEventtargetid.split("-");
	
			// If left mouse button is down
			if ( event.button === 0 ) { 
	
					console.log( arEventtargetid[0] );
	
				switch ( arEventtargetid[0] ) {
	
					// Handle Resize Buttons
	
					case "_2":
					case "_3":
					case "_4":
					case "_5":
					case "_6":
					case "_7":
					case "_8":
					case "_9":
	
						event.preventDefault(); // Prevent text selection and dragging
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split("-");
	
							console.log( arrElementId );
	
						switch ( arrElementId[0] ) {
	
							case "_0":
	
								var id = arrElementId[1]
	
								var resizeType = arEventtargetid[0];
	
								Bay.instancesById[ id ].initResize( resizeType );
	
							break;
	
						}
	
					break;
	
					case "_10":
					case "_11": // ensures some amount of space of the topbar is showing
	
					case "panelHeader":
	
						//event.preventDefault(); // Prevent text selection and dragging
	
					break;
		
				}
	
			}
	
		});
	
		jQuery( document ).on( "mouseup", function( event ) {
	
			console.log( event );
	
			Input.mouseupTimestamp = performance.now();
			Input.isMouseDown = false;
			Input.mouseupClientX = event.clientX;
			Input.mouseupClientY = event.clientY;
	
			if ( Bay.nowResizing !== undefined ) {
	
				Bay.nowResizing.finishResizing();
	
			}
	
			console.log( "mouseup delta: " + ( Input.mouseupTimestamp - Input.mousedownTimestamp ) );
	
			var strEventtargetid = event.target.id;
			var arEventtargetid = strEventtargetid.split("-");
	
			// If left mouse button is up
			if ( event.button === 1 ) {
	
				switch ( arEventtargetid[0] ) {
	
					case "div":
	
						case "panel":
	
						break;
	
					break;
	
					case "panelHeader":
	
							console.log( Input.mouseupTimestamp - Input.mousedownTimestamp );
	
						if ( ( Input.mouseupTimestamp - Input.mousedownTimestamp ) < 200 ) { // if less than 100 ms has elapsed
	
							var id = arEventtargetid[ 1 ];
	
								console.log( "id: " + id );
	
								console.log( Panel.byId[ id ] );
	
							Panel.byId[ id ].cycleDisplay();
	
						} else {
	
							if  ( Panel.isDraggable === true ) {
	
								var id = arEventtargetid[ 1 ];
	
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
	
			var strEventtargetid = event.target.id;
			var arEventtargetid = strEventtargetid.split("-");
	
			if ( arEventtargetid[0] === "Slx" ) {
	
				switch ( arEventtargetid[1] ) {
	
					case "menu":
	
						document.getElementById( "panelscontainer" ).innerHTML = "";
						Panel.unloadAll();
	
						var panelType = arEventtargetid[ 2 ];
	
						Panel.initialize();
						Panel.loadAllOfType( panelType );
						Panel.displayAll( jQuery( "div#panelscontainer" ) );
	
					break;
	
					case "setting":
	
						var setting = arEventtargetid[ 2 ];
	
						Panel.makeAllDraggable();
	
					break;
	
				}
	
			}
	
			switch ( arEventtargetid[0] ) {
	
				// Handle Close Buttons
	
				case "_12":
	
					var element = event.target.parentNode.parentNode;
	
						console.log( element );
	
					var arrElementId = element.id.split("-");
	
						console.log( arrElementId );
	
					switch ( arrElementId[0] ) {
	
						case "_0":
	
							var id = arrElementId[1]
	
							Bay.instancesById[ id ].close();
	
						break;
	
					}
	
				break;
	
			}
	
		});
	
		// Mouse Double Click
		jQuery( document ).on( "dblclick", function( event ) {
	
			var strEventtargetid = event.target.id;
			var arEventtargetid = strEventtargetid.split("-");
	
			switch ( arEventtargetid[0] ) {
	
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
						<th id='menu-UnitsOfMeasurement'>Units of Measurement</th>\
						<th id='menu-Chemistry'>Chemistry</th>\
						<th id='menu-AssemblyLanguage'>Assembly Language</th>\
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
		
		document.getElementById( "panelscontainer" ).innerHTML = "";
	
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
	Panel.convertUnits = function( eventtargetid ) {
	
		var strInputValue = jQuery( "input#" + eventtargetid ).val();
	
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
		
		Bay: Bay,
		
		Panel: Panel,
		
		Input: Input,
		
		//Menu: Menu,
		
		//ViewPort: ViewPort
		
	}

}());