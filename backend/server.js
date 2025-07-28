import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

dotenv.config(); // Load .env

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

// =============== STRATEGY ANALYSIS (AI) ===============
app.post("/api/generate-strategy", async (req, res) => {
  console.log("Strategy request:", req.body);
  try {
    const { domain, companyType, goal, customReason, csvData } = req.body;

    const prompt = `Generate 3 actionable business strategies.
Domain: ${domain || "Not specified"}
Company Type: ${companyType || "Not specified"}
Goal: ${goal || "Not specified"}
Custom Query: ${customReason || "None"}
CSV Data Sample: ${csvData?.slice(0, 300) || "No CSV provided"}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert business consultant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    });

    const text = completion.choices[0].message.content;
    const strategies = text.split("\n").filter((l) => l.trim() !== "");
    res.json({ success: true, strategies });
  } catch (err) {
    console.error("AI Strategy Error:", err);
    res.status(500).json({ success: false, message: "AI generation failed" });
  }
});


// =============== RISK ASSESSMENT (AI) ===============
app.post("/api/generate-risk", async (req, res) => {
  console.log("Risk request:", req.body);

  try {
    const { riskType, riskScenario, riskDescription } = req.body;

    const prompt = `Identify top 3 risks and mitigations for:
    Type: ${riskType || "General"}
    Scenario: ${riskScenario || "Not specified"}
    Details: ${riskDescription || "No description provided"}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a risk assessment expert." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    });

    const text = completion.choices[0].message.content;
    // Simple split: separate risks and mitigations by lines
    const lines = text.split("\n").filter(l => l.trim() !== "");
    const risks = lines.slice(0, 3);
    const mitigations = lines.slice(3, 6);

    res.json({ success: true, risks, mitigations });
  } catch (err) {
    console.error("AI Risk Error:", err);
    res.status(500).json({ success: false, message: "AI generation failed" });
  }
});

// =============== MARKET RESEARCH (AI) ===============
app.post("/api/generate-market", async (req, res) => {
  console.log("Market research request:", req.body);

  try {
    const { industry, product, query } = req.body;
    const prompt = `Provide 3 key market trends and 3 competitor insights for:
    Industry: ${industry || "General"}
    Product/Service: ${product || "Not specified"}
    Specific query: ${query || "General market research"}
    Answer with trends first, then competitors.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a market research expert." },
        { role: "user", content: prompt },
      ],
      max_tokens: 350,
    });

    const text = completion.choices[0].message.content;
    const lines = text.split("\n").filter(l => l.trim() !== "");

    // Assume first 3 lines = trends, next 3 = competitors
    const insights = lines.slice(0, 3);
    const competitors = lines.slice(3, 6);

    res.json({ success: true, insights, competitors });
  } catch (err) {
    console.error("AI Market Error:", err);
    res.status(500).json({ success: false, message: "AI generation failed" });
  }
});

// =============== REPORTS (AI GENERATED) ===============
app.post("/api/reports", async (req, res) => {
  console.log("Reports request received:", req.body);

  try {
    const { email, activities } = req.body;

    // Create a text summary from user activities
    const activitySummary = activities && activities.length > 0
      ? activities.map(a => `- ${a.description} (${a.timestamp})`).join("\n")
      : "No previous activities recorded.";

    const prompt = `Generate a concise table of up to 5 recent reports based on this user's business activities:
    User: ${email}
    Activities:
    ${activitySummary}
    
    Format as:
    Report Name | Date | Type | Status
    Make the data realistic.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an AI assistant generating a reports table." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    });

    const text = completion.choices[0].message.content;
    console.log("AI Report Text:", text);

    // Parse AI response into structured array
    const lines = text.split("\n").filter(l => l.includes("|"));
    const reports = lines.map((line, index) => {
      const [name, date, type, status] = line.split("|").map(s => s.trim());
      return { id: index + 1, name, date, type, status };
    });

    res.json({ success: true, reports });
  } catch (err) {
    console.error("AI Reports Error:", err);
    res.status(500).json({ success: false, message: "AI report generation failed" });
  }
});


// Default route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 