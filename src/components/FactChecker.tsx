import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, CheckCircle, AlertCircle, 
  HelpCircle, Sparkles, Terminal, FileText
} from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'system' | 'agent-retriever' | 'agent-crossref' | 'agent-truth';
  text: string;
  report?: {
    truthScore: number;
    sources: string[];
    summary: string;
    verdict: 'True' | 'Mostly True' | 'Misleading' | 'False';
  };
}

export default function FactChecker() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      sender: 'system', 
      text: "Welcome to TrustLens Fact-Checking Hub. I am backed by a multi-agent verification pipeline. Paste any claim, rumors, or questionable text to initiate a real-time validation audit." 
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userClaim = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userClaim }]);
    setInput('');
    setIsProcessing(true);

    // Multi-Agent Pipeline simulation
    setTimeout(() => {
      // Step 1: Retriever Agent wakes up
      setMessages((prev) => [...prev, { 
        sender: 'agent-retriever', 
        text: "🔍 [RETRIEVAL AGENT] Initiating web search across 50+ media sites, academic databases, and government listings. Scraping query index matches..." 
      }]);
    }, 1000);

    setTimeout(() => {
      // Step 2: Crossref Agent wakes up
      setMessages((prev) => [...prev, { 
        sender: 'agent-crossref', 
        text: "⚖️ [CROSS-REFERENCE AGENT] Checking semantic similarities. Cross-checking bias indexes, temporal context, and conflicting news feeds. Found 12 matching statements." 
      }]);
    }, 2500);

    setTimeout(() => {
      // Step 3: Truth Agent wakes up and delivers the payload
      const lower = userClaim.toLowerCase();
      let score = 88;
      let verdict: 'True' | 'Mostly True' | 'Misleading' | 'False' = 'Mostly True';
      let summary = "The claim aligns with verified journalistic reporting and government source indexes. Key regulatory changes are underway.";
      let sources = [
        "https://www.reuters.com/news-coverage-archive",
        "https://www.apnews.com/verified-reports",
        "https://www.sec.gov/news/press-release"
      ];

      if (lower.includes('vaccine') || lower.includes('flat') || lower.includes('conspiracy') || lower.includes('fake')) {
        score = 12;
        verdict = 'False';
        summary = "This claim has been debunked repeatedly by international health agencies and scientific consensus. It matches known viral misinformation templates.";
        sources = [
          "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters",
          "https://www.cdc.gov/vaccines/covid-19/hcp/answering-questions.html"
        ];
      } else if (lower.includes('chatgpt') || lower.includes('ai') || lower.includes('model') || lower.includes('agi')) {
        score = 56;
        verdict = 'Misleading';
        summary = "While the general premise is grounded in current AI development, the timeline and scope are highly exaggerated. The models have limitations not accounted for in this claim.";
        sources = [
          "https://arxiv.org/abs/2303.08774",
          "https://openai.com/research/gpt-4-system-card"
        ];
      }

      setMessages((prev) => [...prev, { 
        sender: 'agent-truth', 
        text: `🎯 [TRUTH VERDICT AGENT] Computed alignment factor complete. Overall credibility verdict is ${verdict.toUpperCase()} with ${score}% confidence.`,
        report: {
          truthScore: score,
          verdict,
          summary,
          sources
        }
      }]);
      setIsProcessing(false);
    }, 4500);
  };

  const getVerdictStyle = (verdict: string) => {
    switch (verdict) {
      case 'True': return 'bg-safe-green/10 text-safe-green border-safe-green/20';
      case 'Mostly True': return 'bg-safe-green/10 text-safe-green border-safe-green/20';
      case 'Misleading': return 'bg-warning-amber/10 text-warning-amber border-warning-amber/20';
      default: return 'bg-risk-red/10 text-risk-red border-risk-red/20';
    }
  };

  return (
    <div className="w-full flex flex-col h-[520px] rounded-2xl glass-panel relative overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-cyber-border/40 bg-cyber-card flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyber-violet/10 border border-cyber-violet/25 flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5 text-cyber-violet animate-pulse" />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-200">Fact-Checking Agents</span>
            <span className="block text-[10px] text-slate-500 font-mono">Consensus: 3 Peer Agents Active</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-safe-green animate-ping"></span>
          <span className="text-[10px] uppercase font-mono text-slate-400">Online</span>
        </div>
      </div>

      {/* Message Ledger */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex gap-3 max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs border ${
              msg.sender === 'user' 
                ? 'bg-cyber-blue/10 border-cyber-blue/35 text-cyber-blue' 
                : msg.sender === 'system'
                  ? 'bg-slate-800 border-slate-700 text-slate-400'
                  : 'bg-cyber-violet/10 border-cyber-violet/30 text-cyber-violet'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className="space-y-3">
              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-cyber-blue/10 border border-cyber-blue/20 text-slate-200 rounded-tr-none' 
                  : 'bg-cyber-card/60 border border-cyber-border text-slate-300 rounded-tl-none'
              }`}>
                {msg.text}
              </div>

              {/* Agent Report Embed */}
              {msg.report && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-xl border border-cyber-border bg-cyber-card/85 space-y-3"
                >
                  <div className="flex justify-between items-center pb-2.5 border-b border-cyber-border">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Verifiability Report</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${getVerdictStyle(msg.report.verdict)}`}>
                      {msg.report.verdict}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center py-2.5">
                    <div className="border-r border-cyber-border/40">
                      <span className="block text-[9px] uppercase font-mono text-slate-400">Credibility Gauge</span>
                      <span className={`block text-xl font-display font-black mt-0.5 ${
                        msg.report.truthScore >= 80 ? 'text-safe-green' : msg.report.truthScore >= 40 ? 'text-warning-amber' : 'text-risk-red'
                      }`}>{msg.report.truthScore}%</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-mono text-slate-400">Sources Analysed</span>
                      <span className="block text-xl font-display font-black text-slate-200 mt-0.5">
                        {msg.report.sources.length} sources
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 bg-cyber-dark/40 border border-cyber-border/30 rounded-lg p-2.5 leading-relaxed">
                    {msg.report.summary}
                  </p>

                  <div className="space-y-1">
                    <span className="block text-[9px] uppercase font-mono text-slate-400 mb-1">Citations & References</span>
                    {msg.report.sources.map((src, idx) => (
                      <a 
                        key={idx} 
                        href={src} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[10px] text-cyber-blue hover:underline truncate"
                      >
                        <FileText className="w-3 h-3 text-cyber-blue shrink-0" />
                        {src}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-cyber-violet/10 border border-cyber-violet/30 text-cyber-violet flex items-center justify-center animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-cyber-card/60 border border-cyber-border text-xs text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-bounce delay-150"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-blue animate-bounce delay-300"></span>
              <span className="font-mono text-[10px]">Agents cross-referencing ledger...</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Footer input form */}
      <form onSubmit={handleSubmit} className="p-4 bg-cyber-card/40 border-t border-cyber-border/40 flex gap-2.5">
        <input 
          type="text" 
          placeholder="Paste controversial claim or query to fact-check..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isProcessing}
          className="flex-1 bg-cyber-dark/60 border border-cyber-border rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-cyber-violet/50 disabled:opacity-50 transition-all"
        />
        <button 
          type="submit"
          disabled={!input.trim() || isProcessing}
          className="w-11 h-11 rounded-xl bg-cyber-violet/80 hover:bg-cyber-violet text-cyber-dark flex items-center justify-center disabled:opacity-40 shadow-lg shrink-0 transition-all cursor-pointer"
        >
          <Send className="w-4.5 h-4.5" />
        </button>
      </form>
    </div>
  );
}
