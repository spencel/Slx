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
	
	Bay.resizeDirection = undefined; // A string constant that indicates the resize type, e.g., top, bottom right, mirrored, etc.
	
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
		this.previousLeft = undefined;
	
		this.top = top; // Of root element
		this.previousTop = undefined;
	
		this.width = width; // Of root element
		this.previousWidth = undefined;
	
		this.height = height; // Of root element
		this.previousHeight = undefined;
	
		this.currentlyDockedAt = undefined;
	
		this.isHtml = false; // Set after its html is injected into the document
	
		this.rootHtmlElement = undefined;
	
		this.contentHtmlElement = undefined;
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
			element.id = "__Bay__-" + this.id;
			element.className = "__Bay__";
			element.style.left = this.left + "px";
			element.style.top = this.top + "px";
			element.style.width = ( this.width - Bay.borderWidthX2 ) + "px"; // 
			element.style.height = ( this.height - Bay.borderWidthX2 ) + "px"; // 
			focus( element );
	
			document.body.appendChild( element );
	
			/*var elementChild = document.createElement( "div" );
			elementChild.id = "__topBar__";
			element.appendChild( elementChild );
	
			var elementChildChild = document.createElement( "div" );
			elementChildChild.id = "__drag__";
			elementChild.appendChild( elementChildChild );
			elementChildChild = document.createElement( "div" );
			elementChildChild.id = "__close__";
			elementChild.appendChild( elementChildChild );
			var text = document.createTextNode( "X" );
			elementChildChild.appendChild( text );*/
	
			var elementChild = document.createElement( "div" );
			elementChild.id = "__overflowHidden__";
			element.appendChild( elementChild );
	
			var elementChildChild = document.createElement( "div" );
			elementChildChild.id = "__content__";
			elementChild.appendChild( elementChildChild );
	
			var elementChildChildText = document.createTextNode("JavaScript (/ˈdʒævəˌskrɪpt/[5]) is a high-level, dynamic, untyped, and interpreted programming language.[6] It has been standardized in the ECMAScript language specification.[7] Alongside HTML and CSS, it is one of the three core technologies of World Wide Web content production; the majority of websites employ it and it is supported by all modern Web browsers without plug-ins.[6] JavaScript is prototype-based with first-class functions, making it a multi-paradigm language, supporting object-oriented,[8] imperative, and functional programming styles.[6] It has an API for working with text, arrays, dates and regular expressions, but does not include any I/O, such as networking, storage, or graphics facilities, relying for these upon the host environment in which it is embedded.[7] Although there are strong outward similarities between JavaScript and Java, including language name, syntax, and respective standard libraries, the two are distinct languages and differ greatly in their design. JavaScript was influenced by programming languages such as Self and Scheme.[9] JavaScript is also used in environments that are not Web-based, such as PDF documents, site-specific browsers, and desktop widgets. Newer and faster JavaScript virtual machines (VMs) and platforms built upon them have also increased the popularity of JavaScript for server-side Web applications. On the client side, JavaScript has been traditionally implemented as an interpreted language, but more recent browsers perform just-in-time compilation. It is also used in game development, the creation of desktop and mobile applications, and server-side network programming with run-time environments such as Node.js.");
			elementChildChild.appendChild( elementChildChildText );
	
			elementChild = document.createElement( "div" );
			elementChild.id = "__Bay__-__resizeTop__-" + this.id;
			elementChild.className = "__Bay__-__resizeTop__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__Bay__-__resizeTopRight__-" + this.id;
			elementChild.className = "__Bay__-__resizeTopRight__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__Bay__-__resizeRight__-" + this.id;
			elementChild.className = "__Bay__-__resizeRight__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__Bay__-__resizeBottomRight__-" + this.id;
			elementChild.className = "__Bay__-__resizeBottomRight__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__Bay__-__resizeBottom__-" + this.id;
			elementChild.className = "__Bay__-__resizeBottom__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__Bay__-__resizeBottomLeft__-" + this.id;
			elementChild.className = "__Bay__-__resizeBottomLeft__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__Bay__-__resizeLeft__-" + this.id;
			elementChild.className = "__Bay__-__resizeLeft__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__Bay__-__resizeTopLeft__-" + this.id;
			elementChild.className = "__Bay__-__resizeTopLeft__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__Bay__-__drag__-" + this.id;
			elementChild.className = "__Bay__-__drag__";
			element.appendChild( elementChild );
	
	
			this.contentHtmlElement = element.childNodes[ 9 ];
	
				console.log( this.contentHtmlElement );
	
			this.isHtml = true;
	
		} else {
	
			document.getElementById( "__SlxBay__-" + this.id ).outerHTML = "";
	
			this.isHtml = false;
	
		}
	
	}
	
	Bay.eventHandler = function( event, arEvent_target_id ) {
	
		console.log( "Bay.eventHandler( event, arEvent_target_id )" );
	
		switch ( arEvent_target_id[ 1 ] ) {
	
			case "__resizeTop__":
			case "__resizeTopRight__":
			case "__resizeRight__":
			case "__resizeBottomRight__":
			case "__resizeBottom__":
			case "__resizeBottomLeft__":
			case "__resizeLeft__":
			case "__resizeTopLeft__":
	
				Bay.handleResize( event, arEvent_target_id );
	
			break;
			case "__drag__":
	
				Bay.handleDrag( event, arEvent_target_id );
	
			break;
	
		}
	
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
		this.currentlyResizingInstance = this.instancesById[ instanceId ];
		focus( this.currentlyResizingInstance.rootHtmlElement ); // Bring it to the front of the view
		this.resizeDirection = resizeDirection;
		Input.userIs = "__RESIZING_BAY__";
	
		console.log( "Bay.resizeDirection: " + Bay.resizeDirection );
	
	}
	
	Bay.prototype.resize = function( left, top ) {
	
		console.log( "Bay.prototype.resize( left, top )" );
	
		switch ( this.currentlyDockedAt ) {
			case "__SlxDocumentFullScreenDockZone__":
				switch ( Bay.resizeDirection ) {
					case "__resizeTop__": this.currentlyDockedAt = "__SlxDocumentBottomDockZone__"; break;
					case "__resizeTopRight__": this.currentlyDockedAt = "__SlxDocumentBottomLeftDockZone__"; break;
					case "__resizeRight__": this.currentlyDockedAt = "__SlxDocumentLeftDockZone__"; break;
					case "__resizeBottomRight__": this.currentlyDockedAt = "__SlxDocumentTopLeftDockZone__"; break;
					case "__resizeBottom__": this.currentlyDockedAt = "__SlxDocumentTopDockZone__"; break;
					case "__resizeBottomLeft__": this.currentlyDockedAt = "__SlxDocumentTopLeftDockZone__"; break;
					case "__resizeLeft__": this.currentlyDockedAt = "__SlxDocumentRightDockZone__"; break;
					case "__resizeTopLeft__": this.currentlyDockedAt = "__SlxDocumentBottomRightDockZone__"; break;
				}
			break;
			case "__SlxDocumentTopDockZone__":
				switch ( Bay.resizeDirection ) {
					case "__resizeRight__":
					case "__resizeBottomRight__": this.currentlyDockedAt = "__SlxDocumentTopLeftDockZone__"; break;
					case "__resizeBottom": break;
					case "__resizeBottomLeft__":
					case "__resizeLeft__": this.currentlyDockedAt = "__SlxDocumentTopRightDockZone__"; break;
					default: this.currentlyDockedAt = undefined;
				}
			break;
			case "__SlxDocumentTopRightDockZone__":
			break;
			case "__SlxDocumentRightDockZone__":
			break;
			case "__SlxDocumentBottomRightDockZone__":
			break;
			case "__SlxDocumentBottomDockZone__":
			break;
			case "__SlxDocumentBottomLeftDockZone__":
			break;
			case "__SlxDocumentLeftDockZone__":
			break;
			case "__SlxDocumentTopLeftDockZone__":
			break;
		}
	
		switch ( Bay.resizeDirection ) {
	
			case "__resizeTop__":
	
				//console.log( "resizeTop" );
	
				// Change root top and content height
				this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
				this.rootHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "__resizeTopRight__":
	
				// Change root top and content width and height
				this.rootHtmlElement.style.top =  ( this.top - Input.mousedownClientY + top ) + "px";
				this.rootHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.borderWidthX2 ) + "px";
				this.rootHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "__resizeRight__":
	
	
	
				// Change content width
				// 							  58 =           60         
				this.rootHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.borderWidthX2 ) + "px";
				
			break;
	
			case "__resizeBottomRight__":
	
				// Change content width and height
				this.rootHtmlElement.style.width = ( this.width - Input.mousedownClientX + left - Bay.borderWidthX2 ) + "px";
				this.rootHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "__resizeBottom__":
	
				// Change content height
				this.rootHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "__resizeBottomLeft__":
	
				// Change root left and content width and height
				this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
				this.rootHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.borderWidthX2 ) + "px";
				this.rootHtmlElement.style.height = ( this.height - Input.mousedownClientY + top - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "__resizeLeft__":
	
				// Change root left and content width
				this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
				this.rootHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.borderWidthX2 ) + "px";
	
			break;
	
			case "__resizeTopLeft__":
	
				// Change root left and top and content width and height
				this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
				this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
				this.rootHtmlElement.style.width = ( this.width + Input.mousedownClientX - left - Bay.borderWidthX2 ) + "px";
				this.rootHtmlElement.style.height = ( this.height + Input.mousedownClientY - top - Bay.borderWidthX2 ) + "px";
	
			break;
	
		}
	
	}
	
	Bay.prototype.finishResizing = function() {
		console.log( "Bay.prototype.finishResizing()" );
		console.log( "Bay.resizeDirection: " + Bay.resizeDirection);
	
		// Quick Mouse Up
		console.log( "if ( Input.isMouseupQuick→" + Input.isMouseupQuick() + " === true )" );
		if ( Input.isMouseupQuick() === true ) {
	
			this.handleDocking( "__RESIZE_CLICKED__" );
	
		// Not A Quick Mouse Up
		} else {
	
			this.left = parseInt( this.rootHtmlElement.style.left );
			this.top = parseInt( this.rootHtmlElement.style.top );
			this.width = this.rootHtmlElement.offsetWidth; // offsetWidth includes border
			this.height = this.rootHtmlElement.offsetHeight; // offsetWidth includes border
	
		}
	
		Bay.currentlyResizingInstance = undefined;
		Bay.resizeDirection = undefined;
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
	
		this.currentlyDraggingInstance = this.instancesById[ instanceId ];
		focus( this.currentlyDraggingInstance.rootHtmlElement ); // Bring it to the front of the view
		Input.userIs = "__DRAGGING_BAY__";
	
	}
	
	Bay.prototype.drag = function( left, top ) {
		console.log( "Bay.prototype.drag( left, top )" );
	
		console.log( this );
		this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
		this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
	
		// This could be optimized
		if ( left < SlxDocument.dockZoneWidth ) {
	
			if ( top < SlxDocument.dockZoneWidth ) {
	
				// Top Left
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock top left" );
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "__SlxDocumentTopLeftDockZone__";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {
	
				// Bottom Left
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock bottom left" );
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "__SlxDocumentBottomLeftDockZone__";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else {
	
				// Left
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock left" );
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "__SlxDocumentLeftDockZone__";
	
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
	
				Bay.cursorCurrentlyInDockZone = "__SlxDocumentTopRightDockZone__";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {
	
				// Bottom Right
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock bottom right" );
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "__SlxDocumentBottomRightDockZone__";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			} else {
	
				// Right
	
				if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
					document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock right" );
	
				SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
				Bay.cursorCurrentlyInDockZone = "__SlxDocumentRightDockZone__";
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
			}
	
		} else if ( left > ( SlxDocument.fullScreenZoneStart * window.innerWidth ) && left < ( SlxDocument.fullScreenZoneEnd * window.innerWidth ) && top < SlxDocument.dockZoneWidth ) {
	
			// Fullscreen
	
			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
			}
	
			console.log( "dock top" );
	
			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
			Bay.cursorCurrentlyInDockZone = "__SlxDocumentFullScreenDockZone__";
	
			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
		} else if ( top < SlxDocument.dockZoneWidth ) {
	
			// Top
	
			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
			}
	
			console.log( "dock top" );
	
			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
			Bay.cursorCurrentlyInDockZone = "__SlxDocumentTopDockZone__";
	
			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = "#000000";
	
		}  else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ){
	
			// Bottom
	
			if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
				document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
			}
	
			console.log( "dock bottom" );
	
			SlxDocument.objectInDockZone = Bay.currentlyDraggingInstance;
	
			Bay.cursorCurrentlyInDockZone = "__SlxDocumentBottomDockZone__";
	
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
	
			this.handleDocking( "__DRAG_CLICKED__" );
	
		// Handle docking
		} else if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
			this.handleDocking( "__DRAGGED__" );
	
		} else {
	
			this.left = parseInt( this.rootHtmlElement.style.left );
			this.top = parseInt( this.rootHtmlElement.style.top );
	
		}
	
		if ( Bay.cursorCurrentlyInDockZone !== undefined ) {
	
			document.getElementById( Bay.cursorCurrentlyInDockZone ).style.backgroundColor = null;
	
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
			case "__DRAG_CLICKED__": 
	
				dockZone = "__SlxDocumentFullScreenDockZone__";
	
				// If dockZone has been set, then toggle docking
				if ( dockZone === undefined ) {
	
					this.currentlyDockedAt = undefined;
	
				} else {
	
					this.toggleDock( dockZone );
	
				}
	
			break;
	
			// Determine dockzone of bay being dragged into a dockzone
			case "__DRAGGED__":
	
				dockZone = Bay.cursorCurrentlyInDockZone;
	
				// If dockZone has been set, then toggle docking
				if ( dockZone === undefined ) {
	
					this.currentlyDockedAt = undefined;
	
				} else {
	
					this.dock( dockZone );
	
				}
	
			break;
	
			// Determine dockzone of bay that is currently being resized
			case "__RESIZE_CLICKED__": 
	
				switch ( Bay.resizeDirection ) {
	
					case "__resizeTop__":
						dockZone = "__SlxDocumentTopDockZone__";		
					break;
					case "__resizeTopRight__":
						dockZone = "__SlxDocumentTopRightDockZone__";
					break;
					case "__resizeRight__":
						dockZone = "__SlxDocumentRightDockZone__";
					break;
					case "__resizeBottomRight__":
						dockZone = "__SlxDocumentBottomRightDockZone__";
					break;
					case "__resizeBottom__":
						dockZone = "__SlxDocumentBottomDockZone__";
					break;
					case "__resizeBottomLeft__":
						dockZone = "__SlxDocumentBottomLeftDockZone__";
					break;
					case "__resizeLeft__":
						dockZone = "__SlxDocumentLeftDockZone__";
					break;
					case "__resizeTopLeft__":
						dockZone = "__SlxDocumentTopLeftDockZone__";
					break;
	
				}
	
				// If dockZone has been set, then toggle docking
				if ( dockZone === undefined ) {
	
					this.currentlyDockedAt = undefined;
	
				} else {
	
					this.toggleDock( dockZone );
	
				}
	
			break;
	
		}
	
		
	
	}
	
	Bay.prototype.toggleDock = function( dockZone ) {
		console.log( "Bay.prototype.toggleDock( dockZone→\"" + dockZone + "\" )" );
	
		// Undock and restore previous dimensions
		console.log( "if ( dockZone→\""+ dockZone +"\" === \""+ this.currentlyDockedAt +"\"←this.currentlyDockedAt )" );
		if ( dockZone === this.currentlyDockedAt ) {
	
			this.undockAndRestorePreviousDimensions();
	
		// Dock
		} else {
	
			this.dock( dockZone );
	
		}
	
	}
	
	Bay.prototype.dock = function ( dockZone ) {
	
		// Save current dimensions if not docked
		console.log( "if ( this.currentlyDockedAt→" + this.currentlyDockedAt + " === undefined )" );
		if ( this.currentlyDockedAt === undefined ) {
	
			this.previousLeft = this.left;
			this.previousTop = this.top;
			this.previousWidth = this.width;
			this.previousHeight = this.height;
	
		}
	
		// Handle docking
		switch ( dockZone ) {
	
			case "__SlxDocumentFullScreenDockZone__":
				console.log( "case \"__SlxDocumentFullScreenDockZone__\":")
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth;
				this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight;
	
			break;
	
			case "__SlxDocumentTopDockZone__":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
				
			break;
	
			case "__SlxDocumentTopRightDockZone__":
	
				this.rootHtmlElement.style.left = window.innerWidth / 2 + "px";
				this.left = window.innerWidth / 2;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "__SlxDocumentRightDockZone__":
	
				this.rootHtmlElement.style.left = ( window.innerWidth / 2 ) + "px";
				this.left = window.innerWidth / 2;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight;
	
			break;
	
			case "__SlxDocumentBottomRightDockZone__":
	
				this.rootHtmlElement.style.left = ( window.innerWidth / 2 ) + "px";
				this.left = window.innerWidth / 2;
				this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
				this.top = window.innerHeight / 2;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "__SlxDocumentBottomDockZone__":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
				this.top = window.innerHeight / 2;
	
				this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "__SlxDocumentBottomLeftDockZone__":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
				this.top = window.innerHeight / 2;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "__SlxDocumentLeftDockZone__":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight;
				
			break;
	
			case "__SlxDocumentTopLeftDockZone__":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2- Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
				
			break;
	
		}
	
		this.currentlyDockedAt = dockZone;
		console.log( "this.currentlyDockedAt: " + this.currentlyDockedAt );
	
	}
	
	Bay.prototype.undockAndRestorePreviousDimensions = function() {
	
		console.log( "Bay.prototype.undockAndRestorePreviousDimensions()" );
	
		// Change root left and top and content width and height
		this.left = this.previousLeft;
		this.rootHtmlElement.style.left = ( this.previousLeft ) + "px";
		this.previousLeft = undefined;
		this.top = this.previousTop;
		this.rootHtmlElement.style.top = ( this.previousTop ) + "px";
		this.previousTop = undefined;
		this.width = this.previousWidth;
		this.rootHtmlElement.style.width = ( this.previousWidth - Bay.borderWidthX2 ) + "px";
		this.previousWidth = undefined;
		this.height = this.previousHeight;
		this.rootHtmlElement.style.height = ( this.previousHeight - Bay.borderWidthX2 ) + "px";
		this.previousHeight = undefined;
	
		this.currentlyDockedAt = undefined;
	
	}
	
	Bay.handleQuickMouseup = function( arEvent_target_id ) {
	
		console.log( "Bay.handleQuickMouseup( arEvent_target_id )" );
	
		console.log( arEvent_target_id );
	
		switch ( arEvent_target_id[1] ) {
	
			case "__resizeTop__":
			case "__resizeTopRight__":
			case "__resizeRight__":
			case "__resizeBottomRight__":
			case "__resizeBottom__":
			case "__resizeBottomLeft__":
			case "__resizeLeft__":
			case "__resizeTopLeft__": 
				this.instancesById[ arEvent_target_id[ 2 ] ].handleDocking( arEvent_target_id[1] );
			break;
	
		}
	
	}
	
	Bay.prototype.close = function () {
	
		console.log( "Bay.prototype.close()" );
	
		console.log( this.id )
	
		document.getElementById( "__SlxBay__-" + this.id ).outerHTML = "";
	
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
	
		document.body.id = "__SlxDocumentFullScreenDockZone__"
	
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