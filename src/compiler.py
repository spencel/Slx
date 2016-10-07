import io
import os

# Info and namespace

code = "\
// Version 0.1\n\
\n\
var Slx = (function() {\n"

# Globals

code += "\n\
	// Globals\n\
	\n\
	// Variables\n"

f = open( "globals/variables.js", "r", encoding="utf-8" )
for line in f:
	code += "\t" + line

code += "\n\
	// End Variables\n\
	\n\
	// Functions\n"

f = open( "globals/functions.js", "r", encoding="utf-8" )
for line in f:
	code += "\t" + line

code += "\n\
	// End Functions\n\
	\n\
	// End Globals\n\
	\n"

# Classes

code += "\
	// Classes\n\
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
		globalTestVariable: globalTestVariable,\n\
		\n\
		doMathJax: doMathJax,\n\
		\n\
		Bay: Bay,\n\
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

f = open( "../build/slx.js", "w", encoding="utf-8" )
f.write( code )
f.close()