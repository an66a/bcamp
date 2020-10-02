import { ONLOGIN, ONREGIS, ONHOME } from '../actions/navbarAction'

let initialState = {
onRegis: false,
onLogin: false,

}
const navbar = (state = initialState,  action) => {
    switch (action.type) {
        case ONLOGIN:
            return{
              ...state,
              onLogin: true,  
              onRegis: false,  
            }
          case ONREGIS:
            return{
              ...state,     
              onRegis: true,  
              onLogin: false,     
            }
           default:
        return state      
    }
     
      }
    
    export default navbar
    