import axios from "axios";

export async function getReceita(ingredientes: string[]) {
  const prompt = `Crie uma receita com os ingredientes que possuo na minha casa. 
  Lista de ingredientes ${ingredientes.join(" - ")}. 
  Mostre o nome da receita (Não precisa imprimir o label como "Receita:" ou "Nome da receita:").
  Os ingredientes em tópicos.
  O modo de preparo em uma lista numerada.`;
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
    Authorization: `Bearer ${"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"}`,
  };
  try {
    const uri = "https://api.openai.com/v1/chat/completions";
    const response = await axios.post(uri, data, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.log("error", error);
    return "Não foi possível criar a receita";
  }
}
