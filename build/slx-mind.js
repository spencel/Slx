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
	
	// Version 0.3
	
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
	
			this.contentHtmlElement = element.childNodes[ 9 ];
	
				console.log( this.contentHtmlElement );
	
			this.isHtml = true;
	
		} else {
	
			document.getElementById( "_14-" + this.id ).outerHTML = "";
	
			this.isHtml = false;
	
		}
	
	}
	
	Bay.prototype.close = function () {
	
			console.log( this.id )
	
		document.getElementById( "_14-" + this.id ).outerHTML = "";
	
		Bay.destroy( this.id );
	
	}
	
	Bay.prototype.initResize = function( resizeType ) {
	
		focus( this.rootHtmlElement ); // Bring it to the front of the view
	
		Bay.nowResizing = this;
	
		Bay.resizeType = resizeType;
	
	}
	
	Bay.prototype.resize = function( left, top ) {
	
		//console.log( "left: " + left + "; top: " + top + ";");
		console.log( "deltaX: " + (Input.mousedownClientX - left) + "; deltaY: " + (top - Input.mousedownClientY) );
	
		switch ( Bay.resizeType ) {
	
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
	
	}
	
	Bay.prototype.finishResizing = function() {
	
		this.left = parseInt( this.rootHtmlElement.style.left );
		console.log( "this.left :" + this.left );
		this.top = parseInt( this.rootHtmlElement.style.top );
		console.log( "this.top :" + this.top );
		this.width = this.rootHtmlElement.offsetWidth; // offsetWidth includes border
		console.log( "this.width :" + this.width );
		this.height = this.rootHtmlElement.offsetHeight; // offsetWidth includes border
		console.log( "this.height :" + this.height );
	
		Bay.nowResizing = undefined;
		Bay.resizeType = undefined;
		Input.userIs = undefined;
	
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
	
				SlxDocument.inDockZone = "_15";
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
			} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {
	
				// Bottom Left
	
				if ( SlxDocument.inDockZone !== undefined ) {
	
					document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock bottom left" );
	
				SlxDocument.objectInDockZone = Bay.nowDragging;
	
				SlxDocument.inDockZone = "_16";
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
			} else {
	
				// Left
	
				if ( SlxDocument.inDockZone !== undefined ) {
	
					document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock left" );
	
				SlxDocument.objectInDockZone = Bay.nowDragging;
	
				SlxDocument.inDockZone = "_17";
	
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
	
				SlxDocument.inDockZone = "_18";
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
			} else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ) {
	
				// Bottom Right
	
				if ( SlxDocument.inDockZone !== undefined ) {
	
					document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock bottom right" );
	
				SlxDocument.objectInDockZone = Bay.nowDragging;
	
				SlxDocument.inDockZone = "_19";
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
			} else {
	
				// Right
	
				if ( SlxDocument.inDockZone !== undefined ) {
	
					document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
				}
	
				console.log( "dock right" );
	
				SlxDocument.objectInDockZone = Bay.nowDragging;
	
				SlxDocument.inDockZone = "_20";
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
			}
	
		} else if ( left > ( SlxDocument.fullScreenZoneStart * window.innerWidth ) && left < ( SlxDocument.fullScreenZoneEnd * window.innerWidth ) && top < SlxDocument.dockZoneWidth ) {
	
			// Fullscreen
	
			if ( SlxDocument.inDockZone !== undefined ) {
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
			}
	
			console.log( "dock top" );
	
			SlxDocument.objectInDockZone = Bay.nowDragging;
	
			SlxDocument.inDockZone = "_21";
	
			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
		} else if ( top < SlxDocument.dockZoneWidth ) {
	
			// Top
	
			if ( SlxDocument.inDockZone !== undefined ) {
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
			}
	
			console.log( "dock top" );
	
			SlxDocument.objectInDockZone = Bay.nowDragging;
	
			SlxDocument.inDockZone = "_22";
	
			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
		}  else if ( top > ( window.innerHeight - SlxDocument.dockZoneWidth ) ){
	
			// Bottom
	
			if ( SlxDocument.inDockZone !== undefined ) {
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
	
			}
	
			console.log( "dock bottom" );
	
			SlxDocument.objectInDockZone = Bay.nowDragging;
	
			SlxDocument.inDockZone = "_23";
	
			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = "#000000";
	
		} else if ( SlxDocument.inDockZone !== undefined ) {
	
			// None
	
			document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null; // removes a style from element
	
			SlxDocument.objectInDockZone = undefined;
	
			SlxDocument.inDockZone = undefined;
	
		}
		
	}
	
	Bay.prototype.finishDragging = function( left, top ) {
	
		this.currentlyDockedAt = SlxDocument.inDockZone;
	
		switch ( SlxDocument.inDockZone ) {
	
			case "_22":
	
				if ( this.currentlyDockedAt === undefined ) {
	
					this.previousLeft = this.left;
					this.previousTop = this.top;
					this.previousWidth = this.width;
					this.previousHeight = this.height;
	
				}
	
				this.currentlyDockedAt = SlxDocument.inDockZone;
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				Input.userIs = undefined;
	
				
				
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "_18":
	
				if ( this.currentlyDockedAt === undefined ) {
	
					this.previousLeft = this.left;
					this.previousTop = this.top;
					this.previousWidth = this.width;
					this.previousHeight = this.height;
	
				}
	
				this.currentlyDockedAt = SlxDocument.inDockZone;
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				Input.userIs = undefined;
	
				this.rootHtmlElement.style.left = window.innerWidth / 2 + "px";
				this.left = window.innerWidth / 2;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "_20":
	
				if ( this.currentlyDockedAt === undefined ) {
					
					this.previousLeft = this.left;
					this.previousTop = this.top;
					this.previousWidth = this.width;
					this.previousHeight = this.height;
	
				}
	
				this.currentlyDockedAt = SlxDocument.inDockZone;
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				Input.userIs = undefined;
	
				this.rootHtmlElement.style.left = ( window.innerWidth / 2 ) + "px";
				this.left = window.innerWidth / 2;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight;
	
			break;
	
			case "_19":
	
				if ( this.currentlyDockedAt === undefined ) {
	
					this.previousLeft = this.left;
					this.previousTop = this.top;
					this.previousWidth = this.width;
					this.previousHeight = this.height;
	
				}
	
				this.currentlyDockedAt = SlxDocument.inDockZone;
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				Input.userIs = undefined;
	
				this.rootHtmlElement.style.left = ( window.innerWidth / 2 ) + "px";
				this.left = window.innerWidth / 2;
				this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
				this.top = window.innerHeight / 2;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "_23":
	
				if ( this.currentlyDockedAt === undefined ) {
	
					this.previousLeft = this.left;
					this.previousTop = this.top;
					this.previousWidth = this.width;
					this.previousHeight = this.height;
	
				}
	
				this.currentlyDockedAt = SlxDocument.inDockZone;
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				Input.userIs = undefined;
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
				this.top = window.innerHeight / 2;
	
				this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "_16":
	
				if ( this.currentlyDockedAt === undefined ) {
	
					this.previousLeft = this.left;
					this.previousTop = this.top;
					this.previousWidth = this.width;
					this.previousHeight = this.height;
	
				}
	
				this.currentlyDockedAt = SlxDocument.inDockZone;
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				Input.userIs = undefined;
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
				this.top = window.innerHeight / 2;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "_17":
	
				if ( this.currentlyDockedAt === undefined ) {
	
					this.previousLeft = this.left;
					this.previousTop = this.top;
					this.previousWidth = this.width;
					this.previousHeight = this.height;
	
				}
	
				this.currentlyDockedAt = SlxDocument.inDockZone;
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				Input.userIs = undefined;
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight;
				
			break;
	
			case "_15":
	
				if ( this.currentlyDockedAt === undefined ) {
	
					this.previousLeft = this.left;
					this.previousTop = this.top;
					this.previousWidth = this.width;
					this.previousHeight = this.height;
	
				}
	
				this.currentlyDockedAt = SlxDocument.inDockZone;
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				Input.userIs = undefined;
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2- Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
				
			break;
	
			case "_21":
	
				if ( this.currentlyDockedAt === undefined ) {
	
					this.previousLeft = this.left;
					this.previousTop = this.top;
					this.previousWidth = this.width;
					this.previousHeight = this.height;
	
				}
	
				this.currentlyDockedAt = SlxDocument.inDockZone;
	
				document.getElementById( SlxDocument.inDockZone ).style.backgroundColor = null;
				SlxDocument.objectInDockZone = undefined;
				SlxDocument.inDockZone = undefined;
				Input.userIs = undefined;
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth;
				this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight;
				
			break;
	
			default:
	
				this.left = parseInt( this.rootHtmlElement.style.left );
				this.top = parseInt( this.rootHtmlElement.style.top );
	
		}
	
		Bay.nowDragging = undefined;
	
	}
	
	Bay.prototype.restorePreviousDimensions = function() {
	
		// Change root left and top and content width and height
		this.rootHtmlElement.style.left = ( this.previousLeft ) + "px";
		this.previousLeft = undefined;
		this.rootHtmlElement.style.top = ( this.previousTop ) + "px";
		this.previousTop = undefined;
		this.rootHtmlElement.style.width = ( this.previousWidth - Bay.borderWidthX2 ) + "px";
		this.previousWidth = undefined;
		this.rootHtmlElement.style.height = ( this.previousHeight - Bay.borderWidthX2 ) + "px";
		this.previousHeight = undefined;
		this.currentlyDockedAt = undefined;
	
	}
	
	Bay.handleQuickMouseup = function( arEventtargetid ) {
	
		console.log( arEventtargetid );
	
		switch ( arEventtargetid[1] ) {
	
			case "_6":
			case "_7":
			case "_8":
			case "_9":
			case "_10":
			case "_11":
			case "_12":
			case "_13": 
				console.log( "this.handleDocking( arEventtargetid )" );
				this.handleDocking( arEventtargetid );
			break;
	
		}
	
	}
	
	Bay.handleDocking = function( arEventtargetid ) {
	
		var resizeDirection = arEventtargetid[1];
		var instanceId = arEventtargetid[2];
		var dockZone = undefined;
	
		console.log( resizeDirection );
	
		switch ( resizeDirection ) {
	
			case "_6":
				dockZone = "_24";
			break;
			case "_7":
				dockZone = "_18";
			break;
			case "_8":
				dockZone = "_20";
			break;
			case "_9":
				dockZone = "_19";
			break;
			case "_10":
				dockZone = "_23";
			break;
			case "_11":
				dockZone = "_16";
			break;
			case "_12":
				dockZone = "_17";
			break;
			case "_13":
				dockZone = "_15";
			break;
	
		}
	
		this.instancesById[ instanceId ].dock( dockZone );
	
	}
	
	Bay.prototype.dock = function( dockZone ) {
	
		console.log( dockZone);
	
		this.currentDock = dockZone;
	
		switch ( dockZone ) {
	
			case "_22":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "_18":
	
				this.rootHtmlElement.style.left = window.innerWidth / 2 + "px";
				this.left = window.innerWidth / 2;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "_20":
	
				this.rootHtmlElement.style.left = ( window.innerWidth / 2 ) + "px";
				this.left = window.innerWidth / 2;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight;
	
			break;
	
			case "_19":
	
				this.rootHtmlElement.style.left = ( window.innerWidth / 2 ) + "px";
				this.left = window.innerWidth / 2;
				this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
				this.top = window.innerHeight / 2;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "_23":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
				this.top = window.innerHeight / 2;
	
				this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "_16":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = ( window.innerHeight / 2 ) + "px";
				this.top = window.innerHeight / 2;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2 - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
	
			break;
	
			case "_17":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight;
				
			break;
	
			case "_15":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth / 2 - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth / 2;
				this.rootHtmlElement.style.height = ( window.innerHeight / 2- Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight / 2;
				
			break;
	
			case "_24":
	
				this.rootHtmlElement.style.left = 0 + "px";
				this.left = 0;
				this.rootHtmlElement.style.top = 0 + "px";
				this.top = 0;
	
				this.rootHtmlElement.style.width = ( window.innerWidth - Bay.borderWidthX2 ) + "px";
				this.width = window.innerWidth;
				this.rootHtmlElement.style.height = ( window.innerHeight - Bay.borderWidthX2 ) + "px";
				this.height = window.innerHeight;
				
			break;
	
		}
	
	}
	// End Methods
	
	// End Bay Class
	
	/**
	 * @author spencel / https://github.com/spencel
	 * @version 0.2
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
	
			var eventtargetid = event.target.id;
			//console.log(eventtargetid);
	
			switch ( eventtargetid ) {
	
				case "ConvertUnits":
	
					//console.log('test');
	
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
	
			event.stopPropagation();
	
			////console.log( event );
			////console.log( "event.clientX: " + event.clientX );
			////console.log( "event.clientY: " + event.clientY );
	
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
	
				case "_25":
	
					event.preventDefault(); // Prevent text selection and dragging
	
					Bay.nowResizing.resize( event.clientX, event.clientY );
	
				break;
	
				case "_26":
	
					event.preventDefault(); // Prevent text selection and dragging
	
					Bay.nowDragging.drag( event.clientX, event.clientY );
	
				break;
	
			}
	
			var strEventtargetid = event.target.id;
			var arEventtargetid = strEventtargetid.split("-");
	
		});
	
		document.onmousedown = function( event ) {
	
			event.stopPropagation();
	
			//console.log( event );
	
			Input.mousedownTimestamp = performance.now();
			Input.isMousedown = true;
			Input.mousedownClientX = event.clientX;
			Input.mousedownClientY = event.clientY;
	
			//console.log( "Input.mousedownClientX: " + Input.mousedownClientX );
			//console.log( "Input.mousedownClientY: " + Input.mousedownClientY );
	
			var strEventtargetid = event.target.id;
			var arEventtargetid = strEventtargetid.split("-");
	
			// Left Mouse Button is Down
			if ( event.button === 0 ) { 
	
				//console.log( arEventtargetid[0] );
	
				switch ( arEventtargetid[0] ) {
	
					// Handle Resize Buttons
	
					case "_6":
					case "_7":
					case "_8":
					case "_9":
					case "_10":
					case "_11":
					case "_12":
					case "_13":
	
						event.preventDefault(); // Prevent text selection and dragging
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						//console.log( arrElementId );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								var resizeType = arEventtargetid[0];
	
								Bay.instancesById[ id ].initResize( resizeType );
	
								Input.userIs = "_25"
	
							break;
	
						}
	
					break;
	
					case "_1": // also a drag button
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_26"
	
							break;
	
						}
	
					break;
	
					case "_2": // ensures some amount of space of the topbar is showing
	
						var element = event.target.parentNode.parentNode.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_26"
	
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
	
			////console.log( event );
	
			Input.mouseupTimestamp = performance.now();
			Input.isMouseDown = false;
			Input.mouseupClientX = event.clientX;
			Input.mouseupClientY = event.clientY;
	
			switch ( Input.userIs ) {
	
				case "_25":
	
					event.preventDefault(); // Prevent text selection and dragging
	
					Bay.nowResizing.finishResizing( event.clientX, event.clientY );
	
				break;
	
				case "_26":
	
					event.preventDefault(); // Prevent text selection and dragging
	
					Bay.nowDragging.finishDragging( event.clientX, event.clientY );
	
				break;
	
			}
	
			//console.log( "mouseup delta: " + ( Input.mouseupTimestamp - Input.mousedownTimestamp ) );
	
			var strEventtargetid = event.target.id;
			var arEventtargetid = strEventtargetid.split("-");
	
			// Quick Mouseup
			if ( ( Input.mouseupTimestamp - Input.mousedownTimestamp ) < 200 ) {
	
				// Left mouse button is up
				if ( event.button === 0 ) {
	
					switch ( arEventtargetid[0] ) {
	
						case "panelHeader":
	
							//console.log( Input.mouseupTimestamp - Input.mousedownTimestamp );
	
							if ( ( Input.mouseupTimestamp - Input.mousedownTimestamp ) < 200 ) { // if less than 100 ms has elapsed
	
								var id = arEventtargetid[ 1 ];
	
									//console.log( "id: " + id );
	
									//console.log( Panel.byId[ id ] );
	
								Panel.byId[ id ].cycleDisplay();
	
							} else {
	
								if  ( Panel.isDraggable === true ) {
	
									var id = arEventtargetid[ 1 ];
	
										//console.log( Panel.byId[ id ] );
	
									Panel.draggingPanel = Panel.byId[ id ];
	
										//console.log( Panel.draggingPanel );
	
								}
	
							}
	
						break;
	
						case "_0": 
	
							console.log( "Bay.handleQuickMouseup( arEventtargetid )" );
	
							Bay.handleQuickMouseup( arEventtargetid );
	
						break;
	
					}
	
				// Right mouse button is up
				} else if ( event.button === 2 ) {
	
					switch ( arEventtargetid[0] ) {
	
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
	
			}
	
		};
	
		document.oncontextmenu = function( event ) {
	
			if ( ( Input.mouseupTimestamp - Input.mousedownTimestamp ) < 200 ) {
	
				var strEventtargetid = event.target.id;
				var arEventtargetid = strEventtargetid.split("-");
	
				//console.log( event );
	
				switch ( arEventtargetid[0] ) {
	
					// Resize Handles become Open Menu button on right click
					case "_6":
					case "_7":
					case "_8":
					case "_9":
					case "_10":
					case "_11":
					case "_12":
					case "_13":
	
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
	
			var strEventtargetid = event.target.id;
			var arEventtargetid = strEventtargetid.split("-");
	
			if ( event.button === 0 ) { 
	
				switch ( arEventtargetid[0] ) {
	
					// Auto dock on click instead of double click
					/*case "_6":
	
						var element = event.target.parentNode;
	
						var arrElementId = element.id.split( "-" );
	
						switch ( arrElementId[0] ) {
	
							case "_14":
	
								var id = arrElementId[1]
	
								Bay.instancesById[ id ].initDrag();
	
								Input.userIs = "_26"
	
								SlxDocument.inDockZone = "_21"
	
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
	
								Input.userIs = "_26"
	
								SlxDocument.inDockZone = "_18"
	
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
	
								Input.userIs = "_26"
	
								SlxDocument.inDockZone = "_20"
	
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
	
								Input.userIs = "_26"
	
								SlxDocument.inDockZone = "_19"
	
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
	
								Input.userIs = "_26"
	
								SlxDocument.inDockZone = "_23"
	
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
	
								Input.userIs = "_26"
	
								SlxDocument.inDockZone = "_16"
	
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
	
								Input.userIs = "_26"
	
								SlxDocument.inDockZone = "_17"
	
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
	
								Input.userIs = "_26"
	
								SlxDocument.inDockZone = "_15"
	
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
	
								Input.userIs = "_26"
	
								SlxDocument.inDockZone = "_21"
	
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
	
								Input.userIs = "_26"
	
								SlxDocument.inDockZone = "_21"
	
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
	
		document.body.id = "_21";
	
		var element = document.createElement( "div" );
		element.id = "_22";
		element.className = "_27"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_18";
		element.className = "_27"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_20";
		element.className = "_27"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_19";
		element.className = "_27"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_23";
		element.className = "_27"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_16";
		element.className = "_27"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_17";
		element.className = "_27"
		document.body.appendChild( element );
	
		var element = document.createElement( "div" );
		element.id = "_15";
		element.className = "_27"
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