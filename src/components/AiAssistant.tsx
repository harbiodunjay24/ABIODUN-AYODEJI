import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Send,
  User,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  X,
  FileText,
  ArrowRight,
  HelpCircle,
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

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I am Abiodun's AI assistant, grounded in his verified portfolio. You can ask me about his experience at MultiChoice Group, his Power BI & SQL projects, his research with GamblePause Africa across 3 countries, or his education and certifications.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedQuestions = [
    'What experience does Abiodun have with Power BI?',
    'What projects has he worked on?',
    'What roles is he suited for?',
    'Tell me about his work at MultiChoice and GamblePause.',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const query = (customPrompt || inputQuestion).trim();
    if (!query || isLoading) return;

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
        body: JSON.stringify({
          message: query,
          question: query,
          conversationHistory: messages.slice(-4),
        }),
      });

      const responseData = await response.json();
      const replyText = responseData.reply || responseData.answer || 'Thank you for your question. You can connect with Abiodun directly at ayodejiharbiodun24@gmail.com or 07054195682.';

      const botMessage: Message = {
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.warn('AI request fallback triggered:', err);
      // Friendly local fallback response based on keywords
      const q = query.toLowerCase();
      let fallbackText = '';
      if (q.includes('power bi') || q.includes('dashboard')) {
        fallbackText = 'Abiodun is highly proficient in Power BI, building enterprise executive dashboards such as the Showmax 2.0 commercial suite (supporting a 135% subscription surge) and executive KPI variance models cutting reporting cycles by 35%.';
      } else if (q.includes('role') || q.includes('suited') || q.includes('hiring')) {
        fallbackText = 'Abiodun is well-suited for Data Analyst, Performance & Planning Analyst, and Business Intelligence roles, offering strong competencies in SQL, Power BI, Excel, KPI governance, and commercial forecasting.';
      } else if (q.includes('gamble') || q.includes('psycholog')) {
        fallbackText = 'At GamblePause Africa (active in 3 countries and expanding), Abiodun serves as both an Analyst (authoring research across 420 youth respondents) and as a Psychologist providing counseling to individuals dealing with gambling issues.';
      } else {
        fallbackText = 'Abiodun Ayodeji has 5+ years of experience across MultiChoice Group in performance planning, commercial analytics, SQL, Power BI, and empirical social impact research. Reach him at ayodejiharbiodun24@gmail.com or 07054195682.';
      }

      const botMessage: Message = {
        role: 'assistant',
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
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
          targetRoleTrack: clFocusArea,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to generate cover letter');
      }

      setGeneratedLetter(json.coverLetter);
    } catch (e: any) {
      // Local fallback cover letter
      const fallback = `Dear Hiring Manager at ${clCompany || 'the hiring team'},\n\nI am writing to express my strong interest in the ${clJobTitle} position. With over 5 years of multidisciplinary experience across business operations, performance planning, and commercial analytics at MultiChoice Group, I have developed a proven track record of transforming transactional data into executive intelligence.\n\nKey highlights I bring to your team:\n• Slashed executive reporting turnaround by 35% through automated data consolidation and variance models.\n• Engineered SQL and Power BI analytics suites that directly supported a 135% surge in subscription sales during the Showmax 2.0 relaunch.\n• Led empirical data research for GamblePause Africa surveying 420 youth respondents, while providing direct client counseling as a Psychologist.\n\nI look forward to discussing how my analytics toolkit and proactive problem-solving can add immediate value to your organization.\n\nSincerely,\nAbiodun Ayodeji\nayodejiharbiodun24@gmail.com | 07054195682`;
      setGeneratedLetter(fallback);
    } finally {
      setIsGeneratingCl(false);
    }
  };

  return (
    <>
      {/* Subtle, Minimal Assistant Section */}
      <section id="ask-ai" className="py-20 bg-white border-t border-zinc-200/80">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">
              PORTFOLIO ASSISTANT
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
              Curious about my work?
            </h2>
            <p className="text-sm text-zinc-600 mt-2">
              Ask about my experience, projects or skills.
            </p>
          </div>

          {/* Assistant Console Card */}
          <div className="bg-[#FAFAFA] border border-zinc-200 rounded-xl overflow-hidden">
            {/* Conversation Stream */}
            <div className="p-5 sm:p-6 max-h-[360px] overflow-y-auto space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-xs ${
                      msg.role === 'user'
                        ? 'bg-zinc-900 text-white'
                        : 'bg-zinc-200 text-zinc-700'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-zinc-800" />
                    )}
                  </div>

                  <div
                    className={`max-w-[82%] rounded-lg p-3.5 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-zinc-900 text-white rounded-tr-none'
                        : 'bg-white border border-zinc-200 text-zinc-800 rounded-tl-none shadow-xs'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <div
                      className={`mt-2 flex items-center justify-between text-[11px] ${
                        msg.role === 'user' ? 'text-zinc-400' : 'text-zinc-600'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => handleCopyMessage(msg.content, idx)}
                          className="hover:text-zinc-900 flex items-center gap-1 ml-3"
                          title="Copy response"
                        >
                          {copiedIdx === idx ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md bg-zinc-200 text-zinc-700 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="bg-white border border-zinc-200 rounded-lg p-3.5 rounded-tl-none text-xs text-zinc-500 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-zinc-400 animate-ping" />
                    <span>Searching portfolio records...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-zinc-200 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  id="assistant-input-query"
                  type="text"
                  value={inputQuestion}
                  onChange={(e) => setInputQuestion(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-[#FAFAFA] border border-zinc-300 rounded-md px-3.5 py-2 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 focus:bg-white transition-colors"
                />
                <button
                  id="btn-assistant-send"
                  type="submit"
                  disabled={!inputQuestion.trim() || isLoading}
                  className="bg-zinc-900 hover:bg-black disabled:bg-zinc-300 text-white px-4 py-2 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

              {/* Suggestions */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-[11px] text-zinc-600 font-medium mr-1">Suggested:</span>
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="text-[11px] text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/80 px-2.5 py-1 rounded transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tailored Cover Letter Modal */}
      {isCoverLetterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-zinc-200 rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  Generate Tailored Cover Letter
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Synthesize an application statement grounded in Abiodun's verified achievements.
                </p>
              </div>
              <button
                onClick={onCloseCoverLetterModal}
                className="text-zinc-400 hover:text-zinc-700 p-1.5 rounded-md hover:bg-zinc-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Target Job Title *
                  </label>
                  <input
                    type="text"
                    value={clJobTitle}
                    onChange={(e) => setClJobTitle(e.target.value)}
                    placeholder="e.g. Senior Data Analyst"
                    className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Target Company / Organisation
                  </label>
                  <input
                    type="text"
                    value={clCompany}
                    onChange={(e) => setClCompany(e.target.value)}
                    placeholder="e.g. Standard Bank / MultiChoice"
                    className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md px-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Job Description / Role Requirements (Optional)
                </label>
                <textarea
                  rows={3}
                  value={clDescription}
                  onChange={(e) => setClDescription(e.target.value)}
                  placeholder="Paste specific job requirements to highlight relevant experience..."
                  className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-md p-3 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white"
                />
              </div>

              <div>
                <button
                  onClick={handleGenerateCoverLetter}
                  disabled={isGeneratingCl || !clJobTitle.trim()}
                  className="bg-zinc-900 hover:bg-black disabled:bg-zinc-300 text-white px-4 py-2.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <span>{isGeneratingCl ? 'Generating Letter...' : 'Generate Letter'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {generatedLetter && (
                <div className="mt-4 pt-4 border-t border-zinc-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-900">
                      Generated Application Letter:
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedLetter);
                        setCopiedCl(true);
                        setTimeout(() => setCopiedCl(false), 2000);
                      }}
                      className="text-xs text-zinc-700 hover:text-black border border-zinc-300 px-2.5 py-1 rounded bg-white hover:bg-zinc-50 flex items-center gap-1.5"
                    >
                      {copiedCl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCl ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="bg-[#FAFAFA] border border-zinc-200 p-4 rounded-md text-xs text-zinc-800 whitespace-pre-wrap leading-relaxed">
                    {generatedLetter}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-zinc-200 bg-zinc-50 flex justify-end">
              <button
                onClick={onCloseCoverLetterModal}
                className="text-xs font-medium text-zinc-700 hover:text-black px-4 py-2 rounded border border-zinc-300 bg-white hover:bg-zinc-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
