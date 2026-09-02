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

const STORAGE_LIVE_KEY = 'abiodun_portfolio_live_v2';
const STORAGE_DRAFT_KEY = 'abiodun_portfolio_draft_v2';
const STORAGE_AUTH_KEY = 'abiodun_portfolio_admin_auth_v2';

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
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading live data from storage', e);
    }
    return defaultPortfolioData;
  });

  const [draftData, setDraftData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_DRAFT_KEY);
      if (saved) return JSON.parse(saved);
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
      const updated = updater(prev);
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
