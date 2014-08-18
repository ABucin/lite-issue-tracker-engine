issue-tracker v.1.0
=============

Repository for the issue tracker application.

#### Versioning

`<major>.<minor>.<patch>`

### Technology Stack

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

##### Server Side

* Node.js v0.10.30
  * Express
  	* Passport (passport-local, passport-local-mongoose)
	* Connect
	* Cookie-Parser
	* Express-Session
  * Bower
  * Grunt
  	* Uglify
	* Concat
	* Watch
	* Copy
	* Less
  * Mongoose
  * Underscore
* MongoDB 2.6 Standard

##### Client Side

* Angular.js 1.2.21
	* angular-route
	* angular-cookies
	* angular-touch
* Bootstrap 3.2.0
* Font Awesome 4.1.0
* Ionicons 1.5.2
* jQuery 2.1.1
* Highcharts.js 4.0.3

### Development Setup

1. Run `git clone https://github.com/ABucin/issue-tracker.git` to get the files.
2. Install Node.js from `http://nodejs.org/` .
3. Install MongoDB from `http://www.mongodb.org/downloads` .
4. In Windows, open a console using `Shift + right-click on project folder > Open command window here` . In Unix, go to the cloned files directory using the terminal.
5. Run `install.sh` or `install.bat` .
6. Deploy the application by using `deploy_app.sh` or `deploy_app.bat` . This will start the server and recompile all the client files.
7. For Windows, start the database server by using `start_db_server.bat` . For Linux, use the `mongo` command.
8. To access the application, go to `http://localhost:3000/index.html` in your favourite browser.
