import * as UserInfo from "./actions/UserInfo/index.js"
import Github from "./providers/github/index.js"
export const entry = async (API) => {
	API.Notification({
		title:'Github',
		content:'Github started'
	})
	// console.log(Tab)
	var provider = new Github({auth:"***REMOVED***"})
	var options = {panel:null}
	await UserInfo.open({API,provider,options})
}
