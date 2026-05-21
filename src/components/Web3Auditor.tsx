import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, ShieldAlert, ShieldCheck, Activity, Award, 
  Coins, ArrowDownUp, AlertTriangle, Cpu, ExternalLink, RefreshCw
} from 'lucide-react';

interface WalletAudit {
  address: string;
  status: 'Safe' | 'Suspicious' | 'High Risk';
  score: number;
  age: string;
  balance: string;
  txCount: number;
  risks: { name: string; level: 'Low' | 'Medium' | 'High'; description: string }[];
  history: { hash: string; type: string; value: string; fee: string; time: string; threat: 'None' | 'Moderate' | 'Malicious' }[];
}

export default function Web3Auditor() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [audit, setAudit] = useState<WalletAudit | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsLoading(true);
    setAudit(null);

    // Simulate search audit delay
    setTimeout(() => {
      setIsLoading(false);
      generateAudit(address);
    }, 1500);
  };

  const loadSample = (type: 'safe' | 'malicious') => {
    const addr = type === 'safe' 
      ? '0x71C7656EC7ab88b098defB751B7401B5f6d8976F' 
      : '0x9965503B1a05930302c1d859d9c84e8a05144580';
    setAddress(addr);
    setIsLoading(true);
    setAudit(null);
    setTimeout(() => {
      setIsLoading(false);
      generateAudit(addr);
    }, 1200);
  };

  const generateAudit = (addr: string) => {
    const isMalicious = addr.toLowerCase().startsWith('0x99') || 
                        addr.toLowerCase().includes('scam') || 
                        addr.toLowerCase().includes('hack');

    let status: 'Safe' | 'Suspicious' | 'High Risk' = 'Safe';
    let score = 94 - Math.floor(Math.random() * 8); // 86-94%
    let risks: WalletAudit['risks'] = [
      { name: 'Phishing Check', level: 'Low', description: 'Address is not flagged on Metamask or Etherscan phishing lists.' },
      { name: 'Tornado Cash Link', level: 'Low', description: 'No history of direct or indirect funding from privacy mixers.' },
      { name: 'Contract Deployments', level: 'Low', description: 'No malicious proxy smart contract deployments detected.' }
    ];

    let history: WalletAudit['history'] = [
      { hash: '0x3f5d...8e21', type: 'Transfer Out', value: '1.42 ETH', fee: '0.002 ETH', time: '12 mins ago', threat: 'None' },
      { hash: '0x9a8b...4f7c', type: 'Uniswap Swap', value: '450 USDC', fee: '0.005 ETH', time: '2 hours ago', threat: 'None' },
      { hash: '0x7c2e...1a4b', type: 'ERC20 Approve', value: 'Unlimited', fee: '0.001 ETH', time: '1 day ago', threat: 'None' }
    ];

    if (isMalicious) {
      status = 'High Risk';
      score = 14 + Math.floor(Math.random() * 12); // 14-26%
      risks = [
        { name: 'Phishing Check', level: 'High', description: 'Flagged on 3 local lists for malicious wallet drainer attachments.' },
        { name: 'Tornado Cash Link', level: 'High', description: 'Direct inbound transfer of 10 ETH from known Tornado mixer proxy.' },
        { name: 'Contract Deployments', level: 'Medium', description: 'Interacted with unverified proxy address containing dangerous transferFrom privileges.' }
      ];
      history = [
        { hash: '0xe83a...9f2a', type: 'Dapp Drainer', value: '4.88 ETH', fee: '0.012 ETH', time: '1 hour ago', threat: 'Malicious' },
        { hash: '0xc84c...7d3a', type: 'Tornado Cash In', value: '10.00 ETH', fee: '0.002 ETH', time: '4 hours ago', threat: 'Malicious' },
        { hash: '0xfa3d...1c2b', type: 'Uniswap Swap', value: '2,400 USDT', fee: '0.008 ETH', time: '1 day ago', threat: 'Moderate' }
      ];
    }

    setAudit({
      address: addr,
      status,
      score,
      age: isMalicious ? '18 days' : '3 years, 2 months',
      balance: isMalicious ? '14.88 ETH' : '154.21 ETH',
      txCount: isMalicious ? 24 : 1422,
      risks,
      history
    });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold mb-2 text-slate-100 flex items-center gap-2">
          <Coins className="w-5 h-5 text-cyber-blue" />
          On-Chain Web3 Safety Auditor
        </h3>
        <p className="text-sm text-slate-400">
          Enter an Ethereum wallet address or smart contract destination to audit holdings, malicious protocol linkages, and compliance scores.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-4 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search address (0x...) or domain name..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl glass-panel text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyber-blue/50 transition-all font-mono"
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-6 rounded-xl bg-cyber-blue/80 hover:bg-cyber-blue text-cyber-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all"
        >
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Audit'}
        </button>
      </form>

      {/* Preset Addresses */}
      {!audit && !isLoading && (
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => loadSample('safe')}
            className="px-3.5 py-2 rounded-lg border border-cyber-border bg-cyber-card/30 hover:border-safe-green/20 hover:bg-safe-green/[0.02] text-xs font-medium text-slate-300 transition-all"
          >
            Load Verified Whales (Safe)
          </button>
          <button 
            onClick={() => loadSample('malicious')}
            className="px-3.5 py-2 rounded-lg border border-cyber-border bg-cyber-card/30 hover:border-risk-red/20 hover:bg-risk-red/[0.02] text-xs font-medium text-slate-300 transition-all"
          >
            Load Tornado Cash Funding (Drainer)
          </button>
        </div>
      )}

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-10 rounded-2xl glass-panel flex flex-col items-center justify-center text-center mt-6"
          >
            <div className="relative w-12 h-12 mb-4">
              <div className="w-full h-full rounded-full border-4 border-cyber-blue/20 border-t-cyber-blue animate-spin" />
              <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-cyber-blue animate-pulse" />
            </div>
            <h4 className="font-display font-bold text-slate-200 text-sm">Querying Ethereum Mainnet Nodes</h4>
            <p className="text-xs text-slate-500 font-mono mt-1">Analyzing state tree, tracking receipt signatures...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audit Report Result */}
      <AnimatePresence>
        {audit && !isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mt-6"
          >
            {/* Top Score banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-2 p-5 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-mono text-slate-400">Audited Ethereum Address</span>
                    <h4 className="font-mono text-xs font-bold text-slate-100 select-all truncate mt-1 flex items-center gap-1.5">
                      {audit.address}
                      <ExternalLink className="w-3.5 h-3.5 text-cyber-blue cursor-pointer shrink-0" />
                    </h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border flex items-center gap-1.5 ${
                    audit.status === 'Safe' ? 'text-safe-green border-safe-green/20 bg-safe-green/5' : 'text-risk-red border-risk-red/20 bg-risk-red/5'
                  }`}>
                    {audit.status === 'Safe' ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                    {audit.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cyber-border/40">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400">Account Age</span>
                    <span className="block text-xs font-bold text-slate-200 mt-0.5">{audit.age}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400">Balance</span>
                    <span className="block text-xs font-bold text-slate-200 mt-0.5">{audit.balance}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400">Transactions</span>
                    <span className="block text-xs font-bold text-slate-200 mt-0.5">{audit.txCount} txs</span>
                  </div>
                </div>
              </div>

              {/* Wallet Score */}
              <div className="p-5 rounded-2xl glass-panel flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2">Compliance Score</span>
                <span className={`text-5xl font-display font-black leading-none mb-2 ${
                  audit.score >= 80 ? 'text-safe-green text-glow-blue' : 'text-risk-red'
                }`}>
                  {audit.score}%
                </span>
                <span className="text-xs text-slate-400">
                  {audit.score >= 80 ? 'Etherscan Trust Badge Verified' : 'High Phishing Association'}
                </span>
              </div>
            </div>

            {/* Risk Factor Checklist & Transaction Logs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Risk Factors */}
              <div className="p-5 rounded-2xl glass-panel flex flex-col">
                <h4 className="font-display font-bold text-sm text-slate-200 mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyber-violet" />
                  On-Chain Threat Audit Factors
                </h4>
                <div className="space-y-4">
                  {audit.risks.map((risk, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 rounded-xl border border-cyber-border bg-cyber-card/25">
                      {risk.level === 'High' ? (
                        <AlertTriangle className="w-4.5 h-4.5 text-risk-red shrink-0 mt-0.5 animate-pulse" />
                      ) : (
                        <ShieldCheck className="w-4.5 h-4.5 text-safe-green shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="flex justify-between items-center w-full">
                          <span className="text-xs font-bold text-slate-200">{risk.name}</span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            risk.level === 'High' ? 'bg-risk-red/10 text-risk-red' : 'bg-safe-green/10 text-safe-green'
                          }`}>{risk.level} Risk</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{risk.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transaction Integrity */}
              <div className="p-5 rounded-2xl glass-panel flex flex-col">
                <h4 className="font-display font-bold text-sm text-slate-200 mb-4 flex items-center gap-2">
                  <ArrowDownUp className="w-4 h-4 text-cyber-blue" />
                  Recent Transaction Ledger
                </h4>
                <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                  {audit.history.map((tx, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-cyber-border bg-cyber-card/20 text-xs">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-slate-300 font-bold">{tx.hash}</span>
                          <span className="text-[10px] text-slate-500 font-mono">({tx.time})</span>
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-0.5">{tx.type}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-slate-100 block">{tx.value}</span>
                        <span className={`text-[9px] font-bold px-1 rounded uppercase ${
                          tx.threat === 'Malicious' ? 'bg-risk-red/10 text-risk-red' : tx.threat === 'Moderate' ? 'bg-warning-amber/10 text-warning-amber' : 'bg-slate-800 text-slate-400'
                        }`}>{tx.threat}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
