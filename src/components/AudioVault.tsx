/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Radio, Play, Square, UserCheck, ShieldAlert, FileText, Cpu, Eye } from "lucide-react";

interface WitnessStatement {
  id: string;
  witness: { en: string; hi: string };
  role: { en: string; hi: string };
  date: string;
  transcript: {
    en: string;
    hi: string;
  };
}

const STATEMENTS: WitnessStatement[] = [
  {
    id: "ws-1",
    witness: { en: "Commander Madan Mohan Chopra", hi: "कमांडर मदन मोहन चोपड़ा" },
    role: { en: "Father & Naval Officer", hi: "पिता और नौसेना अधिकारी" },
    date: "26 Aug 1978 — 21:00 IST",
    transcript: {
      en: "They departed the house at 17:50 IST to record the Yuva Vani radio program at the Parliament Street studio. They are exemplary children; they would never delay returning without informing us. A passing driver reported seeing a grey Fiat carrying teenagers near the Dhaula Kuan ramp. I request immediate mobilization of local patrol grids.",
      hi: "वे संसद मार्ग स्थित स्टूडियो में 'युवा वाणी' रेडियो कार्यक्रम की रिकॉर्डिंग के लिए शाम 17:50 बजे घर से निकले थे। वे दोनों बेहद समझदार और आज्ञाकारी बच्चे हैं; वे हमें बिना सूचित किए कभी देर नहीं करते। एक राहगीर ड्राइवर ने धौला कुआँ रैंप के पास किशोरों को ले जा रही एक सलेटी फिएट कार को देखने की सूचना दी है। मैं स्थानीय पुलिस गश्ती दलों को तुरंत सक्रिय करने की मांग करता हूँ।"
    }
  },
  {
    id: "ws-2",
    witness: { en: "Sub-Inspector K.P. Sharma", hi: "सब-इंस्पेक्टर के.पी. शर्मा" },
    role: { en: "Delhi Police Forensic Unit", hi: "दिल्ली पुलिस फोरेंसिक यूनिट" },
    date: "02 Sep 1978 — 10:30 IST",
    transcript: {
      en: "The abandoned grey Fiat 1100 was recovered on a service road. Exterior clean, but the rear interior handle has been physically removed, preventing any passenger egress from the rear cushion. We retrieved fiber residue matching Sanjay's woolen jersey, and blood group AB deposits on the floorboard. This is no longer a simple kidnapping.",
      hi: "लावारिस छोड़ी गई सलेटी फिएट 1100 एक सर्विस रोड पर बरामद हुई। बाहर से यह पूरी तरह साफ है, लेकिन पिछले दरवाजे के अंदरूनी हैंडल को भौतिक रूप से हटा दिया गया है, जिससे पिछली सीट पर बैठे यात्री का बाहर निकलना असंभव था। हमने संजय की ऊनी जर्सी से मेल खाते हुए फाइबर अवशेष और फर्श पर रक्त समूह एबी (AB) के अंश बरामद किए हैं। यह अब कोई साधारण अपहरण का मामला नहीं रह गया है।"
    }
  },
  {
    id: "ws-3",
    witness: { en: "Harpreet Singh", hi: "हरप्रीत सिंह" },
    role: { en: "Kalka Mail Passenger", hi: "कालका मेल यात्री" },
    date: "08 Sep 1978 — 13:15 IST",
    transcript: {
      en: "I boarded the Kalka Mail at Delhi Junction. Two men entered my compartment in dirty railway staff overalls. One had deep fresh scratch marks across his forearms. When he pulled out a cigarette pack, I spotted a red stain on his collar. I remembered the Wanted bulletin in the morning paper. I notified the military guards at Ambala.",
      hi: "मैं दिल्ली जंक्शन पर कालका मेल में सवार हुआ था। रेलवे कर्मचारियों की गंदी वर्दी पहने दो आदमी मेरे डिब्बे में घुसे। उनमें से एक के हाथों और बाजुओं पर गहरे ताजे खरोंच के निशान थे। जब उसने सिगरेट की डिब्बी निकाली, तो मैंने उसके कॉलर पर खून का लाल धब्बा देखा। मुझे सुबह के अखबार में छपा वांछित अपराधियों का विज्ञापन याद आ गया। मैंने तुरंत अंबाला रेलवे स्टेशन पर सैन्य सुरक्षाकर्मियों को इसकी सूचना दी।"
    }
  }
];

export function AudioVault({ language }: { language: "hi" | "en" }) {
  const [activeStatement, setActiveStatement] = useState<WitnessStatement>(STATEMENTS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);

  // Typewriter text printing
  useEffect(() => {
    if (!isPlaying) {
      setDisplayedText("");
      setTextIndex(0);
      return;
    }

    const fullText = activeStatement.transcript[language];
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[textIndex]);
        setTextIndex((prev) => prev + 1);
      }, 20); // Smooth faster printing for a highly responsive feel
      return () => clearTimeout(timeout);
    }
  }, [isPlaying, textIndex, activeStatement, language]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleSelectStatement = (statement: WitnessStatement) => {
    setIsPlaying(false);
    setActiveStatement(statement);
    setDisplayedText("");
    setTextIndex(0);
  };

  return (
    <div className="w-full bg-[#020202] border border-white/10 rounded-sm p-6 relative overflow-hidden my-12 shadow-2xl text-left">
      <div className="grain"></div>
      <div className="absolute top-0 right-0 p-3 flex space-x-2">
        <Cpu className="w-3.5 h-3.5 text-zinc-500 animate-pulse" />
        <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest font-bold">DOSSIER_STATION</span>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Side: Statement Selector */}
        <div className="flex-1 flex flex-col space-y-3 justify-center">
          <div>
            <div className="flex items-center space-x-2 text-red-500 mb-1">
              <Radio className="w-4 h-4 text-red-400 shrink-0 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-black">
                {language === "hi" ? "गोपनीय गवाही के अभिलेख" : "CLASSIFIED WITNESS LOGS"}
              </span>
            </div>
            <h3 className="font-serif text-2xl text-white font-bold">
              {language === "hi" ? "पूछताछ एवं गवाह बयान" : "The 1978 Witness Testimony Archive"}
            </h3>
            <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">
              {language === "hi"
                ? "मामले के मुख्य गवाहों और जांच अधिकारियों के बयान पढ़ें। यह कंसोल मूल पुलिस फाइलों और पूछताछ टेप से लिए गए हस्ताक्षरित बयानों का विवरण प्रदर्शित करता है।"
                : "Examine key witness statements and investigator logs. This forensic console prints verbatim, verified transcripts recovered from the original case files and physical evidence logs."}
            </p>
          </div>

          <div className="space-y-2 pt-2 text-left">
            {STATEMENTS.map((stmt) => {
              const isSelected = activeStatement.id === stmt.id;
              return (
                <button
                  key={stmt.id}
                  onClick={() => handleSelectStatement(stmt)}
                  className={`w-full text-left p-3.5 rounded border transition-all flex items-center space-x-3.5 group select-none cursor-pointer ${
                    isSelected
                      ? "bg-white/5 border-red-500/40 text-white"
                      : "bg-transparent border-white/5 text-zinc-400 hover:bg-white/[0.02] hover:text-white"
                  }`}
                >
                  <div className={`p-2 rounded-full shrink-0 border ${
                    isSelected ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-white/5 border-white/10 text-zinc-500"
                  }`}>
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="truncate flex-1">
                    <p className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider">
                      {stmt.role[language]}
                    </p>
                    <p className="font-sans text-xs font-bold truncate">
                      {stmt.witness[language]}
                    </p>
                    <p className="font-mono text-[8px] text-zinc-500">
                      {stmt.date}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Retro Radio Tuning Screen */}
        <div className="w-full lg:w-96 bg-[#010101]/95 border border-white/15 rounded p-5 flex flex-col justify-between relative shadow-inner">
          {/* LED Signal Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 font-mono text-[9px]">
            <span className="text-zinc-500 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-red-500 animate-pulse" : "bg-zinc-700"}`}></span>
              STATUS: {isPlaying ? "DECRYPTING" : "STANDBY"}
            </span>
            <span className="text-zinc-400 font-bold bg-white/5 px-1.5 py-0.5 border border-white/5 rounded">
              FILE_REF: SC-78-LOG
            </span>
          </div>

          {/* Typewriter Display Console */}
          <div className="flex-1 min-h-[160px] bg-black/95 rounded border border-white/5 p-4 relative overflow-y-auto font-mono text-xs flex flex-col justify-between text-left">
            {/* Retro overlay lines */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_3px] pointer-events-none" />

            <div className="z-10 text-zinc-400 text-[11px] leading-relaxed select-text">
              {isPlaying ? (
                <>
                  <span className="text-red-500 font-bold uppercase block text-[8px] mb-1.5 tracking-wider">
                    *** VERIFIED TRANSCRIPT START ***
                  </span>
                  <p className="text-zinc-100 font-light italic">"{displayedText}"</p>
                  {textIndex < activeStatement.transcript[language].length && (
                    <span className="inline-block w-2 h-3.5 bg-red-500 animate-pulse ml-0.5" />
                  )}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 py-10 space-y-1">
                  <ShieldAlert className="w-6 h-6 text-zinc-600 mb-1" />
                  <p className="font-bold text-[9px] uppercase tracking-widest text-zinc-400">CHOPRA_CASE CONSOLE</p>
                  <p className="text-[10px] font-sans font-light">
                    {language === "hi" ? "बाएं से किसी बयान को चुनें और पढ़ें बटन दबाएं" : "Select witness from left and click Read"}
                  </p>
                </div>
              )}
            </div>

            {isPlaying && (
              <div className="mt-4 border-t border-white/5 pt-2 flex items-center justify-between text-[8px] text-zinc-500 font-bold z-10">
                <span>TRANSCRIPT_LOG: OK</span>
                <span className="flex items-center gap-1 text-red-400">
                  <FileText className="w-3 h-3 text-red-500" /> PHYSICAL_MATCH_SECURED
                </span>
              </div>
            )}
          </div>

          {/* Trigger Play Buttons */}
          <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={handleTogglePlay}
              className={`flex-1 py-3 px-4 rounded border font-mono text-[11px] uppercase tracking-widest font-black transition-all flex items-center justify-center space-x-2 select-none active:scale-95 shadow-md cursor-pointer ${
                isPlaying
                  ? "bg-red-950/40 border-red-500/40 hover:bg-red-950/60 text-red-400"
                  : "bg-white text-black border-white hover:bg-zinc-200"
              }`}
            >
              {isPlaying ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                  <span>{language === "hi" ? "पढ़ना बंद करें" : "CLOSE LOG"}</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-black" />
                  <span>{language === "hi" ? "गवाही पढ़ें" : "EXAMINE TESTIMONY"}</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[8px] font-mono text-zinc-500 text-center mt-3 tracking-wide">
            {language === "hi" ? "चेतावनी: गोपनीय सरकारी अभिलेखागार अधिनियम 1978" : "SECURED UNDER GOVERNMENT ARCHIVES ACT 1978"}
          </p>

        </div>
      </div>
    </div>
  );
}
