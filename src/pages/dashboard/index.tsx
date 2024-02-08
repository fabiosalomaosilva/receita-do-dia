import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../components/inputs/Text";
import auth from "@react-native-firebase/auth";
import Button from "../../components/inputs/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/layout/header";

export default function Dashboard() {
  function handleLogout() {
    auth().signOut();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text style={styles.title}>Olá, Fábio</Text>

      <Text style={styles.cardTitle}>Receitas &#127858;</Text>

      <View style={styles.cardRecipes}>
        <Text style={styles.cardText}>Nenhuma receita gerada!</Text>
      </View>

      <View style={styles.cardPrimary}>
        <Text style={styles.cardText}>Nenhum receita gerada!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    marginTop: 15,
    color: "#475569",
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    marginTop: 10,
    color: "#475569",
  },
  cardPrimary: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "#fdba74",
    flexDirection: "row",
    padding: 15,
    marginTop: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardRecipes: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "#34d399",
    flexDirection: "row",
    padding: 15,
    marginTop: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
  },
});
