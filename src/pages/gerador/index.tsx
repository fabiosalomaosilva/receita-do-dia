import React, { useState } from "react";
import { View, StyleSheet, Keyboard, ScrollView } from "react-native";
import { Text } from "../../components/inputs/Text";
import { getReceita } from "../../services/gptService";
import Input from "../../components/inputs/Input";
import Button from "../../components/inputs/Button";
import { Ionicons } from "@expo/vector-icons";

export default function Gerador() {
  const [ingredientes, setIngredientes] = useState<string[]>([]);
  const [ingrediente, setIngrediente] = useState<string>("");
  const [receita, setReceita] = useState<string>(``);
  const [loading, setLoading] = useState<boolean>(false);

  function addIngrediente() {
    if (ingrediente === "") return;
    Keyboard.dismiss();

    setIngredientes([...ingredientes, ingrediente]);
    setIngrediente("");
    console.log(ingredientes);
  }

  const createRecipe = async () => {
    setLoading(true);
    setReceita("");

    Keyboard.dismiss();
    const result = await getReceita(ingredientes);
    setReceita(result ? result : "");
    setLoading(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Receita do dia</Text>
      <View style={styles.cardInsert}>
        <Text style={styles.cardText}>O que tenho em casa?</Text>
        <Input value={ingrediente} onChangeText={setIngrediente} />
        <Button text="Adicionar" onPress={addIngrediente} color="primary" />
      </View>
      <View style={styles.cardInsert}>
        <Text>Ingredientes &#129367;</Text>
        {ingredientes &&
          ingredientes.map((ingrediente, index) => (
            <View>
              <Ionicons name="checkmark" size={22} color="#f59e0b" />
              <Text
                key={index}
                fontSize="$6"
                color="$gray10Light"
                fontWeight="500"
              >
                {ingrediente}
              </Text>
            </View>
          ))}
      </View>
    </ScrollView>
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
  cardInsert: {
    width: "100%",
    minHeight: 100,
    backgroundColor: "#e2e8f0",
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
