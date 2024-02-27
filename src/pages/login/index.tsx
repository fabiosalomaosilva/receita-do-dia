import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
} from "react-native";
import auth from "@react-native-firebase/auth";
import Input from "../../components/inputs/Input";
import Button from "../../components/inputs/Button";
import ButtonGoogle from "../../components/inputs/ButtonGoogle";
import { LinkButton } from "../../components/inputs/LinkButton";

export default function Login({ navigation}) {
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
    return subscriber;
  }, []);

  if (initializing) return null;

  async function handleLoginGoogle() {
    if (!email && !password) return;
    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
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
      <Image
        source={require("../../../assets/receita.png")}
        resizeMode="contain"
        style={{ width: 350 }}
      />
      <Input
        label="E-mail"
        keyType="email-address"
        autoCapitalize="none"
        placeholder="seu@email.com"
        value={email}
        onChangeText={(e) => setEmail(e)}
      />
      <Input
        label="Senha"
        isPassword={true}
        keyType="default"
        autoCapitalize="none"
        value={password}
        placeholder="********"
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
      <View style={{ marginTop: 0, marginBottom: 10, height:40, width: "100%", flexDirection: "row", justifyContent: 'space-between' }}>
      <LinkButton onPress={() => navigation.navigate('ForgotPassword')} title="Esqueci a senha" />

        <LinkButton onPress={() => navigation.navigate('Register')} title="Crie sua conta" />
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
