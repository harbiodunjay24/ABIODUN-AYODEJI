import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  ExperienceItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  EducationItem,
  DocumentItem,
  CoverLetterItem,
} from '../../types';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderGit2,
  Sparkles,
  GraduationCap,
  HeartHandshake,
  FileText,
  Settings,
  LogOut,
  Eye,
  CheckCircle2,
  Trash2,
  Plus,
  Edit,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Save,
  Check,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  FileBadge,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    draftData,
    liveData,
    isDraftDirty,
    adminUser,
    logoutAdmin,
    setActiveView,
    setPreviewMode,
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
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'profile'
    | 'experiences'
    | 'projects'
    | 'skills'
    | 'education'
    | 'volunteering'
    | 'documents'
    | 'settings'
  >('overview');

  const [savedNotice, setSavedNotice] = useState(false);

  const triggerDraftNotice = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  // Editing Modals State
  const [editingExp, setEditingExp] = useState<ExperienceItem | null>(null);
  const [isAddingExp, setIsAddingExp] = useState(false);

  const [editingProj, setEditingProj] = useState<ProjectItem | null>(null);
  const [isAddingProj, setIsAddingProj] = useState(false);

  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [isAddingCert, setIsAddingCert] = useState(false);

  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [isAddingEdu, setIsAddingEdu] = useState(false);

  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);
  const [isAddingDoc, setIsAddingDoc] = useState(false);

  // Sidebar Menu Items
  const sidebarItems = [
    { id: 'overview', label: 'Overview & Status', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile & Contact', icon: <User className="w-4 h-4" /> },
    { id: 'experiences', label: 'Experiences & Roles', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'projects', label: 'Case Studies & Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills & Toolkit', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'education', label: 'Education & Certs', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'volunteering', label: 'Volunteering & Impact', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'documents', label: 'Document Centre', icon: <FileText className="w-4 h-4" /> },
    { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#08090c] text-zinc-100 flex flex-col font-sans">
      
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0d0f14]/95 border-b border-zinc-900 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold text-xs font-mono">
            AA
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2 font-mono">
              <span>ADMINISTRATOR DOSSIER CMS</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.2 rounded-md">
                v2.5_ACTIVE
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              AUTHENTICATED: {adminUser?.name || 'Abiodun Ayodeji'}
            </div>
          </div>
        </div>

        {/* Global Publishing & Status Actions */}
        <div className="flex items-center gap-3">
          
          {isDraftDirty ? (
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>UNPUBLISHED STAGING DRAFT</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>LIVE DOSSIER SYNCHRONIZED</span>
            </div>
          )}

          {/* Preview Draft on Live Site */}
          <button
            onClick={() => {
              setPreviewMode(true);
              setActiveView('public');
            }}
            className="bg-zinc-950 hover:bg-zinc-900 text-zinc-200 border border-zinc-800 px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>PREVIEW DOSSIER</span>
          </button>

          {/* 1-Click Publish Live */}
          <button
            onClick={() => {
              publishDraft();
              triggerDraftNotice();
            }}
            disabled={!isDraftDirty}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-500 px-4 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>PUBLISH LIVE</span>
          </button>

          {/* Discard Draft if dirty */}
          {isDraftDirty && (
            <button
              onClick={() => {
                if (confirm('Discard staging changes and revert to live production snapshot?')) {
                  discardDraft();
                }
              }}
              className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-zinc-900 rounded-lg transition-colors border border-zinc-800"
              title="Discard Draft"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Logout */}
          <button
            onClick={logoutAdmin}
            title="Sign out of CMS"
            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 rounded-lg transition-colors border border-zinc-800"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Grid */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 shrink-0 space-y-1 bg-[#0d0f14] border border-zinc-800 p-3 rounded-3xl self-start">
          <div className="px-3 py-2 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
            DOSSIER MODULES
          </div>

          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 opacity-50 ${activeTab === item.id ? 'opacity-100' : ''}`} />
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-zinc-900 space-y-2">
            <button
              onClick={() => setActiveView('public')}
              className="w-full bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-800 py-2 rounded-xl text-xs font-mono flex items-center justify-center gap-2 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>RETURN TO PUBLIC SITE</span>
            </button>
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="flex-1 bg-[#0d0f14] border border-zinc-800 rounded-3xl p-6 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    CMS Overview & Publishing Status
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage your professional portfolio content without editing code. All edits are saved safely in your working draft.
                  </p>
                </div>
                <button
                  onClick={() => {
                    publishDraft();
                    triggerDraftNotice();
                  }}
                  disabled={!isDraftDirty}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-800 text-white disabled:text-zinc-500 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish All Draft Changes</span>
                </button>
              </div>

              {/* Stat Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-xs text-zinc-400">Total Roles</span>
                  <div className="text-2xl font-mono font-bold text-emerald-400 mt-1">
                    {draftData.experiences.length}
                  </div>
                </div>

                <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-xs text-zinc-400">Case Studies</span>
                  <div className="text-2xl font-mono font-bold text-teal-400 mt-1">
                    {draftData.projects.length}
                  </div>
                </div>

                <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-xs text-zinc-400">Skills Tagged</span>
                  <div className="text-2xl font-mono font-bold text-cyan-400 mt-1">
                    {draftData.skills.length}
                  </div>
                </div>

                <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800">
                  <span className="text-xs text-zinc-400">Documents</span>
                  <div className="text-2xl font-mono font-bold text-amber-400 mt-1">
                    {draftData.documents.length}
                  </div>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Quick Content Management
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="p-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                      Update Profile & Bio
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      Change headline, location, status, or bio text.
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('experiences')}
                    className="p-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                      Manage Work Experiences
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      Add achievements, edit responsibilities, or reorder roles.
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('projects')}
                    className="p-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 text-left transition-all group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                      Add / Edit Case Studies
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1">
                      Update metrics, SQL tools, DAX models, or challenges.
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-800">
                <h2 className="text-xl font-bold text-white">Profile & Contact Information</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Update your identity, core title, availability status, and bio narratives.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.fullName}
                    onChange={(e) => updateProfile({ fullName: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Professional Title *
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.professionalTitle}
                    onChange={(e) => updateProfile({ professionalTitle: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={draftData.profile.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.phone}
                    onChange={(e) => updateProfile({ phone: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.location}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Professional Status Pill
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.professionalStatus}
                    onChange={(e) => updateProfile({ professionalStatus: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Short Hero Introduction
                </label>
                <textarea
                  rows={2}
                  value={draftData.profile.shortIntroduction}
                  onChange={(e) => updateProfile({ shortIntroduction: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  About Me Statement (CV Grounded)
                </label>
                <textarea
                  rows={4}
                  value={draftData.profile.aboutMe}
                  onChange={(e) => updateProfile({ aboutMe: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.socialLinks.linkedin || ''}
                    onChange={(e) =>
                      updateProfile({
                        socialLinks: { ...draftData.profile.socialLinks, linkedin: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Profile Photo URL
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.profilePhoto || ''}
                    onChange={(e) => updateProfile({ profilePhoto: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300 flex items-center justify-between">
                <span>Changes are automatically saved to your active draft.</span>
                <button
                  onClick={() => {
                    publishDraft();
                    triggerDraftNotice();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  Publish Changes Now
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIENCES */}
          {activeTab === 'experiences' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h2 className="text-xl font-bold text-white">Experience & Career Roles</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Add, edit, reorder or delete roles and achievements.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingExp(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Role</span>
                </button>
              </div>

              {/* Roles List */}
              <div className="space-y-3">
                {draftData.experiences.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {exp.startDate} – {exp.endDate}
                        </span>
                        {exp.isCurrent && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                            Current
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white">{exp.jobTitle}</h4>
                      <div className="text-xs text-zinc-400">
                        {exp.organisation} • {exp.location}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => setEditingExp(exp)}
                        className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-xl border border-zinc-800 text-xs flex items-center gap-1 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete role "${exp.jobTitle}"?`)) {
                            deleteExperience(exp.id);
                          }
                        }}
                        className="p-2 bg-zinc-900 hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 rounded-xl border border-zinc-800 text-xs transition-colors"
                        title="Delete Role"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h2 className="text-xl font-bold text-white">Case Studies & Projects</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Update business challenges, technical tools, insights, and key metrics.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingProj(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {draftData.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="text-[10px] font-bold text-amber-300">★ Featured</span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                      <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                        {proj.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {proj.keyMetric?.value}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProj(proj)}
                          className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 rounded-lg text-xs font-semibold border border-zinc-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete project "${proj.title}"?`)) {
                              deleteProject(proj.id);
                            }
                          }}
                          className="p-1 text-zinc-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h2 className="text-xl font-bold text-white">Skills & Competencies</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Manage analytical tools, categories, and concrete proficiency tiers.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingSkill(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {draftData.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{skill.name}</div>
                      <div className="text-[10px] text-zinc-400 font-mono">
                        {skill.category} • {skill.proficiency}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Remove skill "${skill.name}"?`)) {
                          deleteSkill(skill.id);
                        }
                      }}
                      className="p-1 text-zinc-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: EDUCATION & CERTS */}
          {activeTab === 'education' && (
            <div className="space-y-8">
              <div className="pb-4 border-b border-zinc-800">
                <h2 className="text-xl font-bold text-white">Education & Certifications</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Update degree credentials, institutions, DataCamp certs, and verification links.
                </p>
              </div>

              {/* Education section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                    Education Degrees
                  </h3>
                  <button
                    onClick={() => setIsAddingEdu(true)}
                    className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Degree</span>
                  </button>
                </div>

                {draftData.education.map((edu) => (
                  <div key={edu.id} className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{edu.qualification} in {edu.programme}</div>
                      <div className="text-[11px] text-zinc-400">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Remove "${edu.programme}"?`)) deleteEducation(edu.id);
                      }}
                      className="p-1 text-zinc-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Certifications section */}
              <div className="space-y-3 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                    Professional Certifications
                  </h3>
                  <button
                    onClick={() => setIsAddingCert(true)}
                    className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Certification</span>
                  </button>
                </div>

                {draftData.certifications.map((cert) => (
                  <div key={cert.id} className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{cert.title}</div>
                      <div className="text-[11px] text-zinc-400">{cert.issuingOrganisation} • {cert.issueYear}</div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Remove cert "${cert.title}"?`)) deleteCertification(cert.id);
                      }}
                      className="p-1 text-zinc-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: VOLUNTEERING */}
          {activeTab === 'volunteering' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-800">
                <h2 className="text-xl font-bold text-white">Volunteering & Social Impact</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Update Gamble Pause Initiative statistics (420 respondents, 71.1%, 40.6%) and research pipeline.
                </p>
              </div>

              {draftData.volunteering[0] && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Organisation Name
                      </label>
                      <input
                        type="text"
                        value={draftData.volunteering[0].organisation}
                        onChange={(e) => updateVolunteering({ organisation: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Role Title
                      </label>
                      <input
                        type="text"
                        value={draftData.volunteering[0].role}
                        onChange={(e) => updateVolunteering({ role: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-zinc-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      Impact Description
                    </label>
                    <textarea
                      rows={4}
                      value={draftData.volunteering[0].description}
                      onChange={(e) => updateVolunteering({ description: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-100"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 8: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <h2 className="text-xl font-bold text-white">Document Centre Manager</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Upload, organize, and manage official downloadable assets and statements.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingDoc(true)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Document</span>
                </button>
              </div>

              <div className="space-y-3">
                {draftData.documents.map((doc) => {
                  const docDisplayName = doc.name || doc.fileName || 'Untitled Document';
                  return (
                    <div key={doc.id} className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {doc.category}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">{docDisplayName}</h4>
                        <p className="text-xs text-zinc-400">{doc.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete document "${docDisplayName}"?`)) deleteDocument(doc.id);
                        }}
                        className="p-1.5 text-zinc-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-800">
                <h2 className="text-xl font-bold text-white">Website Settings & Controls</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Configure site availability, SEO tags, and system resets.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <div>
                    <div className="text-xs font-bold text-white">Open to Opportunities Indicator</div>
                    <div className="text-[11px] text-zinc-400">Display active availability badge in hero section</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={draftData.settings.showAvailabilityBadge}
                    onChange={(e) => updateSettings({ showAvailabilityBadge: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                  <div>
                    <div className="text-xs font-bold text-white">Ask Abiodun AI Assistant</div>
                    <div className="text-[11px] text-zinc-400">Enable conversational recruiter assistant grounded in CV</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={draftData.settings.enableAiAssistant}
                    onChange={(e) => updateSettings({ enableAiAssistant: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500"
                  />
                </div>

                <div className="pt-6 border-t border-zinc-800">
                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-rose-300">Reset to Verified System Defaults</div>
                      <div className="text-[11px] text-rose-400/80">Re-populates all portfolio content from the verified CV baseline</div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all data back to the default verified CV values?')) {
                          resetToDefault();
                          alert('Reset complete.');
                        }
                      }}
                      className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                      Reset All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Adding/Editing Simple Modals */}
      {/* Add Experience Modal */}
      {isAddingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Add New Work Experience</h3>
            <div className="space-y-3">
              <input
                id="new-exp-title"
                type="text"
                placeholder="Job Title (e.g. Senior Data Analyst)"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
              />
              <input
                id="new-exp-org"
                type="text"
                placeholder="Organisation (e.g. MultiChoice)"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  id="new-exp-start"
                  type="text"
                  placeholder="Start (e.g. 2025)"
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
                />
                <input
                  id="new-exp-end"
                  type="text"
                  placeholder="End (e.g. Present)"
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
                />
              </div>
              <textarea
                id="new-exp-resp"
                rows={3}
                placeholder="Core Responsibility / Achievement"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddingExp(false)}
                className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const title = (document.getElementById('new-exp-title') as HTMLInputElement)?.value;
                  const org = (document.getElementById('new-exp-org') as HTMLInputElement)?.value;
                  const start = (document.getElementById('new-exp-start') as HTMLInputElement)?.value || '2025';
                  const end = (document.getElementById('new-exp-end') as HTMLInputElement)?.value || 'Present';
                  const resp = (document.getElementById('new-exp-resp') as HTMLTextAreaElement)?.value;
                  if (title && org) {
                    addExperience({
                      jobTitle: title,
                      organisation: org,
                      startDate: start,
                      endDate: end,
                      isCurrent: (end || '').toLowerCase().includes('present'),
                      location: 'Lagos, Nigeria',
                      responsibilities: [resp || 'Spearheaded analytical operations.'],
                      achievements: [],
                    });
                    setIsAddingExp(false);
                  }
                }}
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Save Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {isAddingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Add New Skill</h3>
            <div className="space-y-3">
              <input
                id="new-skill-name"
                type="text"
                placeholder="Skill name (e.g. Python for Data)"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
              />
              <select
                id="new-skill-category"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
              >
                <option value="Data Analysis">Data Analysis</option>
                <option value="Business Intelligence">Business Intelligence</option>
                <option value="Business Performance">Business Performance</option>
                <option value="AI & Automation">AI & Automation</option>
              </select>
              <select
                id="new-skill-level"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
              >
                <option value="Advanced">Advanced</option>
                <option value="Proficient">Proficient</option>
                <option value="Working Knowledge">Working Knowledge</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddingSkill(false)}
                className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const name = (document.getElementById('new-skill-name') as HTMLInputElement)?.value;
                  const cat = (document.getElementById('new-skill-category') as HTMLSelectElement)?.value as any;
                  const lvl = (document.getElementById('new-skill-level') as HTMLSelectElement)?.value as any;
                  if (name) {
                    addSkill({ name, category: cat, proficiency: lvl });
                    setIsAddingSkill(false);
                  }
                }}
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Case Study Modal */}
      {isAddingProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Add New Case Study</h3>
            <div className="space-y-3">
              <input
                id="new-proj-title"
                type="text"
                placeholder="Project Title"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
              />
              <input
                id="new-proj-desc"
                type="text"
                placeholder="Short Description"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  id="new-proj-tools"
                  type="text"
                  placeholder="Tools (comma separated, e.g. SQL, Power BI)"
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
                />
                <input
                  id="new-proj-metric"
                  type="text"
                  placeholder="Key Metric (e.g. +45% Growth)"
                  className="bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddingProj(false)}
                className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const title = (document.getElementById('new-proj-title') as HTMLInputElement)?.value;
                  const desc = (document.getElementById('new-proj-desc') as HTMLInputElement)?.value;
                  const tools = (document.getElementById('new-proj-tools') as HTMLInputElement)?.value || 'SQL, Power BI';
                  const metric = (document.getElementById('new-proj-metric') as HTMLInputElement)?.value || 'Verified';
                  if (title) {
                    addProject({
                      title,
                      shortDescription: desc || 'Analytical project case study.',
                      category: 'Data Analytics',
                      featured: true,
                      tools: tools.split(',').map((t) => t.trim()),
                      businessProblem: 'Streamlining reporting workflows.',
                      approach: 'Engineered automated data pipelines.',
                      outcome: 'Accelerated insight delivery.',
                      keyMetric: { value: metric, label: 'Realized Impact' },
                    });
                    setIsAddingProj(false);
                  }
                }}
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Document Modal */}
      {isAddingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Add Document Asset</h3>
            <div className="space-y-3">
              <input
                id="new-doc-title"
                type="text"
                placeholder="Document Title (e.g. Executive Summary)"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
              />
              <select
                id="new-doc-cat"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
              >
                <option value="CV">CV / Resume</option>
                <option value="Cover Letter">Cover Letter</option>
                <option value="Research">Research Report</option>
                <option value="Certificate">Certificate</option>
              </select>
              <textarea
                id="new-doc-desc"
                rows={2}
                placeholder="Brief summary or description"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-zinc-100"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddingDoc(false)}
                className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const title = (document.getElementById('new-doc-title') as HTMLInputElement)?.value;
                  const cat = (document.getElementById('new-doc-cat') as HTMLSelectElement)?.value as any;
                  const desc = (document.getElementById('new-doc-desc') as HTMLTextAreaElement)?.value;
                  if (title) {
                    addDocument({
                      name: title,
                      fileName: `${(title || 'document').toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`,
                      category: cat,
                      description: desc || 'Official document resource.',
                      isPublic: true,
                      isFeatured: false,
                      source: 'Manual Link',
                      currentVersion: '1.0',
                      fileType: 'PDF Document',
                      versionHistory: [],
                    });
                    setIsAddingDoc(false);
                  }
                }}
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Add Document
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
