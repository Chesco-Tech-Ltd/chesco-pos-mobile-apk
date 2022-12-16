const CartType = (
  state = { edit: false },
  action: { type: any; payload: Object }
) => {
  //   console.log(action);
  switch (action.type) {
    case "EDIT":
      state = { ...state, edit: true };
      break;
    default:
      break;
  }
  return state;
};

export default CartType;
