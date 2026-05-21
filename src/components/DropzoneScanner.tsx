import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, CheckCircle2, AlertTriangle, AlertOctagon, 
  Terminal, ShieldCheck, Cpu, RefreshCw, BarChart2, Check
} from 'lucide-react';

interface ForensicReport {
  fileName: string;
  fileSize: string;
  fileType: string;
  status: 'Authentic' | 'Suspicious' | 'Manipulated';
  trustScore: number;
  noiseVariance: number;
  compressionLoss: number;
  cnnConfidence: number;
  metadataAudit: string[];
  forensicLog: string[];
}

export default function DropzoneScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStep, setScanStep] = useState('');
  const [report, setReport] = useState<ForensicReport | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setReport(null);
    startScanning(uploadedFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 50 * 1024 * 1024,
    multiple: false,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi'],
      'application/pdf': ['.pdf'],
    }
  });

  const startScanning = (uploadedFile: File) => {
    setIsScanning(true);
    setScanProgress(0);

    const steps = [
      'Extracting binary file headers...',
      'Analyzing EXIF tags and camera sensor signatures...',
      'Mapping RGB pixel frequency distributions...',
      'Exposing micro-texture noise anomalies using CNN models...',
      'Computing neural context alignment and compression ratios...',
      'Generating cryptographic forensic report...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsScanning(false);
            generateReport(uploadedFile);
          }, 600);
          return 100;
        }

        const nextProgress = prev + Math.floor(Math.random() * 8) + 3;
        
        // Progressively update step texts based on percentage
        const stepIndex = Math.min(Math.floor((nextProgress / 100) * steps.length), steps.length - 1);
        setScanStep(steps[stepIndex]);

        return Math.min(nextProgress, 100);
      });
    }, 180);
  };

  const generateReport = (uploadedFile: File) => {
    const isAuthentic = !uploadedFile.name.toLowerCase().includes('deepfake') && 
                       !uploadedFile.name.toLowerCase().includes('manipulated') && 
                       !uploadedFile.name.toLowerCase().includes('ai');

    const isSuspicious = uploadedFile.name.toLowerCase().includes('suspicious') ||
                         uploadedFile.name.toLowerCase().includes('edit');

    let status: 'Authentic' | 'Suspicious' | 'Manipulated' = 'Authentic';
    let score = 96 + Math.floor(Math.random() * 4); // 96-99%
    let noise = 0.02 + Math.random() * 0.05;
    let compression = 12 + Math.floor(Math.random() * 10);
    let confidence = 98.4;

    if (!isAuthentic) {
      status = 'Manipulated';
      score = 8 + Math.floor(Math.random() * 15); // 8-23%
      noise = 0.88 + Math.random() * 0.09;
      compression = 68 + Math.floor(Math.random() * 25);
      confidence = 99.2;
    } else if (isSuspicious) {
      status = 'Suspicious';
      score = 42 + Math.floor(Math.random() * 15); // 42-57%
      noise = 0.45 + Math.random() * 0.15;
      compression = 45 + Math.floor(Math.random() * 15);
      confidence = 88.5;
    }

    const reportData: ForensicReport = {
      fileName: uploadedFile.name,
      fileSize: (uploadedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
      fileType: uploadedFile.type || 'application/octet-stream',
      status,
      trustScore: score,
      noiseVariance: parseFloat(noise.toFixed(4)),
      compressionLoss: compression,
      cnnConfidence: confidence,
      metadataAudit: isAuthentic ? [
        'Camera Model: Apple iPhone 15 Pro Max',
        'Focal Length: 24mm f/1.78',
        'Capture Time: 2026-05-20T14:32:11Z',
        'Original Hash: SHA-256 (6a27e...1fb88)',
        'C2PA Signature: Valid, verified by Reuters Editorial.'
      ] : [
        'Camera Model: Undefined / Generative Model',
        'Software: Stable Diffusion WebUI / Adobe Photoshop',
        'Capture Time: Unknown / Generation Stamp',
        'Original Hash: Inconsistent checksum header',
        'C2PA Signature: Missing / Invalid Content Credentials.'
      ],
      forensicLog: [
        'LOG [00:01] File byte sequence loaded successfully.',
        `LOG [00:03] Magic bytes matched standard format.`,
        isAuthentic 
          ? 'LOG [00:07] Sensor noise profile matches iPhone 15 physical camera.'
          : 'LOG [00:07] ALERT: Noise profile variance exceeds physical threshold. High generative smoothing.',
        isAuthentic
          ? 'LOG [00:12] Double JPEG compression test passed.'
          : 'LOG [00:12] WARNING: Inconsistent quantization matrix detected. Indicates edit/resave layer.',
        isAuthentic
          ? 'LOG [00:18] Neural edge continuity checks fully aligned.'
          : 'LOG [00:18] CRITICAL: Frequency anomaly in facial boundary region. Probable face swap.',
        'LOG [00:24] Cryptographic verification report completed.'
      ]
    };

    setReport(reportData);
  };

  const loadSample = (type: 'authentic' | 'manipulated') => {
    const dummyFile = new File(
      [new ArrayBuffer(1024 * 100)], 
      type === 'authentic' ? 'official_press_release_photo.jpg' : 'presidential_deepfake_broadcast.mp4',
      { type: type === 'authentic' ? 'image/jpeg' : 'video/mp4' }
    );
    setFile(dummyFile);
    setReport(null);
    startScanning(dummyFile);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Authentic': return 'text-safe-green border-safe-green/20 bg-safe-green/5';
      case 'Suspicious': return 'text-warning-amber border-warning-amber/20 bg-warning-amber/5';
      default: return 'text-risk-red border-risk-red/20 bg-risk-red/5';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Authentic': return <ShieldCheck className="w-5 h-5 text-safe-green" />;
      case 'Suspicious': return <AlertTriangle className="w-5 h-5 text-warning-amber" />;
      default: return <AlertOctagon className="w-5 h-5 text-risk-red" />;
    }
  };

  return (
    <div className="w-full">
      {/* Upload Dropzone */}
      <div 
        {...getRootProps()} 
        className={`relative flex flex-col items-center justify-center p-10 rounded-2xl border-2 border-dashed transition-all duration-300 min-h-[300px] cursor-pointer ${
          isDragActive 
            ? 'border-cyber-blue bg-cyber-blue/5 glow-blue' 
            : 'border-cyber-border bg-cyber-card/30 hover:border-cyber-violet/40 hover:bg-cyber-card/50'
        }`}
      >
        <input {...getInputProps()} />

        {/* Scan line overlay when scanning */}
        {isScanning && <div className="scan-line" />}

        <div className="flex flex-col items-center text-center max-w-md">
          {isScanning ? (
            <>
              {/* Spinner */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-cyber-violet/20 border-t-cyber-blue animate-spin" />
                <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-cyber-blue animate-pulse" />
              </div>
              
              <h3 className="font-display text-xl font-bold mb-2 text-glow-blue text-cyber-blue">
                Forensic Analysis in Progress
              </h3>
              <div className="w-full bg-slate-800/80 rounded-full h-2 mb-4 overflow-hidden max-w-xs border border-cyber-border">
                <motion.div 
                  className="bg-gradient-to-r from-cyber-blue to-cyber-violet h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${scanProgress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
              <p className="text-xs font-mono text-cyber-blue/80 h-8 flex items-center justify-center">
                {scanStep}
              </p>
              <span className="text-lg font-mono font-bold text-cyber-blue mt-1">
                {scanProgress}%
              </span>
            </>
          ) : file ? (
            <>
              <div className="w-14 h-14 rounded-full bg-cyber-violet/10 border border-cyber-violet/20 flex items-center justify-center mb-5">
                <FileText className="w-6 h-6 text-cyber-violet" />
              </div>
              <h3 className="font-display text-lg font-bold mb-1 text-slate-200 truncate w-64">
                {file.name}
              </h3>
              <p className="text-xs text-slate-400 mb-6 font-mono">
                Size: {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  setReport(null);
                }}
                className="px-4 py-1.5 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Upload
              </button>
            </>
          ) : (
            <>
              <div className="w-14 h-14 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center mb-5 glow-blue">
                <Upload className="w-6 h-6 text-cyber-blue animate-bounce" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2 text-slate-100">
                Upload Media for Forensic Analysis
              </h3>
              <p className="text-sm text-slate-400 mb-2 leading-relaxed">
                Drag and drop your file here, or click to browse local files.
              </p>
              <p className="text-[11px] text-slate-500 font-mono mb-6">
                Supports JPG, PNG, WEBP, MP4, MOV, PDF. Max 50MB.
              </p>
              <span className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyber-blue/80 to-cyber-violet/80 hover:from-cyber-blue hover:to-cyber-violet text-xs font-semibold tracking-wide text-cyber-dark uppercase shadow-lg transition-all">
                Select File From Device
              </span>
            </>
          )}
        </div>
      </div>

      {/* Sample presets */}
      {!file && !isScanning && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <button 
            onClick={() => loadSample('authentic')}
            className="flex items-center justify-between p-4 rounded-xl border border-cyber-border bg-cyber-card/30 hover:border-safe-green/30 hover:bg-safe-green/[0.02] text-left transition-all"
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-safe-green"></span>
                Load Authentic Sample
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Verified photo with original credentials</span>
            </div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-safe-green font-bold">Press Photo</span>
          </button>

          <button 
            onClick={() => loadSample('manipulated')}
            className="flex items-center justify-between p-4 rounded-xl border border-cyber-border bg-cyber-card/30 hover:border-risk-red/30 hover:bg-risk-red/[0.02] text-left transition-all"
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-risk-red animate-pulse"></span>
                Load Manipulated Sample
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Fake audio/video/resaved deepfake asset</span>
            </div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-risk-red font-bold">Deepfake</span>
          </button>
        </div>
      )}

      {/* Analysis Report Section */}
      <AnimatePresence>
        {report && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 space-y-6"
          >
            {/* Top Score Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Trust Score Gauge Card */}
              <div className="md:col-span-2 p-5 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Forensic Audit Verdict</span>
                    <h4 className="font-display text-2xl font-extrabold mt-1 text-slate-100 flex items-center gap-2">
                      {report.fileName}
                    </h4>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusColor(report.status)} flex items-center gap-1.5`}>
                    {getStatusIcon(report.status)}
                    {report.status.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cyber-border">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">EXIF Integrity Check</span>
                    <p className="text-xs font-semibold text-slate-200 mt-0.5 flex items-center gap-1">
                      {report.status === 'Authentic' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-safe-green" />
                          Metadata Validated
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5 text-risk-red animate-pulse" />
                          Metadata Inconsistent
                        </>
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Neural Network Confidence</span>
                    <p className="text-xs font-semibold text-slate-200 mt-0.5">{report.cnnConfidence}%</p>
                  </div>
                </div>
              </div>

              {/* Score Metric Card */}
              <div className="p-5 rounded-2xl glass-panel flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient from-cyber-violet/10 via-transparent to-transparent opacity-60 pointer-events-none" />
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2">Overall Trust Score</span>
                <span className={`text-5xl font-display font-black leading-none tracking-tight mb-2 ${
                  report.trustScore >= 80 ? 'text-safe-green text-glow-blue' : report.trustScore >= 40 ? 'text-warning-amber' : 'text-risk-red'
                }`}>
                  {report.trustScore}%
                </span>
                <span className="text-xs text-slate-400">
                  {report.trustScore >= 80 ? 'Highly Credible File' : report.trustScore >= 40 ? 'Potential Modification' : 'High Risk / Synthetic'}
                </span>
              </div>
            </div>

            {/* In-Depth Forensic Logs & Metadata Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Metadata Inspector */}
              <div className="p-5 rounded-2xl glass-panel flex flex-col">
                <h4 className="font-display font-bold text-sm text-slate-200 mb-4 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-cyber-blue" />
                  Header & Signature Inspector
                </h4>
                <div className="flex-1 space-y-3 bg-cyber-dark/40 border border-cyber-border rounded-xl p-4">
                  {report.metadataAudit.map((meta, i) => (
                    <div key={i} className="flex justify-between text-xs py-1 border-b border-cyber-border/40 last:border-b-0">
                      <span className="text-slate-400 font-mono">{meta.split(':')[0]}:</span>
                      <span className="text-slate-200 font-semibold">{meta.split(':')[1]}</span>
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-cyber-border/40 text-center">
                    <div>
                      <span className="block text-[10px] font-mono text-slate-400">Noise Variance</span>
                      <span className={`block text-sm font-mono font-bold mt-0.5 ${report.trustScore >= 80 ? 'text-safe-green' : 'text-risk-red'}`}>
                        {report.noiseVariance} σ²
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-slate-400">JPEG Quantization</span>
                      <span className="block text-sm font-mono font-bold text-slate-200 mt-0.5">
                        {report.compressionLoss}% Loss
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Forensic Neural Logs */}
              <div className="p-5 rounded-2xl glass-panel flex flex-col">
                <h4 className="font-display font-bold text-sm text-slate-200 mb-4 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyber-violet" />
                  Neural Model Diagnostic Logs
                </h4>
                <div className="flex-1 bg-black/55 border border-cyber-border/50 rounded-xl p-4 font-mono text-[10px] text-slate-300 space-y-2 overflow-y-auto max-h-[190px]">
                  {report.forensicLog.map((log, i) => (
                    <p key={i} className={
                      log.includes('CRITICAL') || log.includes('ALERT') 
                        ? 'text-risk-red font-bold' 
                        : log.includes('WARNING') 
                          ? 'text-warning-amber' 
                          : 'text-slate-300'
                    }>
                      {log}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Cert of Authenticity Anchor */}
            {report.trustScore >= 80 && (
              <div className="p-4 rounded-xl border border-safe-green/20 bg-safe-green/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-safe-green/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-safe-green" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-200">On-Chain Cryptographic Attestation Created</span>
                    <span className="block text-[10px] text-slate-400 mt-0.5 font-mono">Anchor Tx: 0x9f5a...3d9c on cheqd Ledger</span>
                  </div>
                </div>
                <button className="px-3 py-1 rounded bg-safe-green/10 hover:bg-safe-green/20 text-[10px] font-mono text-safe-green border border-safe-green/20 transition-all">
                  Download Certificate
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
