export const get = ()=> document.querySelectorAll("#mainpanel > *")
export const getIds = ()=> [...get()].map(ele=>ele.id)
export const create = ({API})=> {
    var oldIds = getIds()
    API.RunningConfig.emit('command.newPanel')
    var newIds = getIds()
    var id = newIds.find((newId)=>!oldIds.some((oldId)=> oldId === newId));
    var panelElement = document.getElementById(id)
    API.RunningConfig.on('aTabHasBeenClosed',function({tabElement}){
        if (tabElement.getAttribute("classselector").includes(id) && panelElement.querySelector(`.tabsbar`).children.length === 0){
            panelElement.remove()
        }
	})
    return panelElement
}
export const remove = id => document.getElementById(id).remove()