import { GET_USER_LIST, USER_LOGIN, USER_LOGOUT } from '../actions/userAction'

initialState = { 
isLogin: false,
isLogout: false,
isLoading: true,
getUserList: null
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
        case GET_USER_LIST:
          return{
            ...state,
           getUserList: data
          }
      default:
        return state      
    }     
      }    
    export default user
    