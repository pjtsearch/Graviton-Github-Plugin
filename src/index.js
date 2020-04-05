import * as UserInfo from "./actions/UserInfo/index.js"
import Github from "./providers/github/index.js"
export const entry = async (API) => {
	API.Notification({
		title:'Github',
		content:'Github started'
	})
	// console.log(Tab)
	var provider = new Github({auth:"***REMOVED***"})
	var options = {panel:null,provider}
	await UserInfo.open({API,options})
	// console.log(API.RunningConfig)
	// API.RunningConfig.data.globalCommandPrompt.push({label:"Test"})
	// API.RunningConfig.on('command.openCommandPrompt',()=>{
	// 	document.getElementById("global").onclick = e=>{
	// 		console.log(e.target.innerText)
	// 	}
	// })
}
