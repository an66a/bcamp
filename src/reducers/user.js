import { GET_USER_LIST, USER_LOGIN, USER_LOGOUT } from '../actions/userAction'

initialState = {
  isLogin: false,
  isLogout: false,
  isLoading: false,
  getUserList: null
}
const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        isLogout: false,
        isLoading: false,
      }
    case USER_LOGOUT:
      return {
        isLogout: true,
      }
    case GET_USER_LIST:
      return {
        ...state,
        getUserList: action.payload.data
      }
    default:
      return state
  }
}
export default user
