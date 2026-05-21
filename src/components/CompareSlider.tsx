import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, HelpCircle } from 'lucide-react';

export default function CompareSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSliding) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isSliding) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsSliding(false);

    if (isSliding) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isSliding]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyber-blue">
          <Eye className="w-4 h-4" />
          Interactive Forensics
        </span>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-safe-green"></span>
            Authentic Left
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-risk-red"></span>
            AI Generated Right
          </span>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative aspect-video w-full rounded-2xl overflow-hidden glass-panel glow-blue select-none cursor-ew-resize"
        onMouseDown={() => setIsSliding(true)}
        onTouchStart={() => setIsSliding(true)}
      >
        {/* Left Side Image (Authentic) */}
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200" 
          alt="Authentic Portrait" 
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
        
        {/* Real Badge */}
        <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-md glass-panel text-xs font-bold text-safe-green tracking-wider border border-safe-green/20">
          AUTHENTIC CAPTURE
        </div>

        {/* Right Side Image (Manipulated / AI-generated) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
        >
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200" 
            alt="AI Generated Portrait" 
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-95"
            style={{ width: containerRef.current?.getBoundingClientRect().width }}
            draggable="false"
          />
          
          {/* Deepfake thermal / forensic overlay map details on AI image */}
          <div className="absolute inset-0 bg-radial-gradient from-red-500/20 via-transparent to-transparent opacity-40 mix-blend-overlay pointer-events-none" />

          {/* AI Badge */}
          <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-md glass-panel text-xs font-bold text-risk-red tracking-wider border border-risk-red/20">
            AI SYNTHETIC GENERATION
          </div>
        </div>

        {/* Slider Handle Line */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyber-blue via-cyber-violet to-cyber-blue z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-cyber-dark border border-cyber-blue shadow-lg flex items-center justify-center pointer-events-auto">
            <div className="flex gap-0.5">
              <span className="block w-0.5 h-3 bg-cyber-blue rounded-full"></span>
              <span className="block w-0.5 h-3 bg-cyber-blue rounded-full"></span>
            </div>
          </div>
          <div className="absolute top-4 left-2 px-2 py-1 rounded bg-black/80 text-[10px] font-mono text-cyber-blue border border-cyber-blue/30 whitespace-nowrap pointer-events-none">
            Lens X: {Math.round(sliderPosition)}%
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2.5 p-3.5 rounded-xl border border-cyber-blue/10 bg-cyber-blue/5">
        <HelpCircle className="w-4 h-4 text-cyber-blue mt-0.5 shrink-0" />
        <p className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-cyber-blue">Drag the slider</strong> to see what our forensic AI detects. Note the synthetic smoothing around the hair follicles, inconsistent iris geometry, and frequency compression artifacts present in the right side.
        </p>
      </div>
    </div>
  );
}
