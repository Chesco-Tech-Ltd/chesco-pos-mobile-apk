const sides = (
  state = { open: false, items: [] },
  action: { type: any; payload: Object }
) => {
  //   console.log(action);
  switch (action.type) {
    case "SHOW":
      state = { ...state, open: true, items: action.payload.items };
      break;
    case "HIDE":
      state = { ...state, open: false, items: [] };
      break;

    default:
      break;
  }
  return state;
};

export default sides;
