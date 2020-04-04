import { open } from "./actions/UserInfo/index.js"
import Github from "./providers/github/index.js"
export const entry = (API) => {
	API.Notification({
		title:'Github',
		content:'Github started'
	})
	// console.log(Tab)
	var provider = new Github({auth:"***REMOVED***"})
	open({API,provider})
}
