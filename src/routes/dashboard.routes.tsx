import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FontAwesome6 } from "@expo/vector-icons";

import Dashboard from "../pages/dashboard";
import Gerador from "../pages/gerador";
import Receitas from "../pages/receitas";
import Receita from "../components/layout/receita";
import RecipeByName from "../pages/recipeByName";

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = createNativeStackNavigator();

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
      <Tab.Screen
        name="Gerador"
        component={Gerador}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="lightbulb" color={color} size={size} />
          ),
        }}
      />
            <Tab.Screen
        name="Busca"
        component={RecipeByName}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="bolt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Receitas"
        component={Receitas}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="list" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function AppDashboardRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="DashboardRoutes" component={DashboardRoutes} />
      <Screen name="Receita" component={Receita} options={{headerShown: true}} />

    </Navigator>
  );
}


