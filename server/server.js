var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	server = express(),
	port = 3000,
	ip = "0.0.0.0",
	router = express.Router(),
	// Required files.
	utils = require('./utils/population'),
	persistenceService = require('./service/persistence'),
	analyticsService = require('./service/analytics'),
	User = require('./model/user');

server.use(cookieParser());
server.use(bodyParser());
// Set the path to the index.html file.
server.use(express.static(__dirname + "./../"));
server.use(session({
	secret: 'SECRET'
}));
server.use(passport.initialize());
server.use(passport.session());
server.use('/itracker/api', router);

server.listen(port, ip);

// Add default data to database.
utils.populateDb();

console.log('Server started. Listening on port %s ...', port);

/**
 * Authentication.
 */
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.route('/register')
	.post(function (req, res) {
		persistenceService.register(req, res);
	});

router.route('/login')
	.post(passport.authenticate('local'), function (req, res) {
		persistenceService.login(req.body.username, res);
	});

router.route('/logout')
	.get(function (req, res) {
		req.logout();
		res.send(200);
	});

/**
 * Users.
 */
router.route('/users?:project')
	.get(function (req, res) {
		if (req.query.project === undefined) {
			persistenceService.getAllUsers(res);
		} else {
			persistenceService.getUsersWithProject(req.query.project, res);
		}
	});

router.route('/users/:uname')
	.get(function (req, res) {
		persistenceService.getUser(req.params.uname, res);
	})
	.put(function (req, res) {
		persistenceService.updateUser(req.params.uname, req.body, res);
	});

/**
 * Comments.
 */
router.route('/tickets/:key/comments')
	.get(function (req, res) {
		persistenceService.getComments(req.params.key, res);
	});

router.route('/users/:uname/tickets/:key/comments')
	.post(function (req, res) {
		persistenceService.createComment(req.params.uname, req.params.key, req.body, res);
	});

router.route('/users/:uname/tickets/:ticketKey/comments/:key')
	.put(function (req, res) {
		persistenceService.updateComment(req.params.key, req.params.ticketKey, req.params.uname, req.body, res);
	});

router.route('/users/:uname/comments/:key')
	.delete(function (req, res) {
		persistenceService.deleteComment(req.params.key, req.params.uname, res);
	});

/**
 * Tickets.
 */
router.route('/users/:uname/tickets')
	.post(function (req, res) {
		persistenceService.createTicket(req.params.uname, req.body, res);
	})
	.get(function (req, res) {
		persistenceService.getTickets(req.params.uname, res);
	});

router.route('/users/:uname/tickets/:key')
	.put(function (req, res) {
		persistenceService.updateTicket(req.params.key, req.params.uname, req.body, res);
	})
	.delete(function (req, res) {
		persistenceService.deleteTicket(req.params.key, req.params.uname, res);
	});

/**
 * Logs.
 */
router.route('/logs')
	.get(function (req, res) {
		persistenceService.getAllLogs(res);
	});

router.route('/users/:uname/logs')
	.post(function (req, res) {
		persistenceService.createLog(req.params.uname, req.body, res);
	});

/**
 * Analytics.
 */
router.route('/analytics?:type')
	.get(function (req, res) {
		analyticsService.getChart(req.query.type, res);
	});

/**
 * Settings.
 */
router.route('/users/:uname/settings')
	.get(function (req, res) {
		persistenceService.getSettings(req.params.uname, res);
	})
	.put(function (req, res) {
		persistenceService.updateAllSettings(req.params.uname, req.body, res);
	});

router.route('/users/:uname/settings/:key')
	.put(function (req, res) {
		persistenceService.updateSettings(req.params.uname, req.params.key, req.body, res);
	});

/**
 * Projects.
 */
router.route('/projects/:pname')
	.put(function (req, res) {
		persistenceService.updateProject(req.params.pname, req.body, res);
	});
