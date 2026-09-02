export type SkillProficiency = 'Advanced' | 'Proficient' | 'Working Knowledge';

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  email?: string;
  googleDrive?: string;
}

export interface ProfileData {
  fullName: string;
  professionalTitle: string;
  shortIntroduction: string;
  aboutMe: string;
  detailedBio: string[];
  profilePhoto: string;
  location: string;
  email: string;
  phone: string;
  professionalStatus: string;
  socialLinks: SocialLinks;
  heroKpis: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  organisation: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  order: number;
  responsibilities: string[];
  achievements: string[];
  highlightKpi?: {
    value: string;
    metric: string;
    context: string;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  category: 'Business Intelligence' | 'Data Analytics' | 'Research & Social Impact' | 'Automation';
  tools: string[];
  featured: boolean;
  businessProblem: string;
  approach: string;
  insights: string[];
  outcome: string;
  liveUrl?: string;
  githubUrl?: string;
  thumbnailUrl?: string;
  keyMetric?: {
    value: string;
    label: string;
  };
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Data Analysis' | 'Business Intelligence' | 'Business Performance' | 'AI & Automation' | 'Other Capabilities';
  proficiency: SkillProficiency;
  featured?: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuingOrganisation: string;
  issueYear: string;
  credentialUrl?: string;
  skillsTagged: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  qualification: string;
  programme: string;
  startDate: string;
  endDate: string;
  expectedGraduation?: string;
  honours?: string;
  location: string;
}

export interface VolunteeringImpactItem {
  id: string;
  organisation: string;
  role: string;
  dates: string;
  description: string;
  impactStats: {
    value: string;
    label: string;
    detail: string;
  }[];
  researchPipeline: {
    step: string;
    title: string;
    description: string;
  }[];
  researchFindings: string[];
  links: {
    label: string;
    url: string;
  }[];
}

export type DocumentCategory =
  | 'CV'
  | 'Resume'
  | 'Cover Letter'
  | 'Proposal'
  | 'Research'
  | 'Certificates'
  | 'Reports'
  | 'Portfolio'
  | 'Other';

export interface DocumentVersion {
  versionNumber: string;
  date: string;
  notes?: string;
  fileUrl?: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  fileName: string;
  category: DocumentCategory;
  description: string;
  isPublic: boolean;
  isFeatured: boolean;
  source: 'Google Drive' | 'Direct Upload' | 'Manual Link';
  externalUrl?: string;
  currentVersion: string;
  lastUpdated: string;
  versionHistory: DocumentVersion[];
  fileSize?: string;
  fileType?: string;
}

export interface CoverLetterItem {
  id: string;
  title: string;
  targetTrack: 'Data Analyst' | 'Business Intelligence' | 'Performance Analyst' | 'General Professional';
  description: string;
  content: string;
  status: 'published' | 'draft';
  isPublic: boolean;
  lastUpdated: string;
}

export interface WebsiteSettings {
  siteTitle: string;
  professionalHeadline: string;
  accentColor: 'emerald' | 'cyan' | 'blue' | 'amber' | 'indigo';
  availabilityStatus: string;
  seoDescription: string;
  contactEmail: string;
  contactPhone: string;
  openGraphImage?: string;
  favicon?: string;
}

export interface PortfolioData {
  profile: ProfileData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  education: EducationItem[];
  volunteering: VolunteeringImpactItem[];
  documents: DocumentItem[];
  coverLetters: CoverLetterItem[];
  settings: WebsiteSettings;
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
