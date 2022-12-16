import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React, { ReactElement } from "react";

import LoginScreen from "./screens/LoginScreen";
import Dbconfig from "./screens/Dbconfig";

const RootStack = createStackNavigator();

function RootStackScreen() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Server_setup" component={Dbconfig} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackScreen;
