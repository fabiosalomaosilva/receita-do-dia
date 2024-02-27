import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { Recipe } from '../../../models/Recipe';
import Button from '../../inputs/Button';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { getRecipeDay, salvarReceita } from '../../../services/firebaseService';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../../models/User';

interface ReceitaProps {
    route: {
        params: {
            recipe: Recipe;
        };
    };
}

export default function Receita({ route }) {
    const [receitaValue, setReceitaValue] = useState<Recipe>(null);
    const [showButton, setShowButton] = useState<boolean>(false);
    const { receita } = route.params;
    const { showButtonSave } = route.params;

    useEffect(() => {
        setReceitaValue(receita);
        setShowButton(showButtonSave);
    }, []);

    async function salvarReceitaDb(recipe: Recipe) {
        const userLogin = JSON.parse(await AsyncStorage.getItem('user')) as User;
        console.log(recipe)

        const result = await salvarReceita(recipe, userLogin.id);
        if (result) {
            const recipeDay = await getRecipeDay();
            setReceitaValue(recipeDay);
            Alert.alert("Salvar receita", "Receita salva com sucesso!");
        }
        else {
            Alert.alert("Salvar receita", "Ocorreu um erro ao salvar a receita. Tente novamente.");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
                {receitaValue !== null ? (
                    <View style={styles.cardInsert}>
                        <Text style={styles.nomeReceita}>{receitaValue.nome}</Text>
                        <Text style={styles.titleModo}>Ingredientes</Text>
                        {
                            receitaValue.ingredientes && (
                                receitaValue.ingredientes.map((item, index) => <Text style={styles.ingredientesReceita} key={index}>{item}</Text>)
                            )
                        }
                        <Text style={styles.titleModo}>Modo de preparo</Text>
                        {
                            receitaValue.modoPreparo && (
                                receitaValue.modoPreparo.map((item, index) => <Text style={styles.ingredientesReceita} key={index}>{item}</Text>)
                            )
                        }
                        <Text style={styles.titleModo}>Rendimento</Text>
                        <Text style={styles.ingredientesReceita}>{receitaValue.rendimento}</Text>

                        <Text style={styles.titleModo}>Tempo de preparo</Text>
                        <Text style={styles.ingredientesReceita}>{receitaValue.tempoPreparo}</Text>

                        <Text style={styles.titleModo}>Categoria</Text>
                        <Text style={styles.ingredientesReceita}>{receitaValue.categoria}</Text>
                    </View>

                ) : (
                    <ActivityIndicator color="#d97706" style={{ marginTop: 80 }} />
                )}
                {showButton && (
                <View style={{ gap: 10, marginTop: 5, marginBottom: 5, justifyContent: 'space-between' }}>
                    <Button text="Salvar" color={"secondary"} onPress={() => salvarReceitaDb(receitaValue)} icon={<Ionicons name="save" color="#f5f5f5" size={18} />} iconPosition="left" />
                </View>
                )}
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
