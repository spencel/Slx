function main() {

	var strHtml = ""

	for ( var i = 0; i < 32768; i++ ) {

		strHtml += "&#" + i + ";";

		jQuery( "body" ).html( strHtml );

	}

}