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