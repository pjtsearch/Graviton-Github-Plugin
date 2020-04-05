import * as UserInfo from "~/actions/UserInfo/index.js"

export const register = ({API,options}) => {
    API.RunningConfig.data.globalCommandPrompt = [
        ...API.RunningConfig.data.globalCommandPrompt,
        {
            label: "github user-info",
            action(){
                UserInfo.open({API,options})
            }
        }
    ]
}

