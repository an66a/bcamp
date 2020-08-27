import { GET_USERS_LIST } from "../actions/dataAction"

let initialState = {
  getUsersList: false,
  errorUsersList: false,
    error: false  
}

const data = (state = initialState,  action) => {
switch (action.type) {
  case GET_USERS_LIST:
    return{
      ...state,
      getUsersList: action.payload.data,
      errorUsersList: action.payload.errorMessage,
    }
  default:
    return state      
}
 
  }

export default data
