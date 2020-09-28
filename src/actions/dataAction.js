import axios from "axios";

export const UNMOUNT_DATA = 'UNMOUNT_DATA';
export const LOAD_DATA = 'LOAD_DATA';
export const GET_ALBUM_LIST = 'GET_ALBUM_LIST';
export const GET_ALBUM_SQL = 'GET_ALBUM_SQL';
export const GET_ALBUM_BY_ID = 'GET_ALBUM_BY_ID';
export const GET_PHOTO_SQL = 'GET_PHOTO_SQL';
export const GET_PHOTO_LIST = 'GET_PHOTO_LIST';

export const unMount = () => {
  return (dispatch) => {
    dispatch({
      type: UNMOUNT_DATA
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

export const getPhotoByAlbumId = (id) => {
  return (dispatch) => {
    let PhotoDb = []
    exeQuery("SELECT * FROM photo_list WHERE albumId = ?", [id]).then(res => {
      let rows = res.rows;
      for (let i = 0; i < rows.length; i++) {
        let item = rows.item(i);
        PhotoDb.push({ id: item.id, albumId: item.albumId, title: item.title, url: item.url })
      }
      // console.log(PhotoDb);
      dispatch({
        type: GET_PHOTO_SQL,
        payload: {
          data: PhotoDb
        }
      })
    })
    // .catch(err => {})
  }
}
export const getAlbumSql = () => {
  return (dispatch) => {
    let AlbumDb = []
    exeQuery("SELECT * FROM album_list", []).then(res => {
      let rows = res.rows;
      for (let i = 0; i < rows.length; i++) {
        let item = rows.item(i);
        AlbumDb.push({ id: item.id, title: item.title })
      }
      // console.log(AlbumDb);
      dispatch({
        type: GET_ALBUM_SQL,
        payload: {
          data: AlbumDb
        }
      })
    })
    // .catch(err => {})
  }
}
export const getAlbumById = (id) => {
  return (dispatch) => {
    let AlbumDb;
    exeQuery("SELECT * FROM album_list WHERE id = ?", [id]).then(res => {
      let rows = res.rows;
      for (let i = 0; i < rows.length; i++) {
        let item = rows.item(i);
        AlbumDb = { id: item.id, title: item.title }
      }
      // console.log(AlbumDb);
      dispatch({
        type: GET_ALBUM_BY_ID,
        payload: {
          data: AlbumDb
        }
      })
    })
      .catch(err => { console.log(err); })
  }
}

export const createAlbumSql = (title) => {
  return (dispatch) => {
    console.log(title);
    if (title === '' || title === null || title === undefined) {
      return alert('You need input the title.')
    }
    exeQuery("INSERT INTO album_list (title) VALUES (?)", [title]).then(() => alert('Succes, album created.'))
  }
}
export const addPhotoToAlbumSql = (albumId, title, url) => {
  return (dispatch) => {
    console.log(title);
    if (title === '' || url === '' || albumId === null) {
      return alert('You need input all field.')
    }
    exeQuery("INSERT INTO photo_list (albumId, title, url) VALUES (?,?,?)", [albumId, title, url]).then(() => {
      getPhotoByAlbumId(albumId)
      alert('Succes, photo added. Reload Photo List')
    })
  }
}
export const updateAlbumById = (title, id) => {
  return (dispatch) => {
    if (title === '' || title === null || title === undefined) {
      return alert('You need input the title.')
    }
    // console.log(title);
    exeQuery("UPDATE album_list set title=? WHERE id = ?", [title, id])
  }
}
export const updatePhotoById = (title, url, id) => {
  return (dispatch) => {
    if (title === '' || title === null || title === undefined) {
      return alert('You need input the title.')
    }
    // console.log(title);
    exeQuery("UPDATE photo_list set title=?, url=? WHERE id = ?", [title, url, id])
  }
}

export const insertAlbumSql = () => {
  return async (dispatch) => {
    let selectQuery = await exeQuery("SELECT * FROM album_list", []);
    let rows = selectQuery.rows;
    if (rows.length !== 0) {
      return;
    }
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(async (res) => {
        let Data = res.data
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

      })
  }
}
export const insertPhotoSql = () => {
  return async (dispatch) => {
    let selectQuery = await exeQuery("SELECT * FROM photo_list", []);
    let rows = selectQuery.rows;
    if (rows.length !== 0) {
      return;
    }
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(async (res) => {
        let Data = res.data
        let query = "INSERT INTO photo_list (id, albumId, url, title) VALUES";
        for (let i = 0; i < Data.length; ++i) {
          query = query + "('"
            + Data[i].id
            + "','"
            + Data[i].albumId
            + "','"
            + Data[i].url
            + "','"
            + Data[i].title
            + "')";
          if (i != Data.length - 1) {
            query = query + ",";
          }
        }
        query = query + ";";
        let insertData = await exeQuery(query, []);
        // console.log(insertData);

      })
  }
}
export const deleteAlbum = (id) => {
  // await exeQuery('DELETE FROM album_list');
  return async () => {
    await exeQuery('DELETE FROM album_list WHERE id = ?', [id])
    await exeQuery('DELETE FROM photo_list WHERE albumId = ?', [id]);
    getAlbumSql();
  }
}
export const deletePhoto = (id) => {

  return () => {
    exeQuery('DELETE FROM photo_list WHERE id = ?', [id]).then(res => { console.log(res) })

  }
}
export const resetAllSql = () => {
  return () => {
    exeQuery('DELETE FROM album_list');
    exeQuery('DELETE FROM photo_list');
  }
}