const CartReprint = (
  state = { item: [] },
  action: { type: any; payload: Object }
) => {
  switch (action.type) {
    case "REPRINT":
      state = { ...state, item: action.items };
      break;
    case "RESET_UPDATED_TABLE":
      state = { ...state, item: [] };
      break;
    default:
      break;
  }
  return state;
};

export default CartReprint;
