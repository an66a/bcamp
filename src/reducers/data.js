import { UNMOUuT_DATA, LOAD_DATA, GET_ALBUM_LIST, GET_PHOTO_LIST, GET_USER_LIST, GET_ALBUM_SQL } from '../actions/dataAction'

initialState = {
  isLoad: false,
  getPhotoList: null,
  getAlbumList: null,
  getAlbumSql: null,
  UserList: null,

}
const data = (state = initialState, action) => {
  switch (action.type) {
    case UNMOUuT_DATA:
      return {
        state: null
      }
    case LOAD_DATA:
      return {
        ...state,
        isLoad: true
      }
    case GET_ALBUM_LIST:
      return {
        ...state,
        getAlbumList: action.payload.data,
        isLoad: false
      }
    case GET_PHOTO_LIST:
      return {
        ...state,
        getPhotoList: action.payload.data,
      }
    case GET_USER_LIST:
      return {
        ...state,
        UserList: action.payload.data,
      }
    case GET_ALBUM_SQL:
      return {
        ...state,
        getAlbumSql: action.payload.data,
        isLoad: false
      }
    default:
      return state
  }
}

export default data
