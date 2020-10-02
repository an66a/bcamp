export const GET_USERS_LIST = "GET_USERS_LIST";

export const getUsersList = () => {
  return (dispatch) => {
    // firebase
    //   .database()
    //   .ref("react/parkir/keluar/")
    //   .on("value", (data) => {
    //     console.log(data.val());

    //     data.forEach((child) => {
    //       var list = "";
    //       list = child.val();

    var parkirRecord = [];
    if (localStorage.parkirRecord) {
      parkirRecord = JSON.parse(localStorage.parkirRecord);
    }       
      const list = parkirRecord;
      
      dispatch({
        type: GET_USERS_LIST,
        payload: {
          data: list,
          errorMessage: false,
        },
      });
    // }      
  };
};
