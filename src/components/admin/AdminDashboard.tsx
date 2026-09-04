import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  ExperienceItem,
  ProjectItem,
  SkillItem,
  CertificationItem,
  EducationItem,
  DocumentItem,
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
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  Check,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Mail,
  MessageSquare,
  RefreshCw,
} from 'lucide-react';
import { formatDirectImageUrl } from '../PhotoModal';

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
    updateSettings,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'profile'
    | 'inquiries'
    | 'experiences'
    | 'projects'
    | 'skills'
    | 'education'
    | 'volunteering'
    | 'documents'
    | 'settings'
  >('overview');

  interface ContactInquiry {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
  }

  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to load inquiries:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Remove this message from inquiry records?')) return;
    try {
      await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      setInquiries((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const [savedNotice, setSavedNotice] = useState(false);
  const photoFileInputRef = useRef<HTMLInputElement | null>(null);
  const cvFileInputRef = useRef<HTMLInputElement | null>(null);
  const docFileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerDraftNotice = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  // Modals
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [isAddingProj, setIsAddingProj] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingCert, setIsAddingCert] = useState(false);
  const [isAddingEdu, setIsAddingEdu] = useState(false);
  const [isAddingDoc, setIsAddingDoc] = useState(false);

  // File Upload Handlers
  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        updateProfile({ profilePhoto: result });
        triggerDraftNotice();
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCvFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const fileSizeKb = Math.round(file.size / 1024);
      const sizeStr = fileSizeKb > 1024 ? `${(fileSizeKb / 1024).toFixed(1)} MB` : `${fileSizeKb} KB`;

      // Check if CV already exists in documents list
      const existingCv = draftData.documents.find(
        (d) => d.category === 'CV' || d.name.toLowerCase().includes('cv') || d.name.toLowerCase().includes('resume')
      );

      if (existingCv) {
        updateDocument(existingCv.id, {
          name: 'Official Curriculum Vitae (CV)',
          fileName: file.name,
          category: 'CV',
          size: sizeStr,
          format: file.name.split('.').pop()?.toUpperCase() || 'PDF',
          fileUrl: result,
          lastUpdated: new Date().toISOString().split('T')[0],
        });
      } else {
        addDocument({
          name: 'Official Curriculum Vitae (CV)',
          fileName: file.name,
          category: 'CV',
          format: file.name.split('.').pop()?.toUpperCase() || 'PDF',
          size: sizeStr,
          fileUrl: result,
          description: 'Primary verified executive CV and resume dossier.',
          isPublic: true,
          isFeatured: true,
          source: 'Uploaded from Admin',
          currentVersion: '2.0',
          fileType: 'Document',
          versionHistory: [],
        });
      }

      triggerDraftNotice();
      alert(`Successfully uploaded "${file.name}"! Click "Publish Live" to make it live.`);
    };

    reader.readAsDataURL(file);
  };

  const handleDocAssetUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const fileSizeKb = Math.round(file.size / 1024);
      const sizeStr = fileSizeKb > 1024 ? `${(fileSizeKb / 1024).toFixed(1)} MB` : `${fileSizeKb} KB`;

      addDocument({
        name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        fileName: file.name,
        category: 'Research',
        format: file.name.split('.').pop()?.toUpperCase() || 'PDF',
        size: sizeStr,
        fileUrl: result,
        description: 'Uploaded professional document asset.',
        isPublic: true,
        isFeatured: false,
        source: 'Admin Upload',
        currentVersion: '1.0',
        fileType: 'Document',
        versionHistory: [],
      });

      triggerDraftNotice();
    };

    reader.readAsDataURL(file);
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview & Status', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'inquiries', label: `Inquiries & Messages (${inquiries.length})`, icon: <Mail className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile & Picture', icon: <User className="w-4 h-4" /> },
    { id: 'documents', label: 'CV & Documents', icon: <FileText className="w-4 h-4" /> },
    { id: 'experiences', label: 'Experiences & Roles', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'projects', label: 'Case Studies & Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills & Toolkit', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'education', label: 'Education & Certs', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'volunteering', label: 'Community & Impact', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex flex-col font-sans">
      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-zinc-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-semibold text-xs">
            AA
          </div>
          <div>
            <div className="text-xs font-semibold text-zinc-900 flex items-center gap-2">
              <span>Admin Panel</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                Active
              </span>
            </div>
            <div className="text-[11px] text-zinc-500">
              Logged in as {adminUser?.email || 'ayodejiharbiodun24@gmail.com'}
            </div>
          </div>
        </div>

        {/* Global Publishing & Status Actions */}
        <div className="flex items-center gap-2.5">
          {savedNotice && (
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1 font-medium animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Draft updated</span>
            </span>
          )}

          {isDraftDirty && !savedNotice && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              <span>Unpublished changes</span>
            </span>
          )}

          {/* Preview Draft on Live Site */}
          <button
            onClick={() => {
              setPreviewMode(true);
              setActiveView('public');
            }}
            className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* 1-Click Publish Live */}
          <button
            onClick={() => {
              publishDraft();
              triggerDraftNotice();
            }}
            disabled={!isDraftDirty}
            className="bg-zinc-900 hover:bg-black disabled:bg-zinc-200 text-white disabled:text-zinc-400 px-3.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>

          {/* Discard Draft */}
          {isDraftDirty && (
            <button
              onClick={() => {
                if (confirm('Discard unpublished changes and revert to live snapshot?')) {
                  discardDraft();
                }
              }}
              className="p-1.5 text-zinc-500 hover:text-red-600 hover:bg-zinc-100 rounded-md transition-colors"
              title="Discard draft changes"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Logout */}
          <button
            onClick={logoutAdmin}
            title="Sign out"
            className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Grid */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-60 shrink-0 space-y-1 bg-white border border-zinc-200 p-3 rounded-xl self-start shadow-xs">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            Navigation
          </div>

          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-zinc-900 text-white shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 opacity-40 ${activeTab === item.id ? 'opacity-100' : ''}`} />
            </button>
          ))}

          <div className="pt-3 mt-3 border-t border-zinc-200">
            <button
              onClick={() => setActiveView('public')}
              className="w-full bg-[#FAFAFA] hover:bg-zinc-100 text-zinc-700 border border-zinc-200 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-zinc-500" />
              <span>Back to Website</span>
            </button>
          </div>
        </aside>

        {/* Content Workspace */}
        <main className="flex-1 bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 shadow-xs overflow-y-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">
                    Content Management Overview
                  </h2>
                  <p className="text-xs text-zinc-500 mt-1">
                    Manage your portfolio content, upload documents and CV, or change your profile picture.
                  </p>
                </div>
                <button
                  onClick={() => {
                    publishDraft();
                    triggerDraftNotice();
                  }}
                  disabled={!isDraftDirty}
                  className="bg-zinc-900 hover:bg-black disabled:bg-zinc-200 text-white disabled:text-zinc-400 px-4 py-2 rounded-md text-xs font-medium flex items-center gap-2 shadow-xs transition-colors self-start sm:self-auto"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish All Changes</span>
                </button>
              </div>

              {/* Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#FAFAFA] p-4 rounded-lg border border-zinc-200">
                  <span className="text-xs text-zinc-500">Roles</span>
                  <div className="text-2xl font-bold text-zinc-900 mt-1">
                    {draftData.experiences.length}
                  </div>
                </div>

                <div className="bg-[#FAFAFA] p-4 rounded-lg border border-zinc-200">
                  <span className="text-xs text-zinc-500">Projects</span>
                  <div className="text-2xl font-bold text-zinc-900 mt-1">
                    {draftData.projects.length}
                  </div>
                </div>

                <div className="bg-[#FAFAFA] p-4 rounded-lg border border-zinc-200">
                  <span className="text-xs text-zinc-500">Skills</span>
                  <div className="text-2xl font-bold text-zinc-900 mt-1">
                    {draftData.skills.length}
                  </div>
                </div>

                <div className="bg-[#FAFAFA] p-4 rounded-lg border border-zinc-200">
                  <span className="text-xs text-zinc-500">Documents</span>
                  <div className="text-2xl font-bold text-zinc-900 mt-1">
                    {draftData.documents.length}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className="p-4 rounded-lg bg-[#FAFAFA] hover:bg-zinc-100 border border-zinc-200 text-left transition-colors"
                  >
                    <div className="text-xs font-semibold text-zinc-900">
                      Update Profile & Picture
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-1">
                      Upload your profile photo or edit contact info.
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('documents')}
                    className="p-4 rounded-lg bg-[#FAFAFA] hover:bg-zinc-100 border border-zinc-200 text-left transition-colors"
                  >
                    <div className="text-xs font-semibold text-zinc-900">
                      Upload CV & Documents
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-1">
                      Add new resume PDF, certificates, or research dossiers.
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('projects')}
                    className="p-4 rounded-lg bg-[#FAFAFA] hover:bg-zinc-100 border border-zinc-200 text-left transition-colors"
                  >
                    <div className="text-xs font-semibold text-zinc-900">
                      Manage Case Studies
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-1">
                      Update analytics projects, metrics, and tools.
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & PICTURE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-200">
                <h2 className="text-xl font-semibold text-zinc-900">Profile & Picture</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Update your personal brand details, profile picture, and contact information.
                </p>
              </div>

              {/* Picture Upload Box */}
              <div className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-zinc-700" />
                  <span>Profile Picture</span>
                </h3>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Avatar Preview */}
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-zinc-300 bg-zinc-200 flex items-center justify-center shrink-0">
                    {draftData.profile.profilePhoto ? (
                      <img
                        src={formatDirectImageUrl(draftData.profile.profilePhoto)}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-xl font-bold text-zinc-500">AA</span>
                    )}
                  </div>

                  <div className="flex-1 space-y-3 text-center sm:text-left w-full">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={photoFileInputRef}
                        accept="image/*"
                        onChange={handlePhotoFileUpload}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => photoFileInputRef.current?.click()}
                        className="bg-zinc-900 hover:bg-black text-white px-3.5 py-2 rounded-md text-xs font-medium flex items-center gap-2 transition-colors shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Picture from Device</span>
                      </button>

                      {draftData.profile.profilePhoto && (
                        <button
                          type="button"
                          onClick={() => {
                            updateProfile({ profilePhoto: '' });
                            triggerDraftNotice();
                          }}
                          className="bg-white hover:bg-zinc-100 text-red-600 border border-zinc-200 px-3 py-2 rounded-md text-xs font-medium transition-colors"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>

                    <div className="text-xs text-zinc-500">
                      Or paste an external photo link (e.g. Google Drive, LinkedIn photo URL):
                    </div>
                    <input
                      type="text"
                      value={draftData.profile.profilePhoto || ''}
                      onChange={(e) => updateProfile({ profilePhoto: formatDirectImageUrl(e.target.value) })}
                      placeholder="https://drive.google.com/... or https://..."
                      className="w-full bg-white border border-zinc-300 rounded-md px-3 py-1.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.fullName}
                    onChange={(e) => updateProfile({ fullName: e.target.value })}
                    className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Professional Title *
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.professionalTitle}
                    onChange={(e) => updateProfile({ professionalTitle: e.target.value })}
                    className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={draftData.profile.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                    className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.phone}
                    onChange={(e) => updateProfile({ phone: e.target.value })}
                    className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.location}
                    onChange={(e) => updateProfile({ location: e.target.value })}
                    className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Professional Status
                  </label>
                  <input
                    type="text"
                    value={draftData.profile.professionalStatus}
                    onChange={(e) => updateProfile({ professionalStatus: e.target.value })}
                    className="w-full bg-white border border-zinc-300 rounded-md px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Short Hero Introduction
                </label>
                <textarea
                  rows={2}
                  value={draftData.profile.shortIntroduction}
                  onChange={(e) => updateProfile({ shortIntroduction: e.target.value })}
                  className="w-full bg-white border border-zinc-300 rounded-md p-3 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  About Me Statement
                </label>
                <textarea
                  rows={4}
                  value={draftData.profile.aboutMe}
                  onChange={(e) => updateProfile({ aboutMe: e.target.value })}
                  className="w-full bg-white border border-zinc-300 rounded-md p-3 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    publishDraft();
                    triggerDraftNotice();
                  }}
                  className="bg-zinc-900 hover:bg-black text-white text-xs font-medium px-4 py-2 rounded-md transition-colors"
                >
                  Save & Publish Live
                </button>
              </div>
            </div>
          )}

          {/* TAB: INQUIRIES & MESSAGES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Inquiries & Personal Messages</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Messages submitted through your portfolio contact form, routed to your email.
                  </p>
                </div>
                <button
                  onClick={fetchInquiries}
                  disabled={loadingInquiries}
                  className="bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingInquiries ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Email Routing Info Banner */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-emerald-900">
                      Primary Inbound Email Destination
                    </div>
                    <div className="text-xs text-emerald-700 font-mono">
                      ayodejiharbiodun24@gmail.com
                    </div>
                  </div>
                </div>
                <span className="text-[11px] bg-emerald-200/80 text-emerald-900 px-2.5 py-1 rounded font-medium">
                  {inquiries.length} {inquiries.length === 1 ? 'Message Recorded' : 'Messages Recorded'}
                </span>
              </div>

              {/* Messages List */}
              <div className="space-y-4">
                {inquiries.length === 0 ? (
                  <div className="p-8 text-center bg-[#FAFAFA] border border-zinc-200 rounded-xl">
                    <MessageSquare className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-zinc-800">No Inquiries Yet</div>
                    <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                      When recruiters or visitors use your contact form or send a personal message, it will appear here and in your personal email.
                    </p>
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-5 bg-[#FAFAFA] border border-zinc-200 rounded-xl space-y-3 shadow-2xs hover:border-zinc-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-zinc-900">{inq.name}</span>
                            <span className="text-xs text-zinc-500 font-mono">({inq.email})</span>
                          </div>
                          <div className="text-xs font-medium text-zinc-700 mt-0.5">
                            Subject: <span className="font-semibold text-zinc-900">{inq.subject}</span>
                          </div>
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          {new Date(inq.timestamp).toLocaleString()}
                        </div>
                      </div>

                      <div className="p-3.5 bg-white border border-zinc-200 rounded-lg text-xs sm:text-sm text-zinc-800 whitespace-pre-wrap leading-relaxed">
                        {inq.message}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(inq.email)}&su=Re: ${encodeURIComponent(inq.subject)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-900 hover:bg-black text-white px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Reply in Gmail</span>
                          </a>

                          <a
                            href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                            className="bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-300 px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                            <span>Reply via Mail Client</span>
                          </a>
                        </div>

                        <button
                          onClick={() => deleteInquiry(inq.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CV & DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">CV & Documents Manager</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Upload your latest CV or resume file, research reports, and professional certificates.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingDoc(true)}
                  className="bg-zinc-900 hover:bg-black text-white px-3.5 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Document</span>
                </button>
              </div>

              {/* Dedicated CV Upload Box */}
              <div className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-800" />
                  <h3 className="text-sm font-semibold text-zinc-900">
                    Upload & Update Live CV / Resume
                  </h3>
                </div>
                <p className="text-xs text-zinc-600">
                  Select your CV file (.pdf, .docx, .txt). It will immediately update the live Document Centre download and viewer.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <input
                    type="file"
                    ref={cvFileInputRef}
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleCvFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => cvFileInputRef.current?.click()}
                    className="bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-md text-xs font-medium flex items-center gap-2 transition-colors shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload New CV / Resume File</span>
                  </button>

                  <span className="text-xs text-zinc-500">
                    Accepted formats: PDF, DOC, DOCX, TXT
                  </span>
                </div>
              </div>

              {/* Additional Document Uploader */}
              <div className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-zinc-800" />
                  <h3 className="text-sm font-semibold text-zinc-900">
                    Quick Document Asset Upload
                  </h3>
                </div>
                <p className="text-xs text-zinc-600">
                  Upload any research paper, presentation, certificate, or report.
                </p>

                <input
                  type="file"
                  ref={docFileInputRef}
                  onChange={handleDocAssetUpload}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => docFileInputRef.current?.click()}
                  className="bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 px-3.5 py-2 rounded-md text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Choose Document File from Device</span>
                </button>
              </div>

              {/* Existing Documents List */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Current Documents ({draftData.documents.length})
                </h3>

                {draftData.documents.map((doc) => {
                  const docDisplayName = doc.name || doc.fileName || 'Untitled Document';
                  return (
                    <div
                      key={doc.id}
                      className="p-4 bg-[#FAFAFA] border border-zinc-200 rounded-xl flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-medium text-zinc-700 bg-white border border-zinc-200 px-2 py-0.5 rounded">
                            {doc.category}
                          </span>
                          <span className="text-xs text-zinc-500">{doc.format || 'PDF'} · {doc.size || '350 KB'}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-zinc-900">{docDisplayName}</h4>
                        <p className="text-xs text-zinc-600">{doc.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {doc.fileUrl && (
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-white rounded border border-transparent hover:border-zinc-200 transition-colors"
                            title="Open File"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => {
                            if (confirm(`Delete document "${docDisplayName}"?`)) deleteDocument(doc.id);
                          }}
                          className="p-2 text-zinc-400 hover:text-red-600 hover:bg-white rounded border border-transparent hover:border-zinc-200 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: EXPERIENCES */}
          {activeTab === 'experiences' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Work Experiences</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Manage your employment history, roles, and achievements.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingExp(true)}
                  className="bg-zinc-900 hover:bg-black text-white px-3.5 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              <div className="space-y-4">
                {draftData.experiences.map((exp) => (
                  <div key={exp.id} className="p-4 bg-[#FAFAFA] border border-zinc-200 rounded-xl space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-900">{exp.jobTitle}</h4>
                        <div className="text-xs text-zinc-600 font-medium">{exp.organisation} · {exp.startDate} – {exp.endDate}</div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete role "${exp.jobTitle}"?`)) deleteExperience(exp.id);
                        }}
                        className="p-1.5 text-zinc-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <ul className="text-xs text-zinc-600 space-y-1 list-disc pl-4 pt-1">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Case Studies & Projects</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Manage portfolio case studies, metrics, and SQL/BI tool stacks.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingProj(true)}
                  className="bg-zinc-900 hover:bg-black text-white px-3.5 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-4">
                {draftData.projects.map((proj) => (
                  <div key={proj.id} className="p-4 bg-[#FAFAFA] border border-zinc-200 rounded-xl space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-medium text-zinc-600 bg-white border border-zinc-200 px-2 py-0.5 rounded">
                          {proj.category}
                        </span>
                        <h4 className="text-sm font-semibold text-zinc-900 mt-1">{proj.title}</h4>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete project "${proj.title}"?`)) deleteProject(proj.id);
                        }}
                        className="p-1.5 text-zinc-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-600">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.tools.map((t, idx) => (
                        <span key={idx} className="text-[11px] bg-white border border-zinc-200 text-zinc-700 px-2 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Skills & Toolkit</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Add or update your technical tools and analytical capabilities.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingSkill(true)}
                  className="bg-zinc-900 hover:bg-black text-white px-3.5 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {draftData.skills.map((skill) => (
                  <div key={skill.id} className="p-3 bg-[#FAFAFA] border border-zinc-200 rounded-lg flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-zinc-900">{skill.name}</div>
                      <div className="text-[10px] text-zinc-500">{skill.category}</div>
                    </div>
                    <button
                      onClick={() => deleteSkill(skill.id)}
                      className="text-zinc-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: EDUCATION & CERTS */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900">Education & Certifications</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Degrees and professional credentials.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                    Academic Background
                  </h3>
                  <div className="space-y-3">
                    {draftData.education.map((edu) => (
                      <div key={edu.id} className="p-4 bg-[#FAFAFA] border border-zinc-200 rounded-lg">
                        <div className="text-sm font-semibold text-zinc-900">{edu.qualification} · {edu.programme}</div>
                        <div className="text-xs text-zinc-600 mt-0.5">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
                    Certifications ({draftData.certifications.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {draftData.certifications.map((cert) => (
                      <div key={cert.id} className="p-3.5 bg-[#FAFAFA] border border-zinc-200 rounded-lg flex items-center justify-between">
                        <div>
                          <div className="text-xs font-semibold text-zinc-900">{cert.name}</div>
                          <div className="text-[11px] text-zinc-500">{cert.issuer} · {cert.issueDate}</div>
                        </div>
                        <button
                          onClick={() => deleteCertification(cert.id)}
                          className="text-zinc-400 hover:text-red-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: VOLUNTEERING */}
          {activeTab === 'volunteering' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-200">
                <h2 className="text-xl font-semibold text-zinc-900">Community & Volunteering</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Leadership initiatives, GamblePause Africa, and NOUN Cowrywise Ambassador roles.
                </p>
              </div>

              <div className="space-y-4">
                {draftData.volunteering.map((v) => (
                  <div key={v.id} className="p-4 bg-[#FAFAFA] border border-zinc-200 rounded-xl space-y-1.5">
                    <div className="text-xs font-medium text-zinc-500">{v.organization} · {v.period}</div>
                    <div className="text-sm font-semibold text-zinc-900">{v.role}</div>
                    <p className="text-xs text-zinc-600 leading-relaxed">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-zinc-200">
                <h2 className="text-xl font-semibold text-zinc-900">Website Settings</h2>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Toggles and system data controls.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAFAFA] border border-zinc-200">
                  <div>
                    <div className="text-xs font-semibold text-zinc-900">Open to Opportunities Indicator</div>
                    <div className="text-[11px] text-zinc-500">Display active availability indicator in hero</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={draftData.settings.showAvailabilityBadge}
                    onChange={(e) => updateSettings({ showAvailabilityBadge: e.target.checked })}
                    className="w-4 h-4 accent-zinc-900"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAFAFA] border border-zinc-200">
                  <div>
                    <div className="text-xs font-semibold text-zinc-900">Ask Abiodun AI Assistant</div>
                    <div className="text-[11px] text-zinc-500">Enable conversational recruiter assistant grounded in CV</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={draftData.settings.enableAiAssistant}
                    onChange={(e) => updateSettings({ enableAiAssistant: e.target.checked })}
                    className="w-4 h-4 accent-zinc-900"
                  />
                </div>

                <div className="pt-6 border-t border-zinc-200">
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-red-900">Reset to Verified Baseline</div>
                      <div className="text-[11px] text-red-700">Re-populates all portfolio content from the verified CV default baseline</div>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Reset entire portfolio to verified system baseline? Any unpersisted edits will be overwritten.')) {
                          resetToDefault();
                        }
                      }}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium"
                    >
                      Reset Baseline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Document Modal */}
      {isAddingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-semibold text-zinc-900">Add Document Asset</h3>
            <div className="space-y-3">
              <input
                id="new-doc-title"
                type="text"
                placeholder="Document Title (e.g. Executive Summary)"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              />
              <select
                id="new-doc-cat"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              >
                <option value="CV">CV / Resume</option>
                <option value="Cover Letter">Cover Letter</option>
                <option value="Research">Research Report</option>
                <option value="Certificates">Certificates</option>
              </select>
              <textarea
                id="new-doc-desc"
                rows={2}
                placeholder="Brief description"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddingDoc(false)}
                className="px-3 py-1.5 border border-zinc-300 text-zinc-700 rounded-md text-xs"
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
                      fileName: `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`,
                      category: cat,
                      description: desc || 'Official document resource.',
                      isPublic: true,
                      isFeatured: false,
                      source: 'Manual Entry',
                      currentVersion: '1.0',
                      fileType: 'Document',
                      versionHistory: [],
                    });
                    setIsAddingDoc(false);
                  }
                }}
                className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-md text-xs font-medium"
              >
                Add Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Role Modal */}
      {isAddingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-semibold text-zinc-900">Add Professional Role</h3>
            <div className="space-y-3">
              <input
                id="new-exp-title"
                type="text"
                placeholder="Job Title (e.g. Senior Data Analyst)"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              />
              <input
                id="new-exp-org"
                type="text"
                placeholder="Organisation (e.g. MultiChoice)"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  id="new-exp-start"
                  type="text"
                  placeholder="Start (e.g. 2025)"
                  className="bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
                />
                <input
                  id="new-exp-end"
                  type="text"
                  placeholder="End (e.g. Present)"
                  className="bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
                />
              </div>
              <textarea
                id="new-exp-resp"
                rows={3}
                placeholder="Core Responsibility / Achievement"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddingExp(false)}
                className="px-3 py-1.5 border border-zinc-300 text-zinc-700 rounded-md text-xs"
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
                className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-md text-xs font-medium"
              >
                Save Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {isAddingProj && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-semibold text-zinc-900">Add Case Study</h3>
            <div className="space-y-3">
              <input
                id="new-proj-title"
                type="text"
                placeholder="Project Title"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              />
              <input
                id="new-proj-cat"
                type="text"
                placeholder="Category (e.g. Performance Modeling)"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              />
              <textarea
                id="new-proj-desc"
                rows={2}
                placeholder="Brief Overview"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              />
              <input
                id="new-proj-tools"
                type="text"
                placeholder="Tools (comma separated, e.g. SQL, Power BI)"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddingProj(false)}
                className="px-3 py-1.5 border border-zinc-300 text-zinc-700 rounded-md text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const title = (document.getElementById('new-proj-title') as HTMLInputElement)?.value;
                  const cat = (document.getElementById('new-proj-cat') as HTMLInputElement)?.value || 'Analytics';
                  const desc = (document.getElementById('new-proj-desc') as HTMLTextAreaElement)?.value || '';
                  const tools = (document.getElementById('new-proj-tools') as HTMLInputElement)?.value || 'SQL, Power BI';
                  if (title) {
                    addProject({
                      title,
                      category: cat,
                      description: desc,
                      challenge: desc,
                      solution: 'Developed custom SQL queries and interactive reporting dashboards.',
                      impact: 'Empowered leadership with real-time operational insights.',
                      tools: tools.split(',').map((t) => t.trim()).filter(Boolean),
                      keyMetric: { value: 'High Impact', label: 'Outcome' },
                    });
                    setIsAddingProj(false);
                  }
                }}
                className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-md text-xs font-medium"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {isAddingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-xl p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-semibold text-zinc-900">Add New Skill</h3>
            <div className="space-y-3">
              <input
                id="new-skill-name"
                type="text"
                placeholder="Skill name (e.g. Python, Prompt Engineering)"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              />
              <select
                id="new-skill-category"
                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-2 text-xs text-zinc-900"
              >
                <option value="Data Analysis">Data Analysis</option>
                <option value="Business Intelligence">Business Intelligence</option>
                <option value="Business Performance">Business Performance</option>
                <option value="AI & Automation">AI & Automation</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddingSkill(false)}
                className="px-3 py-1.5 border border-zinc-300 text-zinc-700 rounded-md text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const name = (document.getElementById('new-skill-name') as HTMLInputElement)?.value;
                  const cat = (document.getElementById('new-skill-category') as HTMLSelectElement)?.value as any;
                  if (name) {
                    addSkill({
                      name,
                      category: cat,
                      proficiency: 'Advanced',
                    });
                    setIsAddingSkill(false);
                  }
                }}
                className="px-4 py-1.5 bg-zinc-900 hover:bg-black text-white rounded-md text-xs font-medium"
              >
                Save Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
