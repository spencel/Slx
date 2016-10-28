# Version 0.1

import io
import os

# Info and namespace

srcDir = "../../src/"
buildDir = "../../build/"

code = "\
// Version 0.1\n\
\n\
var Slx = (function() {\n"

# Globals

code += "\n\
	// Globals\n\
	\n\
	// Variables\n"

with open( srcDir + "globals/variables.js", "r", encoding="utf-8" ) as f:
	for line in f:
		code += "\t" + line

code += "\n\
	// End Variables\n\
	\n\
	// Functions\n"

with open( srcDir + "globals/functions.js", "r", encoding="utf-8" ) as f:
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

fileNames = [
	"Bay.js",
	"Input.js",
	"Panel.js",
	"SlxDocument.js"
]

for fileName in fileNames:
	with open( srcDir + "core/" + fileName, "r", encoding="utf-8" ) as f:
		for line in f:
			code += "\t" + line
	code += "\n\
	\n"

code += "\
	// End Classes\n\
	\n\
	return {\n\
		\n\
		startMainLoop: startMainLoop,\n\
		\n\
		Bay: Bay,\n\
		\n\
		Panel: Panel,\n\
		\n\
		Input: Input,\n\
		\n\
		SlxDocument: SlxDocument,\n\
		\n\
	}\n\
\n\
}());"

with open( buildDir + "slx.js", "w", encoding="utf-8" ) as f:
	f.write( code )

with open( srcDir + "/css/style.css", "r", encoding="utf-8" ) as fileInput:
	with open( buildDir + "/css/style.css", "w", encoding="utf-8" ) as fileOutput:
		for line in fileInput:
			fileOutput.write( line )



# Look for directives bracketed by "__ __", e.g., "__directive__" and replace them with IDs.
dictDirectives = {}
nextId = 0

with open( buildDir + "slx.js", "r", encoding="utf-8" ) as inputFile:
	with open( buildDir + "slx-mind.js", "w", encoding="utf-8" ) as outputFile:
		for line in inputFile:
			directive = ""
			outputLine = ""
			i = 0
			uBound = len( line )
			while i < uBound:
				print( "a: " + line[ i ] )
				if line[ i ] == "_":
					i += 1
					print( "b: " + line[ i ] )
					if line[ i ] == "_":
						i += 1
						j = i - 2
						while i < uBound:
							print( "c: " + line[ i ] )
							print( "d: " + line[ i : i + 2 ] )
							if line[ i : i + 2 ] == "__":
								print( directive )
								if "__" + directive + "__" not in dictDirectives.keys():
									dictDirectives[ "__" + directive + "__" ] = "_" + str( nextId )
									nextId += 1
								outputLine += dictDirectives[ "__" + directive + "__" ]
								directive = ""
								i += 2
								print( "e: " + line[ i ] )
								break
							else:
								directive += line[ i ]
								i += 1
					else:
						outputLine += line[ i ]
						i += 1
				else:
					outputLine += line[ i ]
					i += 1
			outputFile.write( outputLine )
print( dictDirectives )

# Have to replace directives in style sheet too.
with open( srcDir + "css/style.css", "r", encoding="utf-8" ) as inputFile:
	with open( buildDir + "/css/style-mind.css", "w", encoding="utf-8" ) as outputFile:
		for line in inputFile:
			directive = ""
			outputLine = ""
			i = 0
			uBound = len( line )
			while i < uBound:
				print( "a: " + line[ i ] )
				if line[ i ] == "_":
					i += 1
					print( "b: " + line[ i ] )
					if line[ i ] == "_":
						i += 1
						j = i - 2
						while i < uBound:
							print( "c: " + line[ i ] )
							print( "d: " + line[ i : i + 2 ] )
							if line[ i : i + 2 ] == "__":
								print( directive )
								if "__" + directive + "__" not in dictDirectives.keys():
									dictDirectives[ "__" + directive + "__" ] = "_" + str( nextId )
									nextId += 1
								outputLine += dictDirectives[ "__" + directive + "__" ]
								directive = ""
								i += 2
								print( "e: " + line[ i ] )
								break
							else:
								directive += line[ i ]
								i += 1
					else:
						outputLine += line[ i ]
						i += 1
				else:
					outputLine += line[ i ]
					i += 1
			outputFile.write( outputLine )
print( dictDirectives )