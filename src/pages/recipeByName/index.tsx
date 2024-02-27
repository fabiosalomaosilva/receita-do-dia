import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Image,
  Alert
} from "react-native";
import { Text } from "../../components/inputs/Text";
import { getRecipeByName } from "../../services/gptService";
import Input from "../../components/inputs/Input";
import Button from "../../components/inputs/Button";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/layout/header";
import { Recipe } from "../../models/Recipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../models/User";
import { salvarReceita } from "../../services/firebaseService";

export default function RecipeByName() {
  const [nomeReceita, setNomeReceita] = useState<string>("");
  const [receita, setReceita] = useState<Recipe>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.getItem('user').then((userLogin) => { console.log(userLogin) });
  }, []);

  const createRecipe = async () => {
    setLoading(true);
    setReceita(null);
    Keyboard.dismiss();
    const result = await getRecipeByName(nomeReceita);
    setReceita(result);
    setLoading(false);
  };

  async function salvarReceitaBd() {
    try {
      const userLogin = JSON.parse(await AsyncStorage.getItem('user')) as User;
      await salvarReceita(receita, userLogin.id);
      Alert.alert("Salvar receita", "Receita salva com sucesso!");
    }
    catch (error) {
      Alert.alert("Salvar receita", "Ocorreu um erro ao salvar a receita. Tente novamente.");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 40 }}>
        <Header text="Criar receita" />

        <View style={styles.cardInsert}>
          <Text style={styles.cardText}>Nome da receita</Text>
          <Input value={nomeReceita} onChangeText={setNomeReceita} placeholder="ex: frango a xadrez" />
          <Button text="Ver Receita" onPress={createRecipe} color="primary" />
        </View>


        {receita ? (
          <View>
            <View style={styles.cardInsert}>
              {loading && <ActivityIndicator size="large" color="#f59e0b" />}
              <View style={styles.cardTitleView}>
                <Text style={styles.cardTitle}>Receita</Text>
                <Image source={require("../../../assets/salada.png")} style={{ width: 36, height: 36 }} />
              </View>

              <View style={styles.ingredientesView}>
                <Text style={styles.nomeReceita}>{receita.nome}</Text>
                <Text style={styles.titleModo}>Ingredientes</Text>
                {
                  receita?.ingredientes && (
                    receita.ingredientes.map((item, index) => <Text style={styles.ingredientesReceita} key={index * 107}>{item}</Text>)
                  )
                }
                <Text style={styles.titleModo}>Modo de preparo</Text>
                {
                  receita?.modoPreparo && (
                    receita.modoPreparo.map((item, index) => <Text style={styles.ingredientesReceita} key={index * 1000}>{item}</Text>)
                  )
                }
                <Text style={styles.titleModo}>Rendimento</Text>
                <Text style={styles.ingredientesReceita}>{receita.rendimento}</Text>

                <Text style={styles.titleModo}>Tempo de preparo</Text>
                <Text style={styles.ingredientesReceita}>{receita.tempoPreparo}</Text>

                <Text style={styles.titleModo}>Categoria</Text>
                <Text style={styles.ingredientesReceita}>{receita.categoria}</Text>

              </View>
            </View>

            <View style={{ gap: 10, marginTop: 5, marginBottom: 5, justifyContent: 'space-between' }}>
              <Button text="Salvar" color={"secondary"} onPress={salvarReceitaBd} icon={<Ionicons name="save" color="#f5f5f5" size={18} />} iconPosition="left" />
            </View>
          </View>

        ) : loading && (<ActivityIndicator color="#d97706" />)}
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
    flexDirection: "column",
    padding: 15,
    marginTop: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  cardInsert: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "#eaebed",
    flexDirection: "column",
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
    color: "#475569",
    fontSize: 18,
  },
  ingredientesView: {
    marginTop: 15,
    marginBottom: 15,
  },
  cardTitleView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: -5 },
  nomeReceita: {
    color: "#d97706",
    fontSize: 20,
    marginBottom: 5,
  },
  ingredientesReceita: {
    color: "#334155",
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
  },
  titleModo: {
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    color: "#475569",
    marginTop: 15,
    marginBottom: 10,
  },
});
