import Github from "../providers/github/index.ts"
import * as Config from "../actions/Config"
import * as fs from "fs"
import * as git from "isomorphic-git"

export default async ({API})=>{
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
    const dir = API.RunningConfig.data.workspaceConfig.folders[0].path
    // console.log(dir)
    console.log(await git.listRemotes({fs,dir}))
    
    if (providerName === "github"){
        return new Github({auth})
    }
}