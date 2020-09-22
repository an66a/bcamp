import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

export const UNMOUuT_DATA = 'UNMOUuT_DATA';
export const LOAD_DATA = 'LOAD_DATA';
export const GET_ALBUM_LIST = 'GET_ALBUM_LIST';
export const GET_ALBUM_SQL = 'GET_ALBUM_SQL';
export const GET_PHOTO_LIST = 'GET_PHOTO_LIST';


export const unMount = () => {
  return (dispatch) => {
    dispatch({
      type: UNMOUuT_DATA
    })
  }
}
export const getAlbumList = () => {
  return (dispatch) => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(res => {
        dispatch({
          type: GET_ALBUM_LIST,
          payload: {
            data: res.data
          }
        })
      })
  }
}
export const getPhotoList = (id) => {
  return (dispatch) => {
    axios.get('https://jsonplaceholder.typicode.com/photos?albumId=' + id)
      .then(res => {
        dispatch({
          type: GET_PHOTO_LIST,
          payload: {
            data: res.data
          }
        })
      }
      )
  }
}


const exeQuery = (sql, params = []) => new Promise((resolve, reject) => {
  db.transaction(trans => {
    trans.executeSql(sql, params, (trans, results) => {
      resolve(results);
    },
      (err) => {
        reject(err);
      })
  })
})

export const getAlbumSql = () => {
  return async (dispatch) => {
    var AlbumDb = []
    let selectQuery = await exeQuery("SELECT * FROM album_list", []);
    var rows = selectQuery.rows;
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      AlbumDb.push({ id: item.id, title: item.title })
    }
    dispatch({
      type: GET_ALBUM_SQL,
      payload: {
        data: AlbumDb
      }
    })
  }
}

export const inserAlbumtSql = () => {
  return (dispatch) => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(async (res) => {
        let Data = res.data
        let selectQuery = await exeQuery("SELECT * FROM album_list", []);
        var rows = selectQuery.rows;
        if (rows.length == 0) {
          let query = "INSERT INTO album_list (id, title) VALUES";
          for (let i = 0; i < Data.length; ++i) {
            query = query + "('"
              + Data[i].id
              + "','"
              + Data[i].title
              + "')";
            if (i != Data.length - 1) {
              query = query + ",";
            }
          }
          query = query + ";";
          let insertData = await exeQuery(query, []);
          console.log(insertData);
        }
      })
    dispatch({
      type: LOAD_DATA
    })
  }
}
const deleteDb = async (id) => {
  // await exeQuery('DELETE FROM album_list');
  await this.ExecuteQuery('DELETE FROM album_list WHERE id = ?', [id]);

}