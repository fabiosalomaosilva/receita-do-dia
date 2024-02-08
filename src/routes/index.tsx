import React, { useEffect, useState } from "react";
import { NavigationContainer, Nav } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import { AuthRoutes } from "./auth.routes";
import { DashboardRoutes } from "./dashboard.routes";

import { View } from "react-native";

export function Routes() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      <View style={{ backgroundColor: "#f5f5f5" }}>
        {user ? <DashboardRoutes /> : <AuthRoutes />}
      </View>
    </NavigationContainer>
  );
}
