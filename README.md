# NodeJs Model Framework


#####Here is the model Express Js based Node Js API Framework, which supports the belwo items.

###This Framework Includes:
				
				1.Cluster / Standalone Server
				
				2.Routes
				
				3.Business
				
				4.Service 
				
				5.Identity
				
				6.Errors / Error Handling
				
				7.Unit Test Framework / Tested with Couple of use cases with Mocha, Chai, Sinon
				
				8.Unit Test Code Coverage - Istanbul
				
				9.Logging (Console/File based)
				
				10.Configuration Management (Bootstrapping , Environment Configuration Handler)
				
				11.Performance Tests (Will give it later, let me know)


##Happy Coding

## If you need any help contact @ nithyanantha.babu@in.tesco.com


## How to Run: 

Install NodeJs from the following url according to your operating system:

				https://nodejs.org/en/


Download the source code:

				git clone https://github.dev.global.tesco.org/wv62/NodeJsModelFramework.git


Change your directory pointing to  "NodeJsModelFramework" folder


Install grunt cli globaly:

				npm install grunt-cli -g


Install Dev/Prod NPM Packages using following command

				npm install


Then run the below command to build ECMA6 Scripts.

				grunt build 


Then you will see "app" folder getting created in your root folder, change the directory to "app" folder, and run the following command to run the server: 
				

				"node server.js" 

###Enable Cluster:

if you want to run the node js as multi threaded, please run the following command:

				"node server.js prod 1"


### Grunt commands:

			if you want to run entire build: run   "grunt build -v"
			if you want to clean the app folder: run   "grunt clean -v"
			if you want to just compile your ES6 Code to app folder: run   "grunt compile -v"
			if you want to update the config to the app folder: run   "grunt updateconfig -v"


### Documentation in progress... Happy Coding
