import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from "@react-native-firebase/auth";
import { FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import Button from "../../inputs/Button";
import Text from "../../inputs/Text";
import Avatar from "../avatar";

export default function Header() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userLogin) => {
      setUser(userLogin);
    });
    return subscriber;
  }, []);

  function handleLogout() {
    auth().signOut();
  }

  return (
    <View>
      {user && (
        <View style={styles.header}>
          <View style={styles.titleIcon}>
            <FontAwesome6 name="signs-post" size={16} color="#475569" />
            <Text style={styles.title}>Dashboard</Text>
          </View>
          <Avatar imageUrl={user.photoURL} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 0,
    margin: 0,
    color: "#475569",
    fontFamily: "Nunito_700Bold",
  },
  email: {
    fontSize: 12,
    padding: 0,
    marginTop: -5,
    fontFamily: "Nunito_700Bold",
  },
  info: {
    flexDirection: "column",
    gap: 1,
  },
  title: {
    fontSize: 28,
    color: "#475569",
  },
  titleIcon: {
    flexDirection: "row",
    gap: 5,
    height: 50,
    alignItems: "center",
  },
});
