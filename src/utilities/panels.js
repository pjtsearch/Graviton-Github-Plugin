export const get = ()=> document.querySelectorAll("#mainpanel > *")
export const getIds = ()=> [...get()].map(ele=>ele.id)
export const create = ({API})=> {
    var oldIds = getIds()
    API.RunningConfig.emit('command.newPanel')
    var newIds = getIds()
    var id = newIds.find((newId)=>!oldIds.some((oldId)=> oldId === newId));
    return document.getElementById(id)
}
export const remove = id => document.getElementById(id).remove()