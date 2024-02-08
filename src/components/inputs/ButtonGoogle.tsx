import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function ButtonGoogle() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  });

  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={async () =>
          onGoogleButtonPress().then(() =>
            console.log("Signed in with Google!")
          )
        }
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
