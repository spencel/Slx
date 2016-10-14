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