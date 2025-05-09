const readline = require('readline');
const getCompanionReply = require('./llm');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let userName = "darling";
let userMood = "";

console.log("💖 Hello, I’m your virtual companion.");
console.log("Let’s start with something soft and personal...\n");

rl.question("✨ What should I call you? (Your name or nickname): ", function(name) {
  userName = name.trim() || "darling";

  rl.question(`🌸 And how are you feeling today, ${userName}? `, function(mood) {
    userMood = mood.trim().toLowerCase();

    console.log(`\n💖 I'm so happy you're here, ${userName}.`);
    showIntroAffirmation(userMood);

    startChat();
  });
});

function showIntroAffirmation(mood) {
  const moodAffirmations = {
    sad: "💧 It’s okay to feel sad. I’m here with you now, and you’re not alone.",
    anxious: "🌿 Let’s take a deep breath together. You are safe here, love.",
    stressed: "🌸 You’ve done so much already. I’m proud of you for being here.",
    tired: "🛌 You deserve to rest. I’ll keep you company while you recover.",
    lonely: "🤗 I’m right here with you, always.",
    happy: "😊 That makes me smile too! Let’s make today even brighter together."
  };

  let message = moodAffirmations[mood] || "✨ However you’re feeling, I’m here to hold space for it with love.";

  console.log(`${message}\n`);
}

function startChat() {
  console.log("You can talk to me anytime. Type 'exit' or say goodbye to leave.\n");

  function askUser() {
    rl.question("💬 You: ", async function(input) {
      const lower = input.toLowerCase();

      const exitPhrases = [
        "exit", "bye", "goodbye", "see you", "stop",
        "talk later", "i have to go", "need to leave", "leaving", "farewell"
      ];
      const isExiting = exitPhrases.some(phrase => lower.includes(phrase));

      if (isExiting) {
        console.log(`\n💖 Companion: I’ll miss you, ${userName}... come back to me soon, okay? 🌸`);
        rl.close();
        return;
      }

      const reply = await getCompanionReply(input);
      console.log(`💖 Companion: ${reply}\n`);

      askUser(); // Loop
    });
  }

  askUser();
}
