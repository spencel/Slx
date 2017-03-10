'''
This is a javascript to javascript transcompiler and file concatenator
It utilizes directory and file names to determine dependency?, etc.
E.g.:
nameSpace.js
nameSpace/
	ClassA.js
	ClassB.js
	etc.
	ModuleA.js
	ModuleA/
		ClassA.js
		ClassB.js
		etc.
	ModuleB.js
	ModuleB/
		ClassA.js
		ClassB.js
		etc.
	etc.
The Class names above do not conflict because they are in isolated scopes, namespaces, and modules.
Global variables and functions are coded inside the namespace and module js files.
'''
import io
import os

# Info and moduleName

sourceDirectory = "../../src/"
buildDirectory = "../../build/"
namespaceName = "myNamespace"
buildFileName = "myNamespace-v0.0.0.js"
keywords = {
	"public": "public",
	"private": "private",
	"public module": "public module",
	"public class": "public class",
	"private class": "private class",
	"static property": "static var",
	"instance property": "\tinstance var",
	"static method": "static function",
	"instance method": "instance function",
	"class constructor": "constructor function"
}
publicKeyword = keywords[ "public" ]
publicModuleKeyword = keywords[ "public module" ]
privateKeyword = keywords[ "private" ]
privateClassKeyword = keywords[ "private class" ]
publicClassKeyword = keywords[ "public class" ]
staticPropertyKeyword = keywords[ "static property" ]
instancePropertyKeyword = keywords[ "instance property" ]
staticMethodKeyword = keywords[ "static method" ]
instanceMethodKeyword = keywords[ "instance method" ]
classConstructorKeyword = keywords[ "class constructor" ]

def loopSubdirectory( subDirectory, publicMembers ):
	for directoryItem in os.listdir( subDirectory ):
			if directoryItem.endswith( ".js" ):
				fileName = directoryItem
				print( fileName )
				buildFile.write( "\n\n// " + subDirectory + fileName + "\n" )
				with io.open( subDirectory + fileName, "r", encoding="utf-8" ) as file:
					for line in file:
						
						if line.startswith( publicModuleKeyword ):
							print( "public module" )
							subModuleName = fileName[ : len( fileName ) - 3 ]
							publicMembers.append( subModuleName )
							line = line.replace( publicModuleKeyword, "/*" + publicModuleKeyword + "*/ var ")
							line = line.replace( "{}", " = (function() {" )
							buildFile.write( line )
							print( line )
							compileModule( file, subDirectory, subModuleName )
							break
						
						elif line.startswith( publicClassKeyword ):
							print( "public class")
							className = fileName[ : len( fileName ) - 3 ]
							print( className )
							publicMembers.append( className )
							line = "/*" + line[ : -1 ] + "*/"
							print( line )
							buildFile.write( line )
							compileClass( file, className )
							break

						elif line.startswith( privateClassKeyword ):
							print( "private class" )
							className = fileName[ : len( fileName ) - 3 ]
							print( className )
							line = "/*" + line[ : -1 ] + "*/"
							print( line )
							buildFile.write( line )
							compileClass( file, className )
							break

						buildFile.write( line )

def compileModule( file, directory, moduleName ):
	publicMembers = []
	for line in file:

		# If line is public member opener
		if line.find( publicKeyword ) > -1:

			# If public function/method
			if line.find( " function " ) > -1:
				memberNameStartIndex = len( publicKeyword ) + len( " function " )
				memberNameEndIndex  = line.find( "(", memberNameStartIndex )
				memberName = line[ memberNameStartIndex : memberNameEndIndex ]
				print( memberName )
				publicMembers.append( memberName )
				line = line.replace( publicKeyword, "/*" + publicKeyword + "*/", 1 )
				print( line )

			# Else if variable/property
			elif line.find( " var " ) > -1:
				memberNameStartIndex = len( publicKeyword ) + len( " var " )
				memberNameEndIndex  = line.find( " = " )
				memberName = line[ memberNameStartIndex : memberNameEndIndex ]
				print( memberName )
				publicMembers.append( memberName )
				line = line.replace( publicKeyword, "/*" + publicKeyword + "*/", 1 )
				print( line )

		# If line is private member opener
		elif line.find( privateKeyword ) > -1:

			# If private function/method
			if line.find( " function " ) > -1:
				line = line.replace( privateKeyword, "/*" + privateKeyword + "*/", 1 )
				print( line )

			# Else if private variable/property
			elif line.find( " var " ) > -1:
				line = line.replace( privateKeyword, "/*" + privateKeyword + "*/", 1 )
				print( line )

		buildFile.write( line )

	# Loop through corresponding module directory
	subDirectory = directory + moduleName + "/"
	loopSubdirectory( subDirectory, publicMembers )
			
	buildFile.write( "\n// Expose Public Members\nreturn {")
	for i, member in enumerate( publicMembers ):
		buildFile.write( "\n\n" + member + ": " + member)
		# Handle commas
		if i < len( publicMembers ) - 1:
			buildFile.write( "," )
	buildFile.write( "\n\n}")
	buildFile.write( "\n\n}());" )

def compileClass( file, className ):
	for line in file:
		
		# If line is class constructor
		if line.startswith( classConstructorKeyword ):
			line = line.replace( classConstructorKeyword, "/*constructor*/ function")
			print( line )

		# If line is static property
		elif line.startswith( staticPropertyKeyword ):
			line = line.replace( staticPropertyKeyword + " ", className + "." )

		# If line is instance property
		elif line.startswith( instancePropertyKeyword ):
			line = line.replace( instancePropertyKeyword + " ", "\tthis." )

		# If line is static method
		elif line.startswith( staticMethodKeyword ):
			line = line.replace( staticMethodKeyword + " ", className + "." )

		# If line is instance method
		elif line.startswith( instanceMethodKeyword ):
			line = line.replace( instanceMethodKeyword + " ", className + ".prototype." )

		buildFile.write( line )
			
# Initialize
with io.open( buildDirectory + buildFileName, "w", encoding="utf-8" ) as buildFile:
	
	path = sourceDirectory + namespaceName + ".js"
	
	with io.open( path, "r", encoding="utf-8" ) as file:

		for line in file:
						
			if line.startswith( publicModuleKeyword ):
				line = line.replace( publicModuleKeyword, "/*" + publicModuleKeyword + "*/ var ")
				line = line.replace( "{}", " = (function() {" )
				buildFile.write( line )
				print( line )
				compileModule( file, sourceDirectory, namespaceName )
				break
	

