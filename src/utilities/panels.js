const get = ()=> document.querySelectorAll("#mainpanel > *")
const getIds = ()=> [...get()].map(ele=>ele.id)
const create = ({API})=> {
    var oldIds = getIds()
    API.RunningConfig.emit('command.newPanel')
    var newIds = getIds()
    var id = newIds.find((newId)=>!oldIds.some((oldId)=> oldId === newId));
    return document.getElementById(id)
}
const remove = id => document.getElementById(id).remove()

module.exports = {get,getIds,create}