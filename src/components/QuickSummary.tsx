/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { HelpCircle, X, ShieldAlert, Clock, Award, Star } from "lucide-react";

interface QuickSummaryProps {
  language: "hi" | "en";
}

export function QuickSummary({ language }: QuickSummaryProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* FLOATING ACTION BUTTON (FAB) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-12 right-6 bg-red-600 hover:bg-red-500 active:scale-95 text-white rounded-full p-3.5 z-40 shadow-[0_0_15px_rgba(239,68,68,0.35)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] border border-red-700 transition-all duration-300 flex items-center justify-center group cursor-pointer"
        title={language === "hi" ? "केस का त्वरित विवरण" : "Quick 30-Second Case Summary"}
      >
        <HelpCircle className="w-5 h-5 stroke-[2.5]" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-mono text-[10px] uppercase font-black tracking-widest pl-0 group-hover:pl-2 text-white">
          {language === "hi" ? "केस संक्षेप" : "CASE RECAP"}
        </span>
      </button>

      {/* MINIMALIST OVERVIEW MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300 animate-fadeIn text-left select-none">
          <div
            className="bg-[#020202] border border-white/15 rounded-sm p-6 max-w-lg w-full relative shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grain & scanning details */}
            <div className="grain"></div>
            <div className="absolute top-0 right-0 p-3 flex space-x-1">
              <span className="font-mono text-[7px] text-zinc-500 uppercase tracking-widest font-bold font-mono">RECAP_PROTOCOL_V78</span>
            </div>

            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center space-x-2.5">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                <div>
                  <h4 className="font-serif text-lg text-white font-extrabold tracking-tight">
                    {language === "hi" ? "रंगा-बिल्ला मामला: 30 सेकंड का संक्षेप" : "The Ranga-Billa Case: 30s Recap"}
                  </h4>
                  <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                    {language === "hi" ? "पहली बार आने वालों के लिए मुख्य तथ्य" : "Core facts for first-time visitors"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 border border-white/10 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition cursor-pointer"
                aria-label="Close Summary Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 30-Second Bulleted Overview */}
            <div className="space-y-4 text-zinc-200">
              
              {/* Bullet 1 */}
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-white/5 border border-white/10 rounded p-1 text-red-500 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wide">
                    {language === "hi" ? "1. अपहरण (26 अगस्त 1978)" : "1. THE ABDUCTION (AUG 26, 1978)"}
                  </p>
                  <p className="font-sans text-xs text-zinc-200 leading-relaxed font-light mt-0.5 opacity-95">
                    {language === "hi"
                      ? "दो भाई-बहन गीता (16) और संजय चोपड़ा (14) दक्षिण दिल्ली में ऑल इंडिया रेडियो के लिए जाते समय एक सलेटी फिएट 1100 कार में लिफ्ट लेने के दौरान अगवा कर लिए गए।"
                      : "Siblings Geeta (16) and Sanjay Chopra (14) accepted a lift in a stolen grey Fiat 1100 in South Delhi while heading to record a radio broadcast."}
                  </p>
                </div>
              </div>

              {/* Bullet 2 */}
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-white/5 border border-white/10 rounded p-1 text-red-500 shrink-0">
                  <ShieldAlert className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wide">
                    {language === "hi" ? "2. शवों की बरामदगी (29 अगस्त 1978)" : "2. THE DISCOVERY (AUG 29, 1978)"}
                  </p>
                  <p className="font-sans text-xs text-zinc-200 leading-relaxed font-light mt-0.5 opacity-95">
                    {language === "hi"
                      ? "एक बड़े तलाशी अभियान के बाद, दोनों बच्चों के शव दिल्ली के अपर रिज जंगल में मिले, जिन पर उनकी बहादुरी और कड़े संघर्ष के निशान थे।"
                      : "After a massive manhunt, their bodies were discovered in Delhi's Upper Ridge Forest with evidence of valiant defensive struggle by both children."}
                  </p>
                </div>
              </div>

              {/* Bullet 3 */}
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-white/5 border border-white/10 rounded p-1 text-red-500 shrink-0">
                  <Star className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wide">
                    {language === "hi" ? "3. फोरेंसिक सबूत" : "3. FORENSIC CORRELATIONS"}
                  </p>
                  <p className="font-sans text-xs text-zinc-200 leading-relaxed font-light mt-0.5 opacity-95">
                    {language === "hi"
                      ? "लावारिस फिएट में मिले उंगलियों के निशान, खून के धब्बे और रंगा के जूतों पर लगे रिज जंगल की मिट्टी के वैज्ञानिक विश्लेषण ने अपराधियों को सीधे तौर पर अपराध स्थल से जोड़ दिया।"
                      : "Blood residue, latent fingerprints in the abandoned Fiat, and soil analysis of forest silt on Ranga's boots mapped the culprits directly to the crime scene."}
                  </p>
                </div>
              </div>

              {/* Bullet 4 */}
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-white/5 border border-white/10 rounded p-1 text-red-500 shrink-0">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-wide">
                    {language === "hi" ? "4. गिरफ्तारी और फांसी (1978 — 1982)" : "4. ARREST & EXECUTIONS (1978 — 1982)"}
                  </p>
                  <p className="font-sans text-xs text-zinc-200 leading-relaxed font-light mt-0.5 opacity-95">
                    {language === "hi"
                      ? "दोनों अपराधियों (रंगा और बिल्ला) को कालका मेल ट्रेन में पकड़ा गया, फास्ट-ट्रैक अदालत में मुकदमा चला और 31 जनवरी 1982 को तिहाड़ जेल में फांसी दी गई।"
                      : "The duo (Ranga and Billa) were intercepted on the Kalka Mail train, prosecuted in a fast-track trial, and executed at Tihar Jail on January 31, 1982."}
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/10 pt-4 mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest font-bold">
                HISTORICAL RECORD // GOVERNMENT ARCHIVE
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-white text-black hover:bg-zinc-200 active:scale-95 transition font-mono text-[10px] uppercase font-black py-2.5 px-4 rounded cursor-pointer"
              >
                {language === "hi" ? "समझ गया, केस का अध्ययन करें" : "UNDERSTOOD, ENTER DOSSIER"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
