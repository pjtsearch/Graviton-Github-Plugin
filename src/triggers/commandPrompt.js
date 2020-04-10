import * as UserInfo from "../actions/UserInfo"
import * as Config from "../actions/Config"

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
        }
    ]
}

