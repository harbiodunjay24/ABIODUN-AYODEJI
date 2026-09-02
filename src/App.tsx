import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsGallery } from './components/ProjectsGallery';
import { ProjectModal } from './components/ProjectModal';
import { SkillsShowcase } from './components/SkillsShowcase';
import { VolunteeringImpact } from './components/VolunteeringImpact';
import { EducationCertifications } from './components/EducationCertifications';
import { DocumentCentre } from './components/DocumentCentre';
import { AiAssistant } from './components/AiAssistant';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProjectItem } from './types';

const PortfolioAppContent: React.FC = () => {
  const { activeView } = usePortfolio();

  // Modal States
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCoverLetterModalOpen, setIsCoverLetterModalOpen] = useState(false);

  // If in admin dashboard mode, render the CMS interface
  if (activeView === 'admin') {
    return <AdminDashboard />;
  }

  // Otherwise render the public portfolio experience
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-300 font-sans">
      
      {/* Top Navigation */}
      <Navbar
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero & Headline */}
        <Hero onOpenCvModal={() => setIsCvModalOpen(true)} />

        {/* 2. About Abiodun & Professional Story */}
        <About />

        {/* 3. Experience & Career Journey */}
        <ExperienceSection />

        {/* 4. Projects & Analytics Case Studies */}
        <ProjectsGallery onSelectProject={(project) => setSelectedProject(project)} />

        {/* 5. Data Analytics & Skills Toolkit */}
        <SkillsShowcase />

        {/* 6. Volunteering & Social Impact (Gamble Pause) */}
        <VolunteeringImpact />

        {/* 7. Education & Certifications */}
        <EducationCertifications />

        {/* 8. Document & Resource Centre */}
        <DocumentCentre
          onOpenCvModal={() => setIsCvModalOpen(true)}
          onOpenCoverLetterAi={() => setIsCoverLetterModalOpen(true)}
        />

        {/* 9. Ask Abiodun AI Recruiter Assistant & Statement Generator */}
        <AiAssistant
          isCoverLetterModalOpen={isCoverLetterModalOpen}
          onCloseCoverLetterModal={() => setIsCoverLetterModalOpen(false)}
        />

        {/* 10. Contact & Direct Connection */}
        <ContactSection onOpenCvModal={() => setIsCvModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onOpenCvModal={() => setIsCvModalOpen(true)}
      />

      {/* Global Interactive Modals */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        onOpenCoverLetterAi={() => {
          setIsCvModalOpen(false);
          setIsCoverLetterModalOpen(true);
        }}
      />

      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export function App() {
  return (
    <PortfolioProvider>
      <PortfolioAppContent />
    </PortfolioProvider>
  );
}

export default App;
