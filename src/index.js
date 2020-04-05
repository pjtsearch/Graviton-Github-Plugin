import * as UserInfo from "./actions/UserInfo/index.js"
import Github from "./providers/github/index.js"
import * as commandPrompt from "./triggers/commandPrompt"
export const entry = async (API) => {
	API.Notification({
		title:'Github',
		content:'Github started'
	})
	// console.log(Tab)
	const provider = new Github({auth:"***REMOVED***"})
	var options = {panel:null,provider}
	commandPrompt.register({API,options})
}
