exports.getConfig = function (type, res) {
	var result = {};
	switch (type) {
	case "profile":
		{
			result = {
				firstName: "Andrei",
				lastName: "Bucin",
				email: "abucin@gmail.com"
			};
			break;
		}
	default:
		{
			break;
		}
	}
	res.json(result);

};
