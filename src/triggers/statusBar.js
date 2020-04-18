import * as HomeMenu from "../actions/HomeMenu"

export const register = ({API,options}) => {
  new API.StatusBarItem({
		label:'Github',
		action(){
			HomeMenu.toggle({API,options})
		},
    position: 'right'
	})
}
