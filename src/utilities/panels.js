let tabs = []
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
        if (tabElement.getAttribute("classselector").includes(id)){
          const id = tabElement.getAttribute("classselector").split(":")[0].replace(/^(tab)/,"")
          console.log(id)
          tabs = tabs.filter(t=>t.id!==id)
        }
    }))
    events.push(API.RunningConfig.on('setWorkspace',()=>{
      console.log(id)
      remove({id,RunningConfig:API.RunningConfig,events})
      tabs = []
    }))
    events.push(API.RunningConfig.on('addFolderToRunningWorkspace',()=>{
      console.log(id)
      remove({id,RunningConfig:API.RunningConfig,events})
      tabs = []
    }))
    // console.log(API.RunningConfig)
    return panelElement
}
export const restoreTabs = ()=>{
  tabs.forEach(openTab);
}
export const remove = ({id,RunningConfig,events}) => {
    if (document.getElementById(id)){
      document.getElementById(id).remove()
      RunningConfig.data.focusedPanel = document.querySelector("#mainpanel").children[0]
      if (events) events.forEach(event=>event.cancel());
    }
}
export const openTab = ({API,options,title,component,id}) => {
  var panel = options.panel
  if (!options.panel || !document.body.contains(options.panel)) {
      tabs = tabs.filter(tab=>tab.id!==id)
      panel = create({API})
      options.panel = panel
      restoreTabs()
  }
  tabs.push({API,options,title,component,id})
  API.Tab({
      title:title,
      isEditor:false,
      component,
      panel,
      id:`${id}:${panel.id}`
  })
}
