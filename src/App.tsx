import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Eye, Globe, Coins, MessageSquare, Activity, 
  Cpu, Database, Sparkles, Github, Terminal, ArrowRight, CheckCircle
} from 'lucide-react';

import CompareSlider from './components/CompareSlider';
import DropzoneScanner from './components/DropzoneScanner';
import Web3Auditor from './components/Web3Auditor';
import DomainAnalyzer from './components/DomainAnalyzer';
import FactChecker from './components/FactChecker';

type TabType = 'forensics' | 'web3' | 'domain' | 'chat';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('forensics');

  // Stats for the cybersecurity dashboard
  const stats = [
    { label: 'Media Scanned', value: '148,290', change: '+12.4%', icon: Eye, color: 'text-cyber-blue' },
    { label: 'Threats Avoided', value: '9,214', change: '+8.3%', icon: Shield, color: 'text-risk-red' },
    { label: 'Web3 Audits', value: '$14.2M+', change: '+22.1%', icon: Coins, color: 'text-safe-green' },
    { label: 'Agent Resolutions', value: '384,102', change: '+15.7%', icon: MessageSquare, color: 'text-cyber-violet' }
  ];

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-100 flex flex-col font-sans selection:bg-cyber-blue/30 selection:text-white antialiased">
      {/* Dynamic scan line across whole viewport */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent pointer-events-none z-50"></div>

      {/* Floating Header */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-cyber-border/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-blue/20 to-cyber-violet/20 border border-cyber-blue/30">
              <Shield className="w-5 h-5 text-cyber-blue" />
              <div className="absolute inset-0 rounded-xl border border-white/5 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="font-display font-black tracking-tight text-lg text-slate-100 leading-none">
                TRUST<span className="text-cyber-blue">LENS</span>
              </h1>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">Cognitive Security Engine</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-cyber-dark/40 border border-cyber-border/30">
            <button 
              onClick={() => setActiveTab('forensics')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'forensics' ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/20' : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Forensics
            </button>
            <button 
              onClick={() => setActiveTab('web3')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'web3' ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/20' : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              Web3 Audit
            </button>
            <button 
              onClick={() => setActiveTab('domain')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'domain' ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/20' : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Domain Audit
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'chat' ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/20' : 'text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Fact-Checker
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-safe-green/10 border border-safe-green/20 text-[10px] font-mono font-bold text-safe-green">
              <span className="w-1.5 h-1.5 rounded-full bg-safe-green animate-ping"></span>
              SECURE ENGINE
            </span>
            <a 
              href="https://github.com/Ayush-appie/TrustLens-UI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-cyber-border hover:border-cyber-blue/40 text-slate-400 hover:text-cyber-blue transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-cyber-border/40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-cyber-blue/5 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyber-violet/5 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyber-blue/20 bg-cyber-blue/5">
                <Sparkles className="w-3.5 h-3.5 text-cyber-blue animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-[10px] font-mono tracking-wider font-extrabold text-cyber-blue uppercase">Cognitive Trust Framework 2.0</span>
              </div>

              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-100 tracking-tight leading-tight">
                Decipher Truth in a <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyber-blue via-indigo-400 to-cyber-violet bg-clip-text text-transparent">
                  Synthetic World
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                Deploying multi-agent verification paradigms, EXIF telemetry pipelines, and on-chain intelligence databases to audit digital assets, verify deepfakes, and validate transactions.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => {
                    setActiveTab('forensics');
                    document.getElementById('dashboard-anchor')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-blue to-indigo-500 hover:from-cyber-blue hover:to-indigo-600 text-cyber-dark font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg glow-blue hover:scale-102 transition-all cursor-pointer"
                >
                  Launch Analyzer <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => {
                    setActiveTab('chat');
                    document.getElementById('dashboard-anchor')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl border border-cyber-border hover:border-cyber-violet/50 bg-cyber-card/30 hover:bg-cyber-card/60 text-slate-200 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  Consult AI Agent <MessageSquare className="w-4 h-4 text-cyber-violet" />
                </button>
              </div>

              {/* Interactive Audit Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                {stats.map((stat, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-cyber-border bg-cyber-card/25 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">{stat.label}</span>
                      <stat.icon className={`w-3.5 h-3.5 ${stat.color}`} />
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-slate-100 font-display">{stat.value}</span>
                      <span className="text-[9px] font-bold text-safe-green">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Right Visuals: Interactive Split Slider */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="relative p-2 rounded-3xl border border-cyber-border bg-cyber-card/20 backdrop-blur-sm">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyber-blue/10 to-cyber-violet/10 blur-xl pointer-events-none"></div>
                <CompareSlider />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs Container */}
      <main id="dashboard-anchor" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Navigation Tabs Selector */}
        <div className="flex justify-center md:hidden mb-8">
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-xl bg-cyber-card border border-cyber-border">
            <button 
              onClick={() => setActiveTab('forensics')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'forensics' ? 'bg-cyber-blue text-cyber-dark' : 'text-slate-400'
              }`}
            >
              Forensics
            </button>
            <button 
              onClick={() => setActiveTab('web3')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'web3' ? 'bg-cyber-blue text-cyber-dark' : 'text-slate-400'
              }`}
            >
              Web3
            </button>
            <button 
              onClick={() => setActiveTab('domain')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'domain' ? 'bg-cyber-blue text-cyber-dark' : 'text-slate-400'
              }`}
            >
              Domain
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'chat' ? 'bg-cyber-blue text-cyber-dark' : 'text-slate-400'
              }`}
            >
              Agent
            </button>
          </div>
        </div>

        {/* Dynamic Panel Frame */}
        <div className="relative min-h-[480px] p-6 sm:p-8 rounded-3xl glass-panel glow-blue overflow-hidden">
          {/* Subtle panel mesh overlay */}
          <div className="absolute inset-0 bg-cyber-card/10 pointer-events-none"></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {activeTab === 'forensics' && <DropzoneScanner />}
              {activeTab === 'web3' && <Web3Auditor />}
              {activeTab === 'domain' && <DomainAnalyzer />}
              {activeTab === 'chat' && <FactChecker />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 glass-panel border-t border-cyber-border/40 mt-auto bg-cyber-dark/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyber-blue" />
            <span className="text-xs font-mono text-slate-400">
              TRUSTLENS CORE COGNITIVE PLATFORM <span className="text-cyber-blue">v4.8.1-PROD</span>
            </span>
          </div>
          <div className="text-xs text-slate-500 flex flex-wrap justify-center gap-4">
            <span>Designed for <strong className="text-slate-300 font-semibold">Ayush-appie</strong></span>
            <span>•</span>
            <a href="https://github.com/Ayush-appie/TrustLens-UI" target="_blank" rel="noopener noreferrer" className="hover:text-cyber-blue transition-all flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> Source Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
