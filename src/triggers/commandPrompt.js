import * as UserInfo from "../actions/UserInfo"
import * as Config from "../actions/Config"
import * as Issues from "../actions/Issues"

export const register = ({API,options}) => {
    API.RunningConfig.data.globalCommandPrompt = [
        ...API.RunningConfig.data.globalCommandPrompt,
        {
            label: "github user-info",
            action(){
                UserInfo.open({API,options})
            }
        },
        {
            label: "github config",
            action(){
                Config.open({API,options})
            }
        },
        {
            label: "github issues",
            action(){
                Issues.open({API,options})
            }
        }
    ]
}

