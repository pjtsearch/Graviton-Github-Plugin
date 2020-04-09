import Github from "../providers/github/index.js"
import * as Config from "../actions/Config"

export default ({API})=>{
    if (!API.StaticConfig.data.github) API.StaticConfig.data.github = {}
    if (!API.StaticConfig.data.github.provider) API.StaticConfig.data.github.provider = "github"
    const providerName = API.StaticConfig.data.github.provider
    // console.log(API.StaticConfig.data.github.auth)
    if (!API.StaticConfig.data.github.auth) {
        API.Notification({
            title:'Github Plugin: No authentification provided',
            content:'Opening config'
        })
        Config.open({API})
        throw new Error("Github Plugin: No authentification provided")
        // return
    }
    const auth = API.StaticConfig.data.github.auth
    
    if (providerName === "github"){
        return new Github({auth})
    }
}