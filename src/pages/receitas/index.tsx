import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Header from "../../components/layout/header";
import { Recipe } from "../../models/Recipe";
import { User } from "../../models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Receitas() {
  const [receitas, setReceitas] = useState<Recipe[]>([]);

  useEffect(() => {
    let subscribe;
    AsyncStorage.getItem('user').then((userLogin) => {

      const user = JSON.parse(userLogin) as User;
      subscribe = firestore()
        .collection('recipes')
        .where('user', '==', firestore().collection('users').doc(user.id))
        .onSnapshot(querySnapshot => {
          const data = querySnapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            } as Recipe;
          })
          setReceitas(data)
        });

    });
    return () => subscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 40 }}>
        <Header text="Minhas receitas" />
        <FlatList
          data={receitas}
          renderItem={({ item }) => (
            <View style={{ height: 30, flex: 1 }}>
              <Text style={{ fontSize: 16 }}>{item.nome}</Text>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    color: "#475569",
  },
});
