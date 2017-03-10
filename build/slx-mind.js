// Version 0.1

var Slx = (function() {

	// Globals
	
	// Variables
	var zIndexHigh = 0;
	var mainLoopStart = undefined; // will be Performance.now() when mainLoop is initialized
	var tick20Hz = 50; // (ms)
	var last20HzTick = undefined; // (ms)
	// End Variables
	
	// Functions
	/**
	* @author spencel / https://github.com/spencel
	*/
	
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
	
	function startMainLoop() {
	
		var timestamp = performance.now(); // ms
	
		last20HzTick = timestamp; // ms
	
		mainLoop( timestamp );
	
	}
	
	function mainLoop( timestamp ) {
	
		var deltaT = performance.now() - timestamp; // ms
	
		if ( ( timestamp - last20HzTick ) > ( 20 * tick20Hz ) ) {
	
			last20HzTick = timestamp;
	
			///document.getElementById( "fps" ).textContent = 1000 / deltaT;
														// ms/s *   1/ms
		}
	
		window.requestAnimationFrame( mainLoop );
	
	}
	// End Functions
	
	// End Globals
	
	// Classes
	
	/**
	* @author spencel / https://github.com/spencel
	*/
	
	// Version 0.4
	
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
		this.previousLeft = left;
	
		this.top = top; // Of root element
		this.previousTop = top;
	
		this.width = width; // Of root element
		this.previousWidth = width;
	
		this.height = height; // Of root element
		this.previousHeight = height;
	
		this.currentlyDockedAt = undefined;
	
		this.isHtml = false; // Set after its html is injected into the document
	
		this.rootHtmlElement = undefined;
	
		this.contentHtmlElement = undefined;
	
		this.resizeDirection = undefined; // A string constant that indicates the resize type, e.g., top, bottom right, mirrored, etc.
	
		this.previousDockZone = undefined;
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
	
		console.log( "Bay.prototype.toggleHtml()" );
		
		if ( this.isHtml === false ) {
	
			var element = document.createElement( "div" );
			this.rootHtmlElement = element;
			element.id = "_0-" + this.id;
			element.className = "_0";
			element.style.left = this.left + "px";
			element.style.top = this.top + "px";
			element.style.width = ( this.width - Bay.borderWidthX2 ) + "px"; // 
			element.style.height = ( this.height - Bay.borderWidthX2 ) + "px"; // 
			focus( element );
	
			document.body.appendChild( element );
	
			/*var elementChild = document.createElement( "div" );
			elementChild.id = "_1";
			element.appendChild( elementChild );
	
			var elementChildChild = document.createElement( "div" );
			elementChildChild.id = "_2";
			elementChild.appendChild( elementChildChild );
			elementChildChild = document.createElement( "div" );
			elementChildChild.id = "_3";
			elementChild.appendChild( elementChildChild );
			var text = document.createTextNode( "X" );
			elementChildChild.appendChild( text );*/
	
			var elementChild = document.createElement( "div" );
			elementChild.id = "_4";
			element.appendChild( elementChild );
	
			var elementChildChild = document.createElement( "div" );
			elementChildChild.id = "_5";
			elementChild.appendChild( elementChildChild );
	
			var elementChildChildText = document.createTextNode("JavaScript (/ˈdʒævəˌskrɪpt/[5]) is a high-level, dynamic, untyped, and interpreted programming language.[6] It has been standardized in the ECMAScript language specification.[7] Alongside HTML and CSS, it is one of the three core technologies of World Wide Web content production; the majority of websites employ it and it is supported by all modern Web browsers without plug-ins.[6] JavaScript is prototype-based with first-class functions, making it a multi-paradigm language, supporting object-oriented,[8] imperative, and functional programming styles.[6] It has an API for working with text, arrays, dates and regular expressions, but does not include any I/O, such as networking, storage, or graphics facilities, relying for these upon the host environment in which it is embedded.[7] Although there are strong outward similarities between JavaScript and Java, including language name, syntax, and respective standard libraries, the two are distinct languages and differ greatly in their design. JavaScript was influenced by programming languages such as Self and Scheme.[9] JavaScript is also used in environments that are not Web-based, such as PDF documents, site-specific browsers, and desktop widgets. Newer and faster JavaScript virtual machines (VMs) and platforms built upon them have also increased the popularity of JavaScript for server-side Web applications. On the client side, JavaScript has been traditionally implemented as an interpreted language, but more recent browsers perform just-in-time compilation. It is also used in game development, the creation of desktop and mobile applications, and server-side network programming with run-time environments such as Node.js.");
			elementChildChild.appendChild( elementChildChildText );
	
			elementChild = document.createElement( "div" );
			elementChild.id = "_0-_6-" + this.id;
			elementChild.className = "_0-_6";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_0-_7-" + this.id;
			elementChild.className = "_0-_7";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_0-_8-" + this.id;
			elementChild.className = "_0-_8";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_0-_9-" + this.id;
			elementChild.className = "_0-_9";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_0-_10-" + this.id;
			elementChild.className = "_0-_10";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_0-_11-" + this.id;
			elementChild.className = "_0-_11";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_0-_12-" + this.id;
			elementChild.className = "_0-_12";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_0-_13-" + this.id;
			elementChild.className = "_0-_13";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "_0-_2-" + this.id;
			elementChild.className = "_0-_2";
			element.appendChild( elementChild );
	
	
			this.contentHtmlElement = element.childNodes[ 9 ];
	
				console.log( this.contentHtmlElement );
	
			this.isHtml = true;
	
		} else {
	
			document.getElementById( "_14-" + this.id ).outerHTML = "";
	
			this.isHtml = false;
	
		}
	
	}
	
	Bay.eventHandler = function( event, arEvent_target_id ) {
		console.log( "Bay.eventHandler( event, arEvent_target_id )" );
	
		switch ( arEvent_target_id[ 1 ] ) {
	
			case "_6":
			case "_7":
			case "_8":
			case "_9":
			case "_10":
			case "_11":
			case "_12":
			case "_13":
	
				// Left Mousedown
				if ( event.button === 0 ) {
					Bay.handleResize( event, arEvent_target_id );
	
				// Right Mousedown
				} else if ( event.type === "contextmenu" ) {
					Bay.handleContextMenu( event, arEvent_target_id );
				}
	
			break;
			case "_2":
	
				// Left Mousedown
				if ( event.button === 0 ) {
					Bay.handleDrag( event, arEvent_target_id );
	
				// Right Mousedown
				} else if ( event.button === "contextmenu" ) {
					Bay.handleContextMenu( event, arEvent_target_id );
				}
	
			break;
	
		}
	
	}
	
	Bay.handleContextMenu = function( event, arEvent_target_id ) {
		console.log( "Bay.handleContextMenu( event, arEvent_target_id )" );
		console.log( event );
	
		event.preventDefault();
		window.event.returnValue = false;
	
		var svgElement = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );
		svgElement.id = "_15";
		document.body.appendChild( svgElement );
	
		focus( svgElement );
	
		var circleElement = document.createElementNS( "http://www.w3.org/2000/svg", "circle" );
		circleElement.setAttribute( "cx", event.clientX );
		circleElement.setAttribute( "cy", event.clientY );
		circleElement.setAttribute( "r", 10 );
		circleElement.setAttribute( "fill", "white");
		circleElement.setAttribute( "stroke", "black");
		circleElement.setAttribute( "stroke-width", 1);
		document.getElementById( "_15" ).appendChild( circleElement );
	
		//var ring1
	
	
	
	}
	
	Bay.handleResize = function ( event, arEvent_target_id ) {
	
		console.log( "Bay.handleResize( event, arEvent_target_id )" );
	
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
	
		console.log( "Bay.initializeResize( arEvent_target_id )" );
	
		var resizeDirection = arEvent_target_id[ 1 ]
		var instanceId = arEvent_target_id[ 2 ]
		var instance = this.instancesById[ instanceId ];
		this.currentlyResizingInstance = instance;
		focus( instance.rootHtmlElement ); // Bring it to the front of the view
		instance.resizeDirection = resizeDirection;
		Input.userIs = "_16";
	
		// Check if it should be undocked
		instance.previousDockZone = instance.currentlyDockedAt;
		switch ( instance.currentlyDockedAt ) {
			case "_17":
				switch ( instance.resizeDirection ) {
					case "_6": 			instance.currentlyDockedAt = "_18"; break;
					case "_7": 		instance.currentlyDockedAt = "_19"; break;
					case "_8": 		instance.currentlyDockedAt = "_20"; break;
					case "_9": 	instance.currentlyDockedAt = "_21"; break;
					case "_10": 		instance.currentlyDockedAt = "_22"; break;
					case "_11": 	instance.currentlyDockedAt = "_21"; break;
					case "_12": 			instance.currentlyDockedAt = "_23"; break;
					case "_13": 		instance.currentlyDockedAt = "_24"; break;
				}
			break;
			case "_22":
				switch ( instance.resizeDirection ) {
					case "_6": 			instance.currentlyDockedAt = undefined; break;
					case "_7": 		instance.currentlyDockedAt = undefined; break;
					case "_8": 		instance.currentlyDockedAt = "_21"; break;
					case "_9": 	instance.currentlyDockedAt = "_21"; break;
					case "_10": 			break;
					case "_11": 	instance.currentlyDockedAt = "_25"; break;
					case "_12": 			instance.currentlyDockedAt = "_25"; break;
					case "_13": 		instance.currentlyDockedAt = undefined; break;
				}
			break;
			case "_25":
				switch ( instance.resizeDirection ) {
					case "_6": 			instance.currentlyDockedAt = undefined; break;
					case "_7": 		instance.currentlyDockedAt = undefined; break;
					case "_8": 		instance.currentlyDockedAt = undefined; break;
					case "_9": 	instance.currentlyDockedAt = undefined; break;
					case "_10": 		break;
					case "_11": 	break;
					case "_12": 			break;
					case "_13": 		instance.currentlyDockedAt = undefined; break;
				}
			break;
			case "_23":
				switch ( instance.resizeDirection ) {
					case "_6": 			instance.currentlyDockedAt = "_24"; break;
					case "_7": 		instance.currentlyDockedAt = undefined; break;
					case "_8": 		instance.currentlyDockedAt = undefined; break;
					case "_9": 	instance.currentlyDockedAt = undefined; break;
					case "_10": 		instance.currentlyDockedAt = "_25"; break;
					case "_11": 	instance.currentlyDockedAt = "_25"; break;
					case "_12": 			break;
					case "_13": 		instance.currentlyDockedAt = "_24"; break;
				}
			break;
			case "_24":
				switch ( instance.resizeDirection ) {
					case "_6": 			break;
					case "_7": 		instance.currentlyDockedAt = undefined; break;
					case "_8": 		instance.currentlyDockedAt = undefined; break;
					case "_9": 	instance.currentlyDockedAt = undefined; break;
					case "_10": 		instance.currentlyDockedAt = undefined; break;
					case "_11": 	instance.currentlyDockedAt = undefined; break;
					case "_12": 			break;
					case "_13": 		break;
				}
			break;
			case "_18":
				switch ( instance.resizeDirection ) {
					case "_6": 			break;
					case "_7": 		instance.currentlyDockedAt = "_19"; break;
					case "_8": 		instance.currentlyDockedAt = "_19"; break;
					case "_9": 	instance.currentlyDockedAt = undefined; break;
					case "_10": 		instance.currentlyDockedAt = undefined; break;
					case "_11": 	instance.currentlyDockedAt = undefined; break;
					case "_12": 			instance.currentlyDockedAt = "_24"; break;
					case "_13": 		instance.currentlyDockedAt = "_24"; break;
				}
			break;
			case "_19":
				switch ( instance.resizeDirection ) {
					case "_6": 			break;
					case "_7": 		break;
					case "_8": 		break;
					case "_9": 	instance.currentlyDockedAt = undefined; break;
					case "_10": 		instance.currentlyDockedAt = undefined; break;
					case "_11": 	instance.currentlyDockedAt = undefined; break;
					case "_12": 			instance.currentlyDockedAt = undefined; break;
					case "_13": 		instance.currentlyDockedAt = undefined; break;
				}
			break;
			case "_20":
				switch ( instance.resizeDirection ) {
					case "_6": 			instance.currentlyDockedAt = "_19"; break;
					case "_7": 		instance.currentlyDockedAt = "_19"; break;
					case "_8": 		break;
					case "_9": 	instance.currentlyDockedAt = "_21"; break;
					case "_10": 		instance.currentlyDockedAt = "_21";break;
					case "_11": 	instance.currentlyDockedAt = undefined; break;
					case "_12": 			instance.currentlyDockedAt = undefined; break;
					case "_13": 		instance.currentlyDockedAt = undefined; break;
				}
			break;
			case "_21":
				switch ( instance.resizeDirection ) {
					case "_6": 			instance.currentlyDockedAt = undefined; break;
					case "_7": 		instance.currentlyDockedAt = undefined; break;
					case "_8": 		break;
					case "_9": 	break;
					case "_10": 		break;
					case "_11": 	instance.currentlyDockedAt = undefined; break;
					case "_12": 			instance.currentlyDockedAt = undefined; break;
					case "_13": 		instance.currentlyDockedAt = undefined; break;
				}
			break;
		}
	
		console.log( "instance.resizeDirection: " + instance.resizeDirection );
	
	}
	
	Bay.prototype.resize = function( left, top ) {
	
		console.log( "Bay.prototype.resize( left, top )" );
	
	
		switch ( this.resizeDirection ) {
	
			case "_6":
	
				//console.log( "resizeTop" );
	
				// Change root top and content height
				this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
				this.rootHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "_7":
	
				// Change root top and content width and height
				this.rootHtmlElement.style.top =  ( this.top - Input.mousedownClientY + top ) + "px";
				this.rootHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.borderWidthX2 ) + "px";
				this.rootHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "_8":
	
	
	
				// Change content width
				// 							  58 =           60         
				this.rootHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.borderWidthX2 ) + "px";
				
			break;
	
			case "_9":
	
				// Change content width and height
				this.rootHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.borderWidthX2 ) + "px";
				this.rootHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "_10":
	
				// Change content height
				this.rootHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "_11":
	
				// Change root left and content width and height
				this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
				this.rootHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.borderWidthX2 ) + "px";
				this.rootHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "_12":
	
				// Change root left and content width
				this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
				this.rootHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "_13":
	
				// Change root left and top and content width and height
				this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
				this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
				this.rootHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.borderWidthX2 ) + "px";
				this.rootHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.borderWidthX2 ) + "px";
	
			break;
	
		}
	
		// This could be optimized - common code in Bay.prototype.drag()
		if ( left < SlxDocument.dockZoneWidth ) {
	
			if ( top < SlxDocument.dockZoneWidth ) {
	
				// Top Left
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock top left" );
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "_21";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {
	
				// Bottom Left
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock bottom left" );
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "_19";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else {
	
				// Left
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock left" );
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "_20";
	
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
	
				Bay.cursorCurrentlyInDockZone = "_25";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {
	
				// Bottom Right
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock bottom right" );
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "_24";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else {
	
				// Right
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock right" );
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "_23";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			}
	
		} else if ( top < SlxDocument.dockZoneWidth ) {
	
			// Top
	
			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
			}
	
			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
			Bay.cursorCurrentlyInDockZone = "_22";
	
			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
		} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ){
	
			// Bottom
	
			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
			}
	
			console.log( "dock bottom" );
	
			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
			Bay.cursorCurrentlyInDockZone = "_18";
	
			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
		} else if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null; // removes a style from element
	
			SlxDocument.objectInDockZone = undefined;
	
			Bay.cursorCurrentlyInDockZone = undefined;
	
		}
	
	}
	
	Bay.prototype.finishResizing = function() {
		console.log( "Bay.prototype.finishResizing()" );
		console.log( "this.resizeDirection: " + this.resizeDirection);
		console.log( "this.top: " + this.top );
	
		// Quick Mouse Up
		console.log( "if ( Input.isMouseupQuick→" + Input.isMouseupQuick() + " === true )" );
		if ( Input.isMouseupQuick() === true ) {
	
			this.handleDocking( "_26" );
	
		// Not A Quick Mouse Up
		// Handle docking
		} else if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
			this.handleDocking( "_27" );
	
		// No docking
		} else {
	
			this.left = parseInt( this.rootHtmlElement.style.left );
			this.top = parseInt( this.rootHtmlElement.style.top );
			this.width = this.rootHtmlElement.offsetWidth; // offsetWidth includes border
			this.height = this.rootHtmlElement.offsetHeight; // offsetWidth includes border
			this.saveCurrentDimensions();
	
		}
	
		Bay.currentlyResizingInstance = undefined;
		this.resizeDirection = undefined;
		Input.userIs = undefined;
	
	}
	
	Bay.handleDrag = function( event, arEvent_target_id ) {
	
		console.log( "Bay.handleDrag( event, arEvent_target_id )" );
	
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
		console.log( "Bay.initializeDrag( instanceId )" );
	
		var instance = this.instancesById[ instanceId ];
		this.currentlyDraggingInstance = instance;
		instance.previousDockZone = instance.currentlyDockedAt;
		focus( this.currentlyDraggingInstance.rootHtmlElement ); // Bring it to the front of the view
		Input.userIs = "_28";
	
	}
	
	Bay.prototype.drag = function( left, top ) {
		console.log( "Bay.prototype.drag( left, top )" );
	
		console.log( this );
		this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
		this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
	
		// This could be optimized - common code in Bay.prototype.resize()
		if ( left < SlxDocument.dockZoneWidth ) {
	
			if ( top < SlxDocument.dockZoneWidth ) {
	
				// Top Left
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "_21";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {
	
				// Bottom Left
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "_19";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else {
	
				// Left
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "_20";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			}
	
		} else if ( left > ( window.innerWidth - SlxDocument.dockZoneWidth ) ) {
	
			if ( top < SlxDocument.dockZoneWidth ) {
	
				// Top Right
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "_25";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {
	
				// Bottom Right
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "_24";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else {
	
				// Right
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "_23";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			}
	
		} else if ( left > ( SlxDocument.fullScreenZoneStart * window.innerWidth ) && left < ( SlxDocument.fullScreenZoneEnd * window.innerWidth ) && top < SlxDocument.dockZoneWidth ) {
	
			// Fullscreen
	
			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
			}
	
			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
			Bay.cursorCurrentlyInDockZone = "_17";
	
			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
		} else if ( top < SlxDocument.dockZoneWidth ) {
	
			// Top
	
			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
			}
	
			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
			Bay.cursorCurrentlyInDockZone = "_22";
	
			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
		} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ){
	
			// Bottom
	
			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
			}
	
			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
			Bay.cursorCurrentlyInDockZone = "_18";
	
			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
		} else if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null; // removes a style from element
	
			SlxDocument.objectInDockZone = undefined;
	
			Bay.cursorCurrentlyInDockZone = undefined;
	
		}
		
	}
	
	Bay.prototype.finishDragging = function( left, top ) {
		console.log( "Bay.prototype.finishDragging( left, top )" );
	
		// Quick mouse up means it should fullscreen
		console.log( "if ( Input.isMouseupQuick()→" + Input.isMouseupQuick() + " === true )" );
		if ( Input.isMouseupQuick() === true ) {
	
			this.handleDocking( "_29" );
	
		// Handle docking
		} else if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
			this.handleDocking( "_30" );
	
		} else {
	
			this.left = parseInt( this.rootHtmlElement.style.left );
			this.top = parseInt( this.rootHtmlElement.style.top );
			this.saveCurrentDimensions();
	
		}
	
		Bay.cursorCurrentlyInDockZone = undefined;
		SlxDocument.objectInDockZone = undefined;
		Input.userIs = undefined;
		Bay.currentlyDraggingInstance = undefined;
	
	}
	
	Bay.prototype.handleDocking = function( mode ) {
		console.log( "Bay.prototype.handleDocking( mode→\"" + mode + "\")" );
	
		var dockZone = undefined;
	
		// Determine Mode
		switch ( mode ) {
	
			// Determine dockzone of bay that is currently being dragged
			case "_29": 
	
				dockZone = "_17";
				this.toggleDock( dockZone, true );
	
			break;
	
			// Determine dockzone of bay being dragged into a dockzone
			case "_30":
	
				dockZone = Bay.cursorCurrentlyInDockZone;
				this.dock( dockZone, true );
	
			break;
	
			// Determine dockzone of bay that is currently being resized
			case "_26": 
	
				switch ( this.resizeDirection ) {
	
					case "_6":
						dockZone = "_22";		
					break;
					case "_7":
						dockZone = "_25";
					break;
					case "_8":
						dockZone = "_23";
					break;
					case "_9":
						dockZone = "_24";
					break;
					case "_10":
						dockZone = "_18";
					break;
					case "_11":
						dockZone = "_19";
					break;
					case "_12":
						dockZone = "_20";
					break;
					case "_13":
						dockZone = "_21";
					break;
	
				}
	
				// Toggle docking
				this.toggleDock( dockZone, true );
	
			break;
	
			// Determine quasi-dockzone (position is saved and dockzone is not set) from dragging one of the resize handles
			case "_27":
	
				dockZone = Bay.cursorCurrentlyInDockZone;
				this.dock( dockZone, false );
	
			break;
	
		}
	
		if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
		}	
	
	}
	
	Bay.prototype.toggleDock = function( dockZone, isFill ) {
		console.log( "Bay.prototype.toggleDock( dockZone→\"" + dockZone + "\" )" );
	
		// Undock and restore previous dimensions
		console.log( "if ( dockZone→\""+ dockZone +"\" === \""+ this.previousDockZone +"\"←this.previousDockZone )" );
		if ( dockZone !=  undefined && dockZone === this.previousDockZone ) {
	
			this.undockAndRestorePreviousDimensions();
	
		// Dock
		} else {
	
			this.dock( dockZone, isFill );
	
		}
	
	}
	
	Bay.prototype.dock = function ( dockZone, isFill ) {
		console.log( "Bay.prototype.dock( dockZone→\"" + dockZone + "\" )" );
	
		// Handle docking
		switch ( dockZone ) {
	
			case "_17":
	
				if ( isFill === true ) {
	
					this.setDimensions( 
						0,
						0,
						window.innerWidth,
						window.innerHeight
					)
	
				}			
	
			break;
	
			case "_22":
	
				if ( isFill === true ) {
	
					this.setDimensions(
						0,
						0,
						window.innerWidth,
						window.innerHeight / 2
					)
	
				} else {
	
					this.setHeight( this.height + this.top );
					this.setTop( 0 );				
	
				}
				
			break;
	
			case "_25":
	
				if ( isFill === true ) {
	
					this.setDimensions(
						window.innerWidth / 2,
						0,
						window.innerWidth / 2,
						window.innerHeight / 2
					)
	
				} else {
	
					this.setWidth( window.innerWidth - this.left );
					this.setHeight( this.height + this.top );
					this.setTop( 0 );
	
				}
	
			break;
	
			case "_23":
	
				if ( isFill === true ) {
	
					this.setDimensions(
						window.innerWidth / 2,
						0,
						window.innerWidth / 2,
						window.innerHeight
					)
	
				} else {
	
					this.setWidth( window.innerWidth - this.left );
	
				}
	
			break;
	
			case "_24":
	
				if ( isFill === true ) {
	
					this.setDimensions(
						window.innerWidth / 2,
						window.innerHeight / 2,
						window.innerWidth / 2,
						window.innerHeight / 2
					)
	
				} else {
	
					this.setWidth( window.innerWidth - this.left );
					this.setHeight( window.innerHeight - this.top );
	
				}
	
			break;
	
			case "_18":
	
				if ( isFill === true ) {
	
					this.setDimensions(
						0,
						window.innerHeight / 2,
						window.innerWidth,
						window.innerHeight / 2
					)
	
				} else {
	
					this.setHeight( window.innerHeight - this.top );
	
				}
	
			break;
	
			case "_19":
	
				if ( isFill === true ) {
	
					this.setDimensions(
						0,
						window.innerHeight / 2,
						window.innerWidth / 2,
						window.innerHeight / 2
					)
	
				} else {
	
					this.setWidth( this.width + this.left )
					this.setHeight( window.innerHeight - this.top );
					this.setLeft( 0 );
	
				}
	
			break;
	
			case "_20":
	
				if ( isFill === true ) {
	
					this.setDimensions(
						0,
						0,
						window.innerWidth / 2,
						window.innerHeight
					)
	
				} else {
	
					this.setWidth( this.width + this.left )
					this.setLeft( 0 );
	
				}
				
			break;
	
			case "_21":
	
				if ( isFill === true ) {
	
					this.setDimensions(
						0,
						0,
						window.innerWidth / 2,
						window.innerHeight / 2
					)
	
				} else {
	
					this.setDimensions(
						0,
						0,
						this.width + this.left,
						this.height + this.top
					)
	
				}
				
			break;
	
		}
	
		this.currentlyDockedAt = dockZone;
		console.log( "this.currentlyDockedAt: " + this.currentlyDockedAt );
	
	}
	
	Bay.prototype.saveCurrentDimensions = function () {
		console.log( "Bay.prototype.saveCurrentDimensions()" );
	
		this.previousLeft = this.left;
		this.previousTop = this.top;
		this.previousWidth = this.width;
		this.previousHeight = this.height;
	
	}
	
	Bay.prototype.undockAndRestorePreviousDimensions = function() {
	
		console.log( "Bay.prototype.undockAndRestorePreviousDimensions()" );
	
		// Change root left and top and content width and height
		this.left = this.previousLeft;
		this.rootHtmlElement.style.left = ( this.previousLeft ) + "px";
		this.top = this.previousTop;
		this.rootHtmlElement.style.top = ( this.previousTop ) + "px";
		this.width = this.previousWidth;
		this.rootHtmlElement.style.width = ( this.previousWidth - Bay.borderWidthX2 ) + "px";
		this.height = this.previousHeight;
		this.rootHtmlElement.style.height = ( this.previousHeight - Bay.borderWidthX2 ) + "px";
	
		this.currentlyDockedAt = undefined;
	
	}
	
	Bay.prototype.setLeft = function( left ) {
	
		this.rootHtmlElement.style.left = left + "px";
		this.left = left;
	
	}
	
	Bay.prototype.setTop = function( top ) {
	
		this.rootHtmlElement.style.top = top + "px";
		this.top = top;
	
	}
	
	Bay.prototype.setWidth = function( width ) {
	
		this.rootHtmlElement.style.width = ( width - Bay.borderWidthX2 ) + "px";
		this.width = width;
	
	}
	
	Bay.prototype.setHeight = function( height ) {
	
		this.rootHtmlElement.style.height = ( height - Bay.borderWidthX2 ) + "px";
		this.height = height;
	
	}
	
	Bay.prototype.setDimensions = function( left, top, width, height) {
	
		this.setLeft( left );
		this.setTop( top );
		this.setWidth( width );
		this.setHeight( height );
	
	}
	
	Bay.prototype.close = function () {
	
		console.log( "Bay.prototype.close()" );
	
		console.log( this.id )
	
		document.getElementById( "_14-" + this.id ).outerHTML = "";
	
		Bay.destroy( this.id );
	
	}
	// End Methods
	
	// End Bay Class
		
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
	
				case "_16":
	
					Bay.handleResize( event );
	
				break;
	
				case "_28":
	
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
	
						case "_0":
	
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
	
				case "_16":
	
					Bay.handleResize( event );
	
				break;
	
				case "_28":
	
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
	
						case "_0": 
	
							Bay.handleQuickMouseup( arEvent_target_id );
	
						break;
	
					}
	
				// Right mouse button is up
				} else if ( event.button === 2 ) {
	
					switch ( arEvent_target_id[0] ) {
	
						// Resize Handles become Open Menu button on right click
						case "_6":
						case "_7":
						case "_8":
						case "_9":
						case "_10":
						case "_11":
						case "_12":
						case "_13":
	
						break;
	
					}
	
				}
	
			}*/
	
		};
	
		document.oncontextmenu = function( event ) {
	
			var strEvent_target_id = event.target.id;
			var arEvent_target_id = strEvent_target_id.split("-");
	
			switch ( arEvent_target_id[0] ) {
	
				case "_0":
	
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
	
				case "_3":
	
					var element = event.target.parentNode.parentNode;
	
						//console.log( element );
	
					var arrElementId = element.id.split("-");
	
						//console.log( arrElementId );
	
					switch ( arrElementId[0] ) {
	
						case "_14":
	
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
					/*case "_6":
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_28"
	
								SlxDocument.inDockZone = "_31"
	
								Bay.instancesById[ id ].finishDragging();
	
							break;
	
						}
	
					break;
	
					case "_7":
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_28"
	
								SlxDocument.inDockZone = "_25"
	
								Bay.instancesById[ id ].finishDragging();
	
							break;
	
						}
	
					break;
	
					case "_8":
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_28"
	
								SlxDocument.inDockZone = "_23"
	
								Bay.instancesById[ id ].finishDragging();
	
							break;
	
						}
	
					break;
	
					case "_9":
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_28"
	
								SlxDocument.inDockZone = "_24"
	
								Bay.instancesById[ id ].finishDragging();
	
							break;
	
						}
	
					break;
					
					case "_10":
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_28"
	
								SlxDocument.inDockZone = "_18"
	
								Bay.instancesById[ id ].finishDragging();
	
							break;
	
						}
	
					break;
					
					case "_11":
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_28"
	
								SlxDocument.inDockZone = "_19"
	
								Bay.instancesById[ id ].finishDragging();
	
							break;
	
						}
	
					break;
	
					case "_12":
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_28"
	
								SlxDocument.inDockZone = "_20"
	
								Bay.instancesById[ id ].finishDragging();
	
							break;
	
						}
	
					break;
	
					case "_13":
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_28"
	
								SlxDocument.inDockZone = "_21"
	
								Bay.instancesById[ id ].finishDragging();
	
							break;
	
						}
	
					break;*/
	
					// Resize Handles double as fullscreen button on double click
					/*case "_1": // also a drag button
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_28"
	
								SlxDocument.inDockZone = "_31"
	
								Bay.instancesById[ id ].finishDragging();
	
							break;
	
						}
	
					break;
	
					case "_2": // ensures some amount of space of the topbar is showing
	
						var element = event.target.parentNode.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_28"
	
								SlxDocument.inDockZone = "_31"
	
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
		
	// OrgChart Class
	
	// Static (aka Class) Properties
	OrgChart.nextId = 0;
	
	OrgChart.byId = {};
	
	OrgChart.quantity = 0;
	
	OrgChart.imagePath = "../test/orgChart/i/" // temporary location of image files
	// End Static Properties
	
	// Constructor
	function OrgChart() {
	
		OrgChart.byId[ OrgChart.nextId ] = this;
		OrgChart.quantity++;
	
		// Instance Properties
		this.id = OrgChart.nextId;
		OrgChart.nextId++;
		// End Instance Properties
	
		return this;
	
	}
	// End Constructor
	
	// Methods (organize methods by function and relationship)
	OrgChart.staticMethodA = function() {
	
	}
	
	OrgChart.prototype.instanceMethodA = function() {
	
	}
	// End Methods
	
	// End Class
		
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
	
		document.body.id = "_17"
	
		var element = document.createElement( "div" );
		element.id = "_22";
		element.className = "_32"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_25";
		element.className = "_32"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_23";
		element.className = "_32"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_24";
		element.className = "_32"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_18";
		element.className = "_32"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_19";
		element.className = "_32"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_20";
		element.className = "_32"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_21";
		element.className = "_32"
		document.body.appendChild( element );
	
	}
	// End Static Methods
	
	// Instance Methods
	// End Instance Methods
	
	// End SlxDocument Class
		
	// Table Class
	
	// Static (aka Class) Properties
	Table.nextId = 0;
	
	Table.byId = {};
	
	Table.quantity = 0;
	// End Static Properties
	
	// Constructor
	function Table(  ) {
	
		Table.byId[ Table.nextId ] = this;
		Table.quantity++;
	
		// Instance Properties
		this.id = Table.nextId;
		Table.nextId++;
		// End Instance Properties
	
		return this;
	
	}
	// End Constructor
	
	// Methods (organize methods by function and relationship)
	Table.staticMethodA = function() {
	
	}
	
	Table.prototype.instanceMethodA = function() {
	
	}
	// End Methods
	
	// End Class
		
	// End Classes
	
	return {
		
		startMainLoop: startMainLoop,
		
		Bay: Bay,
		
		Panel: Panel,
		
		Input: Input,
		
		SlxDocument: SlxDocument,
		
	}

}());