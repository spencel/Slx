import io
import os

dictDirectives = {}
nextId = 0

buildDir = "../../build/"

# Look for directives bracketed by <| |>, e.g., <|directive|> and replace them with IDs.
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
					if line[ i ] == "-":
						i += 1
						j = i - 2
						while i < uBound:
							print( "c: " + line[ i ] )
							print( "d: " + line[ i : i + 2 ] )
							if line[ i : i + 2 ] == "-_":
								print( directive )
								if "_-" + directive + "-_" not in dictDirectives.keys():
									dictDirectives[ "_-" + directive + "-_" ] = "_" + str( nextId )
									nextId += 1
								outputLine += dictDirectives[ "_-" + directive + "-_" ]
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
srcDir = "../../src/"
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
					if line[ i ] == "-":
						i += 1
						j = i - 2
						while i < uBound:
							print( "c: " + line[ i ] )
							print( "d: " + line[ i : i + 2 ] )
							if line[ i : i + 2 ] == "-_":
								print( directive )
								if "_-" + directive + "-_" not in dictDirectives.keys():
									dictDirectives[ "_-" + directive + "-_" ] = "_" + str( nextId )
									nextId += 1
								outputLine += dictDirectives[ "_-" + directive + "-_" ]
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

