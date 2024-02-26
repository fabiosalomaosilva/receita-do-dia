import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { Recipe } from '../../../models/Recipe';

interface ReceitaProps {
    route: {
        params: {
            recipe: Recipe;
        };
    };
}

export default function Receita({ route }) {
    //console.log(JSON.parse(route.params).nome)
    const { receita } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
            <View style={styles.cardInsert}>
                <Text style={styles.nomeReceita}>{receita.nome}</Text>
                <Text style={styles.titleModo}>Ingredientes</Text>
                {
                    receita.ingredientes && (
                        receita.ingredientes.map(item => <Text style={styles.ingredientesReceita}>{item}</Text>)
                    )
                }
                <Text style={styles.titleModo}>Modo de preparo</Text>
                {
                    receita.modoPreparo && (
                        receita.modoPreparo.map(item => <Text style={styles.ingredientesReceita}>{item}</Text>)
                    )
                }
                              <Text style={styles.titleModo}>Rendimento</Text>
              <Text style={styles.ingredientesReceita}>{receita.rendimento}</Text>

              <Text style={styles.titleModo}>Tempo de preparo</Text>
              <Text style={styles.ingredientesReceita}>{receita.tempoPreparo}</Text>
              
              <Text style={styles.titleModo}>Categoria</Text>
              <Text style={styles.ingredientesReceita}>{receita.categoria}</Text>
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
