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
  * Mongo

#### Configuring Application Development (WIN)

1. Run `git clone https://github.com/ABucin/issue-tracker.git` to get the files.
2. Install Node.js from `http://nodejs.org/` .
3. Open a console using `Start > type 'cmd'` or `Start > Run > cmd` .
4. Run `npm install -g bower` and `npm install -g grunt-cli` .
5. Go to the folder where you cloned the repo and run `bower install`, `npm install grunt --save-dev`, `npm install grunt-contrib-uglify --save-dev`,`npm install express`, `npm install passport` and `npm install mongo` .
7. Start the server by using `start_server.bat` .
8. To access the application, go to `http://localhost:3000/index.html` in your favourite browser.