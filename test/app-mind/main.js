// Version 0.3

function main() {

	SlxPanel = Slx.Panel;
	SlxInput = Slx.Input;

	SlxPanel.initialize();
	SlxInput.activateEventHandlers();
	SlxPanel.loadAllOfType( "Chemistry" );
	SlxPanel.displayAll( jQuery( "div#panels_container" ) );

	var x = new Slx.Bay( 60, 60, 60, 60);
	x.toggleHtml();
	var y = new Slx.Bay( 1400, 60, 60, 60);
	y.toggleHtml();

	SlxDebug.initialize();

}