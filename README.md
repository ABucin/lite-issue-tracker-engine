issue-tracker
=============

Repository for the issue tracker application. You can check the latest release notes [here.] (https://github.com/ABucin/issue-tracker/releases)

### Versioning

Version template: `<major>.<minor>.<patch>`

### Wiki

The wiki can be found [here](https://github.com/ABucin/issue-tracker/wiki).

### Installation

#### Pre-requisites:

1. Install Node.js from `http://nodejs.org/` .
2. Install MongoDB from `http://www.mongodb.org/downloads` .

#### Steps:

1. Run `git clone https://github.com/ABucin/issue-tracker.git` to get the files.
2. 
  1. **Windows:** open a console using `Shift + right-click on project folder > Open command window here` .
  2. **Linux:** go to the cloned files directory using the terminal.
4. Run `install.sh` or `install.bat` .
5. Deploy the application by using `deploy_app.sh` or `deploy_app.bat` . This will start the server and recompile all the client files.
6. 
  1. **Windows:** start the database server by using `start_db_server.bat` . 
  2. **Linux:** start the database server by using the `mongo` command.
8. To access the application, go to `http://localhost:3000/index.html` using your favourite browser.
