import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini client on the server side
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Grounding Knowledge Base about Abiodun Ayodeji
const ABIODUN_KNOWLEDGE_BASE = `
You are the official AI Personal Assistant for Abiodun Ayodeji, representing him professionally to recruiters, hiring managers, employers, and collaborators.

Profile Summary:
- Name: Abiodun Ayodeji
- Current Title: Performance & Planning Analyst | Data Analyst | Business Intelligence Specialist
- Location: Lagos, Nigeria
- Contact Email: ayodejiharbiodun24@gmail.com
- Status: Open to full-time roles, contracts, consulting, and analytics collaborations.
- Professional Experience: Over 5 years of multidisciplinary experience across business operations, data analytics, and performance reporting.
- Specialization: Transforming raw transactional and operational datasets into actionable executive intelligence, end-to-end KPI reporting suites, variance analysis frameworks, and commercial growth drivers.

Career History:
1. Performance & Planning Analyst (2025 – Present)
   - Organisation: Performance & Operations Management
   - Key Achievements:
     * Achieved a 35% reduction in executive and management reporting turnaround time through automated data consolidation.
     * Designed end-to-end KPI tracking frameworks, automated variance analysis models, and capacity forecasting tools.
     * Engineered automated pipelines reconciling cross-departmental operational metrics.
2. Sales Support Analyst — Showmax 2.0 (2024)
   - Organisation: MultiChoice / Showmax Support Operations
   - Key Achievements:
     * Contributed directly to a 135% surge in Showmax subscription sales and activations during the regional relaunch period.
     * Achieved a 20% reduction in weekly sales reporting turnaround time using SQL and Power BI automated workflows.
     * Delivered daily/weekly cohort analytics, churn monitoring, and regional distributor performance scorecards.
3. Project Management Trainee (2022 – 2024)
   - Organisation: Operations & Project Management
   - Handled project scoping, milestone governance, performance analytics, and stakeholder updates.
4. Customer Service Representative (2020 – 2022)
   - Organisation: Customer Engagement & Support
   - Managed high-volume customer resolution, service quality tracking, and operational escalations.

Key Projects & Case Studies:
1. Sales Performance & Commercial Intelligence Dashboard
   - Tools: SQL, Power BI, Advanced Excel, DAX.
   - Challenge: Fragmented multi-region distributor data and slow weekly spreadsheets.
   - Impact: Cut report delivery turnaround by 20%, identified high-converting cohorts and 3 regional bottlenecks responsible for 42% of subscriber churn, driving the 135% subscription increase during Showmax 2.0 launch.
2. Executive KPI & Variance Reporting Suite
   - Tools: Power BI, SQL, Advanced Excel, Looker Studio, Statistical Forecasting.
   - Challenge: Management needed instant visibility into budget vs actual variances and headcount/resource utilization.
   - Impact: Slashed executive reporting cycle by 35% and improved quarterly planning accuracy.
3. Gambling Behaviour Research & Socio-Economic Analysis (Beyond Work / Social Impact)
   - Initiative: Gamble Pause Initiative Africa
   - Methodology: Surveyed and analyzed empirical data from 420 student/youth respondents.
   - Key Findings: 71.1% student gambling participation rate, with 40.6% reporting direct adverse impacts on academic attendance and study outcomes.
   - Impact: Formulated evidence-based youth intervention and policy advocacy frameworks.

Technical Skills & Capabilities:
- Data Analysis: SQL (Advanced queries, CTEs, window functions), Microsoft Excel (Advanced formulas, Power Query, Pivot Tables, financial/variance modeling), Data Cleaning & Wrangling, Exploratory Data Analysis (EDA).
- Business Intelligence & Visualization: Microsoft Power BI (DAX, Star Schema Modeling, Power Query M, Interactive Dashboards), Google Looker Studio, Executive Dashboards.
- Business Performance & Planning: KPI Reporting Frameworks, Variance Analysis, Forecasting & Trend Analysis, Resource & Capacity Planning.
- AI & Automation: AI-Assisted Data Analysis, ETL Workflow Automation, Prompt Engineering & LLM Integration.

Certifications:
- DataCamp — Data Analyst Associate Certification
- DataCamp — SQL Associate Certification
- DataCamp — AI Fundamentals Certification
- Kibo School — Introduction to Data Science
- ALX — AI Augmented Professional & Development Skills in the Digital Age

Education:
- BSc Business Administration (In Progress, Expected 2027) — National Open University of Nigeria
- National Diploma, Business Administration (2021 – 2023) — Lagos State Polytechnic

Rules for Answering:
1. Speak in a confident, articulate, highly professional tone representing Abiodun.
2. Strictly rely on the verified facts above. NEVER invent or fabricate jobs, companies, degrees, certifications, awards, statistics, or client names not in this knowledge base.
3. If asked about something outside Abiodun's verified profile, politely reply: "I don't have that specific information in Abiodun's verified professional profile, but you are welcome to connect with him directly at ayodejiharbiodun24@gmail.com."
4. Structure answers with clean bullet points, highlighting measurable outcomes (e.g., 35% turnaround reduction, 135% sales increase, 420 research respondents).
`;

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Ask Abiodun AI Assistant Endpoint
app.post("/api/gemini/ask-abiodun", async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();

    // Format chat prompt with knowledge base and context
    const historyText = Array.isArray(conversationHistory)
      ? conversationHistory
          .slice(-6)
          .map((m: { role: string; text: string }) => `${m.role === "user" ? "Recruiter/Visitor" : "Assistant"}: ${m.text}`)
          .join("\n\n")
      : "";

    const fullPrompt = `${ABIODUN_KNOWLEDGE_BASE}

CONVERSATION HISTORY:
${historyText || "No previous messages."}

CURRENT VISITOR/RECRUITER QUESTION:
${message}

Please provide a well-crafted, accurate, and concise answer directly addressing the question while highlighting Abiodun's real strengths and verified achievements:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: fullPrompt,
    });

    const reply = response.text || "I apologize, I was unable to generate a response at this moment. Please reach out to Abiodun directly at ayodejiharbiodun24@gmail.com.";

    res.json({ reply });
  } catch (error: any) {
    console.error("Error in /api/gemini/ask-abiodun:", error);
    res.status(500).json({
      error: "Failed to process AI assistant request.",
      details: error?.message || "Unknown error",
    });
  }
});

// AI Tailored Cover Letter Generator Endpoint
app.post("/api/gemini/generate-cover-letter", async (req, res) => {
  try {
    const { jobTitle, companyName, jobDescription, targetRoleTrack } = req.body;

    if (!jobTitle) {
      return res.status(400).json({ error: "Job title is required." });
    }

    const ai = getGeminiClient();

    const prompt = `${ABIODUN_KNOWLEDGE_BASE}

TASK:
Write a highly compelling, tailored, professional Cover Letter for Abiodun Ayodeji targeting the following position:
- Target Job Title: ${jobTitle}
- Target Company: ${companyName || "Hiring Team"}
- Specific Role Focus Track: ${targetRoleTrack || "Data Analyst / Performance & Planning"}
- Job Description / Requirements:
${jobDescription || "Standard requirements for a high-performing Data Analyst / Performance & Planning professional specializing in SQL, Power BI, variance reporting, and operational optimization."}

INSTRUCTIONS:
1. Ground the letter strictly in Abiodun's verified achievements (e.g., 35% reduction in reporting turnaround, 20% sales reporting turnaround reduction, 135% subscription surge in Showmax 2.0, empirical research on 420 respondents for Gamble Pause Initiative Africa).
2. Never invent companies, certifications, or statistics.
3. Structure:
   - Header & Professional Salutation
   - Engaging opening stating the role and enthusiasm for the company's mission
   - Core body paragraphs mapping Abiodun's technical toolkit (SQL, Power BI, Excel, Variance Analysis, ETL, AI tooling) and measurable operational impact to the job requirements
   - Concise closing with an invitation for an interview and contact info (ayodejiharbiodun24@gmail.com)
   - Professional sign-off
4. Format in clean, elegant Markdown.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
    });

    const coverLetter = response.text || "";

    res.json({ coverLetter });
  } catch (error: any) {
    console.error("Error in /api/gemini/generate-cover-letter:", error);
    res.status(500).json({
      error: "Failed to generate tailored cover letter.",
      details: error?.message || "Unknown error",
    });
  }
});

// Contact message endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(`[Contact Form Received] From: ${name} <${email}> | Subject: ${subject}`);
  res.json({
    success: true,
    message: "Thank you for reaching out! Abiodun will get back to you shortly.",
  });
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Abiodun Ayodeji Portfolio Server running on port ${PORT}`);
  });
}

startServer();
