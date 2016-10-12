// Version 0.3

function main() {

	Slx.Input.activateEventHandlers();
	Slx.SlxDocument.init();

	var x = new Slx.Bay( 60, 60, 60, 60);
	x.toggleHtml();

	SlxDebug.initialize();

	Slx.startMainLoop();

}