import React from "react";
import { useEffect, useState } from "react";
import { View, StyleSheet, Image, ActivityIndicator, Alert, ViewProps } from "react-native";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from "@react-native-firebase/auth";
import { FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
import { Text } from "../../inputs/Text";
import Avatar from "../avatar";
import AvatarMenu from "../avatarMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface HeaderProps extends ViewProps {
  text: string;
}

export default function Header(props: HeaderProps) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userLogin) => {
      setUser(userLogin);
    });
    return subscriber;
  }, []);

  async function handleLogout() {
    await AsyncStorage.removeItem('user');
    auth().signOut();
  }

  const handleProfilePress = () => {
    console.log('Abrir tela de perfil');
  };

  const handleLogoutPress = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Sair', onPress: () => handleLogout() },
    ]);
  };

  return (
    <View>
      {user && (
        <View style={styles.header}>
          <View style={styles.titleIcon}>
            <FontAwesome6 name="signs-post" size={16} color="#475569" />
            <Text style={styles.title}>{props.text}</Text>
          </View>
          <AvatarMenu onProfilePress={handleProfilePress} onLogoutPress={handleLogoutPress} >
            <Avatar source={{ uri: user.photoURL }} />
          </AvatarMenu>
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
    fontSize: 24,
    color: "#475569",
  },
  titleIcon: {
    flexDirection: "row",
    gap: 10,
    height: 50,
    alignItems: "center",
  },
});
