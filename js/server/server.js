var express = require('express');
var server = express();
server.use(express.static(__dirname + './../../'))

var mainData = {
	tickets: [
		{
			code: "BG-15",
			title: "Email Validation Not Working",
			status: "testing",
			owner: "abucin",
			type: "bug",
			description: "The email validation is broken for several users."
		}, {
			code: "BG-21",
			title: "Authentication Whitespace Handling",
			status: "created",
			owner: "abucin",
			type: "bug",
			description: "The authentication ignores whitespace."
		}, {
			code: "BG-5",
			title: "Registration Page Header Missing",
			status: "fixed",
			owner: "abucin",
			type: "bug",
			description: "The registration page does not contain any headers."
		}, {
			code: "BG-8",
			title: "Minor CSS Alignment Bug",
			status: "in_progress",
			owner: "abucin",
			type: "bug",
			description: "The logo is misaligned in IE6."
		}, {
			code: "BG-221",
			title: "Fix CSS Button Padding",
			status: "in_progress",
			owner: "psmith",
			type: "bug",
			description: "The login button has extra padding."
		}, {
			code: "TA-21",
			title: "Implement User Registration Mechanism",
			status: "testing",
			owner: "abucin",
			type: "task",
			description: "Create a secure mechanism for registering an account."
		}, {
			code: "TA-15",
			title: "Review Currency Conversion Code",
			status: "created",
			owner: "abucin",
			type: "task",
			description: "See title."
		}, {
			code: "TA-4",
			title: "Plan Review Meeting",
			status: "in_progress",
			owner: "abucin",
			type: "task",
			description: "This Thursday at 10:00."
		}, {
			code: "TA-8",
			title: "Implement User Password Reset Functionality",
			status: "created",
			owner: "abucin",
			type: "task",
			description: "Create a secure mechanism for resetting a password for an account."
		}, {
			code: "TA-10",
			title: "Revoke Domain Credentials",
			status: "done",
			owner: "abucin",
			type: "task",
			description: "Revoke domain credentials for inactive users."
		}, {
			code: "TA-110",
			title: "Add Colour Palette",
			status: "done",
			owner: "psmith",
			type: "task",
			description: "Create a colour palette for the website."
		}, {
			code: "TA-130",
			title: "Remove Redundant Tests",
			status: "in_progress",
			owner: "mlawrence",
			type: "task",
			description: "Remove tests that are not used."
		}, {
			code: "BG-130",
			title: "Syntax Highlighting Broken",
			status: "done",
			owner: "mlawrence",
			type: "bug",
			description: "See title."
		}
	]
};

server.get('/itracker/api/main', function (req, res) {
	res.send(mainData);
});

server.listen(3000);
console.log('Listening on port 3000');
