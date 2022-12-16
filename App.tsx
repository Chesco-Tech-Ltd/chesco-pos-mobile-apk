import React from "react";
import AppFrame from "./Frame";
import { Provider } from "react-redux";
import store from "./AppStore";
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <Provider store={store}>
      <AppFrame />
      <FlashMessage duration={2850} position="top" />
    </Provider>
  );
}
