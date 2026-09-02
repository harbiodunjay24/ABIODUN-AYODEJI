import { PortfolioData } from '../types';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    fullName: 'Abiodun Ayodeji',
    professionalTitle: 'Data Analyst | Performance & Planning | Business Intelligence',
    shortIntroduction:
      'Performance & Planning Analyst and Data Analyst with over 5 years of multidisciplinary experience across business operations, commercial analytics, and KPI governance.',
    aboutMe:
      'I transform complex transactional, operational, and commercial datasets into high-impact business intelligence dashboards, automated KPI suites, and variance frameworks that drive strategic executive decisions.',
    detailedBio: [
      'Abiodun Ayodeji is a data analytics and performance planning specialist based in Lagos, Nigeria. Over the past 5+ years, his career has evolved from front-line customer engagement and operations to high-level commercial analysis and executive reporting.',
      'Specializing in SQL, Power BI, Advanced Excel, and variance modeling, Abiodun focuses on building automated reporting systems that eliminate data latency, uncover hidden churn risks, and provide executives with real-time operational clarity.',
      'Beyond commercial analytics, Abiodun is dedicated to social impact, having led empirical research for Gamble Pause Initiative Africa on youth gambling behaviors, surveying over 420 respondents to drive evidence-based intervention policies.',
    ],
    profilePhoto: '', // Uses stylish SVG avatar fallback or user uploaded photo
    location: 'Lagos, Nigeria',
    email: 'ayodejiharbiodun24@gmail.com',
    phone: '+234 813 000 0000',
    professionalStatus: 'Open to opportunities & analytics collaborations',
    socialLinks: {
      linkedin: 'https://www.linkedin.com',
      github: 'https://github.com',
      twitter: 'https://x.com',
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
      organisation: 'Performance & Operations Management',
      location: 'Lagos, Nigeria',
      startDate: '2025',
      endDate: 'Present',
      isCurrent: true,
      order: 1,
      responsibilities: [
        'Design, automate, and govern end-to-end KPI tracking frameworks across cross-functional business operations.',
        'Build and maintain automated variance models reconciling actual operational expenditures and headcount against forecasts.',
        'Collaborate with executive management to deliver weekly and monthly executive performance scorecards.',
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
    },
    {
      id: 'exp-2',
      jobTitle: 'Sales Support Analyst — Showmax 2.0',
      organisation: 'Showmax / MultiChoice Operations',
      location: 'Lagos, Nigeria',
      startDate: '2024',
      endDate: '2024',
      isCurrent: false,
      order: 2,
      responsibilities: [
        'Monitored daily subscription sales volumes, customer activation cohorts, and regional distributor channel metrics.',
        'Engineered automated SQL and Power BI dashboards to track churn rates, retention trends, and promotional campaign conversions.',
        'Provided granular commercial analytics to executive sales leadership to optimize territory allocations and dealer targets.',
      ],
      achievements: [
        'Delivered the core analytics that helped drive a 135% increase in Showmax subscription sales during the regional relaunch period.',
        'Reduced weekly sales reporting turnaround time by 20% through automated Power BI and SQL extraction pipelines.',
        'Identified 3 underperforming distribution corridors causing 42% of regional customer churn, enabling targeted retention campaigns.',
      ],
      highlightKpi: {
        value: '135%',
        metric: 'Subscription Sales Growth',
        context: 'Achieved during the regional Showmax 2.0 platform relaunch campaign',
      },
    },
    {
      id: 'exp-3',
      jobTitle: 'Project Management Trainee',
      organisation: 'Operations & Project Governance',
      location: 'Lagos, Nigeria',
      startDate: '2022',
      endDate: '2024',
      isCurrent: false,
      order: 3,
      responsibilities: [
        'Tracked project milestones, resource allocation, and KPI delivery across operational initiatives.',
        'Synthesized progress reporting scorecards and maintained documentation for key stakeholders.',
        'Assisted in standardizing project performance metrics and workflow tracking procedures.',
      ],
      achievements: [
        'Standardized project governance templates, reducing milestone tracking discrepancies across teams.',
        'Coordinated cross-departmental sprint reviews and operational deliverables.',
      ],
    },
    {
      id: 'exp-4',
      jobTitle: 'Customer Service Representative',
      organisation: 'Customer Engagement & Support',
      location: 'Lagos, Nigeria',
      startDate: '2020',
      endDate: '2022',
      isCurrent: false,
      order: 4,
      responsibilities: [
        'Managed high-volume customer inquiries, technical troubleshooting, and operational escalations.',
        'Analyzed recurring customer feedback trends to recommend internal service and workflow refinements.',
        'Maintained high first-contact resolution rates and customer satisfaction scores.',
      ],
      achievements: [
        'Consistently exceeded quarterly customer resolution and satisfaction targets.',
        'Identified key operational bottlenecks in customer onboarding from frontline service logs.',
      ],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Sales Performance & Commercial Intelligence Dashboard',
      shortDescription:
        'Comprehensive Power BI & SQL reporting suite tracking subscription sales, churn cohorts, and distributor KPIs across regional corridors.',
      category: 'Business Intelligence',
      tools: ['SQL', 'Power BI', 'Advanced Excel', 'DAX', 'Power Query'],
      featured: true,
      businessProblem:
        'During the high-profile Showmax 2.0 relaunch, management faced fragmented multi-region distributor spreadsheets, slow weekly reporting latency, and zero visibility into regional churn patterns.',
      approach:
        'Engineered automated SQL data extraction workflows feeding a dimensional star-schema Power BI model. Implemented dynamic DAX measures for MoM/YoY growth, cohort retention curves, and distributor target variance thresholds.',
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
      category: 'Data Analytics',
      tools: ['Power BI', 'SQL', 'Advanced Excel', 'Looker Studio', 'Variance Modeling'],
      featured: true,
      businessProblem:
        'Executive management needed immediate, accurate visibility into operational overheads, departmental resource allocations, and budget variances without waiting for slow month-end spreadsheets.',
      approach:
        'Designed parameterized variance modeling algorithms in Excel and Power BI with automated anomaly detection thresholds, cross-departmental data hygiene validation, and dynamic scenario modeling.',
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
        'Empirical research analysis investigating youth and student gambling prevalence, academic disruptions, and policy intervention opportunities.',
      category: 'Research & Social Impact',
      tools: ['Python', 'Excel Analytics', 'Survey Methodology', 'Inferential Statistics'],
      featured: true,
      businessProblem:
        'A critical lack of empirical data regarding the prevalence, behavioral patterns, and academic ramifications of gambling among Nigerian tertiary students and youth.',
      approach:
        'Designed multi-variable survey sampling, cleaned raw categorical and numerical datasets from 420 respondents, and conducted comprehensive descriptive, cross-tabulation, and inferential statistical analysis.',
      insights: [
        'Discovered a 71.1% student gambling participation rate across surveyed educational institutions.',
        'Documented that 40.6% of active gamblers experienced direct adverse academic impacts, including missed lectures and poor grades.',
        'Identified financial stress and peer influence as the primary catalysts for regular participation.',
      ],
      outcome:
        'Published empirical research findings that formed the foundational evidence base for youth intervention initiatives and community policy advocacy with Gamble Pause Initiative Africa.',
      keyMetric: {
        value: '420',
        label: 'Respondents Surveyed & Analyzed',
      },
      metrics: [
        { label: 'Participation Rate', value: '71.1%' },
        { label: 'Academic Impact', value: '40.6%' },
        { label: 'Target Organisation', value: 'Gamble Pause Initiative' },
      ],
    },
  ],
  skills: [
    // Data Analysis
    { id: 'sk-1', name: 'SQL (Advanced Queries, CTEs, Joins)', category: 'Data Analysis', proficiency: 'Advanced', featured: true },
    { id: 'sk-2', name: 'Microsoft Excel (Power Query, Pivot, Modeling)', category: 'Data Analysis', proficiency: 'Advanced', featured: true },
    { id: 'sk-3', name: 'Data Cleaning & Wrangling', category: 'Data Analysis', proficiency: 'Advanced', featured: true },
    { id: 'sk-4', name: 'Exploratory Data Analysis (EDA)', category: 'Data Analysis', proficiency: 'Proficient', featured: true },
    { id: 'sk-5', name: 'Statistical & Trend Modeling', category: 'Data Analysis', proficiency: 'Proficient' },

    // Business Intelligence
    { id: 'sk-6', name: 'Microsoft Power BI & DAX Modeling', category: 'Business Intelligence', proficiency: 'Advanced', featured: true },
    { id: 'sk-7', name: 'Google Looker Studio', category: 'Business Intelligence', proficiency: 'Proficient', featured: true },
    { id: 'sk-8', name: 'Executive Dashboard Development', category: 'Business Intelligence', proficiency: 'Advanced', featured: true },
    { id: 'sk-9', name: 'Data Storytelling & Executive Presentations', category: 'Business Intelligence', proficiency: 'Advanced' },

    // Business Performance & Planning
    { id: 'sk-10', name: 'KPI Reporting Frameworks', category: 'Business Performance', proficiency: 'Advanced', featured: true },
    { id: 'sk-11', name: 'Variance Analysis & Anomaly Detection', category: 'Business Performance', proficiency: 'Advanced', featured: true },
    { id: 'sk-12', name: 'Forecasting & Capacity Planning', category: 'Business Performance', proficiency: 'Proficient' },
    { id: 'sk-13', name: 'Resource & Operations Governance', category: 'Business Performance', proficiency: 'Proficient' },

    // AI & Automation
    { id: 'sk-14', name: 'AI-Assisted Data Analysis (Gemini/LLMs)', category: 'AI & Automation', proficiency: 'Advanced', featured: true },
    { id: 'sk-15', name: 'Automated ETL Pipelines & Workflows', category: 'AI & Automation', proficiency: 'Proficient', featured: true },
    { id: 'sk-16', name: 'Prompt Engineering for Analytics', category: 'AI & Automation', proficiency: 'Advanced' },
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Data Analyst Associate Certification',
      issuingOrganisation: 'DataCamp',
      issueYear: '2024',
      credentialUrl: 'https://www.datacamp.com/certificate/DAA00124',
      skillsTagged: ['SQL', 'Data Analysis', 'Data Cleaning', 'Exploratory Analysis'],
    },
    {
      id: 'cert-2',
      title: 'SQL Associate Certification',
      issuingOrganisation: 'DataCamp',
      issueYear: '2024',
      credentialUrl: 'https://www.datacamp.com/certificate/SQA00124',
      skillsTagged: ['PostgreSQL', 'Complex Queries', 'Aggregations', 'Database Modeling'],
    },
    {
      id: 'cert-3',
      title: 'AI Fundamentals Certification',
      issuingOrganisation: 'DataCamp',
      issueYear: '2024',
      credentialUrl: 'https://www.datacamp.com/certificate/AIF00124',
      skillsTagged: ['Generative AI', 'LLM Workflows', 'Prompt Design', 'Machine Learning Concepts'],
    },
    {
      id: 'cert-4',
      title: 'Introduction to Data Science',
      issuingOrganisation: 'Kibo School',
      issueYear: '2023',
      credentialUrl: 'https://kibo.school',
      skillsTagged: ['Data Science Foundations', 'Python', 'Statistical Inference'],
    },
    {
      id: 'cert-5',
      title: 'AI Augmented Professional & Development Skills in the Digital Age',
      issuingOrganisation: 'ALX',
      issueYear: '2024',
      credentialUrl: 'https://www.alxafrica.com',
      skillsTagged: ['AI Automation', 'Professional Productivity', 'Digital Age Strategy'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'National Open University of Nigeria',
      qualification: 'Bachelor of Science (BSc)',
      programme: 'Business Administration',
      startDate: '2023',
      endDate: 'Present',
      expectedGraduation: '2027',
      honours: 'In Progress (Strong Academic Standing)',
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
      organisation: 'Gamble Pause Initiative Africa',
      role: 'Lead Research & Data Contributor',
      dates: '2023 – Present',
      description:
        'Spearheaded empirical research into youth and student gambling behaviors across Nigeria, analyzing survey data from 420 respondents to design evidence-based community intervention programs.',
      impactStats: [
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
          title: 'Problem Framing & Survey Design',
          description: 'Constructed multi-variable questionnaires capturing demographics, betting frequency, financial spend, and academic records.',
        },
        {
          step: '02',
          title: 'Data Collection & Hygiene',
          description: 'Gathered 420 valid responses, sanitized categorical anomalies, and encoded responses for statistical analysis.',
        },
        {
          step: '03',
          title: 'Inferential Analysis',
          description: 'Conducted cross-tabulation and correlation testing between betting frequency and grade disruption metrics.',
        },
        {
          step: '04',
          title: 'Policy & Intervention Advocacy',
          description: 'Published actionable findings utilized by Gamble Pause Initiative Africa to deploy targeted campus workshops.',
        },
      ],
      researchFindings: [
        '71.1% of surveyed youth and students actively participate in sports betting and casino games.',
        '40.6% reported noticeable adverse effects on study hours, coursework submissions, and exam results.',
        'Peer group dynamics and financial hardship were reported as the top two motivating catalysts for repeated betting.',
      ],
      links: [
        {
          label: 'Gamble Pause Initiative Africa',
          url: 'https://gamblepause.org',
        },
      ],
    },
  ],
  documents: [
    {
      id: 'doc-cv-main',
      name: 'Abiodun Ayodeji — Official Verified CV',
      fileName: 'Abiodun_Ayodeji_CV.pdf',
      category: 'CV',
      description:
        'Official verified comprehensive Curriculum Vitae detailing 5+ years of experience across Performance Planning, Business Intelligence, and Data Analytics.',
      isPublic: true,
      isFeatured: true,
      source: 'Google Drive',
      externalUrl: 'https://drive.google.com/file/d/Abiodun_Ayodeji_CV/view',
      currentVersion: 'September 2026',
      lastUpdated: 'September 2026',
      fileSize: '1.4 MB',
      fileType: 'PDF Document',
      versionHistory: [
        {
          versionNumber: 'September 2026',
          date: '2026-09-01',
          notes: 'Updated with latest Performance & Planning analytics achievements and 35% turnaround reduction KPI.',
        },
        {
          versionNumber: 'August 2026',
          date: '2026-08-10',
          notes: 'Added ALX AI Augmented Professional Certification and DataCamp credentials.',
        },
      ],
    },
    {
      id: 'doc-resume-da',
      name: 'Data Analyst Resume (Specialized Track)',
      fileName: 'Abiodun_Ayodeji_Data_Analyst_Resume.pdf',
      category: 'Resume',
      description:
        'Targeted resume tailored for Data Analyst positions emphasizing SQL, ETL pipelines, Power BI, and statistical analysis.',
      isPublic: true,
      isFeatured: true,
      source: 'Google Drive',
      externalUrl: 'https://drive.google.com/file/d/Abiodun_Ayodeji_DA_Resume/view',
      currentVersion: 'September 2026',
      lastUpdated: 'September 2026',
      fileSize: '890 KB',
      fileType: 'PDF Document',
      versionHistory: [
        {
          versionNumber: 'September 2026',
          date: '2026-09-01',
          notes: 'Highlighted SQL optimization and exploratory data analysis capabilities.',
        },
      ],
    },
    {
      id: 'doc-resume-bi',
      name: 'Business Intelligence Resume (Specialized Track)',
      fileName: 'Abiodun_Ayodeji_BI_Resume.pdf',
      category: 'Resume',
      description:
        'Tailored for Business Intelligence Specialist roles highlighting Power BI, Looker Studio, DAX data modeling, and executive dashboards.',
      isPublic: true,
      isFeatured: true,
      source: 'Google Drive',
      externalUrl: 'https://drive.google.com/file/d/Abiodun_Ayodeji_BI_Resume/view',
      currentVersion: 'September 2026',
      lastUpdated: 'September 2026',
      fileSize: '910 KB',
      fileType: 'PDF Document',
      versionHistory: [
        {
          versionNumber: 'September 2026',
          date: '2026-09-01',
          notes: 'Focused on Power BI star-schema design and automated KPI governance.',
        },
      ],
    },
    {
      id: 'doc-resume-perf',
      name: 'Performance & Planning Analyst Resume',
      fileName: 'Abiodun_Ayodeji_Performance_Resume.pdf',
      category: 'Resume',
      description:
        'Tailored for Performance & Planning Analyst roles focusing on variance analysis, headcount forecasting, and operational resource planning.',
      isPublic: true,
      isFeatured: false,
      source: 'Google Drive',
      externalUrl: 'https://drive.google.com/file/d/Abiodun_Ayodeji_Perf_Resume/view',
      currentVersion: 'September 2026',
      lastUpdated: 'September 2026',
      fileSize: '880 KB',
      fileType: 'PDF Document',
      versionHistory: [
        {
          versionNumber: 'September 2026',
          date: '2026-09-01',
          notes: 'Includes variance modeling benchmarks and operational governance scorecards.',
        },
      ],
    },
    {
      id: 'doc-research-gp',
      name: 'Gambling Behaviour Empirical Research Study',
      fileName: 'Gamble_Pause_Research_Report_Ayodeji.pdf',
      category: 'Research',
      description:
        'Full empirical research report on 420 student respondents analyzing youth gambling participation and academic impacts in Nigeria.',
      isPublic: true,
      isFeatured: true,
      source: 'Direct Upload',
      externalUrl: 'https://drive.google.com/file/d/Gamble_Pause_Report/view',
      currentVersion: 'Version 2.1',
      lastUpdated: 'August 2026',
      fileSize: '3.2 MB',
      fileType: 'PDF Report',
      versionHistory: [
        {
          versionNumber: 'Version 2.1',
          date: '2026-08-15',
          notes: 'Included bivariate statistical correlations and policy recommendations.',
        },
      ],
    },
    {
      id: 'doc-proposal-bi',
      name: 'Commercial Sales BI Infrastructure Proposal',
      fileName: 'Commercial_BI_Infrastructure_Proposal.pdf',
      category: 'Proposal',
      description:
        'Strategic technical proposal outlining the end-to-end data pipeline architecture for multi-region retail sales reporting.',
      isPublic: true,
      isFeatured: false,
      source: 'Google Drive',
      externalUrl: 'https://drive.google.com/file/d/BI_Proposal/view',
      currentVersion: 'v1.0',
      lastUpdated: 'July 2026',
      fileSize: '1.1 MB',
      fileType: 'PDF Document',
      versionHistory: [
        {
          versionNumber: 'v1.0',
          date: '2026-07-20',
          notes: 'Initial operational architecture proposal.',
        },
      ],
    },
  ],
  coverLetters: [
    {
      id: 'cl-da',
      title: 'Data Analyst Cover Letter',
      targetTrack: 'Data Analyst',
      description:
        'Standard cover letter focusing on SQL data extraction, data cleaning, automated reporting pipelines, and actionable insights.',
      content: `Dear Hiring Team,

I am writing to express my strong interest in the Data Analyst position. With over 5 years of multidisciplinary experience across business operations, commercial analytics, and performance reporting, I specialize in transforming raw, fragmented datasets into clear, actionable business intelligence that drives decisive commercial outcomes.

In my recent roles, I have consistently applied SQL, Advanced Excel, and Power BI to solve critical operational challenges. For instance, as a Sales Support Analyst during the Showmax 2.0 relaunch, I engineered automated SQL and Power BI dashboards that uncovered 3 major churn corridors and reduced weekly sales reporting turnaround time by 20%, directly supporting a 135% surge in subscription activations. Furthermore, as a Performance & Planning Analyst, I built automated data consolidation models that reduced executive reporting cycles by 35%.

My technical toolkit includes advanced SQL (CTEs, complex joins, aggregations), Power BI (DAX, dimensional modeling), variance analysis, and AI-assisted workflow automation. Backed by certifications from DataCamp (Data Analyst Associate, SQL Associate, AI Fundamentals) and ALX, I bring both technical rigor and commercial curiosity to your team.

I would welcome the opportunity to discuss how my analytical skills and dedication to operational excellence can contribute to your team's objectives.

Sincerely,
Abiodun Ayodeji
Lagos, Nigeria
ayodejiharbiodun24@gmail.com`,
      status: 'published',
      isPublic: true,
      lastUpdated: 'September 2026',
    },
    {
      id: 'cl-bi',
      title: 'Business Intelligence Specialist Cover Letter',
      targetTrack: 'Business Intelligence',
      description:
        'Targeted cover letter highlighting interactive Power BI dashboard architecture, DAX modeling, and stakeholder storytelling.',
      content: `Dear Hiring Team,

I am pleased to submit my application for the Business Intelligence Analyst / Specialist position. As a data professional with extensive experience in Power BI, Looker Studio, and SQL dimensional modeling, I excel at turning complex multi-source data into intuitive, real-time executive dashboards that democratize insights across organizations.

Throughout my career, I have focused on closing the gap between raw data and executive decision-making. During the Showmax 2.0 relaunch campaign, I built centralized KPI dashboards and cohort retention tracking suites that provided commercial leadership with visibility into regional distributor performance, accelerating our sales reporting cycle by 20% and underpinning a 135% subscription growth.

I hold verified associate certifications in Data Analytics, SQL, and AI Fundamentals from DataCamp, alongside continuous training with ALX. My approach blends sound database architecture with human-centered data visualization to ensure every chart answers a tangible business question.

Thank you for your time and consideration. I look forward to the possibility of discussing how I can add value to your business intelligence roadmap.

Warm regards,
Abiodun Ayodeji
ayodejiharbiodun24@gmail.com`,
      status: 'published',
      isPublic: true,
      lastUpdated: 'September 2026',
    },
    {
      id: 'cl-perf',
      title: 'Performance & Planning Analyst Cover Letter',
      targetTrack: 'Performance Analyst',
      description:
        'Targeted cover letter emphasizing variance modeling, headcount planning, KPI governance, and operational optimization.',
      content: `Dear Hiring Manager,

I am writing to express my enthusiastic interest in the Performance & Planning Analyst role. With a proven track record in variance modeling, KPI framework governance, and capacity forecasting, I help organizations achieve operational efficiency and meet strategic financial targets.

Currently serving as a Performance & Planning Analyst, I lead the design and automation of cross-departmental KPI frameworks, delivering a 35% reduction in executive reporting turnaround times. By implementing automated budget-vs-actual variance algorithms and anomaly detection triggers, I have enabled leadership to proactively address resource imbalances before they impact quarterly outcomes.

I combine analytical acumen in SQL, Excel Power Query, and Power BI with a strong foundation in Business Administration. I am eager to bring my systematic approach to performance governance to your organization.

Thank you for reviewing my application.

Sincerely,
Abiodun Ayodeji
ayodejiharbiodun24@gmail.com`,
      status: 'published',
      isPublic: true,
      lastUpdated: 'September 2026',
    },
    {
      id: 'cl-gen',
      title: 'General Professional Cover Letter',
      targetTrack: 'General Professional',
      description:
        'Versatile, high-impact cover letter articulating Abiodun’s 5+ years journey from operations to data analytics and social impact.',
      content: `Dear Hiring Team,

I am writing to introduce myself and express my strong interest in contributing my analytical capabilities and operational experience to your organization. Over the past 5+ years, my career has bridged front-line operations, project governance, and commercial data analytics, equipping me with a 360-degree understanding of how data flows through a business.

Whether architecting Power BI dashboards that contributed to a 135% subscription increase, cutting executive reporting turnaround by 35%, or leading empirical research for Gamble Pause Initiative Africa across 420 youth respondents, I am driven by creating measurable, positive outcomes through data.

I am eager to learn more about your team's immediate priorities and explore how my expertise in SQL, Power BI, and performance planning can support your goals.

Best regards,
Abiodun Ayodeji
ayodejiharbiodun24@gmail.com`,
      status: 'published',
      isPublic: true,
      lastUpdated: 'September 2026',
    },
  ],
  settings: {
    siteTitle: 'Abiodun Ayodeji | Data Analyst & Performance Hub',
    professionalHeadline: 'Data Analyst | Performance & Planning | Business Intelligence',
    accentColor: 'emerald',
    availabilityStatus: 'Open to opportunities & collaborations',
    seoDescription:
      'Official personal professional website & document centre for Abiodun Ayodeji — Data Analyst, Performance & Planning, and Business Intelligence Specialist based in Lagos, Nigeria.',
    contactEmail: 'ayodejiharbiodun24@gmail.com',
    contactPhone: '+234 813 000 0000',
  },
  lastUpdated: new Date().toISOString(),
};
