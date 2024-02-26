import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView, Image, Alert } from "react-native";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text } from "../../components/inputs/Text";
import auth from "@react-native-firebase/auth";
import Button from "../../components/inputs/Button";
import Header from "../../components/layout/header";
import { Recipe } from "../../models/Recipe";
import { User } from "../../models/User";
import Avatar from "../../components/layout/avatar";
import { Timestamp } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";
import { getReceitaDia } from "../../services/gptService";

export default function Dashboard({ navigation }) {
  const [receitas, setReceitas] = useState<Recipe[]>([]);
  const [receitaDia, setReceitaDia] = useState<Recipe>();

  useEffect(() => {
    let subscribe;
    AsyncStorage.getItem('user').then((userLogin) => {

      const user = JSON.parse(userLogin) as User;
      subscribe = firestore()
        .collection('recipes')
        .where('user', '==', firestore().collection('users').doc(user.id))
        .orderBy('createdAt', 'desc')
        .limit(3)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot.docs.map(doc => {
            return {
              id: doc.id,
              image: doc.data().categoria !== undefined ? "../../../assets/" + doc.data().categoria + ".png" : "../../../assets/outros.png",
              ...doc.data()
            } as Recipe;
          })
          setReceitas(data)
        }).catch(error => console.log(error));
    });
    return () => subscribe();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('receitaDia').then((receita) => {
      if(receita === null) {
        console.log('Não há receita do dia salva');
        createReceitaDia();
        return;
      }
      const data = JSON.parse(receita);
      data.createdAt = data.createdAt.toDate();
      setReceitaDia(data as Recipe);
    });

  }, []);


  async function createReceitaDia() {
    const receitaDiaNova =  await getReceitaDia()
    AsyncStorage.setItem('receitaDia', JSON.stringify(receitaDiaNova));
    setReceitaDia(receitaDiaNova);
    salvarReceita(receitaDiaNova);
  }

  async function salvarReceita(recipe: Recipe) {
    try {
      const userLogin = JSON.parse(await AsyncStorage.getItem('user')) as User;
      const obj = {
        id: recipe.id ?? null,
        nome: recipe.nome,
        user: firestore().collection('users').doc(userLogin.id),
        ingredientes: recipe.ingredientes,
        modoPreparo: recipe.modoPreparo,
        rendimento: recipe.rendimento,
        tempoPreparo: recipe.tempoPreparo,
        categoria: recipe.categoria,
        createdAt: firestore.FieldValue.serverTimestamp()
      }
      if (recipe.id) {
        await firestore().collection('recipeDay').doc(recipe.id).update(obj);
      } else {
        const result = await firestore().collection('recipeDay').add(obj);
      }
      Alert.alert("Salvar receita", "Receita salva com sucesso!");
    }
    catch (error) {
      Alert.alert("Salvar receita", "Ocorreu um erro ao salvar a receita. Tente novamente.");
    }
  }

  function timestampToDate(timestamp: FirebaseFirestoreTypes.Timestamp): Date {
    return new Date(timestamp.seconds * 1000);
  }

  function handleLogout() {
    auth().signOut();
  }
  function handleOpenRecipe(receita: Recipe) {
    receita.user = null;
    navigation.navigate('Receita', { receita });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 40 }}>
        <Header text="Dashboard" />
        <Text style={styles.title}>Olá, Fábio</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.cardTitle}>Receitas</Text>
          <Image source={require("../../../assets/ingredientes.png")} style={{ width: 40, height: 40 }} />
        </View>

        <View style={styles.cardRecipes}>
          <Text style={styles.cardText}>Últimas receitas</Text>
          {receitas && receitas.map((item) => (
            <View style={styles.btnItem} key={item.id}>
              <Avatar source={{ uri: "https://firebasestorage.googleapis.com/v0/b/receita-dia.appspot.com/o/" + item.categoria + ".png?alt=media" }} size="small" style={{ backgroundColor: '#c3c' }} />
              <View style={{ marginLeft: 10 }}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 15, color: '#fff' }}>{item.nome}</Text>
                <Text style={{ fontSize: 12, color: '#f0f0f0' }}>{item.categoria}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.cardPrimary}>
          {receitaDia ? (
            <View>
              <Text style={styles.cardText}>Receita do dia!</Text>
              <View style={styles.btnItem}>
                <Avatar source={{ uri: "https://firebasestorage.googleapis.com/v0/b/receita-dia.appspot.com/o/" + receitaDia.categoria + ".png?alt=media" }} size="small" style={{ backgroundColor: '#c3c' }} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 15, color: '#fff' }}>{receitaDia.nome}</Text>
                  <Text style={{ fontSize: 12, color: '#f0f0f0' }}>{receitaDia.categoria}</Text>
                </View>
              </View>
            </View>

          ) : (
            <Text style={styles.cardText}>Nenhuma receita do dia retornada</Text>
          )}
        </View>
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
    flexDirection: "column",
    padding: 15,
    marginTop: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardText: {
    color: "#fff",
    fontSize: 18,
  },
  btnItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#fff',
  },
  titleItem: { fontSize: 15, color: '#fff'},
});
