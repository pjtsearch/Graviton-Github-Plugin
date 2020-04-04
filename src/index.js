const UserInfo = require("./actions/UserInfo/index.js")
const Github = require("./providers/github/index.js")
const entry = (API) => {
	API.Notification({
		title:'Github',
		content:'Github started'
	})
	// console.log(Tab)
	var provider = new Github({auth:"***REMOVED***"})
	UserInfo.open({API,provider})
}
module.exports = { entry }
