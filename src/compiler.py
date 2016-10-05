import io
import os

code = "\
// Version 0.1\n\
\n\
var Slx = (function() {\n\
\n"

code += "\
	//Classes\n\
	\n"

for fileName in os.listdir( "core/" ):
	f = open( "core/" + fileName, "r", encoding="utf-8" )
	for line in f:
		code += "\t" + line
	code += "\n\
	\n"

code += "\
	// End Classes\n\
	\n\
	return {\n\
	\n\
	Panel: Panel,\n\
	\n\
	Input: Input,\n\
	\n\
	//Menu: Menu,\n\
	\n\
	//ViewPort: ViewPort\n\
	\n\
	}\n\
\n\
}());"

f = open( "slx.js", "w", encoding="utf-8" )
f.write( code )
f.close()