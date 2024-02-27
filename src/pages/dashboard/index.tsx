import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl, SafeAreaView, Image, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Text } from "../../components/inputs/Text";
import Header from "../../components/layout/header";
import { Recipe } from "../../models/Recipe";
import { User } from "../../models/User";
import Avatar from "../../components/layout/avatar";
import { getReceitaDia } from "../../services/gptService";
import { getRecipeDay, saveRecipeDay, getRecipesByUser, getIdRecipe } from "../../services/firebaseService";

export default function Dashboard({ navigation }) {
  const [receitas, setReceitas] = useState<Recipe[]>([]);
  const [receitaDia, setReceitaDia] = useState<Recipe>();
  const [loading, setLoading] = useState<boolean>(false);

  async function createReceitaDia(): Promise<Recipe> {
    try {
      const receitaDiaNova = await getReceitaDia()
      AsyncStorage.setItem('receitaDia', JSON.stringify(receitaDiaNova));
      setReceitaDia(receitaDiaNova);
      return receitaDiaNova;
    } catch (error) {
      console.log('Erro ao criar receita do dia', error)
      return null;
    }
  }

  async function getRecipeDayOrGenerate() {
    let recipeDayString = await AsyncStorage.getItem('receitaDia');
    if (!recipeDayString) {
      await recipeNotpeExistsInStorage()
    }
    else {
      await recipeExistsInStorage(recipeDayString);
    }
  }

  async function recipeNotpeExistsInStorage() {
    try {
      let recipeDay = await getRecipeDay();
      if (!recipeDay) {
        recipeDay = await createReceitaDia();
        setReceitaDia(recipeDay);
        saveRecipeDay(recipeDay);
        return;
      }
      else {
        setReceitaDia(recipeDay);
      }
    } catch (error) {
      console.log('Erro ao criar receita do dia', error)
    }

  }

  async function recipeExistsInStorage(recipeString: string) {
    try {
      let recipeDay = JSON.parse(recipeString);
      if (recipeDay.id !== getIdRecipe()) {
        recipeDay = await createReceitaDia();
        setReceitaDia(recipeDay);
        saveRecipeDay(recipeDay);
      }
      else {
        setReceitaDia(recipeDay);
      }
    } catch (error) {
      console.log('Erro ao criar receita do dia', error)
    }
  }

  async function getRecipes() {
    try {
      setLoading(true);
      const userStorage = await AsyncStorage.getItem('user');
      if (userStorage) {
        const user = JSON.parse(userStorage) as User;
        const data = await getRecipesByUser(user.id);
        if (data !== null) {
          setReceitas(data);
        }
      }
      else {
        console.log('Usuário não encontrado')
      }
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log('Erro ao criar receita do dia', error)
    }
  }

  function handleOpenRecipe(receita: Recipe) {
    receita.user = null;
    if(receita.createdAt === null || receita.createdAt === undefined) {
      receita.createdAt = new Date()
    }
    navigation.navigate('Receita', { receita, showButtonSave: false });
  }

  function handleOpenRecipeDay(receita: Recipe) {
    receita.user = null;
    if(receita.createdAt === null || receita.createdAt === undefined) {
      receita.createdAt = new Date()
    }
    navigation.navigate('Receita', { receita, showButtonSave: true });
  }

  useEffect(() => {
    getRecipes();
    getRecipeDayOrGenerate();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 40 }}
      >
        <Header text="Dashboard" />

        <RefreshControl
          refreshing={loading}
          onRefresh={getRecipes}
          colors={['#ff8735', '#ff8735']}>
          <Text style={styles.title}>Olá, Fábio</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.cardTitle}>Receitas</Text>
            <Image source={require("../../../assets/prato02.png")} style={{ width: 42, height: 42 }} />
          </View>

          <View style={styles.cardRecipes}>
            <Text style={styles.cardText}>Últimas receitas</Text>
            {receitas && receitas.map((item) => (
              <TouchableOpacity onPress={() => handleOpenRecipe(item)} key={item.id}>
                <View style={styles.btnItem}>
                  <Avatar source={{ uri: "https://firebasestorage.googleapis.com/v0/b/receita-dia.appspot.com/o/" + item.categoria.replace(' ', '') + ".png?alt=media" }} size="small" style={{ backgroundColor: '#c3c' }} />
                  <View style={{ marginLeft: 10, marginRight:10 }}>
                    <Text lineBreakMode="tail" numberOfLines={1} style={{ fontSize: 15, color: '#fff'}}>{item.nome}</Text>
                    <Text style={{ fontSize: 12, color: '#f0f0f0' }}>{item.categoria}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.cardPrimary}>
            {receitaDia ? (
              <View>
                <Text style={styles.cardText}>Receita do dia!</Text>
                <TouchableOpacity onPress={() => handleOpenRecipeDay(receitaDia)}>
                  <View style={styles.btnItem}>
                    <Avatar source={{ uri: "https://firebasestorage.googleapis.com/v0/b/receita-dia.appspot.com/o/" + receitaDia.categoria.replace(' ', '') + ".png?alt=media" }} size="medium" style={{ backgroundColor: '#c3c' }} />
                    <View style={{ marginLeft: 10 }}>
                      <Text lineBreakMode="tail" numberOfLines={1} style={{ fontSize: 15, color: '#fff' }}>{receitaDia.nome}</Text>
                      <Text style={{ fontSize: 12, color: '#f0f0f0' }}>{receitaDia.categoria}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

            ) : (
              <Text style={styles.cardText}>Nenhuma receita do dia retornada</Text>
            )}
          </View>
        </RefreshControl>
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
    maxWidth: "100%",
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
    maxWidth: "100%",
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
    maxWidth: "97%",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#fff',
  },
  titleItem: { fontSize: 15, color: '#fff' },
});
