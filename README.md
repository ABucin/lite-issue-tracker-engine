issue-tracker
=============

Repository for the issue tracker application.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

#### Technology Stack

* Angular.js 1.2.16
* Bootstrap 3.1.1
* Font Awesome 4.0.3
* jQuery 2.1.0
* Node.js v0.10.26
  * Express
  * Bower
  * Grunt
  	* Uglify
	* Concat
	* Watch
  * Mongoose
  * Body-Parser
  * Underscore
* MongoDB 2.6 Standard
* Highcharts.js 4.0.1

#### Development Setup

1. Run `git clone https://github.com/ABucin/issue-tracker.git` to get the files.
2. Install Node.js from `http://nodejs.org/` .
3. Install MongoDB from `http://www.mongodb.org/downloads` .
4. In Windows, open a console using `Shift + right-click on project folder > Open command window here` . In Unix, go to the cloned files directory using the terminal.
5. Run `install.sh` or `install.bat` .
6. Deploy the application by using `deploy_app.sh` or `deploy_app.bat` . This will start the server and recompile all the client files.
7. For Windows, start the database server by using `start_db_server.bat` . For Linux, use the `mongo` command.
8. To access the application, go to `http://localhost:3000/index.html` in your favourite browser.