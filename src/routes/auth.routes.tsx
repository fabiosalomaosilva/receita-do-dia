import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../pages/login";
import Register from "../pages/register";
import Receita from "../components/layout/receita";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      {/* <Screen name="Register" component={Register} />
      <Screen name="Receita" component={Receita} /> */}
    </Navigator>
  );
}
