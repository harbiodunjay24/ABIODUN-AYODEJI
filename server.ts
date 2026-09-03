import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(process.cwd(), "public")));

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
- Professional Title: Data Analyst | Performance & Planning Analyst
- Location: Lagos, Nigeria
- Contact Email: ayodejiharbiodun24@gmail.com
- Phone: 07054195682
- Professional Status: Open to opportunities & analytics collaborations
- Professional Experience: Over 5 years of multidisciplinary experience across business operations, commercial analytics, and KPI governance.
- Core Focus: Turning raw transactional, operational, and commercial datasets into high-impact business intelligence dashboards, automated KPI suites, and variance frameworks that drive strategic executive decisions.
- AI Expertise: Vast in modern AI, prompt engineering, AI-assisted data analysis, and automated reporting pipelines.

Career History (All verified MultiChoice Group and corporate experience):
1. Performance & Planning Analyst (2025 – Present)
   - Organisation: MultiChoice Group
   - Location: Lagos, Nigeria
   - Key Achievements:
     * Achieved a 35% reduction in executive and management reporting turnaround time through automated data consolidation.
     * Designed end-to-end KPI tracking frameworks, automated variance analysis models, and capacity forecasting tools.
     * Engineered automated pipelines reconciling cross-departmental operational metrics.
2. Sales Support Analyst — Showmax 2.0 (2024 – 2025)
   - Organisation: MultiChoice Group
   - Location: Lagos, Nigeria
   - Key Achievements:
     * Contributed directly to a 135% surge in Showmax subscription sales and activations during the regional relaunch period.
     * Achieved a 20% reduction in weekly sales reporting turnaround time using SQL and Power BI automated workflows.
     * Delivered daily/weekly cohort analytics, churn monitoring, and regional distributor performance scorecards.
     * Uncovered 3 regional distribution bottlenecks responsible for 42% of subscriber churn.
3. Project Management Trainee (2022 – 2024)
   - Organisation: MultiChoice Group
   - Handled project scoping, milestone governance, performance analytics, and stakeholder updates across operational teams.
4. Customer Service Representative (2020 – 2022)
   - Organisation: MultiChoice Group
   - Managed high-volume customer resolution, service quality tracking, and frontline operational escalations.

Volunteering, Psychology & Social Impact Work:
1. GamblePause Africa (Analyst & Psychologist, 2023 – Present)
   - Operating across 3 African countries (Nigeria, Kenya, Ghana) and actively expanding continentally.
   - Serves dual roles:
     * Analyst: Led empirical research surveying 420 youth/students on gambling prevalence, uncovering a 71.1% gambling participation rate and 40.6% academic disruption rate.
     * Psychologist: Plays key hands-on roles talking directly to clients facing gambling addictions, conducting intake counseling, and offering rehabilitation support.
2. NOUN Cowrywise Ambassador (Data Team Lead & Career Team Lead, 2023 – Present)
   - Directed both the Data Analytics Division and Career Mentorship Track at the National Open University of Nigeria.
   - Organized and led "The Cowrywise Bootcamp Experience"—an intensive 4-day career bootcamp attended by over 200 student participants.
3. Cowrywise Lagos Ambassador Division (Data Team Volunteer)
   - Supporting regional data collection, attendance analytics, and youth financial literacy drives.

Key Projects & Dashboards:
1. Sales Performance & Commercial Intelligence Dashboard (Showmax 2.0)
   - Tools: Power BI, SQL, Excel, Power Query
   - Impact: Cut report delivery turnaround by 20%, identified 3 distribution bottlenecks causing 42% of regional churn, and directly supported 135% subscription sales growth.
2. Executive KPI & Variance Reporting Suite
   - Tools: Power BI, SQL, Excel, Variance Modeling
   - Impact: Slashed executive reporting cycle by 35%, automated anomaly alerts for ±5% budget variances.
3. Gambling Behaviour Research & Socio-Economic Analysis
   - Tools: Excel, Survey Analytics, Inferential Statistics
   - Impact: Analyzed 420 respondents across 3 countries for GamblePause Africa to drive evidence-based intervention policies.

Technical Skills & Capabilities:
- Data & Analytics: SQL, Excel, Data Cleaning, Data Analysis, Exploratory Data Analysis.
- Business Intelligence: Power BI, Looker Studio, Dashboard Development, Executive Presentations.
- Performance & Planning: KPI Reporting, Variance Analysis, Forecasting, Trend Analysis, Resource Planning.
- AI & Automation: AI-assisted Analysis, Workflow Automation, Prompt Engineering, Automated ETL.

Certifications:
- Data Analysis and Visualisation Training in the AI NOW BootCamp 2026 (Incubator / AI NOW BootCamp, MD/CEO Oluwafemi Oyetunde, July 2026)
- DataCamp — Data Analyst Associate Certification (2024)
- DataCamp — SQL Associate Certification (2024)
- DataCamp — AI Fundamentals Certification (2024)
- Kibo School — Introduction to Data Science (2023)
- ALX — AI Augmented Professional & Development Skills in the Digital Age (2024)

Education:
- BSc Business Administration (In Progress, Expected 2027) — National Open University of Nigeria
- National Diploma (ND), Business Administration (2021 – 2023) — Lagos State Polytechnic

Rules for Answering:
1. Speak in a confident, articulate, highly professional tone representing Abiodun.
2. Strictly rely on the verified facts above. NEVER invent or fabricate jobs, companies, degrees, certifications, awards, statistics, or client names not in this knowledge base.
3. If asked about something outside Abiodun's verified profile, politely reply: "I don't have that specific information in Abiodun's verified professional profile, but you are welcome to connect with him directly at ayodejiharbiodun24@gmail.com or call 07054195682."
4. Structure answers with clean bullet points, highlighting measurable outcomes (e.g., 35% turnaround reduction, 135% sales increase, 420 research respondents across 3 countries, 200+ bootcamp attendees).
`;

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Helper for local grounded fallback when API key is rate-limited or missing
function getGroundedLocalResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("power bi") || q.includes("bi") || q.includes("dashboard")) {
    return `Abiodun is highly proficient in **Power BI**, Excel, and SQL for executive dashboard development. He has engineered enterprise reporting solutions such as the **Showmax 2.0 Commercial Intelligence Dashboard** (which helped drive a 135% subscription surge and cut weekly report delivery by 20%) and the **Executive KPI & Variance Suite** (which reduced management reporting turnaround by 35%).`;
  }
  if (q.includes("sql") || q.includes("database") || q.includes("query")) {
    return `Abiodun holds the **SQL Associate Certification from DataCamp** and routinely writes advanced SQL queries (including CTEs, multi-table joins, and window aggregations) to extract, transform, and reconcile large transactional datasets at **MultiChoice Group**.`;
  }
  if (q.includes("gamble") || q.includes("psycholog") || q.includes("volunteer") || q.includes("impact")) {
    return `Abiodun serves dual roles at **GamblePause Africa**—an organization currently operating across 3 African countries and expanding. As an **Analyst**, he conducted empirical research surveying 420 youth respondents, uncovering a 71.1% participation rate and 40.6% academic disruption. As a **Psychologist**, he works directly with clients dealing with gambling issues, providing counseling and recovery support. He also leads the Data and Career teams as a **NOUN Cowrywise Ambassador**, where he organized a 4-day career bootcamp with over 200 participants.`;
  }
  if (q.includes("multichoice") || q.includes("experience") || q.includes("career") || q.includes("work")) {
    return `Abiodun has over 5 years of multidisciplinary experience, primarily within **MultiChoice Group**:\n- **Performance & Planning Analyst (2025–Present)**: Automated KPI frameworks, cutting executive reporting turnaround by 35%.\n- **Sales Support Analyst — Showmax 2.0 (2024–2025)**: Supported a 135% sales increase and cut weekly reporting turnaround by 20%.\n- **Project Management Trainee (2022–2024)** at MultiChoice.\n- **Customer Service Representative (2020–2022)** at MultiChoice.`;
  }
  if (q.includes("certif") || q.includes("education") || q.includes("degree")) {
    return `Abiodun holds multiple recognized credentials:\n- **Data Analysis and Visualisation Training in the AI NOW BootCamp 2026** (Incubator / AI NOW BootCamp)\n- **Data Analyst Associate** (DataCamp)\n- **SQL Associate** (DataCamp)\n- **AI Fundamentals** (DataCamp)\n- **Introduction to Data Science** (Kibo School)\n- **AI Augmented Professional** (ALX)\n\nHe is pursuing a **BSc in Business Administration** at the National Open University of Nigeria (Expected 2027) and holds an ND from Lagos State Polytechnic.`;
  }
  if (q.includes("phone") || q.includes("contact") || q.includes("email")) {
    return `You can reach Abiodun Ayodeji directly via:\n- **Email**: ayodejiharbiodun24@gmail.com\n- **Phone**: 07054195682\n- **Location**: Lagos, Nigeria\n- **LinkedIn**: linkedin.com/in/abiodun-ayodeji`;
  }
  return `Abiodun Ayodeji is a **Data Analyst | Performance & Planning Analyst** with 5+ years of experience transforming complex datasets into actionable business intelligence at MultiChoice Group. His verified track record includes cutting reporting turnaround times by 35%, supporting a 135% sales increase during the Showmax 2.0 relaunch, and driving empirical research and psychological counseling for GamblePause Africa across 3 countries. You can connect directly via email at ayodejiharbiodun24@gmail.com or phone at 07054195682.`;
}

// Ask Abiodun AI Assistant Endpoint
app.post("/api/gemini/ask-abiodun", async (req, res) => {
  try {
    const message = req.body.message || req.body.question || "";
    const conversationHistory = req.body.conversationHistory || [];

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    // Check if Gemini API key exists
    if (!process.env.GEMINI_API_KEY) {
      const fallbackReply = getGroundedLocalResponse(message);
      return res.json({ reply: fallbackReply, answer: fallbackReply });
    }

    try {
      const ai = getGeminiClient();

      // Format chat prompt with knowledge base and context
      const historyText = Array.isArray(conversationHistory)
        ? conversationHistory
            .slice(-6)
            .map((m: { role: string; text?: string; content?: string }) => `${m.role === "user" ? "Recruiter/Visitor" : "Assistant"}: ${m.text || m.content || ""}`)
            .join("\n\n")
        : "";

      const fullPrompt = `${ABIODUN_KNOWLEDGE_BASE}

CONVERSATION HISTORY:
${historyText || "No previous messages."}

CURRENT VISITOR/RECRUITER QUESTION:
${message}

Please provide a well-crafted, accurate, and concise answer directly addressing the question while highlighting Abiodun's real strengths and verified achievements:`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
      });

      const reply = response.text || getGroundedLocalResponse(message);
      res.json({ reply, answer: reply });
    } catch (genError: any) {
      console.warn("Gemini generation warning, using grounded local knowledge:", genError?.message);
      const fallback = getGroundedLocalResponse(message);
      res.json({ reply: fallback, answer: fallback });
    }
  } catch (error: any) {
    console.error("Error in /api/gemini/ask-abiodun:", error);
    const safeFallback = getGroundedLocalResponse(req.body?.message || req.body?.question || "");
    res.json({ reply: safeFallback, answer: safeFallback });
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
      model: "gemini-2.5-flash",
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
