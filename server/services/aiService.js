const Groq = require("groq-sdk");
const generateFinancialSnapshot = require("./aiSnapshotService");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateChatTitle = async (message) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "Generate a short conversation title (max 5 words, under 50 characters). No quotes",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  let title = completion.choices[0].message.content.trim();

  if (title.length > 100) {
    title = title.slice(0, 100);
  }

  return title;
};

const detectIntent = (message) => {
  const text = message.toLowerCase();

  if (text.includes("save") || text.includes("reduce spending")) {
    return "saving_advice";
  }

  if (text.includes("overspend") || text.includes("spending")) {
    return "spending_analysis";
  }

  if (text.includes("budget")) {
    return "budget_help";
  }

  if (text.includes("invest")) {
    return "investment_advice";
  }

  return "general_finance";
};

const generateAIResponse = async (
  userId,
  month,
  year,
  message,
  chatHistory = []
) => {
  try {
    const snapshot = await generateFinancialSnapshot(userId, month, year);
    const intent = detectIntent(message);

    const systemPrompt = `
You are an expert personal finance assistant.

User financial data:
Total Income: ₹${snapshot.totalIncome}
Total Expense: ₹${snapshot.totalExpense}
Balance: ₹${snapshot.balance}

Top Expense Categories:
${snapshot.topExpenseCategories
  .map((c) => `${c.category}: ₹${c.total}`)
  .join("\n")}

Budget Status:
${snapshot.budgetStatus
  .map((b) => `${b.category}: spent ₹${b.spent} of ₹${b.limitAmount}`)
  .join("\n")}

User intent: ${intent}

Rules:
- Give clear financial advice
- Be concise
- Provide actionable insights
`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...chatHistory,
      { role: "user", content: message },
    ];

    const response = await groq.chat.completions.create({
      messages,
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      max_tokens: 500,
    });

    const assistantReply = response.choices[0].message.content;
    return assistantReply;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to generate AI Response");
  }
};

module.exports = { generateAIResponse, generateChatTitle };
