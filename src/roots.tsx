import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import Products from "./screens/Products";
import Cart from "./screens/cart";

const RootStack = createStackNavigator();

function POSStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Products"
        component={Products}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
}

export default POSStackScreen;


