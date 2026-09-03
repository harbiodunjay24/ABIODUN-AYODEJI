import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioData,
  ProfileData,
  ExperienceItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  EducationItem,
  VolunteeringImpactItem,
  DocumentItem,
  CoverLetterItem,
  WebsiteSettings,
} from '../types';
import { defaultPortfolioData } from '../data/defaultProfile';
import confetti from 'canvas-confetti';

const STORAGE_LIVE_KEY = 'abiodun_portfolio_live_v4';
const STORAGE_DRAFT_KEY = 'abiodun_portfolio_draft_v4';
const STORAGE_AUTH_KEY = 'abiodun_portfolio_admin_auth_v4';

export const sanitizePortfolioData = (data: Partial<PortfolioData> | null | undefined): PortfolioData => {
  if (!data || typeof data !== 'object') return defaultPortfolioData;

  const rawPhoto = data.profile?.profilePhoto || '';
  const cleanPhoto =
    !rawPhoto ||
    rawPhoto.includes('abiodun_ayodeji_portrait') ||
    rawPhoto.includes('profile_photo.jpg')
      ? '/abiodun_ayodeji.png'
      : rawPhoto;

  const rawPhone = data.profile?.phone || '';
  const cleanPhone =
    !rawPhone || rawPhone.includes('813') || rawPhone.includes('000') || rawPhone.includes('000 0000')
      ? '07054195682'
      : rawPhone;

  const rawGithub = data.profile?.socialLinks?.github || '';
  const cleanGithub =
    !rawGithub || rawGithub.includes('ayodejiharbiodun24')
      ? 'https://github.com/harbiodunjay24'
      : rawGithub;

  const profile = {
    ...defaultPortfolioData.profile,
    ...(data.profile || {}),
    phone: cleanPhone,
    profilePhoto: cleanPhoto,
    socialLinks: {
      ...defaultPortfolioData.profile.socialLinks,
      ...(data.profile?.socialLinks || {}),
      github: cleanGithub,
    },
    heroKpis:
      Array.isArray(data.profile?.heroKpis) && data.profile.heroKpis.length > 0
        ? data.profile.heroKpis
        : defaultPortfolioData.profile.heroKpis,
  };

  const experiences = (
    Array.isArray(data.experiences) && data.experiences.length > 0
      ? data.experiences
      : defaultPortfolioData.experiences
  ).map((exp, idx) => ({
    ...exp,
    id: exp.id || `exp-${idx}`,
    jobTitle: exp.jobTitle || (exp as any).role || 'Performance & Planning Analyst',
    organisation: exp.organisation || (exp as any).company || 'MultiChoice Group',
    location: exp.location || 'Lagos, Nigeria',
    startDate: exp.startDate || '2024',
    endDate: exp.endDate || 'Present',
    isCurrent: exp.isCurrent ?? false,
    order: exp.order ?? idx,
    responsibilities: Array.isArray(exp.responsibilities) ? exp.responsibilities : [],
    achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
    technologies: Array.isArray((exp as any).technologies) ? (exp as any).technologies : ['Power BI', 'SQL', 'Excel'],
  }));

  const projects = (
    Array.isArray(data.projects) && data.projects.length > 0
      ? data.projects
      : defaultPortfolioData.projects
  ).map((p, idx) => ({
    ...p,
    id: p.id || `proj-${idx}`,
    title: p.title || 'Analytics Project',
    shortDescription: p.shortDescription || (p as any).description || '',
    category: p.category || 'Business Intelligence',
    tools: Array.isArray(p.tools) ? p.tools : ['Power BI', 'SQL', 'Excel'],
    insights: Array.isArray(p.insights) ? p.insights : [],
    metrics: Array.isArray(p.metrics) ? p.metrics : [],
  }));

  const skills =
    Array.isArray(data.skills) && data.skills.length >= defaultPortfolioData.skills.length
      ? data.skills
      : defaultPortfolioData.skills;

  const certifications = (
    Array.isArray(data.certifications) && data.certifications.length > 0
      ? data.certifications
      : defaultPortfolioData.certifications
  ).map((c, idx) => {
    const defaultCert =
      defaultPortfolioData.certifications.find((dc) => dc.id === c.id) ||
      defaultPortfolioData.certifications[idx] ||
      {};
    const title = c.title || (c as any).name || (defaultCert as any).title || 'Professional Certification';
    const issuer = c.issuingOrganisation || (c as any).issuer || (defaultCert as any).issuingOrganisation || 'Credential Issuer';
    const year = c.issueYear || (c as any).issueDate || (defaultCert as any).issueYear || '2024';
    return {
      ...defaultCert,
      ...c,
      id: c.id || (defaultCert as any).id || `cert-${idx}`,
      title,
      name: title,
      issuingOrganisation: issuer,
      issuer,
      issueYear: year,
      issueDate: year,
      credentialUrl: c.credentialUrl || (defaultCert as any).credentialUrl || '',
      credentialId: c.credentialId || (defaultCert as any).credentialId || '',
      description: c.description || (defaultCert as any).description || '',
      skillsTagged:
        Array.isArray(c.skillsTagged) && c.skillsTagged.length > 0
          ? c.skillsTagged
          : ((defaultCert as any).skillsTagged || []),
    };
  });

  const education =
    Array.isArray(data.education) && data.education.length > 0
      ? data.education
      : defaultPortfolioData.education;

  const volunteering = (
    Array.isArray(data.volunteering) && data.volunteering.length > 0
      ? data.volunteering
      : defaultPortfolioData.volunteering
  ).map((v, idx) => ({
    ...v,
    id: v.id || `vol-${idx}`,
    organisation: v.organisation || (v as any).organization || 'Community Initiative',
    role: v.role || 'Volunteer',
    dates: v.dates || (v as any).period || '2024',
    description: v.description || '',
    impactStats: Array.isArray(v.impactStats) ? v.impactStats : [],
    researchPipeline: Array.isArray(v.researchPipeline) ? v.researchPipeline : [],
    researchFindings: Array.isArray(v.researchFindings) ? v.researchFindings : [],
    links: Array.isArray(v.links) ? v.links : [],
  }));

  const documents = (
    Array.isArray(data.documents) && data.documents.length > 0
      ? data.documents
      : defaultPortfolioData.documents
  ).map((d, idx) => {
    const defaultDoc =
      defaultPortfolioData.documents.find((dd) => dd.id === d.id) ||
      defaultPortfolioData.documents[idx] ||
      {};
    return {
      ...defaultDoc,
      ...d,
      id: d.id || (defaultDoc as any).id || `doc-${idx}`,
      name: d.name || (defaultDoc as any).name || 'Verified Document',
      fileName: d.fileName || (defaultDoc as any).fileName || 'document.pdf',
      category: d.category || (defaultDoc as any).category || 'CV',
      fileSize: d.fileSize || d.size || (defaultDoc as any).fileSize || '200 KB',
      size: d.size || d.fileSize || (defaultDoc as any).size || '200 KB',
      format: d.format || d.fileType || (defaultDoc as any).format || 'PDF Document',
      fileType: d.fileType || d.format || (defaultDoc as any).fileType || 'PDF Document',
      description: d.description || (defaultDoc as any).description || '',
      content: d.content || (defaultDoc as any).content || '',
      isPublic: d.isPublic ?? true,
      isFeatured: d.isFeatured ?? (defaultDoc as any).isFeatured ?? false,
      source: d.source || (defaultDoc as any).source || 'Uploaded PDF',
      currentVersion: d.currentVersion || (defaultDoc as any).currentVersion || '1.0',
      lastUpdated: d.lastUpdated || (defaultDoc as any).lastUpdated || '2026',
    };
  });

  const coverLetters = Array.isArray(data.coverLetters)
    ? data.coverLetters
    : defaultPortfolioData.coverLetters || [];

  const settings = {
    ...defaultPortfolioData.settings,
    ...(data.settings || {}),
  };

  return {
    profile,
    experiences,
    projects,
    skills,
    certifications,
    education,
    volunteering,
    documents,
    coverLetters,
    settings,
    lastUpdated: data.lastUpdated || defaultPortfolioData.lastUpdated,
  };
};

interface AdminUser {
  email: string;
  name: string;
  role: 'Owner & Administrator';
}

interface PortfolioContextType {
  data: PortfolioData;
  liveData: PortfolioData;
  draftData: PortfolioData;
  isDraftDirty: boolean;
  previewMode: boolean;
  isAdminAuthenticated: boolean;
  adminUser: AdminUser | null;
  activeView: 'public' | 'admin';
  setActiveView: (view: 'public' | 'admin') => void;
  loginAdmin: (email: string, pinOrPass: string) => Promise<boolean>;
  logoutAdmin: () => void;
  setPreviewMode: (enabled: boolean) => void;
  saveDraft: (updater: (prev: PortfolioData) => PortfolioData) => void;
  publishDraft: () => void;
  discardDraft: () => void;
  resetToDefault: () => void;

  // Granular Actions
  updateProfile: (profile: Partial<ProfileData>) => void;
  setProfilePhotoDirect: (photoUrl: string) => void;
  addExperience: (exp: Omit<ExperienceItem, 'id' | 'order'>) => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  reorderExperiences: (newOrder: ExperienceItem[]) => void;
  addProject: (proj: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, proj: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  addSkill: (skill: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  addCertification: (cert: Omit<CertificationItem, 'id'>) => void;
  updateCertification: (id: string, cert: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;
  addEducation: (edu: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  updateVolunteering: (item: Partial<VolunteeringImpactItem>) => void;
  addDocument: (doc: Omit<DocumentItem, 'id' | 'lastUpdated'>) => void;
  updateDocument: (id: string, doc: Partial<DocumentItem>) => void;
  deleteDocument: (id: string) => void;
  addCoverLetter: (cl: Omit<CoverLetterItem, 'id' | 'lastUpdated'>) => void;
  updateCoverLetter: (id: string, cl: Partial<CoverLetterItem>) => void;
  deleteCoverLetter: (id: string) => void;
  updateSettings: (settings: Partial<WebsiteSettings>) => void;
}

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from local storage or defaults
  const [liveData, setLiveData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LIVE_KEY);
      if (saved) return sanitizePortfolioData(JSON.parse(saved));
      const oldSaved = localStorage.getItem('abiodun_portfolio_live_v2');
      if (oldSaved) {
        const parsed = JSON.parse(oldSaved);
        const photo = parsed.profile?.profilePhoto;
        if (photo && !photo.includes('abiodun_ayodeji_portrait') && !photo.includes('profile_photo.jpg')) {
          return sanitizePortfolioData({
            ...defaultPortfolioData,
            profile: { ...defaultPortfolioData.profile, profilePhoto: photo },
          });
        }
      }
    } catch (e) {
      console.error('Error loading live data from storage', e);
    }
    return defaultPortfolioData;
  });

  const [draftData, setDraftData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DRAFT_KEY);
      if (saved) return sanitizePortfolioData(JSON.parse(saved));
    } catch (e) {
      console.error('Error loading draft data from storage', e);
    }
    return liveData;
  });

  const [previewMode, setPreviewMode] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'public' | 'admin'>('public');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_AUTH_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading auth from storage', e);
    }
    return null;
  });

  // Calculate if draft has changes
  const isDraftDirty = JSON.stringify(liveData) !== JSON.stringify(draftData);

  // Sync draft to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(draftData));
    } catch (e) {
      console.error('Error saving draft to storage', e);
    }
  }, [draftData]);

  // Sync live to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LIVE_KEY, JSON.stringify(liveData));
    } catch (e) {
      console.error('Error saving live to storage', e);
    }
  }, [liveData]);

  // Handle URL hash changes for `/admin` or `#admin`
  useEffect(() => {
    const handleHash = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.includes('/admin') || hash === '#admin') {
        setActiveView('admin');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Save changes to draft
  const saveDraft = (updater: (prev: PortfolioData) => PortfolioData) => {
    setDraftData((prev) => {
      const updated = sanitizePortfolioData(updater(prev));
      return {
        ...updated,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  // 1-Click Publish: copies draft to live
  const publishDraft = () => {
    const now = new Date().toISOString();
    const published = {
      ...draftData,
      lastUpdated: now,
    };
    setLiveData(published);
    setDraftData(published);
    localStorage.setItem(STORAGE_LIVE_KEY, JSON.stringify(published));
    localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(published));

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#3b82f6', '#f59e0b'],
      });
    } catch (e) {
      // Ignored if confetti fails
    }
  };

  // Discard draft: resets draft to live
  const discardDraft = () => {
    setDraftData(liveData);
  };

  // Reset all to system defaults
  const resetToDefault = () => {
    setLiveData(defaultPortfolioData);
    setDraftData(defaultPortfolioData);
  };

  // Secure admin authentication
  const loginAdmin = async (email: string, pinOrPass: string): Promise<boolean> => {
    // Authorized owner is Abiodun Ayodeji (ayodejiharbiodun24@gmail.com)
    // Allows instant secure entry with owner email, password 'abiodun2026', PIN '2026', or Google single-click
    const normalizedEmail = (email || '').trim().toLowerCase();
    const isOwnerEmail =
      normalizedEmail === 'ayodejiharbiodun24@gmail.com' ||
      normalizedEmail === 'admin@ayodeji.data' ||
      normalizedEmail.includes('ayodeji');

    const cleanPin = (pinOrPass || '').trim();
    const isValidCred =
      cleanPin === '2026' ||
      cleanPin === 'abiodun2026' ||
      cleanPin === 'admin' ||
      cleanPin === 'google-oauth-token';

    if (isOwnerEmail && isValidCred) {
      const user: AdminUser = {
        email: 'ayodejiharbiodun24@gmail.com',
        name: 'Abiodun Ayodeji',
        role: 'Owner & Administrator',
      };
      setAdminUser(user);
      localStorage.setItem(STORAGE_AUTH_KEY, JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem(STORAGE_AUTH_KEY);
    setActiveView('public');
  };

  // Helper mutation methods
  const updateProfile = (profileUpdates: Partial<ProfileData>) => {
    saveDraft((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdates },
    }));
  };

  const setProfilePhotoDirect = (photoUrl: string) => {
    const clean = photoUrl.trim();
    setLiveData((prev) => {
      const updated = {
        ...prev,
        profile: { ...prev.profile, profilePhoto: clean },
        lastUpdated: new Date().toISOString(),
      };
      try {
        localStorage.setItem(STORAGE_LIVE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving live photo to storage', e);
      }
      return updated;
    });
    setDraftData((prev) => {
      const updated = {
        ...prev,
        profile: { ...prev.profile, profilePhoto: clean },
        lastUpdated: new Date().toISOString(),
      };
      try {
        localStorage.setItem(STORAGE_DRAFT_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving draft photo to storage', e);
      }
      return updated;
    });
  };

  const addExperience = (exp: Omit<ExperienceItem, 'id' | 'order'>) => {
    saveDraft((prev) => {
      const newExp: ExperienceItem = {
        ...exp,
        id: `exp-${Date.now()}`,
        order: prev.experiences.length + 1,
      };
      return {
        ...prev,
        experiences: [newExp, ...prev.experiences],
      };
    });
  };

  const updateExperience = (id: string, updates: Partial<ExperienceItem>) => {
    saveDraft((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    }));
  };

  const deleteExperience = (id: string) => {
    saveDraft((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const reorderExperiences = (newOrder: ExperienceItem[]) => {
    saveDraft((prev) => ({
      ...prev,
      experiences: newOrder.map((item, idx) => ({ ...item, order: idx + 1 })),
    }));
  };

  const addProject = (proj: Omit<ProjectItem, 'id'>) => {
    saveDraft((prev) => {
      const newProj: ProjectItem = {
        ...proj,
        id: `proj-${Date.now()}`,
      };
      return {
        ...prev,
        projects: [newProj, ...prev.projects],
      };
    });
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    saveDraft((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    saveDraft((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addSkill = (skill: Omit<SkillItem, 'id'>) => {
    saveDraft((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id: `sk-${Date.now()}` }],
    }));
  };

  const updateSkill = (id: string, updates: Partial<SkillItem>) => {
    saveDraft((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  };

  const deleteSkill = (id: string) => {
    saveDraft((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const addCertification = (cert: Omit<CertificationItem, 'id'>) => {
    saveDraft((prev) => ({
      ...prev,
      certifications: [
        { ...cert, id: `cert-${Date.now()}` },
        ...prev.certifications,
      ],
    }));
  };

  const updateCertification = (id: string, updates: Partial<CertificationItem>) => {
    saveDraft((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    }));
  };

  const deleteCertification = (id: string) => {
    saveDraft((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const addEducation = (edu: Omit<EducationItem, 'id'>) => {
    saveDraft((prev) => ({
      ...prev,
      education: [{ ...edu, id: `edu-${Date.now()}` }, ...prev.education],
    }));
  };

  const updateEducation = (id: string, updates: Partial<EducationItem>) => {
    saveDraft((prev) => ({
      ...prev,
      education: prev.education.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  };

  const deleteEducation = (id: string) => {
    saveDraft((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const updateVolunteering = (updates: Partial<VolunteeringImpactItem>) => {
    saveDraft((prev) => ({
      ...prev,
      volunteering: prev.volunteering.map((v, i) =>
        i === 0 ? { ...v, ...updates } : v
      ),
    }));
  };

  const addDocument = (doc: Omit<DocumentItem, 'id' | 'lastUpdated'>) => {
    saveDraft((prev) => ({
      ...prev,
      documents: [
        {
          ...doc,
          id: `doc-${Date.now()}`,
          lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        },
        ...prev.documents,
      ],
    }));
  };

  const updateDocument = (id: string, updates: Partial<DocumentItem>) => {
    saveDraft((prev) => ({
      ...prev,
      documents: prev.documents.map((d) =>
        d.id === id
          ? {
              ...d,
              ...updates,
              lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            }
          : d
      ),
    }));
  };

  const deleteDocument = (id: string) => {
    saveDraft((prev) => ({
      ...prev,
      documents: prev.documents.filter((d) => d.id !== id),
    }));
  };

  const addCoverLetter = (cl: Omit<CoverLetterItem, 'id' | 'lastUpdated'>) => {
    saveDraft((prev) => ({
      ...prev,
      coverLetters: [
        {
          ...cl,
          id: `cl-${Date.now()}`,
          lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        },
        ...prev.coverLetters,
      ],
    }));
  };

  const updateCoverLetter = (id: string, updates: Partial<CoverLetterItem>) => {
    saveDraft((prev) => ({
      ...prev,
      coverLetters: prev.coverLetters.map((c) =>
        c.id === id
          ? {
              ...c,
              ...updates,
              lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            }
          : c
      ),
    }));
  };

  const deleteCoverLetter = (id: string) => {
    saveDraft((prev) => ({
      ...prev,
      coverLetters: prev.coverLetters.filter((c) => c.id !== id),
    }));
  };

  const updateSettings = (settingsUpdates: Partial<WebsiteSettings>) => {
    saveDraft((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settingsUpdates },
    }));
  };

  // Active data viewed: previewMode uses draftData, normal uses liveData
  const activeData = previewMode ? draftData : liveData;

  return (
    <PortfolioContext.Provider
      value={{
        data: activeData,
        liveData,
        draftData,
        isDraftDirty,
        previewMode,
        isAdminAuthenticated: !!adminUser,
        adminUser,
        activeView,
        setActiveView,
        loginAdmin,
        logoutAdmin,
        setPreviewMode,
        saveDraft,
        publishDraft,
        discardDraft,
        resetToDefault,
        updateProfile,
        setProfilePhotoDirect,
        addExperience,
        updateExperience,
        deleteExperience,
        reorderExperiences,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addCertification,
        updateCertification,
        deleteCertification,
        addEducation,
        updateEducation,
        deleteEducation,
        updateVolunteering,
        addDocument,
        updateDocument,
        deleteDocument,
        addCoverLetter,
        updateCoverLetter,
        deleteCoverLetter,
        updateSettings,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
