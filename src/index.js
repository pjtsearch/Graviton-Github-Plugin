// import * as UserInfo from "./actions/UserInfo/index.js"
import Github from "./providers/github/index.js"
import * as commandPrompt from "./triggers/commandPrompt"
import * as statusBar from "./triggers/statusBar"
import * as sidePanel from "./triggers/sidePanel"
export const entry = async (API) => {
	API.Notification({
		title:'Github',
		content:'Github started'
	})
	// console.log(API.SidePanel)
	var options = {panel:null}
	// commandPrompt.register({API,options})
	// statusBar.register({API,options})
	sidePanel.register({API,options})
}
