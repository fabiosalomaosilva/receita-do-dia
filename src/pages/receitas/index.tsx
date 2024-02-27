
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
    if(receita.createdAt === null || receita.createdAt === undefined) {
      receita.createdAt = new Date()
    }
    navigation.navigate('Receita', { receita });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 40 }}>

        <Header text="Minhas receitas" />

        <FlatList
          data={receitas}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View key={item.id}>
              <TouchableOpacity onPress={() => handleOpenRecipe(item)}>
                <View style={styles.btnItem}>
                    <Avatar source={{ uri: "https://firebasestorage.googleapis.com/v0/b/receita-dia.appspot.com/o/" + item.categoria.replace(' ', '') + ".png?alt=media" }} size="small" style={{ backgroundColor: '#c3c' }} />
                    <View style={{ marginLeft: 10, marginRight: 10 }}>
                      <Text lineBreakMode="tail" ellipsizeMode="tail" numberOfLines={1} style={{ fontSize: 15 }}>{item.nome}</Text>
                      <Text style={{ fontSize: 12 }}>{item.categoria}</Text>
                    </View>
                  </View>
              </TouchableOpacity>
            </View>
          )}
        />
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
    maxWidth: "99%",
    flex: 1,
    backgroundColor: "#eaebed",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    padding: 7,
    marginBottom: 5,
    borderRadius: 10,
    paddingRight: 9
  },
});
