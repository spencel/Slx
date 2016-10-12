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
	
			document.getElementById( "fps" ).textContent = 1000 / deltaT;
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
	
	// Version 0.1
	
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
	
	Bay.nowResizing = undefined; // Set to instance of Bay that is being resized
	
	Bay.resizeType = undefined; // A string constant that indicates the resize type, e.g., top, bottom right, mirrored, etc.
	
	Bay.nowDragging = undefined; // Set to instance of Bay that is being dragged
	// End Static Properties
	
	// Constructor
	function Bay( left, top, width, height ) {
	
		Bay.instancesById[ Bay.nextId ] = this;
		Bay.quantity++;
	
		// Instance Properties
		this.id = Bay.nextId;
		Bay.nextId++;
	
		this.left = left; // Of root element
	
		this.top = top; // Of root element
	
		this.width = width; // Of content element
	
		this.height = height; // Of content element
	
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
			element.id = "__SlxBay__-" + this.id;
			element.className = "__Bay__";
			element.style.left = this.left + "px";
			element.style.top = this.top + "px";
			element.style.width = ( this.width - Bay.borderWidthX2 ) + "px"; // 
			element.style.height = ( this.height - Bay.borderWidthX2 ) + "px"; // 
			focus( element );
	
			document.body.appendChild( element );
	
			var elementChild = document.createElement( "div" );
			elementChild.id = "__overflowHidden__";
			element.appendChild( elementChild );
	
			var elementChildChild = document.createElement( "div" );
			elementChildChild.id = "__topBar__";
			elementChild.appendChild( elementChildChild );
	
			var elementChildChildChild = document.createElement( "div" );
			elementChildChildChild.id = "__drag__";
			elementChildChild.appendChild( elementChildChildChild );
			elementChildChildChild = document.createElement( "div" );
			elementChildChildChild.id = "__close__";
			elementChildChild.appendChild( elementChildChildChild );
			var text = document.createTextNode( "X" );
			elementChildChildChild.appendChild( text );
	
			elementChildChild = document.createElement( "div" );
			elementChildChild.id = "__content__";
			elementChild.appendChild( elementChildChild );
	
			elementChild = document.createElement( "div" );
			elementChild.id = "__resizeTop__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__resizeTopRight__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__resizeRight__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__resizeBottomRight__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__resizeBottom__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__resizeBottomLeft__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__resizeLeft__";
			element.appendChild( elementChild );
			elementChild = document.createElement( "div" );
			elementChild.id = "__resizeTopLeft__";
			element.appendChild( elementChild );
	
			this.contentHtmlElement = element.childNodes[ 9 ];
	
				console.log( this.contentHtmlElement );
	
			this.isHtml = true;
	
		} else {
	
			document.getElementById( "__SlxBay__-" + this.id ).outerHTML = "";
	
			this.isHtml = false;
	
		}
	
	}
	
	Bay.prototype.close = function () {
	
			console.log( this.id )
	
		document.getElementById( "__SlxBay__-" + this.id ).outerHTML = "";
	
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
	
		this.left = parseInt( this.rootHtmlElement.style.left );
		console.log( "this.left :" + this.left );
		this.top = parseInt( this.rootHtmlElement.style.top );
		console.log( "this.top :" + this.top );
		this.width = this.rootHtmlElement.offsetWidth + Bay.borderWidthX2;
		console.log( "this.width :" + this.width );
		this.height = this.rootHtmlElement.offsetHeight + Bay.borderWidthX2;
		console.log( "this.height :" + this.height );
	
		Bay.nowResizing = undefined;
		Bay.resizeType = undefined;
	
	}
	
	Bay.prototype.initDrag = function() {
	
		focus( this.rootHtmlElement ); // Bring it to the front of the view
	
		Bay.nowDragging = this;
	
	}
	
	Bay.prototype.drag = function( left, top ) {
	
		this.rootHtmlElement.style.left = ( this.left - Input.mousedownClientX + left ) + "px";
		this.rootHtmlElement.style.top = ( this.top - Input.mousedownClientY + top ) + "px";
	
		//console.log( mouseLeft + " > " + ( window.innerWidth - SlxDocument.dockZoneWidth ) );
		//console.log( mouseTop + " > " + ( window.innerHeight - SlxDocument.dockZoneWidth ) );
	
		// This could be optimized
		if ( left < SlxDocument.dockZoneWidth ) {
	
			if ( top < SlxDocument.dockZoneWidth ) {
	
				// Top Left
	
				if ( SlxDocument.inDockZone !== undefined ) {
	
					document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock top left" );
	
				SlxDocument.objectInDockZone = Bay.nowDragging;
	
				SlxDocument.inDockZone = "__SlxDocumentTopLeftDockZone__";
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
			} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {
	
				// Bottom Left
	
				if ( SlxDocument.inDockZone !== undefined ) {
	
					document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock bottom left" );
	
				SlxDocument.objectInDockZone = Bay.nowDragging;
	
				SlxDocument.inDockZone = "__SlxDocumentBottomLeftDockZone__";
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
			} else {
	
				// Left
	
				if ( SlxDocument.inDockZone !== undefined ) {
	
					document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock left" );
	
				SlxDocument.objectInDockZone = Bay.nowDragging;
	
				SlxDocument.inDockZone = "__SlxDocumentLeftDockZone__";
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
			}
	
		} else if ( left > ( window.innerWidth - SlxDocument.dockZoneWidth ) ) {
	
			if ( top < SlxDocument.dockZoneWidth ) {
	
				// Top Right
	
				if ( SlxDocument.inDockZone !== undefined ) {
	
					document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock top right" );
	
				SlxDocument.objectInDockZone = Bay.nowDragging;
	
				SlxDocument.inDockZone = "__SlxDocumentTopRightDockZone__";
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
			} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {
	
				// Bottom Right
	
				if ( SlxDocument.inDockZone !== undefined ) {
	
					document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock bottom right" );
	
				SlxDocument.objectInDockZone = Bay.nowDragging;
	
				SlxDocument.inDockZone = "__SlxDocumentBottomRightDockZone__";
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
			} else {
	
				// Right
	
				if ( SlxDocument.inDockZone !== undefined ) {
	
					document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock right" );
	
				SlxDocument.objectInDockZone = Bay.nowDragging;
	
				SlxDocument.inDockZone = "__SlxDocumentRightDockZone__";
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
			}
	
		} else if ( left > ( SlxDocument.fullScreenZoneStart * window.innerWidth ) && left < ( SlxDocument.fullScreenZoneEnd * window.innerWidth ) && top < SlxDocument.dockZoneWidth ) {
	
			// Fullscreen
	
			if ( SlxDocument.inDockZone !== undefined ) {
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
			}
	
			console.log( "dock top" );
	
			SlxDocument.objectInDockZone = Bay.nowDragging;
	
			SlxDocument.inDockZone = "__SlxDocumentFullScreen__";
	
			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
		} else if ( top < SlxDocument.dockZoneWidth ) {
	
			// Top
	
			if ( SlxDocument.inDockZone !== undefined ) {
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
			}
	
			console.log( "dock top" );
	
			SlxDocument.objectInDockZone = Bay.nowDragging;
	
			SlxDocument.inDockZone = "__SlxDocumentTopDockZone__";
	
			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
		}  else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ){
	
			// Bottom
	
			if ( SlxDocument.inDockZone !== undefined ) {
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
			}
	
			console.log( "dock bottom" );
	
			SlxDocument.objectInDockZone = Bay.nowDragging;
	
			SlxDocument.inDockZone = "__SlxDocumentBottomDockZone__";
	
			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
		} else if ( SlxDocument.inDockZone !== undefined ) {
	
			// None
	
			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null; // removes a style from element
	
			SlxDocument.objectInDockZone = undefined;
	
			SlxDocument.inDockZone = undefined;
	
		}
		
	}
	
	Bay.prototype.finishDragging = function( left, top ) {
	
		switch ( SlxDocument.inDockZone ) {
	
			case "__SlxDocumentTopDockZone__":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
	
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
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
	
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
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
	
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
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
	
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
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
	
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
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
	
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
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				
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
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				
			break;
	
			case "__SlxDocumentFullScreen__":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth;
				this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight;
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				
			break;
	
			default:
	
				this.left = parseInt( this.rootHtmlElement.style.left );
				this.top = parseInt( this.rootHtmlElement.style.top );
	
		}
	
		Bay.nowDragging = undefined;
	
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
	
		jQuery( document ).on( "mousedown", function( event ) {
	
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
	
			// If left mouse button is down
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
	
						var element = event.target.parentNode.parentNode;
	
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
	
		});
	
		jQuery( document ).on( "mouseup", function( event ) {
	
			event.stopPropagation();
	
			console.log( event );
	
			Input.mouseupTimestamp = performance.now();
			Input.isMouseDown = false;
			Input.mouseupClientX = event.clientX;
			Input.mouseupClientY = event.clientY;
	
			switch ( Input.userIs ) {
	
				case "__RESIZING_BAY__":
	
					event.preventDefault(); // Prevent text selection and dragging
	
					Bay.nowResizing.finishResizing( event.clientX, event.clientY );
	
					Input.userIs = undefined;
	
				break;
	
				case "__DRAGGING_BAY__":
	
					event.preventDefault(); // Prevent text selection and dragging
	
					Bay.nowDragging.finishDragging( event.clientX, event.clientY );
	
					Input.userIs = undefined;
	
				break;
	
			}
	
	
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
	
					var element = event.target.parentNode.parentNode.parentNode;
	
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
	
					case "__topBar__": // also a drag button
	
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
	
					break;
	
					case "__drag__": // ensures some amount of space of the topbar is showing
	
						var element = event.target.parentNode.parentNode.parentNode;
	
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
	
				}
	
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
	
	// End Classes
	
	return {
		
		startMainLoop: startMainLoop,
		
		Bay: Bay,
		
		Panel: Panel,
		
		Input: Input,
		
		SlxDocument: SlxDocument,
		
	}

}());