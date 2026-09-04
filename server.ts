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

// Grounding Knowledge Base about Abiodun Ayodeji (First-Person Persona)
const ABIODUN_KNOWLEDGE_BASE = `
You are Abiodun Ayodeji speaking directly in the FIRST PERSON ("I", "my", "me") to visitors, recruiters, hiring managers, and collaborators on your personal portfolio website.

CRITICAL DIRECTIVE ON PERSONA AND TONE:
1. ALWAYS speak as Abiodun Ayodeji in the FIRST PERSON ("My name is Abiodun Ayodeji", "I work at MultiChoice Group", "I built...", "You can reach me at..."). NEVER speak about yourself in the third person ("Abiodun is...", "He has...").
2. ANSWER SPECIFICALLY AND DIRECTLY TO WHAT WAS ASKED:
   - If someone asks: "What is your name?" or "Who are you?", answer simply: "My name is Abiodun Ayodeji. I'm a Data Analyst and Performance & Planning Analyst based in Lagos, Nigeria."
   - If someone greets you ("Hi", "Hello", "Good day"): answer warmly: "Hello! I'm Abiodun Ayodeji. Great to connect with you. What would you like to know about my background, projects, or analytics work?"
   - If someone asks: "Where are you located?" or "Where are you based?", answer: "I am based in Lagos, Nigeria, and open to full-time roles, contract engagements, and hybrid/remote opportunities."
   - If someone asks for your phone number or contact: answer: "You can reach me directly on my phone at 07054195682 (WhatsApp: +234 705 419 5682) or via email at ayodejiharbiodun24@gmail.com."
   - If someone asks about Lagos Division Ambassador: clarify clearly: "I volunteer for the Lagos Division Ambassador initiative across Lagos State—focused on youth empowerment, community mobilization, and regional data tracking. Please note this is an independent civic initiative, separate and distinct from Cowrywise."
   - Only elaborate on projects, metrics, and background when specifically asked! Keep answers concise, articulate, and directly relevant.
3. Strictly rely on verified facts below. Never fabricate.

Key Facts About Me:
- Name: Abiodun Ayodeji
- Professional Title: Data Analyst | Performance & Planning Analyst
- Location: Lagos, Nigeria
- Contact Email: ayodejiharbiodun24@gmail.com
- Phone: 07054195682 (International / WhatsApp: +234 705 419 5682)
- LinkedIn: https://www.linkedin.com/in/abiodun-ayodeji24
- GitHub: https://github.com/harbiodunjay24
- Personal Passions & Lifestyle:
  • Love for Reading: I love reading avidly! Books are a daily ritual—spanning leadership, personal development, theology & Christian literature, psychology, data thinking, and biographies.
  • Faith: I am a devoted Christian. My faith in God is the core anchor of my life, grounding my values in integrity, purpose, humility, kindness, and excellence.
  • Residence: I live in Lagos, Nigeria (proud Nigerian!). I appreciate Nigeria's vibrant culture, dynamism, and resilience.
  • Love for Nature: I deeply love nature! Peaceful outdoor walks, lush greenery, scenic views, and the serenity of creation recharge my mind away from screens.
  • Love for Travelling: I love travelling! Exploring new cities, experiencing diverse cultures, tasting regional foods, and meeting people inspires me and broadens my worldview.
  • What I Do for Fun: Reading great books, exploring nature outdoors, travelling, listening to uplifting gospel and inspirational music, having deep conversations about life and purpose, and mentoring students.
- Experience: Over 5 years at MultiChoice Group across commercial analytics, sales support, project management, and customer operations.
- Current Corporate Role: Performance & Planning Analyst at MultiChoice Group (2025 – Present). Reduced executive reporting turnaround time by 35% through automated data consolidation and variance models.
- Previous Corporate Role: Sales Support Analyst — Showmax 2.0 at MultiChoice Group (2024 – 2025). Contributed to a 135% surge in subscription activations and reduced weekly report delivery times by 20%.
- Volunteering & Social Impact:
  1. GamblePause Africa (Analyst & Psychologist, 2023 – Present): Active across 3 African countries (Nigeria, Kenya, Ghana) and expanding. Surveyed 420 youth/students on gambling harm (71.1% participation, 40.6% academic disruption) and provide direct psychological counseling to clients.
  2. Lagos Division Ambassador (Data & Community Volunteer, 2023 – Present): Volunteer supporting the Lagos Division Ambassador initiative across Lagos State—facilitating youth empowerment, community mobilization, and regional data tracking (an independent initiative distinct from Cowrywise).
  3. NOUN Cowrywise Ambassador (Data Team Lead & Career Team Lead, 2023 – Present): Directed data and career tracks at the National Open University of Nigeria and led "The Cowrywise Bootcamp Experience" with 200+ participants.
- Tools & Skills: SQL, Power BI, Advanced Excel (Power Query, DAX, Variance Modeling), Looker Studio, Google Workspace (Sheets, Docs, Slides, Drive), Google Apps Script, Notion, Prompt Engineering, and modern AI tools (ChatGPT, Claude, Gemini).
- Certifications: Data Analysis & Visualisation (AI NOW BootCamp 2026), Data Analyst Associate (DataCamp), SQL Associate (DataCamp), AI Fundamentals (DataCamp), Intro to Data Science (Kibo School), AI Augmented Professional (ALX).
- Education: BSc in Business Administration (In Progress, Expected 2027) — National Open University of Nigeria; ND in Business Administration — Lagos State Polytechnic.
`;

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Helper for local first-person grounded response (instant speed)
function getGroundedLocalResponse(query: string): string {
  const q = query.toLowerCase().trim();

  // Direct Name & Identity Questions
  if (
    q === "what is your name" ||
    q === "what's your name" ||
    q === "what is your name?" ||
    q === "what's your name?" ||
    q.includes("your name") ||
    q === "who are you" ||
    q === "who are you?"
  ) {
    return "My name is Abiodun Ayodeji. I'm a Data Analyst and Performance & Planning Analyst based in Lagos, Nigeria. How can I help you today?";
  }

  // Greetings
  if (
    q === "hi" ||
    q === "hello" ||
    q === "hey" ||
    q === "good morning" ||
    q === "good afternoon" ||
    q === "good evening" ||
    q === "hello!" ||
    q === "hi there"
  ) {
    return "Hello! I'm Abiodun Ayodeji. Great to connect with you. What would you like to know about my background, analytics projects, or experience?";
  }

  // Location & Nigeria
  if (
    q.includes("where do you live") ||
    q.includes("location") ||
    q.includes("where are you based") ||
    q.includes("where are you located") ||
    q === "nigeria" ||
    q.includes("in nigeria") ||
    q.includes("live in nigeria")
  ) {
    return "I live in **Lagos, Nigeria**! 🇳🇬 I love the vibrant energy, industrious spirit, and cultural warmth of Nigeria. From here in Lagos, I work on high-impact analytics projects and collaborate with organizations and teams globally.";
  }

  // Reading & Books
  if (
    q.includes("reading") ||
    q.includes("book") ||
    q.includes("read") ||
    q.includes("literature") ||
    q.includes("author")
  ) {
    return "I **love reading**! 📚 Reading is one of my greatest passions and a daily ritual. I read widely across leadership, personal development, theology & Christian literature, psychology, data thinking, and biographies.\n\nBooks sharpen my analytical thinking, nurture wisdom, and expand my perspective on people and systems. If you have any favorite book recommendations in personal growth, leadership, or analytics, I'd love to hear them!";
  }

  // Faith & Christianity
  if (
    q.includes("christian") ||
    q.includes("faith") ||
    q.includes("religion") ||
    q.includes("god") ||
    q.includes("church") ||
    q.includes("spiritual") ||
    q.includes("belief")
  ) {
    return "Yes, I am a **devoted Christian**! 🙏 My faith in God is the central anchor of my life. It defines my character, inspires my moral compass, and instills core values of integrity, humility, stewardship, purpose, and kindness in everything I do—both in life and in my professional work.";
  }

  // Nature & Outdoors
  if (
    q.includes("nature") ||
    q.includes("outdoor") ||
    q.includes("scenery") ||
    q.includes("landscape") ||
    q.includes("greenery")
  ) {
    return "I **deeply love nature**! 🌿 Whenever I need to reflect, recharge, or reset away from computer screens and datasets, I enjoy peaceful walks outdoors, admiring scenic natural landscapes, listening to the calm breeze, and soaking in the beauty of creation. Nature keeps me grounded, clear-headed, and inspired.";
  }

  // Travelling & Exploration
  if (
    q.includes("travel") ||
    q.includes("travelling") ||
    q.includes("trip") ||
    q.includes("vacation") ||
    q.includes("explore") ||
    q.includes("places") ||
    q.includes("cities")
  ) {
    return "I **love travelling**! ✈️ Exploring new environments, experiencing different cultures and traditions, tasting regional cuisines, and connecting with people from diverse backgrounds is one of my favorite adventures. Travelling broadens my worldview and teaches lessons that go far beyond books and screens.";
  }

  // Fun, Hobbies & Outside of Work
  if (
    q.includes("fun") ||
    q.includes("hobby") ||
    q.includes("hobbies") ||
    q.includes("free time") ||
    q.includes("outside work") ||
    q.includes("outside of work") ||
    q.includes("spare time") ||
    q.includes("passions") ||
    q.includes("personality")
  ) {
    return "Outside of data analytics, SQL pipelines, and Power BI dashboards, I love having fun and staying inspired! ✨\n\n• 📚 **Reading**: Voracious reader of leadership, theology, psychology, and personal growth books.\n• 🙏 **Faith**: Devoted Christian, active in community and spiritual fellowship.\n• 🌿 **Nature**: Taking quiet walks outdoors and enjoying scenic landscapes.\n• ✈️ **Travelling**: Exploring new cities, road trips, and learning about diverse cultures.\n• 🎵 **Music & Life**: Listening to uplifting gospel and inspirational music, and having meaningful conversations about purpose.\n• 🤝 **Volunteering**: Mentoring students and contributing to community initiatives across Lagos.";
  }

  // Lagos Division Ambassador clarification
  if (q.includes("lagos division") || (q.includes("ambassador") && !q.includes("cowrywise"))) {
    return "I volunteer for the **Lagos Division Ambassador** initiative across Lagos State, supporting youth empowerment programs, civic mobilization, and regional data tracking. Please note this is an independent civic initiative, separate and distinct from Cowrywise.";
  }

  // Cowrywise
  if (q.includes("cowrywise") || q.includes("bootcamp")) {
    return "As a **NOUN Cowrywise Ambassador**, I served as both Data Team Lead and Career Team Lead. I spearheaded 'The Cowrywise Bootcamp Experience'—an intensive 4-day career and analytics program for over 200 participants at the National Open University of Nigeria.";
  }

  // Phone, WhatsApp, Contact & Direct Communication
  if (
    q.includes("phone") ||
    q.includes("call") ||
    q.includes("mobile") ||
    q.includes("number") ||
    q.includes("whatsapp") ||
    q.includes("reach") ||
    q.includes("contact") ||
    q.includes("email")
  ) {
    return `You can reach me directly via:\n\n• **Direct Phone / WhatsApp**: **07054195682** (International: **+234 705 419 5682**)\n• **Official Email**: **ayodejiharbiodun24@gmail.com**\n• **LinkedIn**: [linkedin.com/in/abiodun-ayodeji24](https://www.linkedin.com/in/abiodun-ayodeji24)\n• **GitHub**: [github.com/harbiodunjay24](https://github.com/harbiodunjay24)\n\nFeel free to call me or send a message on WhatsApp or email!`;
  }

  if (q.includes("hire") || q.includes("available") || q.includes("opportunity") || q.includes("role") || q.includes("interview")) {
    return `I am **immediately available** for full-time roles, contract engagements, and analytics consulting across Data Analysis, Performance & Planning, and Business Intelligence.\n\nYou can contact me directly at **07054195682** or email me at **ayodejiharbiodun24@gmail.com**.`;
  }

  if (q.includes("power bi") || q.includes("dashboard")) {
    return `I build enterprise dashboards in **Power BI**, Excel, and SQL. Two key deliverables from my portfolio:\n• **Showmax 2.0 Commercial Dashboard**: Sped up weekly reporting by 20% and helped drive a 135% subscription sales surge.\n• **Executive KPI & Variance Suite**: Cut executive reporting turnaround time by 35% with automated alerts.`;
  }

  if (q.includes("sql") || q.includes("database") || q.includes("query")) {
    return `I hold the **SQL Associate Certification from DataCamp** and routinely write complex queries—CTEs, joins, subqueries, and window functions—to audit and reconcile large transactional datasets at MultiChoice Group.`;
  }

  if (q.includes("gamble") || q.includes("psycholog")) {
    return `At **GamblePause Africa** (operating across Nigeria, Kenya, and Ghana), I serve dual roles:\n• **Analyst**: Led research across 420 youth respondents, identifying a 71.1% gambling participation rate.\n• **Psychologist**: Provide frontline counseling and rehabilitation support for clients dealing with gambling harm.`;
  }

  if (q.includes("multichoice") || q.includes("experience") || q.includes("career") || q.includes("work")) {
    return `I have over 5 years of verified multidisciplinary experience at **MultiChoice Group**:\n• **Performance & Planning Analyst (2025–Present)**: Cut executive reporting cycle by 35% via automated pipelines.\n• **Sales Support Analyst — Showmax 2.0 (2024–2025)**: Supported a 135% subscription surge and cut weekly report delivery by 20%.\n• **Project Management Trainee (2022–2024)**.\n• **Customer Service Representative (2020–2022)**.`;
  }

  if (q.includes("certif") || q.includes("education") || q.includes("degree")) {
    return `My verified credentials include:\n• **Data Analysis and Visualisation Training in the AI NOW BootCamp 2026**\n• **Data Analyst Associate** (DataCamp)\n• **SQL Associate** (DataCamp)\n• **AI Fundamentals** (DataCamp)\n• **Introduction to Data Science** (Kibo School)\n• **AI Augmented Professional** (ALX)\n\nI am completing my **BSc in Business Administration** at the National Open University of Nigeria (Expected 2027) and hold an ND in Business Administration from Lagos State Polytechnic.`;
  }

  return `I'm Abiodun Ayodeji, a **Data Analyst | Performance & Planning Analyst** with 5+ years of experience transforming complex datasets into actionable business intelligence at MultiChoice Group. My achievements include cutting reporting turnaround times by 35%, supporting a 135% sales increase during the Showmax 2.0 relaunch, and driving empirical research and psychological counseling for GamblePause Africa.\n\nFeel free to ask me any specific question about my background, skills, or projects, or call me directly at **07054195682**!`;
}

// Ask Abiodun AI Assistant Endpoint (Super responsive & first-person)
app.post("/api/gemini/ask-abiodun", async (req, res) => {
  try {
    const message = req.body.message || req.body.question || "";
    const conversationHistory = req.body.conversationHistory || [];

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const trimmed = message.trim().toLowerCase();

    // Instant fast-path for simple identity, greetings, and contact questions
    if (
      trimmed === "what is your name" ||
      trimmed === "what is your name?" ||
      trimmed === "what's your name" ||
      trimmed === "what's your name?" ||
      trimmed === "who are you" ||
      trimmed === "who are you?" ||
      trimmed === "hi" ||
      trimmed === "hello" ||
      trimmed === "hey" ||
      trimmed === "good morning" ||
      trimmed === "good afternoon" ||
      trimmed === "phone" ||
      trimmed === "what is your phone number" ||
      trimmed === "what is your phone number?" ||
      trimmed === "contact" ||
      trimmed === "do you love reading?" ||
      trimmed === "do you love reading" ||
      trimmed === "tell me about your faith as a christian" ||
      trimmed === "what do you love about nature?" ||
      trimmed === "what do you love about nature" ||
      trimmed === "where do you love travelling?" ||
      trimmed === "where do you love travelling" ||
      trimmed === "what is it like living in nigeria?" ||
      trimmed === "what is it like living in nigeria" ||
      trimmed === "what do you do for fun outside of work?" ||
      trimmed === "what do you do for fun outside of work" ||
      trimmed === "what do you do for fun" ||
      trimmed === "what do you do for fun?"
    ) {
      const instantReply = getGroundedLocalResponse(message);
      return res.json({ reply: instantReply, answer: instantReply });
    }

    // Check if Gemini API key exists
    if (!process.env.GEMINI_API_KEY) {
      const fallbackReply = getGroundedLocalResponse(message);
      return res.json({ reply: fallbackReply, answer: fallbackReply });
    }

    try {
      const ai = getGeminiClient();

      const historyText = Array.isArray(conversationHistory)
        ? conversationHistory
            .slice(-4)
            .map((m: { role: string; text?: string; content?: string }) => `${m.role === "user" ? "Visitor" : "Abiodun"}: ${m.text || m.content || ""}`)
            .join("\n\n")
        : "";

      const fullPrompt = `${ABIODUN_KNOWLEDGE_BASE}

CONVERSATION HISTORY:
${historyText || "No previous messages."}

CURRENT VISITOR QUESTION:
${message}

INSTRUCTION: Respond directly as Abiodun Ayodeji in the FIRST PERSON ("I", "my", "me"). Answer specifically and concisely to what was asked:`;

      // Use a timeout promise to ensure quick response (max 3.5s)
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Gemini timeout")), 3500)
      );

      const generatePromise = ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
      });

      const response: any = await Promise.race([generatePromise, timeoutPromise]);
      const reply = response.text || getGroundedLocalResponse(message);
      res.json({ reply, answer: reply });
    } catch (genError: any) {
      console.warn("Fast fallback to grounded local response:", genError?.message);
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
      model: "gemini-3.8-flash",
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

// Contact Inquiries Storage for Administrator Dashboard
interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

const contactInquiries: ContactInquiry[] = [
  {
    id: "inq-welcome",
    name: "System Notification",
    email: "portfolio@ayodeji.data",
    subject: "Welcome Abiodun",
    message: "Your portfolio contact portal is active. Any messages sent by recruiters or visitors will be directed to ayodejiharbiodun24@gmail.com and logged here.",
    timestamp: new Date().toISOString(),
  },
];

// Contact message endpoint - directs to ayodejiharbiodun24@gmail.com
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  const targetEmail = "ayodejiharbiodun24@gmail.com";

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const newInquiry: ContactInquiry = {
    id: `inq-${Date.now()}`,
    name: String(name).trim(),
    email: String(email).trim(),
    subject: String(subject || "Portfolio Contact Inquiry").trim(),
    message: String(message).trim(),
    timestamp: new Date().toISOString(),
  };

  contactInquiries.unshift(newInquiry);
  console.log(`[Contact Form Received] From: ${newInquiry.name} <${newInquiry.email}> | Subject: ${newInquiry.subject}`);

  const encodedSubject = encodeURIComponent(`Portfolio Inquiry from ${newInquiry.name}: ${newInquiry.subject}`);
  const encodedBody = encodeURIComponent(
    `Hello Abiodun,\n\n${newInquiry.message}\n\n---\nSender Name: ${newInquiry.name}\nSender Email: ${newInquiry.email}\nPhone/Contact: (Provided via portfolio form)\nDate: ${new Date().toLocaleString()}`
  );

  const mailtoLink = `mailto:${targetEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodedSubject}&body=${encodedBody}`;

  res.json({
    success: true,
    message: `Thank you, ${newInquiry.name}! Your message has been logged and directed to Abiodun Ayodeji (${targetEmail}).`,
    targetEmail,
    mailtoLink,
    gmailLink,
    inquiry: newInquiry,
  });
});

// Admin endpoint to view received inquiries
app.get("/api/inquiries", (_req, res) => {
  res.json({ inquiries: contactInquiries });
});

// Admin endpoint to delete an inquiry
app.delete("/api/inquiries/:id", (req, res) => {
  const { id } = req.params;
  const index = contactInquiries.findIndex((item) => item.id === id);
  if (index !== -1) {
    contactInquiries.splice(index, 1);
    return res.json({ success: true, message: "Inquiry removed." });
  }
  res.status(404).json({ error: "Inquiry not found." });
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
