/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { PRISON_HOTSPOTS } from "../data/storyData";
import { PrisonHotspot } from "../types";
import { ShieldAlert, Compass, AlertCircle } from "lucide-react";

interface PrisonCellProps {
  language: "hi" | "en";
}

export function PrisonCell({ language }: PrisonCellProps) {
  const [activeHotspot, setActiveHotspot] = useState<PrisonHotspot | null>(PRISON_HOTSPOTS[0]);

  return (
    <div className="w-full bg-brand-bg border border-white/10 rounded-sm overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[460px] relative text-left">
      <div className="grain"></div>
      {/* Background blueprint details */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:12px_12px] opacity-60 pointer-events-none" />

      {/* Blueprint Visual Side */}
      <div className="flex-1 bg-brand-bg p-6 flex flex-col justify-between relative min-h-[320px] select-none border-b lg:border-b-0 lg:border-r border-white/10 z-10">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2 text-brand-accent/60">
              <Compass className="w-4 h-4 text-red-600 animate-spin" style={{ animationDuration: "16s" }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
                {language === "hi" ? "वाहन का रेखाचित्र (ब्लूप्रिंट)" : "Schematic Vehicle Layout"}
              </span>
            </div>
            <span className="font-mono text-[9px] text-brand-accent/40 border border-white/10 px-2 py-0.5 rounded">
              VEHICLE_REF: FIAT_1100_STOLEN
            </span>
          </div>

          <p className="font-sans text-xs text-brand-accent/40 max-w-md font-light leading-relaxed">
            {language === "hi"
              ? "फिएट 1100 के इस फोरेंसिक रेखाचित्र पर मौजूद लाल बिंदुओं पर क्लिक करें या कर्सर ले जाएं ताकि मुख्य फोरेंसिक प्रमाणों का विश्लेषण किया जा सके।"
              : "Hover or click on the hot spots inside the forensic Fiat 1100 blueprint to examine critical pieces of crime scene evidence."}
          </p>
        </div>

        {/* Interactive Car Blueprint Layout Container */}
        <div className="my-8 w-full max-w-lg mx-auto aspect-video border border-dashed border-white/15 rounded bg-brand-bg/40 relative p-4 overflow-hidden flex items-center justify-center">
          {/* Car Chassis Body */}
          <div className="absolute inset-x-8 inset-y-6 border border-white/15 rounded-[40px_60px_60px_40px] bg-brand-bg/20 shadow-inner flex items-center justify-center">
            
            {/* Front Engine Bay Row (Right end) */}
            <div className="absolute right-0 top-0 bottom-0 w-[22%] border-l border-dashed border-white/10 flex items-center justify-center">
              <span className="font-mono text-[6px] tracking-[0.3em] text-brand-accent/20 rotate-90 uppercase">
                ENGINE_BAY
              </span>
            </div>

            {/* Dashboard & Windshield line */}
            <div className="absolute right-[22%] top-0 bottom-0 w-[1px] bg-white/20" />

            {/* Steering Wheel Representation */}
            <div className="absolute right-[28%] top-[25%] w-6 h-6 rounded-full border border-brand-accent/30 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
            </div>

            {/* Front Driver and Passenger Seats */}
            <div className="absolute right-[25%] left-[48%] top-2 bottom-2 grid grid-rows-2 gap-3 pointer-events-none opacity-15 p-2">
              <div className="border border-white/30 rounded flex items-center justify-center font-mono text-[6px] text-brand-accent/50">
                DRVR_ST
              </div>
              <div className="border border-white/30 rounded flex items-center justify-center font-mono text-[6px] text-brand-accent/50">
                PASS_ST
              </div>
            </div>

            {/* Rear Passenger Bench seat */}
            <div className="absolute left-[18%] right-[58%] top-3 bottom-3 border border-white/30 rounded-lg pointer-events-none opacity-15 flex items-center justify-center bg-white/5">
              <span className="font-mono text-[6px] tracking-[0.2em] text-brand-accent/40 rotate-90 uppercase">
                REAR_CABIN_BENCH
              </span>
            </div>

            {/* Rear Trunk compartment (Left end) */}
            <div className="absolute left-0 top-0 bottom-0 w-[15%] border-r border-dashed border-white/10 flex items-center justify-center">
              <span className="font-mono text-[6px] tracking-[0.3em] text-brand-accent/20 rotate-90 uppercase">
                TRUNK
              </span>
            </div>
          </div>

          {/* Interactive hotspot dots mapped on the blueprint */}
          {PRISON_HOTSPOTS.map((hotspot) => {
            const isActive = activeHotspot?.id === hotspot.id;
            return (
              <button
                key={hotspot.id}
                onClick={() => setActiveHotspot(hotspot)}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                style={{ left: `${hotspot.coordinates.x}%`, top: `${hotspot.coordinates.y}%` }}
              >
                {/* Ping ring */}
                <span
                  className={`absolute -inset-2.5 rounded-full border border-red-500 animate-ping opacity-0 group-hover:opacity-40 transition-opacity ${
                    isActive ? "opacity-30" : ""
                  }`}
                />

                {/* Main dot */}
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)] scale-110"
                      : "bg-brand-bg border border-white/20 text-red-500/80 hover:border-white/40 hover:text-red-500"
                  }`}
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                </span>

                {/* Hotspot Title tooltip */}
                <span className="absolute left-1/2 -translate-x-1/2 top-7 scale-0 group-hover:scale-100 bg-zinc-900 border border-white/10 text-[8px] font-mono uppercase tracking-[0.15em] text-brand-accent px-2 py-0.5 rounded whitespace-nowrap z-30 transition-transform">
                  {hotspot.title[language]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center text-brand-accent/40 font-mono text-[8px]">
          <span>CAR_L: 3.91 M (FIAT 1100)</span>
          <span>CAR_W: 1.46 M</span>
          <span>CAP_MAX: 4-5 PERS</span>
        </div>
      </div>

      {/* Narrative Info Side */}
      <div className="w-full lg:w-96 p-6 bg-brand-bg flex flex-col justify-between z-10 relative">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center space-x-2 text-brand-accent/50 mb-4">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
                {language === "hi" ? "फोरेंसिक जांच लॉग" : "Forensic Inspection Logs"}
              </span>
            </div>

            {activeHotspot ? (
              <div className="animate-fadeIn">
                <h4 className="font-serif text-lg text-brand-accent font-bold mb-3">
                  {activeHotspot.title[language]}
                </h4>
                <div className="text-brand-accent/60 text-xs leading-relaxed font-sans space-y-3 font-light opacity-95">
                  <p>{activeHotspot.description[language]}</p>
                </div>
              </div>
            ) : (
              <div className="text-brand-accent/40 text-xs flex items-center space-x-2 py-6 font-light">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span>
                  {language === "hi" ? "रेखाचित्र (ब्लूप्रिंट) पर एक बिंदु चुनें" : "Select a point on the blueprint"}
                </span>
              </div>
            )}
          </div>

          {/* Quick selection tabs */}
          <div className="mt-8 pt-4 border-t border-white/10">
            <span className="font-mono text-[9px] text-brand-accent/40 uppercase tracking-[0.2em] mb-2 block font-bold">
              {language === "hi" ? "मुख्य प्रमाण बिंदु" : "Evidence Points"}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {PRISON_HOTSPOTS.map((hotspot) => (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspot(hotspot)}
                  className={`text-[9px] font-mono px-2 py-1.5 rounded text-left transition cursor-pointer ${
                    activeHotspot?.id === hotspot.id
                      ? "bg-red-950/40 text-red-400 border border-red-900/40 font-bold"
                      : "bg-transparent text-brand-accent/40 border border-white/5 hover:text-brand-accent hover:border-white/15"
                  }`}
                >
                  • {hotspot.title[language].split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
