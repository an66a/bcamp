import {  UNMOUNT_DATA, GET_ALBUM_LIST, GET_PHOTO_LIST, GET_USER_LIST, GET_ALBUM_SQL, GET_PHOTO_SQL, GET_ALBUM_BY_ID } from '../actions/dataAction'

initialState = {
  isLoad: false,
  getPhotoList: null,
  getAlbumList: null,
  getAlbumSql: null,
  getAlbumById: undefined,
  getPhotoSql: null,
  UserList: null,

}
const data = (state = initialState, action) => {
  switch (action.type) {
    case  UNMOUNT_DATA:
      return {
        state: null
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
    case GET_PHOTO_SQL:
      return {
        ...state,
        getPhotoSql: action.payload.data,
        isLoad: false
      }
    case GET_ALBUM_BY_ID:
      return {
        ...state,
        getAlbumById: action.payload.data,        
      }
    default:
      return state
  }
}

export default data
