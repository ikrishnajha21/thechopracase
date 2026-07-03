/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Compass, Shield, ShieldAlert, Crosshair, Map, Eye } from "lucide-react";
import { RidgeForestDiorama } from "./RidgeForestDiorama";

function AzimuthReadout() {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 4) % 360);
    }, 150); // Throttled to 150ms for maximum legibility and 90% CPU saving
    return () => clearInterval(interval);
  }, []);
  return <span>{angle}°</span>;
}

interface SatelliteRadarProps {
  language: "hi" | "en";
  focusPoint?: "branch215" | "branch227" | "default";
}

export function SatelliteRadar({ language, focusPoint = "default" }: SatelliteRadarProps) {
  const [activeTab, setActiveTab] = useState<"radar" | "3d">("radar");

  const getCoordinates = () => {
    if (focusPoint === "branch215") {
      return { 
        x: "38%", 
        y: "40%", 
        label: language === "hi" ? "रिज वन क्षेत्र" : "RIDGE FOREST AREA", 
        sub: language === "hi" ? "प्राथमिक खोज क्षेत्र" : "Primary Search Grid" 
      };
    }
    if (focusPoint === "branch227") {
      return { 
        x: "62%", 
        y: "48%", 
        label: language === "hi" ? "शव बरामदगी स्थल" : "DISCOVERY SITE", 
        sub: language === "hi" ? "फोरेंसिक अपराध स्थल" : "Forensic Crime Scene" 
      };
    }
    return { 
      x: "50%", 
      y: "50%", 
      label: language === "hi" ? "नई दिल्ली महानगर" : "NEW DELHI METROPOLIS", 
      sub: language === "hi" ? "राजधानी निगरानी क्षेत्र" : "Capital Surveillance Zone" 
    };
  };

  const coords = getCoordinates();

  return (
    <div className="w-full h-full bg-brand-bg relative flex flex-col items-center justify-between overflow-hidden border border-white/10 rounded-sm">
      {/* Top Toggle Bar */}
      <div className="w-full flex justify-between items-center p-3.5 border-b border-white/10 bg-black/40 z-20">
        <div className="flex items-center space-x-2">
          <Compass className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-300 font-bold">
            {language === "hi" ? "रिज वन स्थलाकृति सर्वेक्षण" : "RIDGE FOREST TOPO GRAPH"}
          </span>
        </div>
        
        <div className="flex space-x-1.5 bg-black/60 p-1 border border-white/10 rounded-sm">
          <button
            onClick={() => setActiveTab("radar")}
            className={`px-3 py-1 text-[9px] font-mono uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center space-x-1 ${
              activeTab === "radar"
                ? "bg-white/10 text-white font-extrabold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Crosshair className="w-3 h-3" />
            <span>{language === "hi" ? "राडार ग्रिड" : "Radar Grid"}</span>
          </button>
          
          <button
            onClick={() => setActiveTab("3d")}
            className={`px-3 py-1 text-[9px] font-mono uppercase tracking-wider rounded-sm transition-all cursor-pointer flex items-center space-x-1 ${
              activeTab === "3d"
                ? "bg-white/10 text-white font-extrabold"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Map className="w-3 h-3" />
            <span>{language === "hi" ? "3डी मॉडल" : "3D Diorama"}</span>
          </button>
        </div>
      </div>

      <div className="w-full flex-1 relative flex items-center justify-center min-h-[340px]">
        {activeTab === "3d" ? (
          <RidgeForestDiorama language={language} />
        ) : (
          <>
            <div className="grain"></div>
            {/* Blueprint Grid Lines */}
            <div className="absolute inset-0 blueprint-grid opacity-40" />

            {/* Outer Radar Rings */}
            <div className="w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-white/5 flex items-center justify-center relative">
              <div className="w-[180px] h-[180px] md:w-[260px] md:h-[260px] rounded-full border border-white/5 flex items-center justify-center">
                <div className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] rounded-full border border-white/5" />
              </div>

              {/* Crosshair Axes */}
              <div className="absolute inset-x-0 h-[1px] bg-white/5" />
              <div className="absolute inset-y-0 w-[1px] bg-white/5" />

              {/* Dynamic Sweeping line */}
              <div
                className="absolute w-1/2 h-[1px] bg-gradient-to-r from-transparent to-brand-accent/20 origin-left left-1/2 top-1/2 animate-spin"
                style={{ animationDuration: "5s" }}
              />

              {/* Pinpointed Location Mark */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-20 flex flex-col items-center"
                style={{ left: coords.x, top: coords.y }}
              >
                {/* Pulsing ring */}
                <span className="absolute -inset-3 rounded-full border border-brand-accent/30 animate-ping opacity-40" />
                
                {/* Marker dot */}
                <span className="w-5 h-5 rounded-full bg-white/10 border-2 border-brand-accent flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                  <Crosshair className="w-3.5 h-3.5 text-brand-accent animate-spin" style={{ animationDuration: "12s" }} />
                </span>

                {/* Floating Data Card */}
                <div className="mt-3 bg-brand-bg/95 border border-white/10 p-3 rounded shadow-2xl backdrop-blur-sm whitespace-nowrap text-left min-w-[150px] animate-fadeIn">
                  <div className="flex items-center space-x-1.5 text-brand-accent/50 mb-1">
                    <ShieldAlert className="w-3 h-3 text-red-500" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.15em] font-bold">
                      {language === "hi" ? "खोज क्षेत्र" : "SEARCH SECTOR"}
                    </span>
                  </div>
                  <h4 className="font-mono text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                    {coords.label}
                  </h4>
                  <span className="font-sans text-[8px] text-brand-accent/40 font-light">
                    {coords.sub}
                  </span>
                </div>
              </div>
            </div>

            {/* Tech Readout Overlay */}
            <div className="absolute bottom-4 left-4 font-mono text-[8px] text-brand-accent/40 space-y-0.5 pointer-events-none text-left">
              <div>SYS_STATUS: ACTIVE_MANHUNT</div>
              <div>GRID_SECTOR: D-28-E77</div>
              <div>AZIMUTH: <AzimuthReadout /></div>
              <div>FREQ_LOCK: 161.80MHZ</div>
            </div>

            <div className="absolute top-4 right-4 font-mono text-[8px] text-brand-accent/30 pointer-events-none text-right">
              <div>LAT: 28°35'21.1&quot;N</div>
              <div>LNG: 77°12'11.8&quot;E</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
