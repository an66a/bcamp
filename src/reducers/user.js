import { USER_LOGIN, USER_LOGOUT } from '../actions/userAction'

initialState = { 
isLogin: false,
isLogout: false,
isLoading: true,
}
const user = (state = initialState,  action) => {
    switch (action.type) {
        case USER_LOGIN:
          return{
            ...state,
            isLogin: true,
            isLogout: false,
            isLoading: false,
          }
        case USER_LOGOUT:
          return{
            ...state,
            isLogin: false,
            isLogout: true,
            isLoading: false,
          }
      default:
        return state      
    }     
      }    
    export default user
    