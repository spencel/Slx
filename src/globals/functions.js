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