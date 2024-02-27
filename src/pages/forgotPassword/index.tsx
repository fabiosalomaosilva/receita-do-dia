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
import Input from "../../components/inputs/Input";
import Button from "../../components/inputs/Button";
import { esqueciSenha, salvarUsuario } from "../../services/firebaseService";
import { LinkButton } from "../../components/inputs/LinkButton";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleResetPassword() {
    if (!email) return;
    setLoading(true);

    try {
      await esqueciSenha(email);
      setLoading(false);
      Alert.alert("Sucesso", "E-mail de recuperação de senha enviado com sucesso")

    }
    catch (error) {
      console.log(error)
      setLoading(false);
      Alert.alert("Erro", "Não foi possível enviar o e-mail de recuperação de senha")
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <Image
        source={require("../../../assets/receita.png")}
        resizeMode="contain"
        style={{ width: 350 }}
      />

      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 20, color: "#d97700", fontFamily: 'Nunito_500Medium' }}>
          Esqueci minha senha
        </Text>
      </View>
      <Input
        label="E-mail"
        keyType="email-address"
        placeholder="seu@email.com"
        autoCapitalize="none"
        value={email}
        onChangeText={(e) => setEmail(e)}
      />

      <Button
        text="Salvar"
        color="primary"
        disabled={loading === true ? true : false}
        onPress={handleResetPassword}
      />
      <LinkButton
        style={{ marginTop: 45, width: '100%', marginBottom: 10 }}
        onPress={() => navigation.navigate('Login')}
        title="Retornar ao Login" />

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

