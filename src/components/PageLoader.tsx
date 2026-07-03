/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Shield, Lock, Unlock, RefreshCw, Radio, FileLock, Terminal } from "lucide-react";

interface PageLoaderProps {
  onComplete: () => void;
}

export function PageLoader({ onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [decryptStarted, setDecryptStarted] = useState(false);

  const steps = [
    { text: "ESTABLISHING SECURE CONNECTION TO NEW DELHI CRIME ARCHIVES", delay: 350 },
    { text: "MOUNTING CASE FILE Ref: SC-78-291 [CHOPRA SIBLINGS]", delay: 400 },
    { text: "RECOVERING FORENSIC DATA FOR VEHICLE FIAT 1100 [DLH-75]", delay: 500 },
    { text: "SYNCHRONIZING SATELLITE RADAR FOR RIDGE FOREST SECTOR", delay: 400 },
    { text: "DECRYPTION INTEGRITY VERIFIED. SYSTEM ACCESS AUTHORIZED.", delay: 300 }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let isMounted = true;

    const runLoading = async () => {
      let currentProgress = 0;
      for (let i = 0; i < steps.length; i++) {
        if (!isMounted) return;
        setCurrentStep(i);
        const stepDuration = steps[i].delay;
        const subSteps = 8;
        const increment = 100 / steps.length / subSteps;
        
        for (let j = 0; j < subSteps; j++) {
          if (!isMounted) return;
          await new Promise((resolve) => {
            timer = setTimeout(resolve, stepDuration / subSteps);
          });
          currentProgress += increment;
          if (isMounted) {
            setProgress(Math.min(Math.round(currentProgress), 100));
          }
        }
      }
      if (isMounted) {
        setIsLoaded(true);
      }
    };

    runLoading();
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const handleEnter = () => {
    setDecryptStarted(true);
    // Smooth transition delay
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#000000] text-brand-accent flex flex-col justify-between p-8 md:p-16 transition-all duration-1000 select-none ${
        decryptStarted ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Texture grain and retro overlay effects */}
      <div className="grain"></div>
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
      <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none" />

      {/* Retro scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none opacity-70 z-20" />

      {/* Header telemetry */}
      <div className="flex justify-between items-start font-mono text-[9px] text-brand-accent/40 z-10">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="tracking-[0.25em] font-extrabold text-red-500/80">MINISTRY OF HOME AFFAIRS // GOVERNMENT OF INDIA</span>
        </div>
        <div className="text-right tracking-[0.1em] hidden sm:block">
          <div>SECURITY_PROTOCOL: HIGH-CONFIDENTIAL</div>
          <div>ESTABLISHED: 1978_ARCHIVE</div>
        </div>
      </div>

      {/* Central decrypted dossier aesthetic loader */}
      <div className="max-w-xl w-full mx-auto my-auto z-10 flex flex-col items-center text-center">
        {/* Glowing radar/dossier scan circle */}
        <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-red-500/10 animate-ping" />
          <div className="absolute inset-1.5 rounded-full border border-dashed border-red-500/30 animate-spin" style={{ animationDuration: "10s" }} />
          <div className="absolute inset-4 rounded-full border border-red-500/20" />
          <div className="absolute inset-6 rounded-full bg-red-500/[0.03] border border-red-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            {isLoaded ? (
              <Unlock className="w-7 h-7 text-red-500 animate-bounce" />
            ) : (
              <Lock className="w-7 h-7 text-red-500/60 animate-pulse" />
            )}
          </div>
        </div>

        {/* Dynamic Decrypt status titles */}
        <h2 className="font-serif text-2xl md:text-3xl font-black tracking-tight mb-3 text-white">
          {isLoaded ? "DOSSIER READY FOR EXAMINATION" : "DECRYPTING EVIDENCE DOSSIER"}
        </h2>
        
        {/* Terminal readout box */}
        <div className="w-full bg-black/80 border border-white/10 rounded-sm p-5 mb-8 font-mono text-[10px] text-left leading-relaxed min-h-[115px] flex flex-col justify-between shadow-2xl relative">
          <div className="absolute top-0 right-0 p-2 text-[8px] text-white/20 flex items-center gap-1">
            <Terminal className="w-3 h-3" /> SECURITY_SHELL
          </div>
          <div className="space-y-1.5 text-zinc-300">
            {steps.slice(0, currentStep + 1).map((step, idx) => {
              const isLast = idx === currentStep;
              return (
                <div key={idx} className="flex items-start space-x-2 animate-fadeIn">
                  <span className="text-red-500 font-bold">[{idx + 1}]</span>
                  <span className={isLast ? "text-white font-medium" : "text-zinc-500"}>
                    {step.text}
                  </span>
                  {isLast && !isLoaded && (
                    <span className="inline-block w-1.5 h-3.5 bg-red-500 animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-3 text-white/30 text-[9px]">
            <div className="flex items-center space-x-1.5">
              <Radio className="w-3 h-3 text-red-500/50 animate-pulse" />
              <span>STATION: DELHI_POLICE_HQ_CENTRAL</span>
            </div>
            <span className="text-red-500/60 font-bold">DEC_SIG: VERIFIED</span>
          </div>
        </div>

        {/* Modern styled progress bar */}
        <div className="w-full space-y-2 mb-10">
          <div className="flex justify-between font-mono text-[9px] text-zinc-400">
            <span className="uppercase tracking-widest text-zinc-500">Decryption Index</span>
            <span className="font-bold text-red-500">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Prompt Enter Action */}
        {isLoaded && (
          <button
            onClick={handleEnter}
            className="w-full max-w-sm inline-flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-mono text-[10px] uppercase tracking-[0.25em] px-8 py-4.5 rounded-sm shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] transition-all border border-red-500 font-black cursor-pointer group animate-fadeIn"
          >
            <FileLock className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform duration-300" />
            <span>Open Confidential Archives</span>
          </button>
        )}
      </div>

      {/* Footer classification markings */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-brand-accent/20 font-mono text-[8px] tracking-widest border-t border-white/5 pt-6 z-10 gap-2 text-center sm:text-left">
        <span>CLASSIFIED INFORMATION // DO NOT DUPLICATE</span>
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-3 h-3 animate-spin text-zinc-600" style={{ animationDuration: "8s" }} />
          <span>DECRYPTION v3.14.78</span>
        </div>
      </div>
    </div>
  );
}
