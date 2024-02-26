import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import { AuthRoutes } from "./auth.routes";
import { AppDashboardRoutes } from "./dashboard.routes";

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
      {user ? <AppDashboardRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
