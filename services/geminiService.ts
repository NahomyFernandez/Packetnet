import { GoogleGenAI, type Chat } from "@google/genai";
import type { Product } from "../types";
import { products } from "../data/products";

// --- ¡CORRECCIÓN DIRECTA! ---
// Pega tu API Key de Gemini directamente en la siguiente línea,
// dentro de las comillas.
const apiKey = "AIzaSyBji5tmHu0FDZ56nHdVsc8bn-MW2a2kJnk"; 
// -----------------------------

if (!apiKey || apiKey === "AIzaSyBji5tmHu0FDZ56nHdVsc8bn-MW2a2kJnk") {
  console.warn("API KEY no encontrada. Pégala en services/geminiService.ts");
}
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;


let chat: Chat | null = null;

const productInfoForAI = products
  .map(
    (p) => `- ${p.name} (ID: ${p.id}, Category: ${p.category}, Price: $${p.price})`
  )
  .join("\n");

const systemInstruction = `
You are PacketNet's expert AI assistant. Your name is 'PacketPro'.
...
Here is a list of available products:
${productInfoForAI}
`;

function initializeChat() {
  if (!ai) return;
  if (!chat) {
    chat = ai.chats.create({
      model: "gemini-2.5-flash", // Asegúrate de que este modelo es correcto
      config: { systemInstruction },
    });
  }
}

export const getAIResponse = async (message: string): Promise<string> => {
  if (!ai) {
    return "AI service is currently unavailable. Please check the API key configuration.";
  }

  initializeChat();
  if (!chat) return "Failed to initialize AI chat session.";

  try {
    const result = await chat.sendMessageStream({ message });
    let fullResponse = "";
    for await (const chunk of result) {
      fullResponse += chunk.text ?? "";
    }
    return fullResponse || "Lo siento, no obtuve respuesta.";
  } catch (error) {
    console.error("Error getting AI response:", error);
    chat = null; // Reinicia el chat en caso de error
    return "Sorry, I encountered an error. Please try asking again.";
  }
};