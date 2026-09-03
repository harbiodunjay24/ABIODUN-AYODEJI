import { PortfolioData } from '../types';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    fullName: 'Abiodun Ayodeji',
    professionalTitle: 'Data Analyst | Performance & Planning Analyst',
    shortIntroduction:
      'Performance & Planning Analyst and Data Analyst with over 5 years of multidisciplinary experience across business operations, commercial analytics, and KPI governance.',
    aboutMe:
      'I transform complex transactional, operational, and commercial datasets into high-impact business intelligence dashboards, automated KPI suites, and variance frameworks that drive strategic executive decisions.',
    detailedBio: [
      'Abiodun Ayodeji is a data analytics and performance planning specialist based in Lagos, Nigeria. Over the past 5+ years, his career has evolved from front-line customer engagement and operations at MultiChoice to high-level commercial analysis and executive reporting.',
      'Specializing in SQL, Power BI, Advanced Excel, and variance modeling, Abiodun focuses on building automated reporting systems that eliminate data latency, uncover hidden churn risks, and provide executives with real-time operational clarity. He is highly proficient across Google Workspace (Docs, Sheets, Slides, Drive) and Google Apps Script for automated spreadsheet pipelines. He also leverages modern AI tools including ChatGPT, Claude, Google AI Studio, Gemini, and Notion for research synthesis and documentation, maintaining all analytical code repositories on GitHub.',
      'Beyond corporate analytics, Abiodun is deeply dedicated to social impact. He serves as both an Analyst and a Psychologist for GamblePause Africa—an initiative currently operating across 3 countries and expanding—conducting empirical research on youth gambling behavior while offering direct counseling to clients. He also serves as the Data Team Lead and Career Team Lead for the NOUN Cowrywise Ambassador community, where he spearheaded a 4-day career bootcamp for over 200 participants.',
    ],
    profilePhoto: '',
    location: 'Lagos, Nigeria',
    email: 'ayodejiharbiodun24@gmail.com',
    phone: '07054195682',
    professionalStatus: 'Open to opportunities & analytics collaborations',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/abiodun-ayodeji',
      github: 'https://github.com/harbiodunjay24',
      twitter: 'https://x.com/ayodejiharbiodun',
      email: 'mailto:ayodejiharbiodun24@gmail.com',
      googleDrive: 'https://drive.google.com',
    },
    heroKpis: [
      {
        label: 'Turnaround Reduction',
        value: '35%',
        subtext: 'Executive reporting cycle speedup',
      },
      {
        label: 'Subscription Surge',
        value: '135%',
        subtext: 'Showmax 2.0 launch sales boost',
      },
      {
        label: 'Research Dataset',
        value: '420',
        subtext: 'Surveyed youth & student respondents',
      },
      {
        label: 'Analytics Experience',
        value: '5+ Yrs',
        subtext: 'Operations, BI & performance planning',
      },
    ],
  },
  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'Performance & Planning Analyst',
      organisation: 'MultiChoice Group',
      location: 'Lagos, Nigeria',
      startDate: '2025',
      endDate: 'Present',
      isCurrent: true,
      order: 1,
      responsibilities: [
        'Design, automate, and govern end-to-end KPI tracking frameworks across cross-functional business operations.',
        'Build and maintain automated variance models reconciling actual operational expenditures, subscriber metrics, and headcount against forecasts.',
        'Collaborate with executive management to deliver weekly and monthly executive performance scorecards and intelligence decks.',
        'Identify operational bottlenecks and recommend data-driven resource reallocation strategies.',
      ],
      achievements: [
        'Achieved a 35% reduction in executive and management reporting turnaround time via automated data consolidation.',
        'Established automated budget-vs-actual variance tracking models that significantly improved quarterly operational planning precision.',
      ],
      highlightKpi: {
        value: '35%',
        metric: 'Reporting Turnaround Reduction',
        context: 'Accelerated management decision cycles across core operational units',
      },
      technologies: ['Power BI', 'SQL', 'Microsoft Excel', 'Variance Modeling', 'Executive Reporting'],
    },
    {
      id: 'exp-2',
      jobTitle: 'Sales Support Analyst — Showmax 2.0',
      organisation: 'MultiChoice Group',
      location: 'Lagos, Nigeria',
      startDate: '2024',
      endDate: '2025',
      isCurrent: false,
      order: 2,
      responsibilities: [
        'Monitored daily subscription sales volumes, customer activation cohorts, and regional distributor channel metrics during Showmax 2.0 launch.',
        'Engineered automated SQL and Power BI dashboards to track churn rates, retention trends, and promotional campaign conversions.',
        'Provided granular commercial analytics to executive sales leadership to optimize territory allocations and dealer targets.',
      ],
      achievements: [
        'Delivered the core analytics that directly supported a 135% increase in Showmax subscription sales during the relaunch period.',
        'Reduced weekly sales reporting turnaround time by 20% through automated Power BI and SQL extraction pipelines.',
        'Identified 3 underperforming distribution corridors causing 42% of regional customer churn, enabling targeted retention campaigns.',
      ],
      highlightKpi: {
        value: '135%',
        metric: 'Subscription Sales Growth',
        context: 'Achieved during the regional Showmax 2.0 platform relaunch campaign',
      },
      technologies: ['Power BI', 'SQL', 'Cohort Analytics', 'Churn Analysis', 'Data Cleaning'],
    },
    {
      id: 'exp-3',
      jobTitle: 'Project Management Trainee',
      organisation: 'MultiChoice Group',
      location: 'Lagos, Nigeria',
      startDate: '2022',
      endDate: '2024',
      isCurrent: false,
      order: 3,
      responsibilities: [
        'Tracked project milestones, resource allocation, and KPI delivery across operational initiatives within MultiChoice.',
        'Synthesized progress reporting scorecards and maintained structured project documentation for key stakeholders.',
        'Assisted in standardizing performance metrics and workflow tracking procedures across operational units.',
      ],
      achievements: [
        'Standardized project governance templates, reducing milestone tracking discrepancies across teams.',
        'Coordinated cross-departmental sprint reviews and operational deliverables on schedule.',
      ],
      technologies: ['Project Governance', 'KPI Frameworks', 'Spreadsheet Modeling', 'Workflow Automation'],
    },
    {
      id: 'exp-4',
      jobTitle: 'Customer Service Representative',
      organisation: 'MultiChoice Group',
      location: 'Lagos, Nigeria',
      startDate: '2020',
      endDate: '2022',
      isCurrent: false,
      order: 4,
      responsibilities: [
        'Managed high-volume customer inquiries, technical troubleshooting, and operational escalations for MultiChoice subscribers.',
        'Analyzed recurring customer feedback trends to recommend frontline service and workflow refinements.',
        'Maintained high first-contact resolution rates and customer satisfaction scores.',
      ],
      achievements: [
        'Consistently exceeded quarterly customer resolution and satisfaction targets.',
        'Identified key operational bottlenecks in customer onboarding from frontline service logs, driving service workflow improvements.',
      ],
      technologies: ['Customer Operations', 'Service Log Analytics', 'Escalation Management', 'CRM Systems'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Sales Performance & Commercial Intelligence Dashboard',
      shortDescription:
        'Comprehensive Power BI & SQL reporting suite tracking subscription sales, churn cohorts, and distributor KPIs across regional corridors.',
      category: 'Business Intelligence',
      tools: ['Power BI', 'SQL', 'Excel', 'Power Query'],
      featured: true,
      businessProblem:
        'During the high-profile Showmax 2.0 relaunch, management faced fragmented multi-region distributor spreadsheets, slow weekly reporting latency, and zero visibility into regional churn patterns.',
      approach:
        'Engineered automated SQL data extraction workflows feeding a clean dimensional star-schema Power BI model. Implemented dynamic calculations for period-over-period growth, cohort retention curves, and distributor target variance thresholds.',
      insights: [
        'Identified 3 underperforming regional corridors that were responsible for 42% of subscriber churn.',
        'Discovered peak conversion time-windows and high-value customer subscription plans.',
        'Automated daily dealer volume reconciliation, eliminating manual reconciliation overhead.',
      ],
      outcome:
        'Slashed weekly sales reporting turnaround time by 20% and equipped commercial leadership with real-time insights that directly supported a 135% surge in subscription sales.',
      keyMetric: {
        value: '135%',
        label: 'Subscription Surge Supported',
      },
      metrics: [
        { label: 'Turnaround Reduction', value: '20%' },
        { label: 'Churn Drivers Identified', value: '3 Corridors' },
        { label: 'Data Refresh Frequency', value: 'Automated Daily' },
      ],
    },
    {
      id: 'proj-2',
      title: 'Executive KPI & Variance Reporting Suite',
      shortDescription:
        'Automated operational variance framework and executive dashboard for tracking budget vs. actual expenditures and resource planning.',
      category: 'Performance & Planning',
      tools: ['Power BI', 'SQL', 'Excel', 'Variance Modeling'],
      featured: true,
      businessProblem:
        'Executive management needed immediate, accurate visibility into operational overheads, departmental resource allocations, and budget variances without waiting for slow month-end spreadsheets.',
      approach:
        'Designed parameterized variance modeling algorithms in Excel and Power BI with automated anomaly detection thresholds, cross-departmental data validation, and dynamic scenario forecasting.',
      insights: [
        'Uncovered systemic recurring variance discrepancies in operational resource planning.',
        'Established automated alert triggers when departmental expenditures exceeded tolerance thresholds by >5%.',
      ],
      outcome:
        'Cut executive reporting turnaround by 35%, providing leadership with reliable, proactive variance intelligence for quarterly strategic planning.',
      keyMetric: {
        value: '35%',
        label: 'Reporting Cycle Reduction',
      },
      metrics: [
        { label: 'Reporting Cycle Speedup', value: '35%' },
        { label: 'Variance Tolerance', value: '±5% Alerts' },
        { label: 'Executive Stakeholders', value: 'Operations & Finance' },
      ],
    },
    {
      id: 'proj-3',
      title: 'Gambling Behaviour Research & Socio-Economic Analysis',
      shortDescription:
        'Empirical research analysis investigating youth and student gambling prevalence, academic disruptions, and policy intervention opportunities for GamblePause Africa.',
      category: 'Research & Social Impact',
      tools: ['Excel', 'Survey Analytics', 'Inferential Statistics', 'Research Synthesis'],
      featured: true,
      businessProblem:
        'A critical lack of empirical data regarding the prevalence, behavioral patterns, and academic ramifications of gambling among Nigerian tertiary students and youth.',
      approach:
        'Designed multi-variable survey sampling, cleaned raw categorical and numerical datasets from 420 respondents, and conducted comprehensive descriptive and cross-tabulation statistical analysis.',
      insights: [
        'Discovered a 71.1% student gambling participation rate across surveyed educational institutions.',
        'Documented that 40.6% of active gamblers experienced direct adverse academic impacts, including missed lectures and poor grades.',
        'Identified financial stress and peer influence as the primary catalysts for regular participation.',
      ],
      outcome:
        'Published empirical research findings that formed the foundational evidence base for youth intervention initiatives and community policy advocacy with GamblePause Africa.',
      keyMetric: {
        value: '420',
        label: 'Respondents Surveyed & Analyzed',
      },
      metrics: [
        { label: 'Participation Rate', value: '71.1%' },
        { label: 'Academic Impact', value: '40.6%' },
        { label: 'Target Organisation', value: 'GamblePause Africa' },
      ],
    },
  ],
  skills: [
    // DATA & ANALYTICS
    { id: 'sk-1', name: 'SQL (PostgreSQL & MySQL)', category: 'Data Analysis', proficiency: 'Advanced', featured: true },
    { id: 'sk-2', name: 'Microsoft Excel & Power Query', category: 'Data Analysis', proficiency: 'Advanced', featured: true },
    { id: 'sk-3', name: 'Data Cleaning & Wrangling', category: 'Data Analysis', proficiency: 'Advanced', featured: true },
    { id: 'sk-4', name: 'Exploratory Data Analysis (EDA)', category: 'Data Analysis', proficiency: 'Advanced', featured: true },
    { id: 'sk-4b', name: 'Relational Database Modeling', category: 'Data Analysis', proficiency: 'Proficient', featured: true },

    // BUSINESS INTELLIGENCE
    { id: 'sk-5', name: 'Power BI', category: 'Business Intelligence', proficiency: 'Advanced', featured: true },
    { id: 'sk-6', name: 'Google Looker Studio', category: 'Business Intelligence', proficiency: 'Proficient', featured: true },
    { id: 'sk-7', name: 'Executive Dashboards & Scorecards', category: 'Business Intelligence', proficiency: 'Advanced', featured: true },
    { id: 'sk-7b', name: 'Cohort & Retention Analytics', category: 'Business Intelligence', proficiency: 'Advanced', featured: true },

    // GOOGLE WORKSPACE & AUTOMATION
    { id: 'sk-8a', name: 'Google Workspace (Docs, Sheets, Slides, Drive)', category: 'Other Capabilities', proficiency: 'Advanced', featured: true },
    { id: 'sk-8b', name: 'Google Apps Script (Automation & Extensions)', category: 'Other Capabilities', proficiency: 'Advanced', featured: true },
    { id: 'sk-8c', name: 'GitHub & Version Control', category: 'Other Capabilities', proficiency: 'Advanced', featured: true },
    { id: 'sk-8d', name: 'Notion (Knowledge & System Design)', category: 'Other Capabilities', proficiency: 'Advanced', featured: true },

    // PERFORMANCE & PLANNING
    { id: 'sk-8', name: 'KPI Reporting Systems', category: 'Business Performance', proficiency: 'Advanced', featured: true },
    { id: 'sk-9', name: 'Variance Analysis (Budget vs Actual)', category: 'Business Performance', proficiency: 'Advanced', featured: true },
    { id: 'sk-10', name: 'Commercial Forecasting', category: 'Business Performance', proficiency: 'Proficient', featured: true },
    { id: 'sk-11', name: 'Trend & Operational Analysis', category: 'Business Performance', proficiency: 'Advanced', featured: true },
    { id: 'sk-12', name: 'Resource & Capacity Planning', category: 'Business Performance', proficiency: 'Proficient', featured: true },

    // AI & MODERN LLM TOOLS
    { id: 'sk-13', name: 'ChatGPT & Prompt Engineering (OpenAI)', category: 'AI & Automation', proficiency: 'Advanced', featured: true },
    { id: 'sk-14', name: 'Claude (Anthropic) for Analytical Synthesis', category: 'AI & Automation', proficiency: 'Advanced', featured: true },
    { id: 'sk-15', name: 'Google AI Studio & Gemini API Workflows', category: 'AI & Automation', proficiency: 'Advanced', featured: true },
    { id: 'sk-16', name: 'AI-Assisted Reporting Automation', category: 'AI & Automation', proficiency: 'Advanced', featured: true },
  ],
  certifications: [
    {
      id: 'cert-now-2026',
      title: 'Data Analysis and Visualisation Training in the AI NOW BootCamp 2026',
      name: 'Data Analysis and Visualisation Training in the AI NOW BootCamp 2026',
      issuingOrganisation: 'Incubator / AI NOW BootCamp (MD/CEO: Oluwafemi Oyetunde)',
      issuer: 'Incubator / AI NOW BootCamp (MD/CEO: Oluwafemi Oyetunde)',
      issueYear: '2026',
      issueDate: 'July 2026',
      credentialUrl: '#documents',
      credentialId: 'AINOW-2026-AB01',
      description: 'Intensive immersion covering high-volume exploratory data analysis, business dashboard creation, KPI frameworks, and AI-assisted data workflows.',
      skillsTagged: ['Data Analysis', 'Data Visualisation', 'AI-Assisted Analytics', 'Business Intelligence'],
    },
    {
      id: 'cert-1',
      title: 'Data Analyst Associate Certification',
      name: 'Data Analyst Associate Certification',
      issuingOrganisation: 'DataCamp',
      issuer: 'DataCamp',
      issueYear: '2024',
      issueDate: '2024',
      credentialUrl: 'https://www.datacamp.com/certificate/DAA00124',
      credentialId: 'DAA00124',
      description: 'Professional validation of SQL database querying, exploratory analysis, data hygiene, and strategic business insight synthesis.',
      skillsTagged: ['SQL', 'Data Analysis', 'Data Cleaning', 'Exploratory Analysis'],
    },
    {
      id: 'cert-2',
      title: 'SQL Associate Certification',
      name: 'SQL Associate Certification',
      issuingOrganisation: 'DataCamp',
      issuer: 'DataCamp',
      issueYear: '2024',
      issueDate: '2024',
      credentialUrl: 'https://www.datacamp.com/certificate/SQA00124',
      credentialId: 'SQA00124',
      description: 'Rigorous assessment in relational schema querying, multi-table joins, window functions, and database modeling with PostgreSQL.',
      skillsTagged: ['PostgreSQL', 'Complex Queries', 'Aggregations', 'Database Modeling'],
    },
    {
      id: 'cert-3',
      title: 'AI Fundamentals Certification',
      name: 'AI Fundamentals Certification',
      issuingOrganisation: 'DataCamp',
      issuer: 'DataCamp',
      issueYear: '2024',
      issueDate: '2024',
      credentialUrl: 'https://www.datacamp.com/certificate/AIF00124',
      credentialId: 'AIF00124',
      description: 'Foundational mastery of generative AI architecture, large language models, prompt engineering patterns, and workflow automation.',
      skillsTagged: ['Generative AI', 'LLM Workflows', 'Prompt Design', 'Machine Learning Concepts'],
    },
    {
      id: 'cert-4',
      title: 'Introduction to Data Science',
      name: 'Introduction to Data Science',
      issuingOrganisation: 'Kibo School',
      issuer: 'Kibo School',
      issueYear: '2023',
      issueDate: '2023',
      credentialUrl: 'https://kibo.school',
      credentialId: 'KIBO-DS-2023',
      description: 'Empirical data science methodology, probability distributions, statistical inference, and computational data exploration.',
      skillsTagged: ['Data Science Foundations', 'Statistical Inference', 'Quantitative Methods'],
    },
    {
      id: 'cert-5',
      title: 'AI Augmented Professional & Development Skills in the Digital Age',
      name: 'AI Augmented Professional & Development Skills in the Digital Age',
      issuingOrganisation: 'ALX',
      issuer: 'ALX',
      issueYear: '2024',
      issueDate: '2024',
      credentialUrl: 'https://www.alxafrica.com',
      credentialId: 'ALX-AI-2024',
      description: 'Modern digital age productivity, AI-augmented workflows, strategic automation pipelines, and analytical project leadership.',
      skillsTagged: ['AI Automation', 'Professional Productivity', 'Digital Age Strategy'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'National Open University of Nigeria',
      qualification: 'BSc Business Administration',
      programme: 'Business Administration',
      startDate: '2023',
      endDate: 'In Progress',
      expectedGraduation: 'Expected 2027',
      honours: 'In Progress — Expected 2027',
      location: 'Lagos, Nigeria',
    },
    {
      id: 'edu-2',
      institution: 'Lagos State Polytechnic',
      qualification: 'National Diploma (ND)',
      programme: 'Business Administration',
      startDate: '2021',
      endDate: '2023',
      location: 'Lagos, Nigeria',
      honours: 'Graduated with Merit',
    },
  ],
  volunteering: [
    {
      id: 'vol-1',
      organisation: 'GamblePause Africa',
      role: 'Analyst & Psychologist',
      dates: '2023 – Present',
      description:
        'Operating across 3 African countries and actively expanding, GamblePause Africa tackles gambling addiction and harm reduction. Abiodun serves dual roles as an Analyst—spearheading empirical research across 420 youth respondents—and as a Psychologist, providing vital one-on-one counseling, intake sessions, and behavioral guidance to affected clients.',
      impactStats: [
        {
          value: '3 Countries',
          label: 'Active Reach & Expanding',
          detail: 'Operations established across Nigeria, Kenya, and Ghana with ongoing pan-African expansion.',
        },
        {
          value: '420',
          label: 'Survey Respondents',
          detail: 'Cleaned and evaluated across multiple student cohorts in tertiary institutions.',
        },
        {
          value: '71.1%',
          label: 'Gambling Prevalence',
          detail: 'Empirically identified student participation rate in betting activities.',
        },
        {
          value: '40.6%',
          label: 'Academic Disruption',
          detail: 'Documented direct correlation with missed lectures and lowered academic performance.',
        },
      ],
      researchPipeline: [
        {
          step: '01',
          title: 'Direct Client Counseling & Intake',
          description: 'Engaged clients in structured psychological counseling, addressing emotional triggers and dependency cycles.',
        },
        {
          step: '02',
          title: 'Problem Framing & Survey Design',
          description: 'Constructed multi-variable questionnaires capturing demographics, betting frequency, financial spend, and academic records.',
        },
        {
          step: '03',
          title: 'Data Collection & Hygiene',
          description: 'Gathered 420 valid responses, sanitized categorical anomalies, and encoded responses for statistical analysis.',
        },
        {
          step: '04',
          title: 'Pan-African Expansion & Advocacy',
          description: 'Published actionable findings utilized across 3 countries to deploy targeted youth workshops and harm-prevention policies.',
        },
      ],
      researchFindings: [
        'Served as counselor providing therapeutic guidance and rehabilitation support for individuals navigating gambling dependencies.',
        '71.1% of surveyed youth and students actively participate in sports betting and casino games.',
        '40.6% reported noticeable adverse effects on study hours, coursework submissions, and exam results.',
        'Currently active in 3 countries with institutional partnerships underway for continental expansion.',
      ],
      links: [
        {
          label: 'GamblePause Africa',
          url: 'https://gamblepause.org',
        },
      ],
    },
    {
      id: 'vol-2',
      organisation: 'NOUN Cowrywise Ambassador',
      role: 'Data Team Lead & Career Team Lead',
      dates: '2023 – Present',
      description:
        'Spearheaded youth financial inclusion, career empowerment, and analytics education at the National Open University of Nigeria. Organized and directed "The Cowrywise Bootcamp Experience"—an intensive 4-day virtual and hybrid career bootcamp with over 200 registered student participants.',
      impactStats: [
        {
          value: '200+',
          label: 'Bootcamp Participants',
          detail: 'Enrolled and mentored across the 4-day Cowrywise Bootcamp Experience.',
        },
        {
          value: '4 Days',
          label: 'Career Immersion',
          detail: 'Comprehensive curriculum covering data literacy, career development, and financial planning.',
        },
        {
          value: '2 Teams',
          label: 'Lead Roles Held',
          detail: 'Directed both the Data Analytics Division and Career Mentorship Track.',
        },
      ],
      researchPipeline: [
        {
          step: '01',
          title: 'Curriculum & Program Architecture',
          description: 'Designed an end-to-end 4-day career development and financial technology immersion curriculum.',
        },
        {
          step: '02',
          title: 'Cohort Mobilization & Engagement',
          description: 'Mobilized over 200 participants across diverse academic faculties, managing communication and logistics.',
        },
        {
          step: '03',
          title: 'Data Tracking & Learning Evaluation',
          description: 'Built participant attendance and feedback tracking frameworks to gauge learning retention.',
        },
      ],
      researchFindings: [
        'Orchestrated "The Cowrywise Bootcamp Experience", delivering practical workshops on resume building, data analytics, and wealth habits.',
        'Mentored emerging student leaders on leveraging data analysis for career positioning.',
      ],
    },
    {
      id: 'vol-3',
      organisation: 'Cowrywise Lagos Ambassador Division',
      role: 'Data Team Volunteer',
      dates: '2023 – Present',
      description:
        'Active member of the regional data team supporting Lagos-wide ambassador operations, event attendance analytics, community outreach metrics, and financial literacy campaign reporting.',
      impactStats: [
        {
          value: 'Lagos',
          label: 'Regional Footprint',
          detail: 'Providing data support for metro campaigns and youth financial literacy drives.',
        },
      ],
    },
  ],
  documents: [
    {
      id: 'doc-cv',
      name: 'Abiodun Ayodeji — Professional CV (ATS Grounded)',
      fileName: 'Abiodun_Ayodeji_CV_2026.pdf',
      category: 'CV',
      fileSize: '184 KB',
      size: '184 KB',
      format: 'PDF / Text',
      description:
        'Comprehensive, ATS-optimized curriculum vitae detailing 5+ years across MultiChoice Group, performance planning, SQL, Power BI, Google Workspace, Apps Script, AI tooling, and empirical social impact research.',
      lastUpdated: 'Updated July 2026',
      isPublic: true,
      isFeatured: true,
      source: 'Uploaded PDF',
      currentVersion: '3.2',
      fileType: 'PDF Document',
      versionHistory: [],
      content: `ABIODUN AYODEJI
Data Analyst | Performance & Planning Analyst
Lagos, Nigeria | Phone: +234 705 419 5682 (07054195682) | Email: ayodejiharbiodun24@gmail.com
LinkedIn: linkedin.com/in/abiodun-ayodeji | GitHub: https://github.com/harbiodunjay24

================================================================================
PROFESSIONAL SUMMARY
================================================================================
Performance & Planning Analyst and Data Analyst with over 5 years of progressive experience across customer engagement, commercial analytics, and operational KPI governance. Proven track record of transforming disparate transactional and customer behavior data into high-leverage Power BI dashboards, automated SQL models, and budget variance frameworks that accelerate decision-making cycles by 35%. Vastly skilled in Google Workspace, Google Apps Script automation, and leading AI platforms (ChatGPT, Claude, Google AI Studio, Gemini, Notion). Dedicated social researcher and community leader spearheading data-driven student interventions and behavioral analytics.

================================================================================
CORE TECHNICAL & ANALYTICAL COMPETENCIES
================================================================================
- Data Querying & Databases: SQL (PostgreSQL, MySQL), Relational Modeling, Complex Joins, Window Functions, Aggregations
- Business Intelligence & Reporting: Power BI (DAX, Data Modeling), Google Looker Studio, Executive Dashboards, Scorecards
- Spreadsheet Modeling & Scripting: Microsoft Excel (Power Query, Dynamic Arrays, Financial/Variance Formulas), Google Sheets, Google Apps Script
- Google Workspace Ecosystem: Docs, Sheets, Slides, Drive, Forms, Automated Reporting Triggers
- Modern AI & LLM Systems: Google AI Studio & Gemini API, ChatGPT (OpenAI), Claude (Anthropic), Notion, Structured Prompt Engineering
- Version Control & Documentation: GitHub (https://github.com/harbiodunjay24), Markdown System Specs, Workflow SOPs
- Analytical Methodologies: Exploratory Data Analysis (EDA), Variance Analysis (Budget vs Actual), Churn & Retention Analytics, KPI Governance

================================================================================
PROFESSIONAL EXPERIENCE
================================================================================
MULTICHOICE GROUP — Lagos, Nigeria
Performance & Planning Analyst (Commercial / Operations) | 2024 – Present
- Architected enterprise Power BI and SQL reporting suites tracking daily operational throughput, revenue realization, and resource allocation across regional hubs.
- Reduced executive reporting turnaround times by 35% through query optimization, automated data transformation pipelines, and Google Apps Script integrations.
- Spearheaded campaign analytics for Showmax 2.0 relaunch, analyzing customer subscription velocity and regional uptake to inform retention strategies supporting a 135% subscription surge.
- Conducted regular budget-versus-actual variance investigations, delivering monthly risk-opportunity summaries that informed senior leadership resource planning.

MULTICHOICE GROUP — Lagos, Nigeria
Customer Care Representative / Operations Support | 2021 – 2024
- Managed complex customer inquiries, account reconciliations, and retention workflows, maintaining a 94% first-contact resolution rate across 10,000+ interactions.
- Identified recurring billing system pain points by logging structured categorical inquiry data, contributing to a departmental process revision that cut customer complaint escalations.

MULTICHOICE GROUP — Lagos, Nigeria
Direct Sales Representative | 2019 – 2021
- Surpassed regional subscription and hardware acquisition targets by 20% consistently across quarterly commercial campaigns through consultative client relationship management.

================================================================================
LEADERSHIP, RESEARCH & VOLUNTEERING
================================================================================
GAMBLEPAUSE AFRICA — Pan-African Non-Profit (Operating across 3 countries)
Analyst & Psychologist | 2024 – Present
- Designed and analyzed multi-variable empirical survey datasets from 420 youth and student respondents across tertiary institutions in Nigeria.
- Uncovered a 71.1% student gambling participation rate and established that 40.6% of participants suffered documented academic disruption.
- Authored data-backed policy recommendations and delivered one-on-one behavioral counseling for affected young adults.

NOUN COWRYWISE AMBASSADOR COMMUNITY — National Open University of Nigeria
Data Team Lead & Career Team Lead | 2024 – Present
- Directed all event attendance tracking, digital marketing KPIs, and membership growth analytics for over 500 student community members.
- Spearheaded "The Cowrywise Bootcamp Experience 2026," orchestrating a 4-day intensive career and analytics immersion for 200+ participants with 87% satisfaction ratings.

================================================================================
EDUCATION
================================================================================
NATIONAL OPEN UNIVERSITY OF NIGERIA
Bachelor of Science (BSc) in Business Administration | 2023 – In Progress (Expected 2027)

================================================================================
VERIFIED CERTIFICATIONS
================================================================================
- Data Analysis and Visualisation Training in the AI NOW BootCamp 2026 (Incubator / AI NOW BootCamp — MD/CEO Oluwafemi Oyetunde)
- Data Analyst Associate Certification (DataCamp — DAA00124)
- SQL Associate Certification (DataCamp — SQA00124)
- AI Fundamentals Certification (DataCamp — AIF00124)
- Introduction to Data Science (Kibo School)
- AI Augmented Professional & Development Skills in the Digital Age (ALX)`,
    },
    {
      id: 'doc-resume',
      name: 'Abiodun Ayodeji — Executive One-Page Resume',
      fileName: 'Abiodun_Ayodeji_OnePage_Resume.pdf',
      category: 'Resume',
      fileSize: '142 KB',
      size: '142 KB',
      format: 'PDF / Text',
      description:
        'Executive one-page resume tailored for Data Analyst and Performance & Planning opportunities, highlighting key quantifiable metrics and technical stack.',
      lastUpdated: 'Updated July 2026',
      isPublic: true,
      isFeatured: true,
      source: 'Uploaded PDF',
      currentVersion: '2.1',
      fileType: 'PDF Document',
      versionHistory: [],
      content: `ABIODUN AYODEJI | EXECUTIVE RESUME
Data Analyst | Performance & Planning Analyst
Lagos, Nigeria | +234 705 419 5682 | ayodejiharbiodun24@gmail.com
LinkedIn: linkedin.com/in/abiodun-ayodeji | GitHub: https://github.com/harbiodunjay24

--------------------------------------------------------------------------------
EXECUTIVE PROFILE
--------------------------------------------------------------------------------
Data and Performance Planning Analyst with 5+ years of demonstrable impact in operational analytics, commercial reporting, and data engineering. Key achievements include accelerating executive reporting turnaround by 35% at MultiChoice, supporting a 135% subscription surge for Showmax 2.0, and leading empirical socio-economic research on 420 youth participants for GamblePause Africa.

--------------------------------------------------------------------------------
QUANTIFIABLE HIGHLIGHTS
--------------------------------------------------------------------------------
• 35% Reduction in Executive Reporting Turnaround via SQL & automated dashboards.
• 135% Subscription Surge supported during Showmax 2.0 promotional rollout.
• 420 Youth Surveyed & Analyzed for Pan-African empirical gambling research.
• 94% First-Contact Resolution Rate achieved across 10,000+ enterprise engagements.
• 200+ Participants trained as Lead for the 2026 NOUN Cowrywise Bootcamp.

--------------------------------------------------------------------------------
CORE TECHNICAL TOOLKIT
--------------------------------------------------------------------------------
• Analysis & BI: SQL (PostgreSQL, MySQL), Power BI, Microsoft Excel (Power Query, DAX), Google Looker Studio
• Productivity & Automation: Google Workspace (Docs, Sheets, Slides, Drive), Google Apps Script, GitHub
• Modern AI Tools: ChatGPT, Claude, Google AI Studio, Gemini, Notion, Structured Prompt Workflows

--------------------------------------------------------------------------------
EXPERIENCE SUMMARY
--------------------------------------------------------------------------------
• MultiChoice Group | Performance & Planning Analyst (2024 – Present)
  Built automated operational KPI dashboards and financial variance models for executive leadership.
• MultiChoice Group | Customer Care Representative (2021 – 2024)
  Managed high-tier accounts and contributed structured data to resolve operational bottlenecks.
• GamblePause Africa | Analyst & Psychologist (2024 – Present)
  Conducted research identifying 71.1% youth gambling participation and academic disruption patterns.
• NOUN Cowrywise Ambassador Community | Data & Career Lead (2024 – Present)
  Spearheaded student career bootcamp and community reporting systems.

--------------------------------------------------------------------------------
ACADEMICS & CREDENTIALS
--------------------------------------------------------------------------------
• BSc Business Administration (In Progress, 2027) — National Open University of Nigeria
• AI NOW BootCamp 2026 — Data Analysis & Visualisation Training
• DataCamp: Data Analyst Associate | SQL Associate | AI Fundamentals
• Kibo School: Intro to Data Science | ALX: AI Augmented Professional`,
    },
    {
      id: 'doc-cert-ainow',
      name: 'AI NOW BootCamp 2026 — Data Analysis & Visualisation Certificate',
      fileName: 'AI_NOW_BootCamp_2026_Certificate.pdf',
      category: 'Certificates',
      fileSize: '210 KB',
      size: '210 KB',
      format: 'PDF / Text',
      description:
        'Official Certificate of Completion awarded to Abiodun Ayodeji by Incubator / AI NOW BootCamp (MD/CEO Oluwafemi Oyetunde) for Data Analysis and Visualisation Training.',
      lastUpdated: 'July 2026',
      isPublic: true,
      isFeatured: true,
      source: 'Verified Credential',
      currentVersion: '1.0',
      fileType: 'PDF Document',
      versionHistory: [],
      content: `OFFICIAL CERTIFICATE TRANSCRIPT & VERIFICATION
================================================================================
ISSUING BODY: Incubator / AI NOW BootCamp
MANAGING DIRECTOR & CEO: Oluwafemi Oyetunde
PROGRAMME: Data Analysis and Visualisation Training in the AI NOW BootCamp 2026
CREDENTIAL ID: AINOW-2026-AB01
AWARDED TO: ABIODUN AYODEJI
DATE OF COMPLETION: July 2026
STATUS: VERIFIED & COMPLETED WITH DISTINCTION

SYLLABUS & CORE COMPETENCIES VALIDATED:
1. Advanced Exploratory Data Analysis (EDA) on commercial datasets
2. Business Intelligence Dashboard Architecture & DAX Modeling
3. Enterprise KPI Tracking & Performance Variance Analysis
4. Modern AI Integration: Utilizing Gemini and AI tools for analytical pipeline acceleration
5. Stakeholder Communication & Insight Storytelling

This credential confirms that Abiodun Ayodeji has successfully met all curriculum requirements, capstone evaluations, and practical assessments in Data Analysis and Visualisation.`,
    },
    {
      id: 'doc-cover-letter',
      name: 'Performance & Planning Analyst — Tailored Cover Letter',
      fileName: 'Abiodun_Ayodeji_Performance_Planning_CoverLetter.pdf',
      category: 'Cover Letter',
      fileSize: '115 KB',
      size: '115 KB',
      format: 'PDF / Text',
      description:
        'Professional cover letter detailing commercial problem-solving, 35% reporting turnaround reduction, and business intelligence stewardship.',
      lastUpdated: 'June 2026',
      isPublic: true,
      isFeatured: false,
      source: 'Portfolio Staging',
      currentVersion: '1.4',
      fileType: 'PDF Document',
      versionHistory: [],
      content: `Abiodun Ayodeji
Lagos, Nigeria | +234 705 419 5682 | ayodejiharbiodun24@gmail.com
GitHub: https://github.com/harbiodunjay24 | LinkedIn: linkedin.com/in/abiodun-ayodeji

To: The Hiring Team & Executive Leadership
Re: Performance & Planning Analyst / Senior Data Analyst Position

Dear Hiring Team,

I am writing to express my enthusiastic interest in joining your team as a Performance & Planning Analyst / Data Analyst. With over five years of progressive experience inside high-tempo enterprise operations at MultiChoice Group and impactful empirical research with GamblePause Africa, I specialize in translating vast, messy operational datasets into clear, automated executive decision-support systems.

At MultiChoice Group, I recognized that operational decisions were frequently delayed by manual reporting cycles. By engineering streamlined SQL queries, automated data transformations, and high-clarity Power BI dashboards, I slashed executive reporting turnaround times by 35%. During the high-stakes launch of Showmax 2.0, I built the analytical tracking models that evaluated customer uptake, retention curves, and churn indicators, providing insights that supported a 135% subscription surge.

Beyond traditional analytics, I actively augment my workflows with modern tools. I utilize Google Workspace and Google Apps Script for spreadsheet pipeline automations, maintain version-controlled analytical repositories on GitHub (github.com/harbiodunjay24), and leverage cutting-edge AI systems including Google AI Studio, Gemini, ChatGPT, and Claude to accelerate exploratory synthesis and data extraction.

My background in behavioral research as an Analyst and Psychologist for GamblePause Africa (analyzing 420 youth survey responses) further underscores my ability to discover actionable human and commercial truths behind raw numbers.

I welcome the opportunity to discuss how my technical acumen, operational rigor, and dedication to excellence can deliver immediate value to your organization.

Warm regards,

Abiodun Ayodeji`,
    },
    {
      id: 'doc-gamblepause',
      name: 'Youth Gambling Behaviour & Academic Disruption Research Report',
      fileName: 'GamblePause_Youth_Gambling_Research_Paper.pdf',
      category: 'Research',
      fileSize: '650 KB',
      size: '650 KB',
      format: 'PDF / Text',
      description:
        'Empirical research paper authored for GamblePause Africa examining 420 youth survey responses, statistical correlations, and community intervention policies.',
      lastUpdated: 'May 2026',
      isPublic: true,
      isFeatured: true,
      source: 'Research Publication',
      currentVersion: '2.0',
      fileType: 'PDF Document',
      versionHistory: [],
      content: `RESEARCH REPORT & EMPIRICAL STUDY
================================================================================
ORGANISATION: GamblePause Africa (Pan-African Youth Advocacy & Behavioral Health)
LEAD ANALYST & PSYCHOLOGIST: Abiodun Ayodeji
SAMPLE POPULATION: 420 Nigerian Tertiary Institution Students & Young Adults
METHODOLOGY: Structured Cross-Sectional Survey, Data Cleaning in Excel/SQL, Descriptive & Inferential Statistics

KEY EMPIRICAL FINDINGS:
1. Participation Rate: 71.1% of surveyed students confirmed active participation in commercial sports betting or online gaming.
2. Academic Impairment: 40.6% of participating respondents reported direct adverse academic outcomes, including missed lectures, delayed tuition payments, and test performance drops.
3. Primary Motivators: 64.2% cited peer dynamics and immediate financial pressures as the primary driver for sustained participation.
4. Psycho-Social Correlation: Strong positive correlation observed between frequent betting activity and elevated stress levels.

STRATEGIC POLICY RECOMMENDATIONS:
- Institutional Campus Workshops focusing on financial literacy and cognitive resilience.
- Implementation of peer-counseling support desks across university campuses.
- Regulatory advocacy for youth age verification enforcement on digital gaming platforms.`,
    },
    {
      id: 'doc-cowrywise',
      name: 'Cowrywise Bootcamp Experience 2026 — Outcome & Impact Summary',
      fileName: 'Cowrywise_Bootcamp_Experience_Report.pdf',
      category: 'Reports',
      fileSize: '310 KB',
      size: '310 KB',
      format: 'PDF / Text',
      description:
        'Executive summary and participant analytics report for the 4-day career bootcamp organized for 200+ students at the National Open University of Nigeria.',
      lastUpdated: 'July 2026',
      isPublic: true,
      isFeatured: false,
      source: 'Internal Report',
      currentVersion: '1.0',
      fileType: 'PDF Document',
      versionHistory: [],
      content: `EXECUTIVE SUMMARY: THE COWRYWISE BOOTCAMP EXPERIENCE 2026
================================================================================
HOST: National Open University of Nigeria (NOUN) Cowrywise Ambassador Community
ORGANISING LEADS: Abiodun Ayodeji (Data Team Lead & Career Team Lead)
TOTAL REGISTERED PARTICIPANTS: 200+ Undergraduates and Early-Career Professionals
DURATION: 4 Intensive Days (July 2026)

EVENT SCOPE & MODULES DELIVERED:
Day 1: Foundations of Modern Data Analytics & Career Roadmaps (SQL & Excel)
Day 2: Resume Building, ATS Optimization, and Technical Portfolio Development
Day 3: Building Financial Discipline & Early Investment Habits with Cowrywise
Day 4: Interactive Panel Session & Hands-On Capstone Project Evaluation

KEY OUTCOME METRICS:
- 200+ Active Attendees across all four days
- 87% Post-Event Participant Satisfaction Rating
- 45+ Participants completed hands-on spreadsheet modeling assignments
- 30+ Students submitted ATS-optimized CVs for direct feedback`,
    },
  ],
  coverLetters: [],
  settings: {
    showAvailabilityBadge: true,
    enableAiAssistant: true,
    enableInteractiveCalculators: false,
    maintenanceMode: false,
  },
};
