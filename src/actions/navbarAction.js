export const ONLOGIN = "ONLOGIN";
export const ONREGIS = "ONREGIS";


export const onLogin = () => {
  return (dispatch) => {
    dispatch({type: ONLOGIN})
  }
}

export const onRegis = () => {
  return (dispatch) => {
    dispatch({type: ONREGIS})
  }
}

