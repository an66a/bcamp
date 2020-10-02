import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const GET_USERS_LIST = "GET_USERS_LIST";
export const GET_DETAIL = "GET_DETAIL";

export const getUsersList = () => {
  return (dispatch) => {
    let reactData = []
    if (localStorage.reactData) reactData = JSON.parse(localStorage.reactData);

    dispatch({
      type: GET_USERS_LIST,
      payload: {
        data: reactData,
        errorMessage: false,
      },
    });
  };
};
// export const getDetail = (username) => {
//   return (dispatch) => {
//     firebase.database().ref('react/users/member/' + username).once('value').then(data => {
//       dispatch({
//         type: GET_DETAIL,
//         payload: {
//           data: data.val(),
//         },
//       })
//     }).catch(err => {
//       dispatch({
//         type: GET_DETAIL,
//         payload: {
//           errorMessage: err,
//         }
//       })
//     })
//   };
// };
