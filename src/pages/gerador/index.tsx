import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Image
} from "react-native";
import { Text } from "../../components/inputs/Text";
import { getReceita } from "../../services/gptService";
import Input from "../../components/inputs/Input";
import Button from "../../components/inputs/Button";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/layout/header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Receita } from "../../models/receita";

export default function Gerador() {
  const [ingredientes, setIngredientes] = useState<string[]>([]);
  const [ingrediente, setIngrediente] = useState<string>("");
  const [receita, setReceita] = useState<Receita>(null);
  const [loading, setLoading] = useState<boolean>(false);

  function addIngrediente() {
    if (ingrediente === "") return;
    Keyboard.dismiss();

    setIngredientes([...ingredientes, ingrediente]);
    setIngrediente("");
    console.log(ingredientes);
  }

  const removerIngrediente = (nome: string) => {
    const novosIngredientes = ingredientes.filter(ingrediente => ingrediente !== nome);
    setIngredientes(novosIngredientes);
  }

  function excluirTudo() {
    setIngredientes([]);
    setReceita(null);
  }

  const createRecipe = async () => {
    setLoading(true);
    setReceita(null);
    Keyboard.dismiss();
    const result = await getReceita(ingredientes);
    setReceita(result);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header text="Criar receita" />
        <Text style={styles.title}>Receita do dia</Text>

        <View style={styles.cardInsert}>
          <Text style={styles.cardText}>O que tenho em casa?</Text>
          <Input value={ingrediente} onChangeText={setIngrediente} placeholder="ex: alcatra em bifes" />
          <Button text="Adicionar" onPress={addIngrediente} color="primary" />
        </View>

        {ingredientes.length > 0 && (
          <View style={styles.cardInsert}>
            <View style={styles.cardTitleView}>
              <Text style={styles.cardTitle}>Ingredientes</Text>
              <Image source={require("../../../assets/ingredientes.png")} style={{ width: 36, height: 36 }} />
            </View>

            <View style={styles.ingredientesView}>
              {ingredientes &&
                ingredientes.map((ingrediente, index) => (
                  <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                      <Ionicons name="checkbox" size={22} color="#f59e0b" />
                      <Text
                        key={index}
                        fontSize="14"
                        color="#c3c3c3"
                        fontWeight="500"
                      >
                        {ingrediente}
                      </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.6} onPress={() => removerIngrediente(ingrediente)}>
                      <Ionicons name="trash" size={18} color="#ff8735" />
                    </TouchableOpacity>
                  </View>
                ))}
            </View>

            <Button
              color="primary"
              onPress={createRecipe}
              icon={<Ionicons name="search-sharp" size={18} color="#fff" />}
              iconPosition="left"
              text="Criar Receita"
            />
          </View>
        )}

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
                    receita.ingredientes.map(item => <Text style={styles.ingredientesReceita}>{item}</Text>)
                  )
                }
                <Text style={styles.titleModo}>Modo de preparo</Text>
                {
                  receita?.modoPreparo && (
                    receita.modoPreparo.map(item => <Text style={styles.ingredientesReceita}>{item}</Text>)
                  )
                }
              </View>
            </View>

            <View style={{ gap: 10, marginTop: 5, marginBottom: 5, justifyContent: 'space-between' }}>
              <Button text="Salvar" color={"secondary"} />
              <Button text="Excluir tudo" color={"danger"} onPress={excluirTudo} />
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
