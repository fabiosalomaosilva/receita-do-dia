
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import Header from "../../components/layout/header";
import { Recipe } from "../../models/Recipe";
import { User } from "../../models/User";
import Avatar from "../../components/layout/avatar";

export default function Receitas({ navigation }) {
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

  function handleOpenRecipe(receita: Recipe) {
    receita.user = null;
    navigation.navigate('Receita', { receita });
  }

  return (
    <SafeAreaView style={styles.container}>
            <View style={{marginTop: 40}}>

        <Header text="Minhas receitas" />
        <View style={styles.cardInsert}>
  <FlatList
          data={receitas}
          renderItem={({ item }) => (
            <View key={item.id}>
              <TouchableOpacity onPress={() => handleOpenRecipe(item)}>
                <View style={styles.btnItem}>
                  <Avatar source={{ uri: "https://firebasestorage.googleapis.com/v0/b/receita-dia.appspot.com/o/" + item.categoria.replace(' ', '') + ".png?alt=media" }} size="small" style={{ backgroundColor: '#c3c' }} />
                  <View style={{marginLeft: 10}}>
                    <Text style={{ fontSize: 15 }}>{item.nome}</Text>
                    <Text style={{ fontSize: 12 }}>{item.categoria}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
              </View>

      </View>
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
  btnItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingTop: 7,
    paddingBottom: 7,
  },
  cardInsert: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "#eaebed",
    flexDirection: "column",
    padding: 12,
    borderRadius: 15,
    marginBottom: 15,
},
});
