const SocketConfigReducer = (
  state = { socket: null, isCon: false },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "SocketConnected":
      state = { ...state, socket: action.payload, isCon: true };
      break;
    case "SocketDisconnceted":
      state = { ...state, socket: null, isCon: false };
      break;
  }
  return state;
};

export default SocketConfigReducer;
