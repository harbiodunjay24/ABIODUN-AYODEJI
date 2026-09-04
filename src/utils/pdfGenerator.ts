import { jsPDF } from 'jspdf';
import { PortfolioData, DocumentItem } from '../types';

/**
 * Redesigned Executive PDF Generator for Abiodun Ayodeji's CV.
 * Produces a polished, executive-ready, ATS-friendly document with
 * clean typography hierarchy, balanced margins, vector bullets, and sharp formatting.
 */
export const generateCvPdf = (data: PortfolioData): void => {
  const { profile, experiences, skills, education, certifications, volunteering } = data;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Safe vector bullet point drawer (never renders as corrupted unicode glyphs)
  const drawBulletPoint = (x: number, yPos: number, radius = 0.75) => {
    doc.setFillColor(71, 85, 105); // slate-600
    doc.circle(x, yPos - 1, radius, 'F');
  };

  const checkPageBreak = (neededHeight: number): void => {
    if (y + neededHeight > pageHeight - margin - 12) {
      doc.addPage();
      y = margin + 4;
      drawRunningHeader();
    }
  };

  const drawRunningHeader = () => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text('ABIODUN AYODEJI  |  CURRICULUM VITAE', margin, margin);
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.2);
    doc.line(margin, margin + 2, pageWidth - margin, margin + 2);
  };

  // ==========================
  // 1. TOP HEADER & CONTACT
  // ==========================
  // Accent Top Bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, y, contentWidth, 2, 'F');
  y += 6;

  // Full Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  doc.text((profile.fullName || 'Abiodun Ayodeji').toUpperCase(), margin, y);
  y += 6;

  // Professional Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(37, 99, 235); // blue-600
  doc.text(
    (profile.professionalTitle || 'Data Analyst | Performance & Planning Analyst').toUpperCase(),
    margin,
    y
  );
  y += 5.5;

  // Contact Info Grid Box
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.25);
  doc.roundedRect(margin, y, contentWidth, 12, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85); // slate-700

  const col1X = margin + 4;
  const col2X = margin + 58;
  const col3X = margin + 118;

  // Line 1
  doc.text(`Location: ${profile.location || 'Lagos, Nigeria'}`, col1X, y + 4.5);
  doc.text(`Phone: ${profile.phone || '07054195682'}`, col2X, y + 4.5);
  doc.text(`Email: ${profile.email || 'ayodejiharbiodun24@gmail.com'}`, col3X, y + 4.5);

  // Line 2
  const linkedinClean = profile.socialLinks?.linkedin || 'https://www.linkedin.com/in/abiodun-ayodeji24';
  const githubClean = profile.socialLinks?.github || 'https://github.com/harbiodunjay24';
  doc.text(`LinkedIn: ${linkedinClean}`, col1X, y + 9.5);
  doc.text(`GitHub: ${githubClean}`, col3X, y + 9.5);

  y += 16;

  // Helper for Section Titles
  const addSectionTitle = (title: string) => {
    checkPageBreak(14);
    y += 2;
    doc.setFillColor(15, 23, 42);
    doc.rect(margin, y - 3.5, 2.5, 4.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), margin + 5, y);

    y += 2;
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 4.5;
  };

  // ==========================
  // 2. PROFESSIONAL SUMMARY
  // ==========================
  addSectionTitle('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);

  const summary =
    profile.aboutMe ||
    'Performance & Planning Analyst and Data Analyst with over 5 years of multidisciplinary corporate experience across business operations, commercial analytics, and KPI governance at MultiChoice Group. Proven track record of transforming disparate transactional datasets into high-leverage Power BI dashboards, automated SQL models, and budget variance frameworks that accelerate executive decision-making cycles by 35%.';

  const summaryLines = doc.splitTextToSize(summary, contentWidth);
  checkPageBreak(summaryLines.length * 4.2 + 2);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4.2 + 3;

  // ==========================
  // 3. CORE COMPETENCIES
  // ==========================
  addSectionTitle('Core Competencies & Technical Stack');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);

  const skillsBlock = [
    {
      domain: 'Data & Analytics',
      items: 'SQL (DataCamp Certified), Advanced Excel (Power Query, DAX, Pivot Modeling, Variance Analysis), Data Cleaning, Exploratory Data Analysis (EDA)',
    },
    {
      domain: 'Business Intelligence',
      items: 'Microsoft Power BI, Looker Studio, Executive Dashboards, KPI Scorecards, Commercial Trend Analysis',
    },
    {
      domain: 'Performance & Planning',
      items: 'KPI Governance, Capacity Forecasting, Budget Variance Modeling, Operational Turnaround Optimization',
    },
    {
      domain: 'Cloud & AI Tooling',
      items: 'Google Workspace (Sheets, Docs, Slides, Drive), Google Apps Script Automation, Notion, Modern AI (ChatGPT, Claude, Gemini, Prompt Engineering)',
    },
  ];

  skillsBlock.forEach((block) => {
    checkPageBreak(6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`${block.domain}:`, margin, y);

    const domainWidth = doc.getTextWidth(`${block.domain}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);

    const itemsLines = doc.splitTextToSize(block.items, contentWidth - domainWidth - 2);
    doc.text(itemsLines[0], margin + domainWidth, y);

    if (itemsLines.length > 1) {
      for (let k = 1; k < itemsLines.length; k++) {
        y += 4;
        doc.text(itemsLines[k], margin + 6, y);
      }
    }
    y += 4.5;
  });
  y += 1;

  // ==========================
  // 4. PROFESSIONAL EXPERIENCE
  // ==========================
  addSectionTitle('Professional Work Experience');

  (experiences || []).forEach((exp) => {
    checkPageBreak(28);

    // Job Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(exp.jobTitle, margin, y);

    // Date Range (Right aligned badge)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    const dateRange = `${exp.startDate} – ${exp.endDate}`;
    doc.text(dateRange, pageWidth - margin, y, { align: 'right' });
    y += 4.2;

    // Company & Location
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(37, 99, 235); // blue-600
    doc.text(`${exp.organisation}  |  ${exp.location}`, margin, y);
    y += 4.5;

    // Bullets
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(51, 65, 85);

    const responsibilities = exp.responsibilities || [];
    responsibilities.forEach((resp) => {
      const respLines = doc.splitTextToSize(resp, contentWidth - 6);
      checkPageBreak(respLines.length * 3.8 + 1.5);
      drawBulletPoint(margin + 2, y + 1.2, 0.6);
      doc.text(respLines, margin + 5, y);
      y += respLines.length * 3.8 + 1.2;
    });

    // Key Achievements Callout
    if (exp.achievements && exp.achievements.length > 0) {
      exp.achievements.forEach((ach) => {
        const achLines = doc.splitTextToSize(`Key Metric / Impact: ${ach}`, contentWidth - 8);
        checkPageBreak(achLines.length * 3.8 + 3);

        doc.setFillColor(241, 245, 249); // slate-100
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.2);
        doc.roundedRect(margin + 4, y - 2.8, contentWidth - 6, achLines.length * 3.8 + 2.5, 1, 1, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(15, 23, 42);
        doc.text(achLines, margin + 6, y);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);

        y += achLines.length * 3.8 + 3.5;
      });
    }

    y += 2.5;
  });

  // ==========================
  // 5. COMMUNITY & SOCIAL IMPACT
  // ==========================
  addSectionTitle('Volunteering, Psychology & Social Impact');

  const volItems = volunteering || [
    {
      organisation: 'GamblePause Africa',
      role: 'Analyst & Psychologist',
      dates: '2023 – Present',
      description:
        'Operating across 3 African countries (Nigeria, Kenya, Ghana) and expanding. Led empirical research surveying 420 youth/students on gambling harm (71.1% participation, 40.6% academic disruption) and provide direct psychological counseling to clients.',
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
    checkPageBreak(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.8);
    doc.setTextColor(15, 23, 42);
    doc.text(`${v.organisation}  —  ${v.role}`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(v.dates || '', pageWidth - margin, y, { align: 'right' });
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(51, 65, 85);

    const descLines = doc.splitTextToSize(v.description, contentWidth - 4);
    checkPageBreak(descLines.length * 3.8);
    doc.text(descLines, margin + 2, y);
    y += descLines.length * 3.8 + 3;
  });

  // ==========================
  // 6. EDUCATION
  // ==========================
  addSectionTitle('Education');
  (education || []).forEach((edu) => {
    checkPageBreak(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`${edu.qualification}: ${edu.programme}`, margin, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`${edu.startDate} – ${edu.endDate}`, pageWidth - margin, y, { align: 'right' });
    y += 4;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(edu.institution, margin, y);
    y += 5;
  });

  // ==========================
  // 7. CERTIFICATIONS & CREDENTIALS
  // ==========================
  addSectionTitle('Certifications & Professional Credentials');
  (certifications || []).forEach((cert) => {
    checkPageBreak(6.5);
    drawBulletPoint(margin + 2, y + 1.2, 0.55);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(cert.name, margin + 5, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`${cert.issuer} (${cert.issueDate})`, pageWidth - margin, y, { align: 'right' });
    y += 4.5;
  });

  // ==========================
  // 8. UNIFORM PAGE FOOTERS
  // ==========================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.25);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Abiodun Ayodeji — Verified Curriculum Vitae  |  ayodejiharbiodun24@gmail.com  |  07054195682`,
      margin,
      pageHeight - 8
    );
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  }

  // Save the PDF
  doc.save('Abiodun_Ayodeji_CV.pdf');
};

/**
 * Generates an official PDF download for any document in the Document Centre
 */
export const generateDocumentPdf = (docItem: DocumentItem): void => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 14) {
      pdf.addPage();
      y = margin + 4;
    }
  };

  // Top Accent
  pdf.setFillColor(15, 23, 42);
  pdf.rect(margin, y, contentWidth, 2, 'F');
  y += 7;

  // Header Title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(15, 23, 42);
  const titleLines = pdf.splitTextToSize(docItem.name, contentWidth);
  pdf.text(titleLines, margin, y);
  y += titleLines.length * 6.5;

  // Metadata Card
  pdf.setFillColor(248, 250, 252);
  pdf.setDrawColor(226, 232, 240);
  pdf.setLineWidth(0.25);
  pdf.roundedRect(margin, y, contentWidth, 9, 1.5, 1.5, 'FD');

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(71, 85, 105);
  const metaText = `Category: ${docItem.category}  |  Version: ${docItem.currentVersion || '1.0'}  |  Verified: ${docItem.lastUpdated || '2026'}  |  Author: Abiodun Ayodeji`;
  pdf.text(metaText, margin + 4, y + 5.5);
  y += 14;

  // Description if present
  if (docItem.description) {
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(8.5);
    pdf.setTextColor(100, 116, 139);
    const descLines = pdf.splitTextToSize(docItem.description, contentWidth);
    checkPageBreak(descLines.length * 4.2);
    pdf.text(descLines, margin, y);
    y += descLines.length * 4.2 + 4;
  }

  // Document Content
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.8);
  pdf.setTextColor(51, 65, 85);

  const rawContent = docItem.content || `${docItem.name}\n\nOfficial verified document for Abiodun Ayodeji.\nEmail: ayodejiharbiodun24@gmail.com | Phone: 07054195682`;
  const lines = rawContent.split('\n');

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      y += 2.5;
      return;
    }

    // Skip divider decor
    if (trimmed.startsWith('===') || trimmed.startsWith('---')) {
      y += 2;
      return;
    }

    const isSectionHeader =
      trimmed === trimmed.toUpperCase() && trimmed.length > 3 && !trimmed.startsWith('•') && !trimmed.startsWith('-');

    if (isSectionHeader) {
      checkPageBreak(12);
      y += 3;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(15, 23, 42);
      pdf.text(trimmed, margin, y);
      y += 4.5;
      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.2);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 4;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.8);
      pdf.setTextColor(51, 65, 85);
      return;
    }

    const splitLine = pdf.splitTextToSize(line, contentWidth);
    checkPageBreak(splitLine.length * 4);
    pdf.text(splitLine, margin, y);
    y += splitLine.length * 4 + 0.8;
  });

  // Footer on all pages
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.25);
    pdf.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(148, 163, 184);
    pdf.text(
      `Abiodun Ayodeji Document Vault  |  ${docItem.fileName || docItem.name}`,
      margin,
      pageHeight - 8
    );
    pdf.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  }

  const safeFileName = docItem.fileName || `${docItem.name.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.pdf`;
  pdf.save(safeFileName.endsWith('.pdf') ? safeFileName : `${safeFileName}.pdf`);
};
