import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ActionsReducer from "./src/reducers/Actions";
import Cart from "./src/reducers/cart/cart";
import CartType from "./src/reducers/cart/cartType";
import RefreshTables from "./src/reducers/cart/refreshTables";
import CartReprint from "./src/reducers/cart/rePrint";
import sides from "./src/reducers/cart/showMulty";
import SocketConfigReducer from "./src/reducers/sockets/SocketConfig";
import UserReducer from "./src/reducers/User";

const AllReducers = combineReducers({
  SocketConfig: SocketConfigReducer,
  Actions: ActionsReducer,
  User: UserReducer,
  Cart: Cart,
  sides: sides,
  CartType: CartType,
  CartReprint: CartReprint,
  RefreshTables: RefreshTables,
});

const store = createStore(AllReducers, applyMiddleware(thunk));

export default store;
