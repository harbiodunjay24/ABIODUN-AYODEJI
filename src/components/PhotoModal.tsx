import React, { useState, useRef } from 'react';
import { X, Link as LinkIcon, Upload, Check, AlertCircle, Trash2, Camera } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const formatDirectImageUrl = (url: string): string => {
  if (!url) return '';
  const trimmed = url.trim();

  // Convert Google Drive view links to direct CDN raw image links
  if (trimmed.includes('drive.google.com')) {
    const fileIdMatch =
      trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
      trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
    }
  }

  // Convert Dropbox share links to raw direct links
  if (trimmed.includes('dropbox.com')) {
    return trimmed.replace(/[?&]dl=0/, '?raw=1').replace(/[?&]dl=1/, '?raw=1');
  }

  return trimmed;
};

export const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, onClose }) => {
  const { data, setProfilePhotoDirect } = usePortfolio();
  const currentPhoto = data.profile.profilePhoto || '';

  const [inputUrl, setInputUrl] = useState(currentPhoto);
  const [activeTab, setActiveTab] = useState<'link' | 'upload'>('link');
  const [previewError, setPreviewError] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const formattedUrl = formatDirectImageUrl(inputUrl);

  const handleSave = () => {
    setProfilePhotoDirect(formattedUrl);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setInputUrl(result);
        setPreviewError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhotoDirect('');
    setInputUrl('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl border border-zinc-200 shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900">Profile Picture</h2>
              <p className="text-xs text-zinc-500">Display your real photo directly on the portfolio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-md hover:bg-zinc-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Method Tabs */}
          <div className="flex rounded-lg bg-zinc-100 p-1">
            <button
              onClick={() => setActiveTab('link')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'link'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Paste Image Link</span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'bg-white text-zinc-900 shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload from Device</span>
            </button>
          </div>

          {/* Tab 1: Paste Link */}
          {activeTab === 'link' && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-zinc-700 block">
                Direct Image Link (URL)
              </label>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => {
                  setInputUrl(e.target.value);
                  setPreviewError(false);
                }}
                placeholder="https://drive.google.com/... or https://..."
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg text-xs text-zinc-900 focus:outline-hidden focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900"
                autoFocus
              />
              <p className="text-[11px] text-zinc-500 leading-normal">
                Supports Google Drive shared links, Dropbox, LinkedIn image links, Imgur, Cloudinary, or any web image URL. It will be loaded directly without AI alterations.
              </p>
            </div>
          )}

          {/* Tab 2: Upload File */}
          {activeTab === 'upload' && (
            <div className="space-y-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 border-2 border-dashed border-zinc-200 hover:border-zinc-400 rounded-xl bg-zinc-50 hover:bg-zinc-100/70 transition-colors flex flex-col items-center justify-center gap-2 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 group-hover:text-zinc-900 shadow-xs">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-medium text-zinc-800">
                  Click to select photo from your computer/phone
                </div>
                <div className="text-[11px] text-zinc-400">JPG, PNG, WebP up to 5MB</div>
              </button>
            </div>
          )}

          {/* Live Preview Box */}
          <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50 flex items-center gap-4">
            <div className="w-20 h-24 rounded-lg overflow-hidden bg-zinc-200 border border-zinc-300 shrink-0 flex items-center justify-center relative">
              {formattedUrl && !previewError ? (
                <img
                  src={formattedUrl}
                  alt="Preview"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-zinc-400 text-xs">
                  <Camera className="w-6 h-6 mb-1 text-zinc-400" />
                  <span className="text-[10px]">No Photo</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-zinc-900">Preview Status</div>
              {formattedUrl ? (
                previewError ? (
                  <div className="text-[11px] text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Could not load image from this URL. Please verify it is a direct image link or set sharing to public.</span>
                  </div>
                ) : (
                  <div className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Image loaded successfully! Ready to display directly.</span>
                  </div>
                )
              ) : (
                <p className="text-[11px] text-zinc-500 mt-1">
                  Paste your link above or select an image to preview how it looks on your portfolio.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 border-t border-zinc-100">
          <div>
            {currentPhoto && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Photo</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-zinc-700 hover:text-zinc-900 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!inputUrl.trim() || previewError}
              className="px-4 py-2 text-xs font-medium text-white bg-zinc-900 hover:bg-black rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save & Display Directly</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
