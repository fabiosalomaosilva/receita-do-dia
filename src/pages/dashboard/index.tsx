import React from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Image } from "react-native";
import { Text } from "../../components/inputs/Text";
import auth from "@react-native-firebase/auth";
import Button from "../../components/inputs/Button";
import Header from "../../components/layout/header";

export default function Dashboard() {
  function handleLogout() {
    auth().signOut();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header text="Dashboard" />
        <Text style={styles.title}>Olá, Fábio</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.cardTitle}>Receitas</Text>
          <Image source={require("../../../assets/ingredientes.png")} style={{ width: 40, height: 40 }} />
        </View>

        <View style={styles.cardRecipes}>
          <Text style={styles.cardText}>Nenhuma receita salva!</Text>
        </View>

        <View style={styles.cardPrimary}>
          <Text style={styles.cardText}>Receita do dia!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
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
