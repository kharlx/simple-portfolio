import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Gemini API request
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateText?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: {
            text: userMessage
          },
          temperature: 0.7,
          maxOutputTokens: 300
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return res.status(500).json({ reply: "Gemini API error." });
    }

    const data = await response.json();

    // Extract the text safely
    const reply = data.candidates?.[0]?.output || "Sorry, no response.";

    res.json({ reply });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ reply: "Server error." });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("✅ Chatbot server running on port 5000");
});
