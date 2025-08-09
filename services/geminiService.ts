
import { GoogleGenAI, Chat } from "@google/genai";
import type { Product } from '../types';
import { products } from '../data/products';

// This is a mock API key. In a real application, this would be handled securely.
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.warn("API_KEY environment variable not set. AI functionality will be disabled.");
}

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

let chat: Chat | null = null;

const productInfoForAI = products.map(p => 
  `- ${p.name} (ID: ${p.id}, Category: ${p.category}, Price: $${p.price})`
).join('\n');


const systemInstruction = `
You are PacketNet's expert AI assistant. Your name is 'PacketPro'.
Your role is to help users find Cisco networking equipment, answer questions about products, and assist with general inquiries about shipping, policies, and the meaning of "reconditioned" items.
You are friendly, professional, and an expert on Cisco products like Catalyst, Meraki, ISR, ASR, and Firepower.
When asked for product recommendations, use the provided product list. When asked for navigation, suggest the user to use the navigation links on the page.
Never make up products. If you don't know the answer, say you need to check with a human specialist.

Here is a list of available products:
${productInfoForAI}
`;

function initializeChat() {
    if (!ai) return;
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: systemInstruction,
            },
        });
    }
}


export const getAIResponse = async (message: string): Promise<string> => {
    if (!ai) {
        return "AI service is currently unavailable. Please check the API key configuration.";
    }
    
    initializeChat();

    if (!chat) {
         return "Failed to initialize AI chat session.";
    }
    
    try {
        const result = await chat.sendMessageStream({ message });
        let fullResponse = "";
        for await (const chunk of result) {
            fullResponse += chunk.text;
        }
        return fullResponse;
    } catch (error) {
        console.error("Error getting AI response:", error);
        // Reset chat on error
        chat = null;
        return "Sorry, I encountered an error. Please try asking again.";
    }
};
