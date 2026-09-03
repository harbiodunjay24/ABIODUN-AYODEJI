import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { DocumentItem } from '../types';
import {
  FileText,
  Search,
  Download,
  Eye,
  ExternalLink,
  Copy,
  Check,
  X,
  Sparkles,
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

  const categories = ['All', 'CV', 'Resume', 'Cover Letter', 'Research', 'Certificates'];

  const filteredDocs = (documents || []).filter((doc) => {
    const query = (searchQuery || '').toLowerCase().trim();
    const docCat = doc.category || '';
    const matchesCat =
      selectedCategory === 'All' ||
      docCat === selectedCategory ||
      (selectedCategory === 'Certificates' && docCat.includes('Cert'));

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

  const handleDownloadDoc = (doc: DocumentItem) => {
    if (doc.fileUrl) {
      window.open(doc.fileUrl, '_blank');
      return;
    }
    // Generate text/markdown file download
    const element = document.createElement('a');
    const file = new Blob([doc.content || `${doc.name}\n\nAbiodun Ayodeji\nData Analyst | Performance & Planning`], {
      type: 'text/plain;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download = doc.fileName || `${doc.name.toLowerCase().replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="documents" className="py-20 bg-white border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Label */}
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">
          DOCUMENT & CREDENTIAL VAULT
        </span>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
              Documents & Credentials Vault
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 mt-2 max-w-2xl">
              Access verified CVs, targeted resumes, research reports, and academic credentials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <button
              onClick={onOpenCvModal}
              className="bg-zinc-900 hover:bg-black text-white px-4 py-2.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Interactive CV</span>
            </button>

            <button
              onClick={onOpenCoverLetterAi}
              className="bg-white hover:bg-zinc-50 text-zinc-800 border border-zinc-300 px-3.5 py-2.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-zinc-600" />
              <span>AI Cover Letter</span>
            </button>
          </div>
        </div>

        {/* What is this for? Explanatory Note */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 mb-8 text-xs text-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 sm:mt-0 shrink-0" />
            <p className="leading-relaxed">
              <span className="font-semibold text-zinc-900">What is this for?</span> This vault provides recruiters, clients, and partners instant, verified access to Abiodun's updated CVs, role-specific resumes, and research findings without waiting for email attachments.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded shrink-0">
            <Check className="w-3 h-3 text-emerald-600" />
            Verified & Accessible
          </span>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#FAFAFA] border border-zinc-200 p-3 rounded-lg mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents or certificates..."
              className="w-full bg-white border border-zinc-300 rounded-md pl-9 pr-3.5 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-[#FAFAFA] border border-zinc-200 rounded-xl p-5 flex flex-col justify-between shadow-xs hover:border-zinc-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2">
                  <span className="font-medium uppercase tracking-wider text-zinc-700 bg-white border border-zinc-200 px-2 py-0.5 rounded">
                    {doc.category}
                  </span>
                  <span>{doc.format || 'PDF'} · {doc.size || '350 KB'}</span>
                </div>

                <h3 className="text-base font-semibold text-zinc-900 mt-2">
                  {doc.name}
                </h3>

                <p className="text-xs text-zinc-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {doc.description || 'Verified dossier document available for review and download.'}
                </p>

                <div className="text-[11px] text-zinc-600 mt-2 font-mono">
                  {doc.fileName || 'document.pdf'}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-200/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="flex-1 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 px-3 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>

                <button
                  onClick={() => handleDownloadDoc(doc)}
                  className="flex-1 bg-zinc-900 hover:bg-black text-white px-3 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-zinc-200 rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  {previewDoc.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  {previewDoc.category} · {previewDoc.fileName}
                </p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-md hover:bg-zinc-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-[#FAFAFA]">
              {previewDoc.content ? (
                <div className="bg-white border border-zinc-200 p-6 rounded-md text-xs sm:text-sm text-zinc-800 font-mono whitespace-pre-wrap leading-relaxed shadow-2xs">
                  {previewDoc.content}
                </div>
              ) : (
                <div className="p-8 text-center text-zinc-600 bg-white border border-zinc-200 rounded-md">
                  <FileText className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                  <div className="text-sm font-semibold text-zinc-900">PDF Document Ready</div>
                  <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
                    {previewDoc.name} is stored in verified document storage. Click below to download or view in a new tab.
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-zinc-200 bg-white flex items-center justify-between">
              {previewDoc.content && (
                <button
                  onClick={() => handleCopyContent(previewDoc.content)}
                  className="text-xs text-zinc-700 hover:text-black border border-zinc-300 px-3 py-1.5 rounded bg-white hover:bg-zinc-50 flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Content'}</span>
                </button>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => handleDownloadDoc(previewDoc)}
                  className="bg-zinc-900 hover:bg-black text-white px-4 py-1.5 rounded text-xs font-medium flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="text-xs font-medium text-zinc-700 hover:text-black px-4 py-1.5 rounded border border-zinc-300 bg-white hover:bg-zinc-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
