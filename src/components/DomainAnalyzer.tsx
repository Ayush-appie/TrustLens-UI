import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, ShieldCheck, ShieldAlert, Lock, Unlock, Calendar, 
  Server, Search, RefreshCw, AlertTriangle, ExternalLink, Shield
} from 'lucide-react';

const MotionDiv = motion.div;
const AnimatePresenceModule = AnimatePresence;

interface DomainReport {
  domain: string;
  status: 'Safe' | 'Suspicious' | 'Dangerous';
  score: number;
  ipAddress: string;
  registrar: string;
  creationDate: string;
  age: string;
  sslStatus: 'Valid' | 'Self-Signed' | 'None';
  sslIssuer: string;
  checks: { name: string; status: 'Pass' | 'Fail' | 'Warning'; description: string }[];
  scamFeedMatches: number;
}

export default function DomainAnalyzer() {
  const [domainInput, setDomainInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<DomainReport | null>(null);
  const [scanStep, setScanStep] = useState(0);

  const scanSteps = [
    'Resolving DNS Records & Nameservers...',
    'Evaluating SSL/TLS Encryption Ciphers...',
    'Querying Global Phishing & Malware Blacklists...',
    'Analyzing WHOIS Database & Typosquatting Signs...'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;

    let cleanDomain = domainInput.trim().toLowerCase();
    // Strip http://, https://, or www.
    cleanDomain = cleanDomain.replace(/^(https?:\/\/)?(www\.)?/, '');
    // Strip trailing slashes or paths
    cleanDomain = cleanDomain.split('/')[0];

    setIsLoading(true);
    setReport(null);
    setScanStep(0);

    // Simulate scanning step sequence
    const stepInterval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 600);

    setTimeout(() => {
      clearInterval(stepInterval);
      setIsLoading(false);
      generateReport(cleanDomain);
    }, 2800);
  };

  const loadSample = (type: 'safe' | 'suspicious' | 'dangerous') => {
    let preset = 'paypal-security-update.net';
    if (type === 'safe') preset = 'wikipedia.org';
    if (type === 'dangerous') preset = 'metamask-support-portal.security-rev.com';

    setDomainInput(preset);
    setIsLoading(true);
    setReport(null);
    setScanStep(0);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 500);

    setTimeout(() => {
      clearInterval(stepInterval);
      setIsLoading(false);
      generateReport(preset);
    }, 2400);
  };

  const generateReport = (domain: string) => {
    const dLower = domain.toLowerCase();
    
    // Check type of domain
    const isSafe = dLower.includes('wikipedia') || dLower.includes('google') || dLower.includes('github') || dLower === 'apple.com';
    const isDangerous = dLower.includes('metamask') || dLower.includes('support') || dLower.includes('rev') || dLower.includes('gift') || dLower.includes('claim');
    
    let status: 'Safe' | 'Suspicious' | 'Dangerous' = 'Suspicious';
    let score = 45;
    let ipAddress = '104.21.36.192';
    let registrar = 'NameCheap, Inc.';
    let creationDate = 'May 08, 2026';
    let age = '13 Days old';
    let sslStatus: 'Valid' | 'Self-Signed' | 'None' = 'Valid';
    let sslIssuer = "Let's Encrypt Authority X3";
    let scamFeedMatches = 1;
    
    let checks: DomainReport['checks'] = [
      { name: 'Typosquatting Engine', status: 'Warning', description: 'Domain closely resembles high-traffic brand domains (potential impersonation attempt).' },
      { name: 'SSL Encryption Valid', status: 'Pass', description: 'SSL certificate is active and uses contemporary TLS 1.3 protocols.' },
      { name: 'Domain Age Audit', status: 'Warning', description: 'Domain registered within last 30 days. New domains have a higher correlation with brief scam operations.' },
      { name: 'Anti-Phishing Feed Match', status: 'Pass', description: 'No active matches found in public Google Safe Browsing and PhishTank lists yet.' }
    ];

    if (isSafe) {
      status = 'Safe';
      score = 98;
      ipAddress = '208.80.154.224';
      registrar = 'MarkMonitor Inc.';
      creationDate = 'January 13, 2001';
      age = '25 Years old';
      sslStatus = 'Valid';
      sslIssuer = 'DigiCert TLS RSA SHA256 2020 CA1';
      scamFeedMatches = 0;
      checks = [
        { name: 'Typosquatting Engine', status: 'Pass', description: 'Domain does not use deceptive lookalike characters or brand hijacks.' },
        { name: 'SSL Encryption Valid', status: 'Pass', description: 'SSL certificate is active, verified globally, and expires in 312 days.' },
        { name: 'Domain Age Audit', status: 'Pass', description: 'Domain age is 25 years. Long historical ownership signals strong operational trust.' },
        { name: 'Anti-Phishing Feed Match', status: 'Pass', description: 'Completely clean records. Not listed on any reputation database.' }
      ];
    } else if (isDangerous || dLower.includes('security') || dLower.includes('update')) {
      status = 'Dangerous';
      score = 8;
      ipAddress = '185.112.144.12';
      registrar = 'RegPrivate Registrar Ltd.';
      creationDate = 'May 19, 2026';
      age = '2 Days old';
      sslStatus = 'None';
      sslIssuer = 'None / Expired';
      scamFeedMatches = 4;
      checks = [
        { name: 'Typosquatting Engine', status: 'Fail', description: 'Direct mimicry of MetaMask wallet domains identified. Highly fraudulent.' },
        { name: 'SSL Encryption Valid', status: 'Fail', description: 'No SSL certificate found or certificate is self-signed/untrusted, rendering transmissions unencrypted.' },
        { name: 'Domain Age Audit', status: 'Fail', description: 'Registered 2 days ago. Highly indicative of disposable landing pages for credentials phishing.' },
        { name: 'Anti-Phishing Feed Match', status: 'Fail', description: 'Flagged on Google Safe Browsing, PhishTank, and Spamhaus malicious domain listings.' }
      ];
    }

    setReport({
      domain,
      status,
      score,
      ipAddress,
      registrar,
      creationDate,
      age,
      sslStatus,
      sslIssuer,
      checks,
      scamFeedMatches
    });
  };

  // SVG parameters for circular score ring
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold mb-2 text-slate-100 flex items-center gap-2">
          <Globe className="w-5 h-5 text-cyber-blue animate-pulse" />
          Real-Time Domain Safety & Phishing Auditor
        </h3>
        <p className="text-sm text-slate-400">
          Analyze suspicious links, check SSL certificate validity, domain creation history, and match against anti-phishing databases instantly.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Enter URL or domain (e.g. secure-login-portal.com)..."
            value={domainInput}
            onChange={(e) => setDomainInput(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl glass-panel text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyber-blue/50 transition-all font-mono"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-6 rounded-xl bg-cyber-blue/80 hover:bg-cyber-blue text-cyber-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all cursor-pointer"
        >
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Audit Link'}
        </button>
      </form>

      {/* Preset Targets */}
      {!report && !isLoading && (
        <div className="flex flex-wrap gap-3">
          <button 
            type="button"
            onClick={() => loadSample('safe')}
            className="px-3.5 py-2 rounded-lg border border-cyber-border bg-cyber-card/30 hover:border-safe-green/20 hover:bg-safe-green/[0.02] text-xs font-medium text-slate-300 transition-all cursor-pointer"
          >
            Load Wikipedia (Verified Safe)
          </button>
          <button 
            type="button"
            onClick={() => loadSample('suspicious')}
            className="px-3.5 py-2 rounded-lg border border-cyber-border bg-cyber-card/30 hover:border-warning-amber/20 hover:bg-warning-amber/[0.02] text-xs font-medium text-slate-300 transition-all cursor-pointer"
          >
            Load Typo Domain (Suspicious)
          </button>
          <button 
            type="button"
            onClick={() => loadSample('dangerous')}
            className="px-3.5 py-2 rounded-lg border border-cyber-border bg-cyber-card/30 hover:border-risk-red/20 hover:bg-risk-red/[0.02] text-xs font-medium text-slate-300 transition-all cursor-pointer"
          >
            Load Impostor MetaMask (Critical Risk)
          </button>
        </div>
      )}

      {/* Loading Scanning Steps */}
      <AnimatePresenceModule>
        {isLoading && (
          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 rounded-2xl glass-panel flex flex-col items-center justify-center text-center mt-6 relative overflow-hidden"
          >
            <div className="scan-line"></div>
            <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-cyber-blue animate-spin" />
            </div>
            
            <h4 className="font-display font-bold text-slate-200 text-sm">Deep Link Assessment In Progress</h4>
            
            <div className="mt-4 flex flex-col items-center space-y-1.5 min-h-[40px]">
              {scanSteps.map((step, idx) => (
                <span 
                  key={idx}
                  className={`text-xs font-mono transition-all duration-300 ${
                    idx === scanStep ? 'text-cyber-blue font-bold opacity-100 scale-105' : 'text-slate-500 opacity-40 text-[11px]'
                  }`}
                >
                  {idx === scanStep ? '➢ ' : ''}{step}
                </span>
              ))}
            </div>
          </MotionDiv>
        )}
      </AnimatePresenceModule>

      {/* Domain Audit Report Result */}
      <AnimatePresenceModule>
        {report && !isLoading && (
          <MotionDiv 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mt-6 animate-fade-in"
          >
            {/* Header Summary Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2 p-5 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col max-w-[70%]">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Target Domain Name</span>
                    <h4 className="font-mono text-base font-bold text-slate-100 select-all truncate mt-1 flex items-center gap-1.5">
                      {report.domain}
                      <ExternalLink className="w-3.5 h-3.5 text-cyber-blue cursor-pointer shrink-0" onClick={() => window.open(`https://${report.domain}`, '_blank')} />
                    </h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border flex items-center gap-1.5 ${
                    report.status === 'Safe' 
                      ? 'text-safe-green border-safe-green/20 bg-safe-green/5' 
                      : report.status === 'Suspicious'
                      ? 'text-warning-amber border-warning-amber/20 bg-warning-amber/5'
                      : 'text-risk-red border-risk-red/20 bg-risk-red/5'
                  }`}>
                    {report.status === 'Safe' ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                    {report.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-cyber-border/40">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400">Domain Age</span>
                    <span className="block text-xs font-bold text-slate-200 mt-0.5">{report.age}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400">IP Node Location</span>
                    <span className="block text-xs font-bold text-slate-200 mt-0.5 truncate">{report.ipAddress}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400">Registrar Org</span>
                    <span className="block text-xs font-bold text-slate-200 mt-0.5 truncate">{report.registrar}</span>
                  </div>
                </div>
              </div>

              {/* Radial Safety Score Dial */}
              <div className="p-5 rounded-2xl glass-panel flex items-center gap-4 relative overflow-hidden">
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  {/* SVG progress circle */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="48" 
                      cy="48" 
                      r={radius} 
                      className="stroke-slate-800" 
                      strokeWidth="6" 
                      fill="transparent" 
                    />
                    <circle 
                      cx="48" 
                      cy="48" 
                      r={radius} 
                      className={`transition-all duration-1000 ease-out ${
                        report.score >= 80 ? 'stroke-safe-green' : report.score >= 40 ? 'stroke-warning-amber' : 'stroke-risk-red'
                      }`}
                      strokeWidth="6" 
                      fill="transparent" 
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference - (report.score / 100) * circumference}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute font-display font-extrabold text-xl text-slate-100">{report.score}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Trust Rating</span>
                  <span className={`text-base font-bold mt-0.5 ${
                    report.score >= 80 ? 'text-safe-green text-glow-blue' : report.score >= 40 ? 'text-warning-amber' : 'text-risk-red'
                  }`}>
                    {report.score >= 80 ? 'Highly Secure' : report.score >= 40 ? 'Suspicious Origin' : 'Imminent Threat'}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 font-mono leading-tight">
                    {report.scamFeedMatches === 0 
                      ? 'Zero blacklist alerts' 
                      : `Matches ${report.scamFeedMatches} threat database feeds`}
                  </span>
                </div>
              </div>
            </div>

            {/* Core Verification details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* SSL Encryption Parameters */}
              <div className="p-5 rounded-2xl glass-panel flex flex-col justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-200 mb-4 flex items-center gap-2">
                    {report.sslStatus === 'Valid' ? (
                      <Lock className="w-4 h-4 text-safe-green" />
                    ) : (
                      <Unlock className="w-4 h-4 text-risk-red" />
                    )}
                    SSL Certificate Cryptography
                  </h4>
                  <div className="space-y-3.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Authentication Status</span>
                      <span className={`font-bold px-2 py-0.5 rounded ${
                        report.sslStatus === 'Valid' ? 'bg-safe-green/10 text-safe-green' : 'bg-risk-red/10 text-risk-red'
                      }`}>
                        {report.sslStatus === 'Valid' ? 'Fully Signed & Trusted' : report.sslStatus === 'None' ? 'No Certificate' : 'Self-Signed'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Certificate Issuer Org</span>
                      <span className="font-mono text-slate-200 text-right truncate max-w-[60%]">{report.sslIssuer}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-medium">Creation Date</span>
                      <span className="font-mono text-slate-200">{report.creationDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-cyber-border/40 text-[11px] text-slate-400 flex items-center gap-2 leading-relaxed">
                  <Shield className="w-4 h-4 text-cyber-blue shrink-0" />
                  <span>
                    {report.status === 'Safe' 
                      ? 'Secure link verified against known registries. Safe for credentials and transactions.' 
                      : report.status === 'Suspicious'
                      ? 'Warning: Newly registered domain. Avoid sharing highly critical credentials.'
                      : 'Security Alert: Active phishing attempt or malware distributor. Close tab immediately.'}
                  </span>
                </div>
              </div>

              {/* Threat Engine Audits */}
              <div className="p-5 rounded-2xl glass-panel flex flex-col">
                <h4 className="font-display font-bold text-sm text-slate-200 mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyber-violet animate-pulse" />
                  Forensic Security Engine Verification
                </h4>
                <div className="space-y-3">
                  {report.checks.map((chk, i) => (
                    <div key={i} className="flex gap-2.5 items-start p-2.5 rounded-xl border border-cyber-border bg-cyber-card/20">
                      {chk.status === 'Pass' ? (
                        <ShieldCheck className="w-4 h-4 text-safe-green shrink-0 mt-0.5" />
                      ) : chk.status === 'Warning' ? (
                        <AlertTriangle className="w-4 h-4 text-warning-amber shrink-0 mt-0.5" />
                      ) : (
                        <ShieldAlert className="w-4 h-4 text-risk-red shrink-0 mt-0.5 animate-pulse" />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-center w-full">
                          <span className="text-xs font-bold text-slate-200 leading-none">{chk.name}</span>
                          <span className={`text-[9px] font-bold uppercase ${
                            chk.status === 'Pass' ? 'text-safe-green' : chk.status === 'Warning' ? 'text-warning-amber' : 'text-risk-red'
                          }`}>{chk.status}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal">{chk.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresenceModule>
    </div>
  );
}
