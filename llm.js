require('dotenv').config();
const axios = require('axios');

async function getCompanionReply(userMessage) {
  const url = "https://api.together.xyz/v1/chat/completions";

  const headers = {
    "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
    "Content-Type": "application/json"
  };

  const data = {
    model: "mistralai/Mistral-7B-Instruct-v0.1", // A fast, lightweight free model
    messages: [
      { role: "system", content: "You are a kind, supportive, gentle virtual companion. You offer comforting emotional responses." },
      { role: "user", content: userMessage }
    ],
    temperature: 0.7,
    max_tokens: 100
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error contacting Together API:", error.message);
    return "💔 I’m so sorry, I couldn’t think clearly for a moment. Can you try again?";
  }
}

module.exports = getCompanionReply;
