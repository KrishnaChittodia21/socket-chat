import * as AuthActions from './authActions';

export const setUpSocket = () => {
  return dispatch => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
      dispatch({
        type: 'SETUP_SOCKET',
        payload: socket
      })
    }
    socket.onmessage = (msg) => {
      let data = JSON.parse(msg.data);
      switch(data.type) {
        case "LOGGEDIN":
          dispatch(AuthActions.loggedIn(data));
          break;
        case "GOT_USERS":
          dispatch({
            type: "GOT_USERS",
            payload: data.data.users
          });
          break;
        case "ADD_THREAD":
          dispatch({
            type: "ADD_THREAD",
            payload: data.data
          })
        default:
          // do nothing
      }
    }
  }
}