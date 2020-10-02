import { GET_MEMBER_LIST, GET_MEMBER_DETAIL, USER_LOGOUT, USER_LOGIN, USER_STATE, STATE_CHANGED, USER_INPUT } from "../actions/dataAction"

let initialState = {
  getMemberList: null,
  errorMemberList: false,
  getMemberDetail: false,
  isAdmin: false,
  isMember: false,
  isLogin: false,
  isLogout: false,
  onLogin: false,
  onRegis: false,
  username: "",
  password: "",
}

const data = (state = initialState,  action) => {
switch (action.type) {
  case GET_MEMBER_LIST:
    return{
      ...state,
      getMemberList: action.payload.data, 
    }
  case GET_MEMBER_DETAIL:
    return{
      ...state,
      getMemberDetail: action.payload.data, 
    }
 
  case USER_LOGOUT:
    return{
      ...state,       
    }
  case USER_LOGIN:
    return{
      ...state,
     }
  case USER_STATE:
    return{
      ...state,
      isLogin: action.payload.login,
      isAdmin: action.payload.admin,
      isMember: action.payload.member,
      isLogout: action.payload.logout,
    }
  default:
    return state      
}
 
  }

export default data
