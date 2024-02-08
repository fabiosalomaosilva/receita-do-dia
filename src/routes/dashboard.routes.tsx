import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome6 } from "@expo/vector-icons";

import Dashboard from "../pages/dashboard";
import Gerador from "../pages/gerador";
import Receitas from "../pages/receitas";

const Tab = createBottomTabNavigator();

export function DashboardRoutes() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="signs-post" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Gerador" component={Gerador} />
      <Tab.Screen name="Receitas" component={Receitas} />
    </Tab.Navigator>
  );
}
