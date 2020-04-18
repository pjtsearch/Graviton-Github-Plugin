// import * as UserInfo from "./actions/UserInfo/index.js"
import Github from "./providers/github/index.js"
import * as commandPrompt from "./triggers/commandPrompt"
import * as statusBar from "./triggers/statusBar"
export const entry = async (API) => {
	API.Notification({
		title:'Github',
		content:'Github started'
	})
	var options = {panel:null}
	commandPrompt.register({API,options})
	statusBar.register({API,options})
}
