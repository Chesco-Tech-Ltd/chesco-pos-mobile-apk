import React, { ReactElement } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// In App.js in a new project
import CashOut from "./screens/CashOut";
import Tables from "./screens/Tables";
import User from "./screens/User";
import Expenses from "./screens/Expenses";
import { createStackNavigator } from "@react-navigation/stack";
import NewTables from "./screens/NewTables";

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Tables" component={Tables} />
      <Stack.Screen name="NewTable" component={NewTables} />
    </Stack.Navigator>
  );
}

// const Tab = createBottomTabNavigator<BottomTabParamList>();
const Tab = createMaterialBottomTabNavigator();

function MaterialBottomTabNavigator(): ReactElement {
  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#fff"
        inactiveColor="#C6C6C6"
        barStyle={{ backgroundColor: "tomato" }}
      >
        <Tab.Screen
          name="Tables"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="table-chart" color={color} size={24} />
            ),
          }}
        />
        {/* <Tab.Screen
          name="CashOut"
          component={CashOut}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-cash-outline"
                size={24}
                color={color}
              />
            ),
          }}
        /> */}
        {/* <Tab.Screen
          name="Expenses"
          component={Expenses}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="money-bill-alt" size={20} color={color} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="User"
          component={User}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="logout" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MaterialBottomTabNavigator;
