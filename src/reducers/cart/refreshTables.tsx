const RefreshTables = (
    state = { refresh: false },
    action: { type: any; payload: Object }
  ) => {
    //   console.log(action);
    switch (action.type) {
      case "REFRESH_TABLES":
        state = { ...state, refresh: true };
        break;
      case "REFRESH_DONE":
        state = { ...state, refresh: false };
        break;
      default:
        break;
    }
    return state;
  };
  
  export default RefreshTables;
  