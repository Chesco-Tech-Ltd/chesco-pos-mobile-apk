const UserReducer = (
    state = { isSet: false, userInfo: {} },
    action: { type: any; userInfo: any }
  ) => {
    //   console.log(action);
    switch (action.type) {
      case "SETUSER":
        state = { ...state, isSet: true, userInfo: action.userInfo };
        break;
      case "RESET_USER":
        state = { ...state, isSet: false, userInfo: {} };
        break;
  
      default:
        break;
    }
    return state;
  };
  
  export default UserReducer;
  