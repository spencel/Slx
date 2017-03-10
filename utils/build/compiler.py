# Version 0.2

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

for entry in os.scandir( srcDir + "core"):
	if entry.is_file() == True:
		with open( srcDir + "core/" + entry.name, "r", encoding="utf-8" ) as f:
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


# Style
with open( buildDir + "css/style.css", "w", encoding="utf-8" ) as bldFile:
	for entry in os.scandir( srcDir + "css"):
		if entry.is_file() == True:
			with open( srcDir + "css/" + entry.name, "r", encoding="utf-8" ) as srcFile:
				for srcLine in srcFile:
					bldFile.write( srcLine );
				bldFile.write( "\n" );

'''
with open( srcDir + "css/style.css", "r", encoding="utf-8" ) as fileInput:
	with open( buildDir + "css/style.css", "w", encoding="utf-8" ) as fileOutput:
		for line in fileInput:
			fileOutput.write( line )
'''

# Minify html id and class attribute tags (Method A)
dictTags = {}
nextTagId = 0
# tagOpener and tagCloser must be legal css names, i.e., cannot start with a number and can only contain "_", and alphanumeric characters. "-" is reserved as a delimiter
tagOpener = "_s_" # Eg: "_s_MyStringTag_e_-_s_MyStringTag2_e_"
tagCloser = "_e_"
minifiedChar = "_" # Eg: "_s_MyStringTag_e_-_s_MyStringTag2_e_" becomes "_0-_1" and css files are minified accordingly
with open( buildDir + "slx.js", "r", encoding="utf-8" ) as inputFile:
	with open( buildDir + "slx-mind.js", "w", encoding="utf-8" ) as outputFile:
		for line in inputFile:
			charIndex = 0
			lineCharQty = len( line )
			while charIndex != -1:
				charIndex = line.find( tagOpener, charIndex )
				if charIndex > 0:
					tagStartIndex = charIndex + len( tagOpener )
					tagEndIndex = line.find( tagCloser, tagStartIndex )
					tag = line[ tagStartIndex : tagEndIndex ]
					if tag not in dictTags.keys():
						minifiedTag = minifiedChar + str( nextTagId )
						nextTagId += 1
						dictTags[ tag ] = minifiedTag
					line = line[ : charIndex ] + dictTags[ tag ] + line[ ( tagEndIndex + len( tagCloser ) ) : ]
			outputFile.write( line )

with open( buildDir + "css/style.css", "r", encoding="utf-8" ) as inputFile:
	with open( buildDir + "/css/style-mind.css", "w", encoding="utf-8" ) as outputFile:
		for line in inputFile:
			charIndex = 0
			lineCharQty = len( line )
			while charIndex != -1:
				charIndex = line.find( tagOpener, charIndex )
				if charIndex > 0:
					tagStartIndex = charIndex + len( tagOpener )
					tagEndIndex = line.find( tagCloser, tagStartIndex )
					tag = line[ tagStartIndex : tagEndIndex ]
					if tag not in dictTags.keys():
						minifiedTag = minifiedChar + str( nextTagId )
						nextTagId += 1
						dictTags[ tag ] = minifiedTag
					line = line[ : charIndex ] + dictTags[ tag ] + line[ ( tagEndIndex + len( tagCloser ) ) : ]
			outputFile.write( line )






''' # Minify html id and class attribute tags (Method B)
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
				if line[ i ] == "_":
					i += 1
					if line[ i ] == "_":
						i += 1
						j = i - 2
						while i < uBound:
							if line[ i : i + 2 ] == "__":
								if "__" + directive + "__" not in dictDirectives.keys():
									dictDirectives[ "__" + directive + "__" ] = "_" + str( nextId )
									nextId += 1
								outputLine += dictDirectives[ "__" + directive + "__" ]
								directive = ""
								i += 2
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

# Have to replace directives in style sheet too.
with open( buildDir + "css/style.css", "r", encoding="utf-8" ) as inputFile:
	with open( buildDir + "/css/style-mind.css", "w", encoding="utf-8" ) as outputFile:
		for line in inputFile:
			directive = ""
			outputLine = ""
			i = 0
			uBound = len( line )
			while i < uBound:
				if line[ i ] == "_":
					i += 1
					if line[ i ] == "_":
						i += 1
						j = i - 2
						while i < uBound:
							if line[ i : i + 2 ] == "__":
								#print( directive )
								if "__" + directive + "__" not in dictDirectives.keys():
									dictDirectives[ "__" + directive + "__" ] = "_" + str( nextId )
									nextId += 1
								outputLine += dictDirectives[ "__" + directive + "__" ]
								directive = ""
								i += 2
								#print( "e: " + line[ i ] )
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
#print( dictDirectives )
'''