import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { User } from "../../models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

const webClientId = process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID;

export default function ButtonGoogle() {
  GoogleSignin.configure({
    webClientId,
  });

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const result = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(result.idToken);
      const authResult = auth().signInWithCredential(googleCredential);

      const userLogin: User = {
        displayName: result.user.name,
        email: result.user.email,
        photoUrl: result.user.photo,
      }
      const userDoc = await firestore().collection('users').doc(result.user.id).get();

      if (!userDoc.exists) {
        await firestore().collection('users').doc(result.user.id).set(userLogin);
      }
      userLogin.id = result.user.id;
      await AsyncStorage.setItem('user', JSON.stringify(userLogin));
      return authResult;
    }
    catch (error) {
      Alert.alert("Erro de login", "Não foi possível logar com o Google")
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={onGoogleButtonPress}
      >
        <View style={styles.icone}>
          <Image
            source={require("../../../assets/google-48.png")}
            style={{ width: 24, height: 24 }}
          />
          <Text style={styles.textButton}>Entrar com o Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "#c3c3c3",
    fontSize: 16,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    minHeight: 40,
    padding: 4,
    paddingHorizontal: 15,
  },
  textButton: {
    color: "#454c5a",
    fontSize: 16,
    fontWeight: "500",
  },
  icone: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
