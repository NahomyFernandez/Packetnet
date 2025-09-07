import { GoogleGenAI, type Chat } from "@google/genai";
import type { Product } from "../types";
import { products } from "../data/products";

// 1) Leer la key desde Vite o, si corres en Node, desde env del servidor
const apiKey =
  (typeof import.meta !== "undefined" ? import.meta.env.VITE_GEMINI_API_KEY : undefined) ??
  process.env.GEMINI_API_KEY ??
  process.env.API_KEY;

if (!apiKey) {
  console.warn("Falta VITE_GEMINI_API_KEY / GEMINI_API_KEY. AI deshabilitado.");
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
      model: "gemini-2.5-flash",
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
    const result = await chat.sendMessageStream({ message }); // 👈 cambio clave
    let fullResponse = "";
    for await (const chunk of result) {
      fullResponse += chunk.text ?? "";
    }
    return fullResponse || "Lo siento, no obtuve respuesta.";
  } catch (error) {
    console.error("Error getting AI response:", error);
    chat = null;
    return "Sorry, I encountered an error. Please try asking again.";
  }
};
