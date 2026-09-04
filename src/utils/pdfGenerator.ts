import { jsPDF } from 'jspdf';
import { PortfolioData, DocumentItem } from '../types';

// Standard colors for executive documents
const COLOR_PRIMARY = [15, 23, 42] as const; // slate-900 / dark navy
const COLOR_SECONDARY = [30, 41, 59] as const; // slate-800
const COLOR_ACCENT = [29, 78, 216] as const; // blue-700 / executive royal
const COLOR_MUTED = [100, 116, 139] as const; // slate-500
const COLOR_BODY = [51, 65, 85] as const; // slate-700
const COLOR_BORDER = [226, 232, 240] as const; // slate-200
const COLOR_BG_LIGHT = [248, 250, 252] as const; // slate-50

/**
 * Safe vector bullet point drawer (never renders as corrupted unicode glyphs)
 */
const drawBulletPoint = (doc: jsPDF, x: number, yPos: number, radius = 0.55) => {
  doc.setFillColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.circle(x, yPos - 0.9, radius, 'F');
};

/**
 * Comprehensive Executive Curriculum Vitae PDF Generator.
 * Conforms to top-tier global corporate executive standards:
 * - Formal corporate header & contact ribbon with active hyperlinks
 * - 3 prominent executive KPI callout cards (Reporting speed, Showmax growth, empirical research)
 * - 2x2 structured technical competencies domain matrix
 * - Professional experience with clear hierarchy, vector bullets, and measurable impact callout boxes
 * - Anti-orphan page break checks
 * - Formal corporate running headers and page footers with 'CONFIDENTIAL' and current date metadata
 */
export const generateCvPdf = (data: PortfolioData): void => {
  const { profile, experiences, education, certifications, volunteering } = data;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const drawRunningHeader = () => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text('CONFIDENTIAL  |  ABIODUN AYODEJI  |  EXECUTIVE CURRICULUM VITAE', margin, margin + 1);

    doc.setFont('helvetica', 'normal');
    doc.text('SEPTEMBER 2026', pageWidth - margin, margin + 1, { align: 'right' });

    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.25);
    doc.line(margin, margin + 3.5, pageWidth - margin, margin + 3.5);
  };

  const checkPageBreak = (neededHeight: number): void => {
    if (y + neededHeight > pageHeight - margin - 14) {
      doc.addPage();
      y = margin + 8;
      drawRunningHeader();
    }
  };

  // 1. Top Decorative Brand Bar
  doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.rect(margin, y, contentWidth, 2.5, 'F');
  doc.setFillColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.rect(margin, y + 2.5, 45, 0.9, 'F');
  y += 7.5;

  // Full Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text((profile.fullName || 'Abiodun Ayodeji').toUpperCase(), margin, y);
  y += 5.8;

  // Professional Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.2);
  doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.text(
    (profile.professionalTitle || 'Data Analyst | Performance & Planning Analyst').toUpperCase(),
    margin,
    y
  );
  y += 5;

  // Contact Info Ribbon Card
  doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
  doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
  doc.setLineWidth(0.25);
  doc.roundedRect(margin, y, contentWidth, 13.5, 1.2, 1.2, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);

  const col1 = margin + 4;
  const col2 = margin + 60;
  const col3 = margin + 118;

  // Row 1
  doc.text(`Location: ${profile.location || 'Lagos, Nigeria'}`, col1, y + 4.6);
  doc.text(`Phone: ${profile.phone || '07054195682'}`, col2, y + 4.6);
  doc.text(`Email: ${profile.email || 'ayodejiharbiodun24@gmail.com'}`, col3, y + 4.6);

  // Row 2 with Clickable Links
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.textWithLink('LinkedIn: linkedin.com/in/abiodun-ayodeji24', col1, y + 9.8, {
    url: 'https://www.linkedin.com/in/abiodun-ayodeji24',
  });
  doc.textWithLink('GitHub: github.com/harbiodunjay24', col2, y + 9.8, {
    url: 'https://github.com/harbiodunjay24',
  });

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
  doc.text('A4 Standard  •  Verified Record', col3, y + 9.8);

  y += 18;

  // 2. Executive KPI Metric Highlight Cards (3 Columns)
  const boxWidth = (contentWidth - 6) / 3;
  const metrics = [
    { value: '35% Faster', title: 'Reporting Turnaround', desc: 'Automated SQL models & Power BI' },
    { value: '135% Surge', title: 'Showmax Activations', desc: 'Commercial analytics & campaigns' },
    { value: '420+ Surveyed', title: 'Behavioral Research', desc: 'GamblePause Africa empirical study' },
  ];

  metrics.forEach((m, idx) => {
    const boxX = margin + idx * (boxWidth + 3);
    doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.25);
    doc.roundedRect(boxX, y, boxWidth, 14, 1.2, 1.2, 'FD');

    // Left accent strip
    doc.setFillColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.rect(boxX, y, 1.4, 14, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.text(m.value, boxX + 4, y + 4.8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(m.title, boxX + 4, y + 8.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(m.desc, boxX + 4, y + 12.2);
  });
  y += 18;

  // Section Title Component with Anti-Orphan protection
  const addSectionTitle = (title: string) => {
    checkPageBreak(30);
    y += 2.5;

    // Solid accent marker
    doc.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.roundedRect(margin, y - 3.8, 3, 5, 0.4, 0.4, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.2);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(title.toUpperCase(), margin + 5.5, y);

    y += 2.2;
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4.5;
  };

  // 3. Professional Summary
  addSectionTitle('Executive Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);

  const summary =
    profile.aboutMe ||
    'Performance & Planning Analyst and Data Analyst with over 5 years of progressive corporate experience at MultiChoice Group translating high-volume transactional data into actionable executive intelligence. Specialist in SQL data modeling, Power BI dashboard architecture, KPI governance, budget variance frameworks, Google Workspace automation (Apps Script), and modern AI systems. Recognized for driving operational turnaround and leading empirical social impact research across Africa.';

  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  checkPageBreak(summaryLines.length * 4.2 + 2);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4.2 + 3;

  // 4. Core Competencies & Technical Stack (2x2 Clean Structured Cards)
  addSectionTitle('Core Competencies & Technical Stack');

  const skillsBlock = [
    {
      domain: 'Data & SQL Analytics',
      items: 'SQL (DataCamp Certified, PostgreSQL, MySQL), Relational Modeling, Advanced Excel (Power Query, Dynamic Arrays), Exploratory Data Analysis (EDA)',
    },
    {
      domain: 'Business Intelligence',
      items: 'Microsoft Power BI, DAX Modeling, Google Looker Studio, Executive Dashboards, KPI Governance & Commercial Trend Analysis',
    },
    {
      domain: 'Performance & Planning',
      items: 'Capacity Forecasting, Budget Variance Tracking, Operational Turnaround, KPI Scorecards, Workflow Streamlining, Process SOPs',
    },
    {
      domain: 'Cloud, Scripting & AI',
      items: 'Google Workspace (Sheets, Docs, Slides, Drive), Google Apps Script, Modern AI (ChatGPT, Claude, Gemini API, Prompt Engineering)',
    },
  ];

  const colW = (contentWidth - 4) / 2;
  for (let b = 0; b < skillsBlock.length; b += 2) {
    const b1 = skillsBlock[b];
    const b2 = skillsBlock[b + 1];

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.6);
    const lines1 = doc.splitTextToSize(b1.items, colW - 5);
    const lines2 = b2 ? doc.splitTextToSize(b2.items, colW - 5) : [];
    const blockH = Math.max(lines1.length, lines2.length) * 3.6 + 8.5;

    checkPageBreak(blockH + 2);

    // Left Box
    doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, y, colW, blockH, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(b1.domain, margin + 3, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
    doc.text(lines1, margin + 3, y + 8.2);

    // Right Box
    if (b2) {
      const rightX = margin + colW + 4;
      doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
      doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
      doc.roundedRect(rightX, y, colW, blockH, 1, 1, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      doc.text(b2.domain, rightX + 3, y + 4.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
      doc.text(lines2, rightX + 3, y + 8.2);
    }

    y += blockH + 3;
  }

  y += 1;

  // 5. Professional Experience
  addSectionTitle('Professional Work Experience');

  (experiences || []).forEach((exp) => {
    checkPageBreak(28);

    // Job Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(exp.jobTitle, margin, y);

    // Date Range (Right aligned)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    const dateRange = `${exp.startDate} – ${exp.endDate}`;
    doc.text(dateRange, pageWidth - margin, y, { align: 'right' });
    y += 4.2;

    // Company & Location
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.text(`${exp.organisation}  |  ${exp.location}`, margin, y);
    y += 4.5;

    // Bullet points
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);

    const responsibilities = exp.responsibilities || [];
    responsibilities.forEach((resp) => {
      const respLines = doc.splitTextToSize(resp, contentWidth - 7);
      checkPageBreak(respLines.length * 3.8 + 1.2);
      drawBulletPoint(doc, margin + 2.5, y + 1.1, 0.5);
      doc.text(respLines, margin + 5.5, y);
      y += respLines.length * 3.8 + 1.2;
    });

    // Key Achievements Callout Box
    if (exp.achievements && exp.achievements.length > 0) {
      exp.achievements.forEach((ach) => {
        const achLines = doc.splitTextToSize(`Key Measurable Impact: ${ach}`, contentWidth - 10);
        const boxH = achLines.length * 3.8 + 3.8;
        checkPageBreak(boxH + 2);

        doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
        doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
        doc.setLineWidth(0.2);
        doc.roundedRect(margin + 3, y, contentWidth - 3, boxH, 1, 1, 'FD');

        // Left accent bar
        doc.setFillColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
        doc.rect(margin + 3, y, 1.4, boxH, 'F');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.8);
        doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
        doc.text(achLines, margin + 7, y + 3.6);

        y += boxH + 2.5;
      });
    }

    y += 2.5;
  });

  // 6. Volunteering & Social Impact
  addSectionTitle('Volunteering, Psychology & Social Impact');

  const volItems = volunteering || [
    {
      organisation: 'GamblePause Africa',
      role: 'Analyst & Psychologist',
      dates: '2023 – Present',
      description:
        'Operating across 3 African countries (Nigeria, Kenya, Ghana). Led empirical research surveying 420 youth/students on gambling harm (71.1% active gambling, 40.6% academic disruption) and provide direct psychological counseling to clients.',
    },
    {
      organisation: 'Lagos Division Ambassador',
      role: 'Data & Community Volunteer',
      dates: '2023 – Present',
      description:
        'Active volunteer supporting the Lagos Division Ambassador initiative across Lagos State—facilitating youth empowerment programs, civic mobilization, and regional data tracking (distinct from Cowrywise).',
    },
    {
      organisation: 'NOUN Cowrywise Ambassador',
      role: 'Data Team Lead & Career Team Lead',
      dates: '2023 – Present',
      description:
        'Directed data and career tracks at National Open University of Nigeria and led "The Cowrywise Bootcamp Experience" for over 200 student participants.',
    },
  ];

  volItems.forEach((v) => {
    checkPageBreak(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(`${v.organisation}  —  ${v.role}`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(v.dates || '', pageWidth - margin, y, { align: 'right' });
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);

    const descLines = doc.splitTextToSize(v.description, contentWidth - 4);
    checkPageBreak(descLines.length * 3.8);
    doc.text(descLines, margin + 2, y);
    y += descLines.length * 3.8 + 3;
  });

  // 7. Education
  addSectionTitle('Education');
  (education || []).forEach((edu) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(`${edu.qualification}: ${edu.programme}`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(`${edu.startDate} – ${edu.endDate}`, pageWidth - margin, y, { align: 'right' });
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
    doc.text(edu.institution, margin, y);
    y += 5;
  });

  // 8. Certifications & Credentials
  addSectionTitle('Certifications & Professional Credentials');
  (certifications || []).forEach((cert) => {
    checkPageBreak(6.5);
    drawBulletPoint(doc, margin + 2.5, y + 1.1, 0.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(cert.name, margin + 5.5, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(`${cert.issuer} (${cert.issueDate})`, pageWidth - margin, y, { align: 'right' });
    y += 4.5;
  });

  // 9. Formal Corporate Page Footers with Confidentiality Metadata
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.25);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
    doc.text('CONFIDENTIAL', margin, pageHeight - 7.5);

    const confW = doc.getTextWidth('CONFIDENTIAL');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text('  |  FOR EXECUTIVE EVALUATION ONLY', margin + confW, pageHeight - 7.5);

    doc.text(
      'Abiodun Ayodeji · Curriculum Vitae · Verified Record',
      pageWidth / 2,
      pageHeight - 7.5,
      { align: 'center' }
    );

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(`Page ${i} of ${totalPages}  |  September 2026`, pageWidth - margin, pageHeight - 7.5, {
      align: 'right',
    });
  }

  doc.save('Abiodun_Ayodeji_CV.pdf');
};

/**
 * Modern High-Impact Executive Resume PDF Generator.
 * Tailored for hiring managers, recruiters, and executive review:
 * - High-contrast executive header with primary KPI metric cards
 * - Prioritized bullet points focused on quantifiable business impact
 * - Clean structured skills matrix
 * - Compact layout fitting tightly on 1-2 pages
 */
export const generateResumePdf = (data: PortfolioData): void => {
  const { profile, experiences, education, certifications } = data;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number): void => {
    if (y + neededHeight > pageHeight - margin - 10) {
      doc.addPage();
      y = margin + 4;
      drawHeaderSmall();
    }
  };

  const drawHeaderSmall = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text('ABIODUN AYODEJI  |  EXECUTIVE RESUME', margin, margin);
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.2);
    doc.line(margin, margin + 2, pageWidth - margin, margin + 2);
  };

  // 1. Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.text((profile.fullName || 'Abiodun Ayodeji').toUpperCase(), margin, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
  doc.text('DATA ANALYST  |  PERFORMANCE & PLANNING ANALYST', margin, y);
  y += 5;

  // Single-line compact contact info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
  const contactLine = `${profile.location || 'Lagos, Nigeria'}  •  Phone: ${profile.phone || '07054195682'}  •  Email: ${profile.email || 'ayodejiharbiodun24@gmail.com'}  •  LinkedIn: linkedin.com/in/abiodun-ayodeji24`;
  doc.text(contactLine, margin, y);
  y += 4;

  doc.setDrawColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5.5;

  // 2. Executive Metric Highlight Boxes (3 columns)
  const boxWidth = (contentWidth - 6) / 3;
  const metrics = [
    { value: '35% Faster', title: 'Reporting Turnaround', desc: 'Automated SQL models & Power BI' },
    { value: '135% Surge', title: 'Showmax Activations', desc: 'Commercial analytics & campaign support' },
    { value: '420+ Surveyed', title: 'Behavioral Research', desc: 'GamblePause Africa empirical study' },
  ];

  metrics.forEach((m, idx) => {
    const boxX = margin + idx * (boxWidth + 3);
    doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.2);
    doc.roundedRect(boxX, y, boxWidth, 13, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.text(m.value, boxX + 3, y + 4.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(m.title, boxX + 3, y + 8.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(m.desc, boxX + 3, y + 11.5);
  });
  y += 16.5;

  // Section divider helper
  const addResumeSection = (title: string) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(title.toUpperCase(), margin, y);

    y += 1.8;
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4;
  };

  // 3. Executive Profile
  addResumeSection('Executive Profile');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
  const execSummary =
    'Performance & Planning Analyst with 5+ years of progressive corporate experience at MultiChoice Group translating high-volume transactional data into actionable executive intelligence. Specialist in SQL data modeling, Power BI dashboard architecture, KPI governance, budget variance frameworks, Google Workspace automation (Apps Script), and modern AI systems. Recognized for driving operational efficiencies, reducing reporting turnaround by 35%, and leading empirical social impact research across Africa.';
  const execLines = doc.splitTextToSize(execSummary, contentWidth);
  doc.text(execLines, margin, y);
  y += execLines.length * 3.8 + 3;

  // 4. Core Competencies
  addResumeSection('Technical & Analytical Stack');
  const stack = [
    { cat: 'Analytics & Databases', skills: 'SQL (DataCamp Certified), PostgreSQL, MySQL, Data Modeling, Joins, Aggregations, EDA' },
    { cat: 'BI & Spreadsheets', skills: 'Microsoft Power BI (DAX, Star Schema), Advanced Excel (Power Query, Pivot, Dynamic Arrays), Looker Studio' },
    { cat: 'Governance & Automation', skills: 'KPI Scorecards, Budget Variance Modeling, Google Workspace, Google Apps Script, Process SOPs' },
    { cat: 'Modern AI Tools', skills: 'ChatGPT, Claude, Google Gemini / AI Studio, Structured Prompt Engineering, Notion' },
  ];

  stack.forEach((s) => {
    checkPageBreak(5);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
    doc.text(`${s.cat}:`, margin, y);

    const labelW = doc.getTextWidth(`${s.cat}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
    doc.text(s.skills, margin + labelW, y);
    y += 4;
  });
  y += 2;

  // 5. Professional Experience
  addResumeSection('Professional Experience');
  (experiences || []).forEach((exp) => {
    checkPageBreak(24);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(exp.jobTitle, margin, y);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(`${exp.startDate} – ${exp.endDate}`, pageWidth - margin, y, { align: 'right' });
    y += 3.8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    doc.text(`${exp.organisation}  |  ${exp.location}`, margin, y);
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);

    (exp.responsibilities || []).slice(0, 4).forEach((resp) => {
      const respLines = doc.splitTextToSize(resp, contentWidth - 6);
      checkPageBreak(respLines.length * 3.6 + 1.2);
      drawBulletPoint(doc, margin + 2, y + 1.1, 0.5);
      doc.text(respLines, margin + 5, y);
      y += respLines.length * 3.6 + 1;
    });

    if (exp.achievements && exp.achievements.length > 0) {
      const ach = exp.achievements[0];
      const achLines = doc.splitTextToSize(`Metric Highlight: ${ach}`, contentWidth - 8);
      checkPageBreak(achLines.length * 3.6 + 2.5);

      doc.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
      doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
      doc.setLineWidth(0.2);
      doc.roundedRect(margin + 4, y - 2.5, contentWidth - 6, achLines.length * 3.6 + 2, 1, 1, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      doc.text(achLines, margin + 6, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);

      y += achLines.length * 3.6 + 3.2;
    }

    y += 2;
  });

  // 6. Education & Certifications (Combined 2-column)
  addResumeSection('Education & Verified Credentials');
  const edu = (education || [])[0];
  if (edu) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(`${edu.qualification} in ${edu.programme}`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text(`${edu.startDate} – ${edu.endDate}`, pageWidth - margin, y, { align: 'right' });
    y += 3.8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
    doc.text(edu.institution, margin, y);
    y += 5;
  }

  const certList = (certifications || []).slice(0, 4).map((c) => `${c.name} (${c.issuer})`).join('  •  ');
  if (certList) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
    doc.text('Key Credentials: ', margin, y);
    const certW = doc.getTextWidth('Key Credentials: ');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
    const certLines = doc.splitTextToSize(certList, contentWidth - certW);
    doc.text(certLines, margin + certW, y);
    y += certLines.length * 3.6;
  }

  // Running Footers with Corporate Metadata
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    doc.setLineWidth(0.25);
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(COLOR_SECONDARY[0], COLOR_SECONDARY[1], COLOR_SECONDARY[2]);
    doc.text('CONFIDENTIAL', margin, pageHeight - 7);

    const confW = doc.getTextWidth('CONFIDENTIAL');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    doc.text('  |  FOR EXECUTIVE EVALUATION ONLY', margin + confW, pageHeight - 7);

    doc.text(
      'Abiodun Ayodeji · Executive Resume · MultiChoice Group',
      pageWidth / 2,
      pageHeight - 7,
      { align: 'center' }
    );

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    doc.text(`Page ${i} of ${totalPages}  |  September 2026`, pageWidth - margin, pageHeight - 7, {
      align: 'right',
    });
  }

  doc.save('Abiodun_Ayodeji_Resume.pdf');
};

/**
 * Downloads ATS-optimized Plain Text document for direct ATS intake portals
 */
export const downloadAtsPlainTextFile = (data: PortfolioData): void => {
  const { profile, experiences, skills, education, certifications, volunteering } = data;

  const content = `ABIODUN AYODEJI
Data Analyst | Performance & Planning Analyst
Lagos, Nigeria | Phone: ${profile.phone || '07054195682'} | Email: ${profile.email || 'ayodejiharbiodun24@gmail.com'}
LinkedIn: https://www.linkedin.com/in/abiodun-ayodeji24 | GitHub: https://github.com/harbiodunjay24

================================================================================
PROFESSIONAL SUMMARY
================================================================================
${profile.aboutMe || 'Data Analyst and Performance & Planning Analyst with 5+ years of progressive corporate experience at MultiChoice Group across business operations, commercial analytics, and KPI governance.'}

================================================================================
CORE COMPETENCIES & TECHNICAL SKILLS
================================================================================
- Data Querying & Databases: SQL (PostgreSQL, MySQL), Relational Modeling, Data Cleaning, EDA
- Business Intelligence: Microsoft Power BI, Looker Studio, Executive Dashboards, KPI Scorecards
- Modeling & Spreadsheets: Advanced Excel (Power Query, DAX, Pivot Modeling, Variance Analysis)
- Cloud & Scripting: Google Workspace (Sheets, Docs, Slides, Drive), Google Apps Script
- Modern AI: ChatGPT, Claude, Google Gemini / AI Studio, Prompt Engineering, Notion
- Skills List: ${skills.map((s) => s.name).join(', ')}

================================================================================
PROFESSIONAL WORK EXPERIENCE
================================================================================
${experiences
  .map(
    (exp) => `${exp.jobTitle.toUpperCase()}
${exp.organisation} | ${exp.location} | ${exp.startDate} – ${exp.endDate}
${(exp.responsibilities || []).map((r) => `* ${r}`).join('\n')}
${exp.achievements && exp.achievements.length > 0 ? `Key Achievements:\n${exp.achievements.map((a) => `  - ${a}`).join('\n')}` : ''}`
  )
  .join('\n\n')}

================================================================================
VOLUNTEERING, PSYCHOLOGY & SOCIAL IMPACT
================================================================================
${(volunteering || [])
  .map(
    (v) => `${v.organisation.toUpperCase()} — ${v.role} (${v.dates})
${v.description}`
  )
  .join('\n\n')}

================================================================================
EDUCATION
================================================================================
${education
  .map((edu) => `${edu.qualification} in ${edu.programme}
${edu.institution} | ${edu.startDate} – ${edu.endDate}`)
  .join('\n\n')}

================================================================================
CERTIFICATIONS & CREDENTIALS
================================================================================
${certifications
  .map((c) => `- ${c.name} | ${c.issuer} (${c.issueDate})`)
  .join('\n')}
`;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Abiodun_Ayodeji_CV_ATS.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Typesets any document item in the Document Centre with executive PDF styling
 */
export const generateDocumentPdf = (docItem: DocumentItem): void => {
  const isCoverLetter =
    docItem.category === 'Cover Letter' ||
    docItem.name.toLowerCase().includes('cover letter') ||
    (docItem.fileName || '').toLowerCase().includes('cover_letter');

  const isResearchReport =
    docItem.category === 'Research' ||
    docItem.name.toLowerCase().includes('research') ||
    docItem.name.toLowerCase().includes('gamblepause') ||
    (docItem.fileName || '').toLowerCase().includes('survey');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 12) {
      pdf.addPage();
      y = margin + 4;
      drawRunningHeader();
    }
  };

  const drawRunningHeader = () => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    pdf.text(`ABIODUN AYODEJI  |  ${(docItem.name || 'DOCUMENT').toUpperCase()}`, margin, margin);
    pdf.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    pdf.setLineWidth(0.2);
    pdf.line(margin, margin + 2, pageWidth - margin, margin + 2);
  };

  // Top Accent Bar
  pdf.setFillColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
  pdf.rect(margin, y, contentWidth, 2, 'F');
  y += 7;

  if (isCoverLetter) {
    // Formal Executive Letterhead
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    pdf.text('ABIODUN AYODEJI', margin, y);
    y += 5.5;

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9.5);
    pdf.setTextColor(COLOR_ACCENT[0], COLOR_ACCENT[1], COLOR_ACCENT[2]);
    pdf.text('Data Analyst  |  Performance & Planning Analyst', margin, y);
    y += 4.5;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    pdf.text('Lagos, Nigeria  •  07054195682  •  ayodejiharbiodun24@gmail.com  •  linkedin.com/in/abiodun-ayodeji24', margin, y);
    y += 4;

    pdf.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    pdf.setLineWidth(0.3);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 7;
  } else {
    // Standard Document Title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
    const titleLines = pdf.splitTextToSize(docItem.name, contentWidth);
    pdf.text(titleLines, margin, y);
    y += titleLines.length * 6;

    // Metadata Strip
    pdf.setFillColor(COLOR_BG_LIGHT[0], COLOR_BG_LIGHT[1], COLOR_BG_LIGHT[2]);
    pdf.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    pdf.setLineWidth(0.25);
    pdf.roundedRect(margin, y, contentWidth, 8.5, 1.2, 1.2, 'FD');

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.8);
    pdf.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    const metaText = `Category: ${docItem.category}  |  Version: ${docItem.currentVersion || '1.0'}  |  Last Verified: ${docItem.lastUpdated || '2026'}  |  Author: Abiodun Ayodeji`;
    pdf.text(metaText, margin + 4, y + 5.2);
    y += 13;
  }

  // Document Content Parsing
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.8);
  pdf.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);

  const rawContent = docItem.content || `${docItem.name}\n\nOfficial document for Abiodun Ayodeji.`;
  const lines = rawContent.split('\n');

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      y += 2.8;
      return;
    }

    // Ignore decorative divider rows
    if (trimmed.startsWith('===') || trimmed.startsWith('---')) {
      y += 1.5;
      return;
    }

    // Section Header Detection
    const isSectionHeader =
      trimmed === trimmed.toUpperCase() &&
      trimmed.length > 3 &&
      !trimmed.startsWith('•') &&
      !trimmed.startsWith('-') &&
      !trimmed.startsWith('*');

    if (isSectionHeader) {
      checkPageBreak(12);
      y += 3.5;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(COLOR_PRIMARY[0], COLOR_PRIMARY[1], COLOR_PRIMARY[2]);
      pdf.text(trimmed, margin, y);
      y += 2;
      pdf.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
      pdf.setLineWidth(0.25);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 4.5;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.8);
      pdf.setTextColor(COLOR_BODY[0], COLOR_BODY[1], COLOR_BODY[2]);
      return;
    }

    // Bullet Point Detection
    if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const cleanBulletText = trimmed.replace(/^[•\-\*]\s*/, '');
      const bulletLines = pdf.splitTextToSize(cleanBulletText, contentWidth - 6);
      checkPageBreak(bulletLines.length * 4 + 1);
      drawBulletPoint(pdf, margin + 2, y + 1.2, 0.55);
      pdf.text(bulletLines, margin + 5, y);
      y += bulletLines.length * 4 + 1;
      return;
    }

    // Standard Body Paragraph
    const splitLine = pdf.splitTextToSize(trimmed, contentWidth);
    checkPageBreak(splitLine.length * 4 + 0.8);
    pdf.text(splitLine, margin, y);
    y += splitLine.length * 4 + 0.8;
  });

  // Footer on all pages
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setDrawColor(COLOR_BORDER[0], COLOR_BORDER[1], COLOR_BORDER[2]);
    pdf.setLineWidth(0.2);
    pdf.line(margin, pageHeight - 10, pageWidth - margin, pageHeight - 10);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.2);
    pdf.setTextColor(COLOR_MUTED[0], COLOR_MUTED[1], COLOR_MUTED[2]);
    pdf.text(
      `Abiodun Ayodeji Document Vault  |  ${docItem.fileName || docItem.name}`,
      margin,
      pageHeight - 6
    );
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 6, { align: 'right' });
  }

  const safeFileName = docItem.fileName || `${docItem.name.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.pdf`;
  pdf.save(safeFileName.endsWith('.pdf') ? safeFileName : `${safeFileName}.pdf`);
};

