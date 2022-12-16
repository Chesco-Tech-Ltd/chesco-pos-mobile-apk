import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Categories from "./Categories";
import ProductList from "./ProductList";

const RootStack = createStackNavigator();

const Products = () => {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Categories"
        component={Categories}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="ProductList"
        component={ProductList}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};

export default Products;
