import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let conversationHistory = {};

export const chatWithGemini = async (req, res) => {
  try {
    const userId = req.body.userId;
    const message = req.body.message;

    if (!userId || !message) {
      return res.status(400).json({ error: "User ID and message are required" });
    }

    if (!conversationHistory[userId]) {
      conversationHistory[userId] = [];
    }

    conversationHistory[userId].push({ role: "user", content: message });

    const prompt = conversationHistory[userId]
      .map((entry) => `${entry.role}: ${entry.content}`)
      .join("\n");

    const structuredPrompt = `
      You are a virtual assistant specialized in helping users browse, book, and schedule appointments with nannies. Answer user questions or provide guidance on booking and scheduling, without specific references to nanny details.

      Previous conversation:
      ${prompt}

      Respond in clean, plain-text format, using emojis where helpful for tone.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(structuredPrompt);
    const responseText = await result.response.text();

    const cleanedText = responseText.replace(/```json|```/g, "").trim();

    if (!cleanedText || cleanedText === "") {
      return res.status(500).json({ error: "Gemini response is empty or invalid" });
    }

    conversationHistory[userId].push({ role: "gemini", content: cleanedText });

    res.json({ response: cleanedText });
  } catch (err) {
    console.error("Error handling chat:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function sendToGemini(userId, text) {
  if (!conversationHistory[userId]) {
    conversationHistory[userId] = [];
  }

  const prompt = `
    You are a virtual assistant. Extract nanny-related details and schedules from given information, but currently without specific dataset details.

    Text to analyze:
    ${text}
    
    Respond concisely and clearly.
  `;

  return await genAI.generateContent({ model: "gemini-1.5-flash" }, prompt);
}

