import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Sparkles,
  Send,
  User,
  Bot,
  RefreshCw,
  Copy,
  Check,
  Wand2,
  ShieldCheck,
  X,
  ChevronRight,
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AiAssistantProps {
  isCoverLetterModalOpen: boolean;
  onCloseCoverLetterModal: () => void;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({
  isCoverLetterModalOpen,
  onCloseCoverLetterModal,
}) => {
  const { data } = usePortfolio();

  // Ask Abiodun Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Greetings. I am **Abiodun Ayodeji's AI Professional Copilot**, grounded strictly in verified career records, enterprise BI deployments, Showmax 2.0 operational metrics, and quantitative publications.\n\nQuery me directly on **SQL optimization, automated reporting architectures, DAX data models, or historical impact metrics**.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Suggested Prompts
  const suggestedQuestions = [
    'What is your experience with SQL and data extraction?',
    'Tell me about your role supporting Showmax 2.0 sales operations.',
    'How did you reduce management reporting turnaround by 35%?',
    'What business intelligence tools and DAX models have you built?',
    'What certifications and qualifications do you hold?',
    'What did your research with Gamble Pause Initiative discover?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const query = customPrompt || inputQuestion;
    if (!query.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/ask-abiodun', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get answer from AI');
      }

      const botMessage: Message = {
        role: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('AI error', err);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Encountered an inquiry processing error: ${err.message || 'Please verify network and retry.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(index);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  // Cover Letter Generator State
  const [clJobTitle, setClJobTitle] = useState('Data Analyst');
  const [clCompany, setClCompany] = useState('');
  const [clDescription, setClDescription] = useState('');
  const [clFocusArea, setClFocusArea] = useState('Data Analytics & SQL');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGeneratingCl, setIsGeneratingCl] = useState(false);
  const [copiedCl, setCopiedCl] = useState(false);

  const handleGenerateCoverLetter = async () => {
    if (!clJobTitle.trim()) return;
    setIsGeneratingCl(true);
    setGeneratedLetter('');

    try {
      const res = await fetch('/api/gemini/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: clJobTitle,
          companyName: clCompany,
          jobDescription: clDescription,
          focusArea: clFocusArea,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to generate cover letter');
      }

      setGeneratedLetter(json.coverLetter);
    } catch (e: any) {
      alert(`Error generating statement: ${e.message}`);
    } finally {
      setIsGeneratingCl(false);
    }
  };

  return (
    <>
      {/* Ask Abiodun Section */}
      <section id="ask-ai" className="py-24 relative bg-[#08090c] border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Tag */}
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>GROUNDED INTELLIGENCE COPILOT</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400">GEMINI ENGINE</span>
          </div>

          {/* Header */}
          <div className="mb-12">
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              INTERROGATE THE DOSSIER
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-2 font-normal">
              Instant, verified inquiries regarding tool proficiencies, project execution models, and organizational KPIs — verified against raw source credentials.
            </p>
          </div>

          {/* Interactive Chat Console */}
          <div className="bg-[#0d0f14] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Console Bar */}
            <div className="px-6 py-4 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2 font-mono">
                    <span>AYODEJI_COPILOT_v2.5</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setMessages([
                      {
                        role: 'assistant',
                        content: `Terminal reset. Ready for technical or career inquiries.`,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      },
                    ])
                  }
                  className="text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>RESET</span>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="p-4 sm:p-6 min-h-[340px] max-h-[480px] overflow-y-auto space-y-4 bg-[#08090c]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.role === 'user'
                        ? 'bg-zinc-800 text-white border border-zinc-700'
                        : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-zinc-800 text-white rounded-tr-none border border-zinc-700'
                        : 'bg-[#0d0f14] border border-zinc-800 text-zinc-200 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                    
                    <div className="mt-2.5 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                      <span>{msg.timestamp}</span>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => handleCopyMessage(msg.content, idx)}
                          className="hover:text-emerald-400 flex items-center gap-1 ml-4"
                        >
                          {copiedIdx === idx ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>{copiedIdx === idx ? 'COPIED' : 'COPY'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div className="bg-[#0d0f14] border border-zinc-800 rounded-2xl rounded-tl-none p-4 text-xs font-mono text-zinc-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>SYNTHESIZING VERIFIED DOSSIER CONTEXT...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts Pills */}
            <div className="p-4 border-t border-zinc-900 bg-zinc-950">
              <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
                SAMPLE RECRUITER INQUIRIES:
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="text-[11px] bg-[#0d0f14] hover:bg-zinc-900 text-zinc-300 hover:text-emerald-400 border border-zinc-800 px-3 py-1.5 rounded-xl transition-colors text-left flex items-center gap-1.5 disabled:opacity-50 font-sans"
                  >
                    <span>{q}</span>
                    <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input Box */}
            <div className="p-4 border-t border-zinc-900 bg-[#0d0f14] flex items-center gap-3">
              <input
                id="input-ai-question"
                type="text"
                placeholder="Ask regarding SQL procedures, DAX models, Showmax 2.0 metrics, certifications..."
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 disabled:opacity-50 font-sans"
              />

              <button
                id="btn-send-ai-question"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputQuestion.trim()}
                className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-400 p-3 sm:px-5 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">SUBMIT</span>
              </button>
            </div>

          </div>

          <div className="mt-4 text-center text-xs text-zinc-400 flex items-center justify-center gap-2 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AI outputs are strictly calibrated against verified ATS dossier records.</span>
          </div>

        </div>
      </section>

      {/* Cover Letter Generator Modal */}
      {isCoverLetterModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in-50"
          onClick={onCloseCoverLetterModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#08090c] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-900 bg-[#0d0f14]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                    GROUNDED STATEMENT GENERATOR
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  Tailored Application Dossier Statement
                </h3>
              </div>
              <button
                onClick={onCloseCoverLetterModal}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    TARGET ROLE *
                  </label>
                  <input
                    type="text"
                    value={clJobTitle}
                    onChange={(e) => setClJobTitle(e.target.value)}
                    placeholder="e.g. Senior Data Analyst / BI Specialist"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                    TARGET ORGANISATION
                  </label>
                  <input
                    type="text"
                    value={clCompany}
                    onChange={(e) => setClCompany(e.target.value)}
                    placeholder="e.g. Acme Corp / Global Fintech"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  PRIMARY ANALYTICAL FOCUS
                </label>
                <select
                  value={clFocusArea}
                  onChange={(e) => setClFocusArea(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 font-sans"
                >
                  <option value="Data Analytics & SQL">Data Analytics & SQL (Relational Modeling & Pipeline Extraction)</option>
                  <option value="Business Intelligence & Power BI">Business Intelligence & Power BI (DAX & Visual Governance)</option>
                  <option value="Performance & Planning Analysis">Performance & Planning Analysis (Variance Modeling & Capacity)</option>
                  <option value="Commercial & Sales Operations">Commercial & Sales Operations (Cohort Retention & Showmax 2.0)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  JOB SPECIFICATION EXTRACT (OPTIONAL)
                </label>
                <textarea
                  rows={3}
                  value={clDescription}
                  onChange={(e) => setClDescription(e.target.value)}
                  placeholder="Paste specific job requirements to cross-reference Abiodun's verified achievements..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  id="btn-trigger-cl-generation"
                  onClick={handleGenerateCoverLetter}
                  disabled={isGeneratingCl || !clJobTitle.trim()}
                  className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 text-zinc-950 disabled:text-zinc-400 px-6 py-3 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>{isGeneratingCl ? 'SYNTHESIZING STATEMENT...' : 'GENERATE STATEMENT'}</span>
                </button>
              </div>

              {/* Generated Result */}
              {generatedLetter && (
                <div className="space-y-3 pt-4 border-t border-zinc-900">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      SYNTHESIZED APPLICATION STATEMENT:
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedLetter);
                        setCopiedCl(true);
                        setTimeout(() => setCopiedCl(false), 2000);
                      }}
                      className="text-xs font-mono bg-zinc-950 hover:bg-zinc-900 text-zinc-200 border border-zinc-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      {copiedCl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCl ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>

                  <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans whitespace-pre-wrap select-all">
                    {generatedLetter}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-900 bg-[#0d0f14] flex items-center justify-end gap-3">
              <button
                onClick={onCloseCoverLetterModal}
                className="bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-800 px-5 py-2.5 rounded-xl text-xs font-mono transition-colors"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

