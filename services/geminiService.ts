import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from '../constants';

// Initialize Gemini client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChefRecommendation = async (userQuery: string): Promise<string> => {
  try {
    const menuContext = MENU_ITEMS.map(item => 
      `${item.name} (${item.category}, ${item.isVeg ? 'Veg' : 'Non-Veg'}, Rating: ${item.rating}/5): ${item.description}`
    ).join('\n');

    const prompt = `
      You are the Master Chef at 'KhanaDarshan', a high-end restaurant.
      Here is our menu:
      ${menuContext}

      The user asks: "${userQuery}"

      Please recommend 2-3 dishes from the menu that best match their request. 
      Be charismatic, brief, and describe the flavors vividly. 
      Do not list prices. 
      Format the response as a friendly conversation.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "I'm sorry, I couldn't quite catch that. Could you tell me your flavor preferences again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our chef is currently busy preparing a masterpiece. Please check the menu directly!";
  }
};