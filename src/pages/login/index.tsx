import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Keyboard,
  Image,
  SafeAreaView,
} from "react-native";
import auth from "@react-native-firebase/auth";
import Input from "../../components/inputs/Input";
import Button from "../../components/inputs/Button";
import cart from "../../../assets/cart2.json";
import ButtonCircle from "../../components/inputs/ButtonCircle";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import ButtonGoogle from "../../components/inputs/ButtonGoogle";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  async function handleLoginGoogle() {
    if (!email && !password) return;
    setLoading(true);

    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      console.log(user)
      setLoading(false);

    }
    catch (error) {
      console.log(error)
      setLoading(false);
      Alert.alert("Erro no login", error)
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Lottie
        source={cart}
        resizeMode="center"
        style={{ width: 200, height: 200, padding: 0 }}
        autoPlay
        loop
      /> */}
      <Image
        source={require("../../../assets/receita.png")}
        resizeMode="contain"
        style={{ width: 350 }}
      />
      <Input
        label="E-mail"
        keyType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(e) => setEmail(e)}
      />
      <Input
        label="Senha"
        isPassword={true}
        keyType="default"
        autoCapitalize="none"
        value={password}
        onChangeText={(e) => setPassword(e)}
      />
      <Button
        text="Entrar"
        color="primary"
        disabled={loading === true ? true : false}
        onPress={handleLoginGoogle}
      />
      <View style={{ marginTop: 40, marginBottom: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          ou faça login com
        </Text>
      </View>

      <ButtonGoogle />
      <View style={{ marginTop: 40, marginBottom: 10 }}>
        {loading && <ActivityIndicator size="large" color="#34d399" />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
