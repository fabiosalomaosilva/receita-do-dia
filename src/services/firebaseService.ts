import { Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";

import { Recipe } from "../models/Recipe";

export async function salvarReceita(recipe: Recipe, idUser: string): Promise<boolean> {
  try {
    const obj = {
      id: recipe.id ?? null,
      nome: recipe.nome,
      user: firestore().collection('users').doc(idUser),
      ingredientes: recipe.ingredientes,
      modoPreparo: recipe.modoPreparo,
      rendimento: recipe.rendimento,
      tempoPreparo: recipe.tempoPreparo,
      categoria: recipe.categoria,
      createdAt: firestore.FieldValue.serverTimestamp()
    }
    if (recipe.id.length === 8) {
      await firestore().collection('recipes').doc(recipe.id + "-" + idUser).set(obj);
    }
    else {
      await firestore().collection('recipes').doc(recipe.id).set(obj);
    }

    const recipes = await AsyncStorage.getItem('recipes');
    if (recipes) {
      let parsedRecipes: Recipe[] = JSON.parse(recipes);

      const newRecipe: Recipe = {
        id: recipe.id,
        nome: recipe.nome,
        ingredientes: recipe.ingredientes,
        modoPreparo: recipe.modoPreparo,
        categoria: recipe.categoria,
        rendimento: recipe.rendimento,
        tempoPreparo: recipe.tempoPreparo,
        createdAt: recipe.createdAt
      }
      parsedRecipes.push(newRecipe);
      if (parsedRecipes.length > 3) {
        parsedRecipes.shift();
      }
      await AsyncStorage.setItem('recipes', JSON.stringify(parsedRecipes));
    } else {
      await AsyncStorage.setItem('recipes', JSON.stringify([obj]));
    }
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

export async function saveRecipeDay(recipe: Recipe) {
  try {
    const id = getIdRecipe();
    const objExists = await firestore().collection('recipeDay').doc(id.toString()).get();
    if (objExists.exists) return;
    const obj = {
      nome: recipe.nome,
      ingredientes: recipe.ingredientes,
      modoPreparo: recipe.modoPreparo,
      rendimento: recipe.rendimento,
      tempoPreparo: recipe.tempoPreparo,
      categoria: recipe.categoria,
      createdAt: firestore.FieldValue.serverTimestamp()
    }
    if (recipe.id) {
      await firestore().collection('recipeDay').doc(id.toString()).update(obj);
    } else {
      const result = await firestore().collection('recipeDay').doc(id.toString()).set(obj);
    }
    Alert.alert("Salvar receita", "Receita salva com sucesso!");
  }
  catch (error) {
    Alert.alert("Salvar receita", "Ocorreu um erro ao salvar a receita. Tente novamente.");
  }
}

export async function getRecipeDay(): Promise<Recipe | null> {
  const id = getIdRecipe();
  const doc = await firestore().collection('recipeDay').doc(id.toString()).get();
  if (!doc.exists) {
    return null;
  }
  const recipeDay: Recipe = {
    id: doc.id,
    nome: doc.data().nome,
    ingredientes: doc.data().ingredientes,
    modoPreparo: doc.data().modoPreparo,
    categoria: doc.data().categoria,
    rendimento: doc.data().rendimento,
    tempoPreparo: doc.data().tempoPreparo,
    createdAt: doc.data().createdAt
  };
  return recipeDay;
}

export async function getRecipesByUser(id: string): Promise<Recipe[] | null> {
  try {
    let recipes: Recipe[] = [];
    const data = await firestore()
      .collection('recipes')
      .where('user', '==', firestore().collection('users').doc(id))
      .orderBy('createdAt', 'desc')
      .limit(3)
      .get();
    data.docs.map(doc => {
      recipes.push({
        id: doc.id,
        nome: doc.data().nome,
        ingredientes: doc.data().ingredientes,
        modoPreparo: doc.data().modoPreparo,
        categoria: doc.data().categoria,
        rendimento: doc.data().rendimento,
        tempoPreparo: doc.data().tempoPreparo,
        createdAt: doc.data().createdAt.toDate()
      } as Recipe);
    });

    return recipes;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

export function getIdRecipe(): string {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');

  const dataFormatada = `${ano}${mes}${dia}`;
  return dataFormatada;
}

export async function salvarUsuario(email: string, nome: string, password: string, photoUrl?: string): Promise<boolean> {
  try {
    const obj = {
      displayName: nome,
      email: email,
      photoUrl: photoUrl,
    }
    await auth().createUserWithEmailAndPassword(email, password)
    await firestore().collection('users').doc(email).set(obj);
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}

export async function esqueciSenha(email: string): Promise<boolean> {
  try {
    const obj = {
      email: email,
    }
    await auth().sendPasswordResetEmail(email)
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
}