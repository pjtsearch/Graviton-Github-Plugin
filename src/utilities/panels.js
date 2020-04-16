export const get = ()=> document.querySelectorAll("#mainpanel > *")
export const getIds = ()=> [...get()].map(ele=>ele.id)
export const create = ({API})=> {
    var oldIds = getIds()
    API.RunningConfig.emit('command.newPanel')
    var newIds = getIds()
    var id = newIds.find((newId)=>!oldIds.some((oldId)=> oldId === newId));
    var panelElement = document.getElementById(id)
    var events = []

    events.push(API.RunningConfig.on('aTabHasBeenClosed',function({tabElement}){
        if (tabElement.getAttribute("classselector").includes(id) && panelElement.querySelector(`.tabsbar`).children.length === 0){
            remove({id,RunningConfig:API.RunningConfig,events})
        }
    }))
    events.push(API.RunningConfig.on('setWorkspace',()=>{
      console.log(id)
      remove({id,RunningConfig:API.RunningConfig,events})
    }))
    events.push(API.RunningConfig.on('addFolderToRunningWorkspace',()=>{
      console.log(id)
      remove({id,RunningConfig:API.RunningConfig,events})
    }))
    console.log(API.RunningConfig)
    return panelElement
}
export const remove = ({id,RunningConfig,events}) => {
    if (document.getElementById(id)){
      document.getElementById(id).remove()
      RunningConfig.data.focusedPanel = document.querySelector("#mainpanel").children[0]
      if (events) events.forEach(event=>event.cancel());
    }
}
