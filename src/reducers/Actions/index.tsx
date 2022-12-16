const ActionsReducer = (
  state = { isWorking: false, loadType: "" },
  action: { type: any; loadType: any }
) => {
  switch (action.type) {
    case "REFRESH_NET":
      state = { ...state, isWorking: true, loadType: action.loadType };
      break;
    case "RESET_ACTION":
      state = { ...state, isWorking: false, loadType: action.loadType };
      break;

    default:
      break;
  }
  return state;
};

export default ActionsReducer;
