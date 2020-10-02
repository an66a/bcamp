import { GET_USERS_LIST, GET_DETAIL } from "../actions/dataAction"

let initialState = {
  getUsersList: false,
  errorUsersList: false,
  getDetail: false,
  errorDetail: false,
}

const data = (state = initialState,  action) => {
switch (action.type) {
  case GET_USERS_LIST:
    return{
      ...state,
      getUsersList: action.payload.data,
      errorUsersList: action.payload.errorMessage,
    }
  case GET_DETAIL:
    return{
      ...state,
      getDetail: action.payload.data,
      errorDetail: action.payload.errorMessage,
    }
  default:
    return state      
}
 
  }

export default data