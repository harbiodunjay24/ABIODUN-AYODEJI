import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { DocumentItem } from '../types';
import {
  FileText,
  Search,
  Download,
  Eye,
  ExternalLink,
  FolderOpen,
  Sparkles,
  Copy,
  Check,
  X,
} from 'lucide-react';

interface DocumentCentreProps {
  onOpenCvModal: () => void;
  onOpenCoverLetterAi: () => void;
}

export const DocumentCentre: React.FC<DocumentCentreProps> = ({
  onOpenCvModal,
  onOpenCoverLetterAi,
}) => {
  const { data } = usePortfolio();
  const { documents } = data;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'CV', 'Resume', 'Cover Letter', 'Research', 'Certificates', 'Reports'];

  const filteredDocs = (documents || []).filter((doc) => {
    const query = (searchQuery || '').toLowerCase().trim();
    const docCat = doc.category || '';
    const matchesCat = selectedCategory === 'All' || docCat === selectedCategory || (selectedCategory === 'Certificates' && docCat.includes('Cert')) || (selectedCategory === 'Reports' && docCat.includes('Report'));
    
    const docName = doc.name || doc.fileName || '';
    const docDesc = doc.description || '';
    
    const matchesSearch =
      !query ||
      docName.toLowerCase().includes(query) ||
      (doc.fileName || '').toLowerCase().includes(query) ||
      docDesc.toLowerCase().includes(query) ||
      docCat.toLowerCase().includes(query);

    return matchesCat && matchesSearch;
  });

  const handleCopyContent = (content?: string) => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="documents" className="py-24 relative bg-[#08090c] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>RESOURCES & CREDENTIALS</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-400">06</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              DOCUMENT VAULT
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2 font-normal">
              Direct access to verified resumes, executive bios, research publications, and analytical dossiers.
            </p>
          </div>

          {/* Quick AI Statement Creator Button */}
          <button
            id="btn-doc-create-cover-letter"
            onClick={onOpenCoverLetterAi}
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-sm self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI TAILORED STATEMENT</span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-[#0d0f14] border border-zinc-800 p-3 rounded-2xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documents, topics, formats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => {
            const docDisplayName = doc.name || doc.fileName || 'Untitled Document';
            const docFormat = doc.fileType || doc.fileName?.split('.').pop()?.toUpperCase() || 'PDF';
            const docUrl = doc.externalUrl;

            return (
              <div
                key={doc.id}
                className="bg-[#0d0f14] border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 flex flex-col justify-between transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      {doc.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                      {docFormat} {doc.fileSize && `• ${doc.fileSize}`}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {docDisplayName}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mt-1.5 font-sans">
                      {doc.description}
                    </p>
                  </div>

                  {doc.lastUpdated && (
                    <div className="text-[10px] text-zinc-400 font-mono">
                      Updated: {doc.lastUpdated}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      if (doc.category === 'CV' || doc.category === 'Resume') {
                        onOpenCvModal();
                      } else {
                        setPreviewDoc(doc);
                      }
                    }}
                    className="w-full bg-zinc-950 hover:bg-zinc-900 text-zinc-200 border border-zinc-800 py-2.5 px-3 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>PREVIEW</span>
                  </button>

                  {docUrl ? (
                    <a
                      href={docUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                      title="Open Resource"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        if (doc.category === 'CV' || doc.category === 'Resume') {
                          onOpenCvModal();
                        } else {
                          setPreviewDoc(doc);
                        }
                      }}
                      className="p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                      title="View Document"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Document In-App Preview Modal */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in-50"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-[#0d0f14] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[85vh]"
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                  {previewDoc.category} // ARCHIVE PREVIEW
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {previewDoc.name || previewDoc.fileName}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 my-4 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-y-auto text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans whitespace-pre-wrap">
              <div className="text-center py-10 space-y-3">
                <FileText className="w-12 h-12 text-emerald-400 mx-auto opacity-80" />
                <h4 className="font-display text-base font-bold text-white">
                  {previewDoc.name || previewDoc.fileName}
                </h4>
                <p className="text-xs text-zinc-400 max-w-lg mx-auto">
                  {previewDoc.description}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-mono text-zinc-500">
                  <span>Version: {previewDoc.currentVersion || '1.0'}</span>
                  <span>•</span>
                  <span>Source: {previewDoc.source}</span>
                  {previewDoc.fileSize && (
                    <>
                      <span>•</span>
                      <span>Size: {previewDoc.fileSize}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
              <div className="text-xs text-zinc-400 font-mono">
                {previewDoc.lastUpdated && `Last revised: ${previewDoc.lastUpdated}`}
              </div>
              <div className="flex items-center gap-3">
                {previewDoc.externalUrl && (
                  <a
                    href={previewDoc.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-colors border border-zinc-800"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>OPEN SOURCE LINK</span>
                  </a>
                )}
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
