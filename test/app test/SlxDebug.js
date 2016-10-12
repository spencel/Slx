// Version 0.2

// Class
var SlxDebug = (function() {

	// Class Properties
	var id = "debugBox";
	var isShowing = null;

	var windowWidth = null;
	var windowHeight = null;

	var documentWidth = null;
	var documentHeight = null;

	var mousemoveClientX = null;
	var mousemoveOffsetX = null;
	var mousemovePageX = null;
	var mousemoveScreenX = null;
	var mousemoveClientY = null;
	var mousemoveOffsetY = null;
	var mousemovePageY = null;
	var mousemoveScreenY = null;

	var mousedownClientX = null;
	var mousedownOffsetX = null;
	var mousedownPageX = null;
	var mousedownScreenX = null;
	var mousedownClientY = null;
	var mousedownOffsetY = null;
	var mousedownPageY = null;
	var mousedownScreenY = null;

	var mouseupClientX = null;
	var mouseupOffsetX = null;
	var mouseupPageX = null;
	var mouseupScreenX = null;
	var mouseupClientY = null;
	var mouseupOffsetY = null;
	var mouseupPageY = null;
	var mouseupScreenY = null;

	// Class Constructor
	// None

	// Class Methods
	function initialize() {

		var strHtml = "<div id='" + id + "'></div>";

		jQuery( "body" ).append( strHtml );

		showDebug();		

		activateEventHandlers();

	}

	function updateValues() {

		windowWidth.innerHTML = jQuery( window ).width();
		windowHeight.innerHTML = jQuery( window ).height();

		documentWidth.innerHTML = jQuery( document ).width();
		documentHeight.innerHTML =jQuery( document ).height();

		bodyWidth.innerHTML = jQuery( "body" ).width();
		bodyHeight.innerHTML = jQuery( "body" ).height();
			
	}

	function showDebug() {

		isShowing = true;

		var strHtml = 
			"<table>" +
				"<tr>" +
					"<td colspan='2'>Debug</td>" +
					"<td id='debug-showGrid' class='button' title='show grid'>grid</td>" +
					"<td id='hideDebug' class='button' title='hide'>-</td>" +
				"</tr>" +
			"</table>" +
			"<table>" +
				"<tr>" +
					"<td>fps:</td>" +
					"<td id='fps'></td>" +
				"</tr>" +
			"</table>" +
			"<table>" +
				"<tr>" +
					"<td>(px)</td>" +
					"<td>width</td>" +
					"<td>height</td>" +
				"</tr>" +
				"<tr>" +
					"<td>window</td>" +
					"<td id='windowWidth' class='r'></td>" +
					"<td id='windowHeight' class='r'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>document</td>" +
					"<td id='documentWidth' class='r'>width</td>" +
					"<td id='documentHeight' class='r'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>body</td>" +
					"<td id='bodyWidth' class='r'></td>" +
					"<td id='bodyHeight' class='r'></td>" +
				"</tr>" +
			"</table>" +
			"<table>" +
				"<tr>" +
					"<td>mouse</td>" +
					"<td>clientX</td>" +
					"<td>offsetX</td>" +
					"<td>pageX</td>" +
					"<td>screenX</td>" +
					"<td>clientY</td>" +
					"<td>offsetY</td>" +
					"<td>pageY</td>" +
					"<td>screenY</td>" +
				"</tr>" +
				"<tr>" +
					"<td>move</td>" +
					"<td id='mousemoveClientX' class='r'></td>" +
					"<td id='mousemoveOffsetX' class='r'></td>" +
					"<td id='mousemovePageX' class='r'></td>" +
					"<td id='mousemoveScreenX' class='r'></td>" +
					"<td id='mousemoveClientY' class='r'></td>" +
					"<td id='mousemoveOffsetY' class='r'></td>" +
					"<td id='mousemovePageY' class='r'></td>" +
					"<td id='mousemoveScreenY' class='r'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>down</td>" +
					"<td id='mousedownClientX' class='r'></td>" +
					"<td id='mousedownOffsetX' class='r'></td>" +
					"<td id='mousedownPageX' class='r'></td>" +
					"<td id='mousedownScreenX' class='r'></td>" +
					"<td id='mousedownClientY' class='r'></td>" +
					"<td id='mousedownOffsetY' class='r'></td>" +
					"<td id='mousedownPageY' class='r'></td>" +
					"<td id='mousedownScreenY' class='r'></td>" +
				"</tr>" +
				"<tr>" +
					"<td>up</td>" +
					"<td id='mouseupClientX' class='r'></td>" +
					"<td id='mouseupOffsetX' class='r'></td>" +
					"<td id='mouseupPageX' class='r'></td>" +
					"<td id='mouseupScreenX' class='r'></td>" +
					"<td id='mouseupClientY' class='r'></td>" +
					"<td id='mouseupOffsetY' class='r'></td>" +
					"<td id='mouseupPageY' class='r'></td>" +
					"<td id='mouseupScreenY' class='r'></td>" +
				"</tr>" +
			"</table>";

		jQuery( "#" + id ).html( strHtml );

		windowWidth = document.getElementById( "windowWidth" );
		windowHeight = document.getElementById( "windowHeight" );

		documentWidth = document.getElementById( "documentWidth" );
		documentHeight = document.getElementById( "documentHeight" );

		bodyWidth = document.getElementById( "bodyWidth" );
		bodyHeight = document.getElementById( "bodyHeight" );

		mousemoveClientX = document.getElementById( "mousemoveClientX" );
		mousemoveOffsetX = document.getElementById( "mousemoveOffsetX" );
		mousemovePageX = document.getElementById( "mousemovePageX" );
		mousemoveScreenX = document.getElementById( "mousemoveScreenX" );
		mousemoveClientY = document.getElementById( "mousemoveClientY" );
		mousemoveOffsetY = document.getElementById( "mousemoveOffsetY" );
		mousemovePageY = document.getElementById( "mousemovePageY" );
		mousemoveScreenY = document.getElementById( "mousemoveScreenY" );

		mousedownClientX = document.getElementById( "mousedownClientX" );
		mousedownOffsetX = document.getElementById( "mousedownOffsetX" );
		mousedownPageX = document.getElementById( "mousedownPageX" );
		mousedownScreenX = document.getElementById( "mousedownScreenX" );
		mousedownClientY = document.getElementById( "mousedownClientY" );
		mousedownOffsetY = document.getElementById( "mousedownOffsetY" );
		mousedownPageY = document.getElementById( "mousedownPageY" );
		mousedownScreenY = document.getElementById( "mousedownScreenY" );

		mouseupClientX = document.getElementById( "mouseupClientX" );
		mouseupOffsetX = document.getElementById( "mouseupOffsetX" );
		mouseupPageX = document.getElementById( "mouseupPageX" );
		mouseupScreenX = document.getElementById( "mouseupScreenX" );
		mouseupClientY = document.getElementById( "mouseupClientY" );
		mouseupOffsetY = document.getElementById( "mouseupOffsetY" );
		mouseupPageY = document.getElementById( "mouseupPageY" );
		mouseupScreenY = document.getElementById( "mouseupScreenY" );	

		updateValues();

	}

	function hideDebug() {

		isShowing = false;

		var strHtml = 
			"<tr>" +
				"<td id='showDebug' class='button' title='show debug'>+</td>" +
			"</tr>";

		jQuery( "#" + id ).html( strHtml );

	}

	function showGrid() {

		var strHtml = "";

		var width = jQuery( document ).width();
		var height = jQuery( document ).height();

		for ( var left = 40; left < width; left += 40 ) {

			strHtml +=
				"<div style='\
					position: absolute;\
					left: " + left + "px;\
					top: 0px;\
					width: 1px;\
					height: " + height + "px;\
					background-color: red;'>\
				</div>"

		}

		for ( var top = 40; top < height; top += 40 ) {

			strHtml +=
				"<div style='\
					position: absolute;\
					left: 0px;\
					top: " + top + "px;\
					width: " + width + "px;\
					height: 1px;\
					background-color: red;'>\
				</div>"

		}

		jQuery( "body" ).append( strHtml );

	}

	function activateEventHandlers() {

		jQuery( document ).on( "click", function( event ) {

			var event_target_id = event.target.id;

			switch ( event_target_id ) {

				case "showDebug":

					showDebug();

				break;

				case "hideDebug":

					hideDebug();

				break;

				case "debug-showGrid":

					showGrid();

				break;

			}

		});

		jQuery( window ).on( "resize", function( event ) {

			windowWidth.innerHTML = jQuery( window ).width();
			windowHeight.innerHTML = jQuery( window ).height();

			documentWidth.innerHTML = jQuery( document ).width();
			documentHeight.innerHTML = jQuery( document ).height();

			bodyWidth.innerHTML = jQuery( "body" ).width();
			bodyHeight.innerHTML = jQuery( "body" ).height();

		});

		jQuery( document ).on( "mousemove", function( event ) {

			windowWidth.innerHTML = jQuery( window ).width();
			windowHeight.innerHTML = jQuery( window ).height();

			documentWidth.innerHTML = jQuery( document ).width();
			documentHeight.innerHTML = jQuery( document ).height();

			bodyWidth.innerHTML = jQuery( "body" ).width();
			bodyHeight.innerHTML = jQuery( "body" ).height();

			mousemoveClientX.innerHTML = event.clientX;
			mousemoveOffsetX.innerHTML = event.offsetX;
			mousemovePageX.innerHTML = event.pageX;
			mousemoveScreenX.innerHTML = event.screenX;
			mousemoveClientY.innerHTML = event.clientY;
			mousemoveOffsetY.innerHTML = event.offsetY;
			mousemovePageY.innerHTML = event.pageY;
			mousemoveScreenY.innerHTML = event.screenY;

		});

		jQuery( document ).on( "mousedown", function( event ) {

			mousedownClientX.innerHTML = event.clientX;
			mousedownOffsetX.innerHTML = event.offsetX;
			mousedownPageX.innerHTML = event.pageX;
			mousedownScreenX.innerHTML = event.screenX;
			mousedownClientY.innerHTML = event.clientY;
			mousedownOffsetY.innerHTML = event.offsetY;
			mousedownPageY.innerHTML = event.pageY;
			mousedownScreenY.innerHTML = event.screenY;

		});

		jQuery( document ).on( "mouseup", function( event ) {

			mouseupClientX.innerHTML = event.clientX;
			mouseupOffsetX.innerHTML = event.offsetX;
			mouseupPageX.innerHTML = event.pageX;
			mouseupScreenX.innerHTML = event.screenX;
			mouseupClientY.innerHTML = event.clientY;
			mouseupOffsetY.innerHTML = event.offsetY;
			mouseupPageY.innerHTML = event.pageY;
			mouseupScreenY.innerHTML = event.screenY;

		});

	}

	
	// Map Class Public Properties, Constructor, & Methods 
	return {
		initialize: initialize,
	};

}());