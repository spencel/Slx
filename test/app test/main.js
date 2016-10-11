// Version 0.3

function main() {

	SlxInput = Slx.Input;

	SlxInput.activateEventHandlers();

	var x = new Slx.Bay( 60, 60, 60, 60);
	x.toggleHtml();
	var y = new Slx.Bay( 1400, 60, 60, 60);
	y.toggleHtml();

	SlxDebug.initialize();

}