import axios from "axios";
import { Recipe } from "../models/Recipe";

export async function getReceita(ingredientes: string[]) {
  const prompt = `Crie uma receita com os ingredientes que possuo na minha casa e que passarei a informar. 
  Lista de ingredientes ${ingredientes.join(" - ")}. 
  A receita não precisa conter todos os ingredientes informados. Mas apenas os nencessários. Você pode acrescetar outros, como sal, ervas, cebola, tomate e outros que julgar necessário ou opcional.
  O retorno deve ser no formato JSON com os seguintes dados: {nome: string, ingredientes: string[], modoPreparo: string[] }
  Mostre o nome da receita (Não precisa imprimir o label como "Receita:" ou "Nome da receita:") retornado no campo 'nome' do JSON.
  Os ingredientes em um array retornado no campo 'ingredientes' do JSON.
  O modo de preparo em um array não numerado, retornado no campo 'modoPreparo' do JSON.`;
  const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_KEY}`,
  };
  try {
    const uri = "https://api.openai.com/v1/chat/completions";
    const response = await axios.post(uri, data, { headers });
    const receita: Recipe = JSON.parse(response.data.choices[0].message.content);
    return receita;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
