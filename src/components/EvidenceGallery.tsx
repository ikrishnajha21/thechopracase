/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, MouseEvent } from "react";
import { ArrowLeft, ArrowRight, FileText, Camera, Paperclip, ShieldAlert, ZoomIn, Eye, Layers } from "lucide-react";

interface GalleryItem {
  id: string;
  title: { en: string; hi: string };
  date: string;
  category: "Clipping" | "Document" | "Diagram";
  desc: { en: string; hi: string };
  snippet: { en: string; hi: string };
}

interface EvidenceGalleryProps {
  language: "hi" | "en";
}

export function EvidenceGallery({ language }: EvidenceGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lensPos, setLensPos] = useState<{ x: number; y: number } | null>(null);
  const [activeFilter, setActiveFilter] = useState<"All" | "Document" | "Clipping" | "Diagram">("All");
  const [lensMode, setLensMode] = useState<"magnifier" | "crime-scene" | "none">("magnifier");

  const secretTags: Record<string, { en: string; hi: string; code: string }> = {
    "exhibit-a": {
      en: "★ FORGED LEDGER // MATCHED INK // SECURED SIGNATURE",
      hi: "★ जाली बहीखाता // मिलान स्याही // सुरक्षित हस्ताक्षर",
      code: "FINGERPRINT_R_01"
    },
    "exhibit-b": {
      en: "★ WEAPON PATH // DIRECTIONAL BLOOD SPATTER // ANGLE: 45°",
      hi: "★ हथियार पथ // दिशात्मक रक्त छींटे // कोण: 45°",
      code: "SPATTER_A_22"
    },
    "exhibit-c": {
      en: "★ REMOVED HANDLE // INTERIOR LOCK MANIPULATION DETECTED",
      hi: "★ हटाया गया हैंडल // आंतरिक लॉक हेरफेर का पता चला",
      code: "FIAT_LOCK_89"
    },
    "exhibit-d": {
      en: "★ TIMELINE TRACE // TRAIN PATH AMBALA PLATFORM 3 SECURED",
      hi: "★ टाइमलाइन ट्रेस // ट्रेन पथ अंबाला प्लेटफॉर्म 3 सुरक्षित",
      code: "TRACK_AMB_03"
    },
    "exhibit-e": {
      en: "★ COURT CLASSIFIED SEAL // ACCUSED CONFESSIONS MATCHED",
      hi: "★ कोर्ट वर्गीकृत सील // आरोपी का कबूलनामा मिलान किया गया",
      code: "SEAL_VERDICT_HC"
    },
    "exhibit-f": {
      en: "★ SOIL RESIDUE // HIMALAYAN PINE SILICA DETECTED // SECTOR 4",
      hi: "★ मिट्टी के अवशेष // हिमालयी पाइन सिलिका पाई गई // सेक्टर 4",
      code: "SOIL_PIN_04"
    }
  };

  const items: GalleryItem[] = [
    {
      id: "exhibit-a",
      title: {
        en: "FIR No. 248 - Kidnapping Report",
        hi: "एफआईआर नंबर 248 - अपहरण रिपोर्ट"
      },
      date: "August 27, 1978",
      category: "Document",
      desc: {
        en: "The original First Information Report filed at the Delhi Police Station by Commander Madan Mohan Chopra after his children failed to return home.",
        hi: "बच्चों के घर न लौटने पर कमांडर मदन मोहन चोपड़ा द्वारा दिल्ली पुलिस स्टेशन में दर्ज कराई गई मूल प्रथम सूचना रिपोर्ट (FIR)।"
      },
      snippet: {
        en: "SUBJECTS: GEETA CHOPRA (16), SANJAY CHOPRA (14). LAST SEEN: 18:15 HRS NEAR DHAULA KUAN RAMP. STATUS: CRITICAL SEEK-AND-RECOVERY.",
        hi: "विषय: गीता चोपड़ा (16), संजय चोपड़ा (14)। आखिरी बार देखा गया: धौला कुआँ रैंप के पास शाम 18:15 बजे। स्थिति: सघन खोज अभियान।"
      }
    },
    {
      id: "exhibit-b",
      title: {
        en: "The Statesman Headline Archive",
        hi: "द स्टेट्समैन हेडलाइन पुरालेख"
      },
      date: "August 29, 1978",
      category: "Clipping",
      desc: {
        en: "First public coverage of the discovery in Ridge Forest. The brutal nature of the crime sent immediate shockwaves through India's capital.",
        hi: "रिज वन में शवों की बरामदगी की पहली सार्वजनिक खबर। अपराध की क्रूरता ने भारत की राजधानी दिल्ली को पूरी तरह झकझोर कर रख दिया था।"
      },
      snippet: {
        en: "CHOPRA CHILDREN FOUND IN RIDGE FOREST. Capital in Mourning. Public Outrage Grows Over Lack of Street Safety.",
        hi: "चोपड़ा बच्चों के शव रिज वन में मिले। शोक में डूबी राजधानी। सड़क सुरक्षा की कमी को लेकर जनता का आक्रोश बढ़ा।"
      }
    },
    {
      id: "exhibit-c",
      title: {
        en: "Fiat 1100 Forensics Record",
        hi: "फिएट 1100 फोरेंसिक रिकॉर्ड आरेख"
      },
      date: "September 02, 1978",
      category: "Diagram",
      desc: {
        en: "Detailed crime-lab sheet mapping blood spatter velocity and print matching from Billa's stymied escape vehicle.",
        hi: "अपराधियों की सलेटी फिएट कार से रक्त के छीटों और उंगलियों के निशान के वैज्ञानिक मिलान को दर्शाने वाला फोरेंसिक आरेख।"
      },
      snippet: {
        en: "VEHICLE MAKE: FIAT 1100. COLOR: GREY/STOLEN. FORENSIC UNIT ID: F-11-DLH. CONFIRMED REAR HANDLE REMOVAL DETECTED.",
        hi: "वाहन निर्माता: फिएट 1100। रंग: सलेटी/चोरी की। फोरेंसिक यूनिट आईडी: F-11-DLH। पिछले दरवाजे के हैंडल का भौतिक विस्थापन पाया गया।"
      }
    },
    {
      id: "exhibit-d",
      title: {
        en: "Indian Express Manhunt Bulletin",
        hi: "इंडियन एक्सप्रेस वांछित अपराधियों का बुलेटिन"
      },
      date: "September 05, 1978",
      category: "Clipping",
      desc: {
        en: "National wanted posters distributed across the Indian Railways network, which eventually led to their capture by alert passengers.",
        hi: "भारतीय रेलवे नेटवर्क पर प्रसारित राष्ट्रीय पोस्टर, जिसके फलस्वरूप जागरूक यात्रियों द्वारा अंबाला में आरोपियों को पकड़ा गया।"
      },
      snippet: {
        en: "WANTED ALIVE: KULJEET SINGH (RANGA) & JASBIR SINGH (BILLA). CASH REWARD DECLARED BY ORDER OF PRESIDENT OF INDIA.",
        hi: "जीवित पकड़ें: कुलजीत सिंह (रंगा) और जसबीर सिंह (बिल्ला)। भारत सरकार के आदेश द्वारा नकद इनाम की घोषणा।"
      }
    },
    {
      id: "exhibit-e",
      title: {
        en: "Delhi High Court Verdict Draft",
        hi: "दिल्ली उच्च न्यायालय के फैसले का मसौदा"
      },
      date: "April 1979",
      category: "Document",
      desc: {
        en: "The fast-track court's sentencing draft labelling the crimes as 'exceptionally heinous' and awarding the maximum penalty.",
        hi: "फास्ट-ट्रैक अदालत के सजा सुनाने का मसौदा, जिसमें इस अपराध को 'अत्यंत क्रूर और वीभत्स' श्रेणी में रखते हुए फांसी की सजा सुनाई गई।"
      },
      snippet: {
        en: "THE COURT CONCLUDES: Exceptional cruelty, cold deliberation. HANGING BY THE NECK ORDERED UNTIL DEAD.",
        hi: "अदालत का निष्कर्ष: असाधारण क्रूरता और ठंडे दिमाग से की गई साजिश। मृत्यु होने तक गर्दन से लटका कर फांसी देने का आदेश।"
      }
    },
    {
      id: "exhibit-f",
      title: {
        en: "Ridge Forest Topographical Sketch",
        hi: "रिज वन का भौगोलिक मानचित्र रेखाचित्र"
      },
      date: "August 30, 1978",
      category: "Diagram",
      desc: {
        en: "Topographical forensic field sketch charting coordinates where the siblings' bodies were found and the perimeter search boundaries.",
        hi: "घटनास्थल का मानचित्र जहां दोनों भाई-बहन के शव बरामद हुए थे और तलाशी अभियान के दायरे की भौगोलिक रूपरेखा।"
      },
      snippet: {
        en: "COORDINATES: sector R-4 Upper Ridge. Angle of impact 14 degrees NW from primary culvert drainage line.",
        hi: "निर्देशांक: सेक्टर R-4 अपर रिज। मुख्य जल निकासी लाइन से 14 डिग्री उत्तर-पश्चिम में।"
      }
    }
  ];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, itemId: string) => {
    if (lensMode === "none") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensPos({ x, y });
    setHoveredId(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    setLensPos(null);
  };

  // Filter items
  const filteredItems = activeFilter === "All"
    ? items
    : items.filter(item => item.category === activeFilter);

  return (
    <div className="w-full bg-[#020202]/90 border border-white/10 rounded-sm p-5 md:p-8 relative overflow-hidden my-8 shadow-2xl text-left">
      <div className="grain"></div>
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6 z-10 relative">
        <div className="flex items-center space-x-3 text-left">
          <Camera className="w-4 h-4 text-red-500 shrink-0" />
          <div>
            <h3 className="font-serif text-lg text-white font-bold tracking-tight">
              {language === "hi" ? "गोपनीय साक्ष्य पुरालेख और समाचार कतरनें" : "Confidential Evidence Archive & Press Clippings"}
            </h3>
            <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider font-light mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>{language === "hi" ? "सार्वजनिक किए गए माइक्रोफिल्म दस्तावेज" : "Microfilm Archives // Noir Docket"}</span>
              <span className="text-zinc-600 hidden sm:inline">•</span>
              <span className="text-zinc-300 flex items-center gap-1 font-bold">
                <ZoomIn className="w-3.5 h-3.5 text-red-500" />
                {lensMode === "magnifier" && (language === "hi" ? "तस्वीरों पर कर्सर ले जाने पर आवर्धक लेंस सक्रिय" : "Magnifier active on photo cards")}
                {lensMode === "crime-scene" && (language === "hi" ? "क्राइम सीन लेंस: गुप्त कोड और सबूत उजागर करें" : "Crime Scene Lens: Exposing hidden evidence tags")}
                {lensMode === "none" && (language === "hi" ? "लेंस प्रभाव बंद" : "Lens effects disabled")}
              </span>
            </p>
          </div>
        </div>

        {/* Triple Lens Mode Selector */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="flex bg-black/60 p-1 border border-white/10 rounded-sm space-x-1">
            <button
              onClick={() => setLensMode("magnifier")}
              className={`px-2 py-1.5 rounded-sm font-mono text-[9px] uppercase tracking-wider transition-all select-none cursor-pointer ${
                lensMode === "magnifier"
                  ? "bg-white/10 text-white font-extrabold"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Standard magnifying lens"
            >
              <span>{language === "hi" ? "आवर्धक" : "MAGNIFIER"}</span>
            </button>

            <button
              onClick={() => setLensMode("crime-scene")}
              className={`px-2 py-1.5 rounded-sm font-mono text-[9px] uppercase tracking-wider transition-all select-none cursor-pointer ${
                lensMode === "crime-scene"
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 font-extrabold shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Crime scene edge detection overlay lens"
            >
              <span>{language === "hi" ? "अपराध लेंस" : "CRIME LENS"}</span>
            </button>

            <button
              onClick={() => setLensMode("none")}
              className={`px-2 py-1.5 rounded-sm font-mono text-[9px] uppercase tracking-wider transition-all select-none cursor-pointer ${
                lensMode === "none"
                  ? "bg-white/5 text-zinc-300"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Disable filters"
            >
              <span>{language === "hi" ? "बंद" : "OFF"}</span>
            </button>
          </div>

          {/* Carousel buttons */}
          <div className="flex items-center space-x-1.5 ml-2">
            <button
              onClick={() => handleScroll("left")}
              className="w-7 h-7 border border-white/10 hover:border-white/20 rounded bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Scroll Left"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="w-7 h-7 border border-white/10 hover:border-white/20 rounded bg-white/[0.02] flex items-center justify-center text-zinc-400 hover:text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Scroll Right"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch z-10 relative">
        
        {/* Sidebar filter component */}
        <div className="md:col-span-3 flex flex-col space-y-2 text-left">
          <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-black mb-1 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            {language === "hi" ? "दस्तावेज फ़िल्टर" : "DOSSIER ARCHIVE FILTER"}
          </div>

          <div className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none shrink-0 select-none">
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-3 py-2 text-left rounded font-mono text-[10px] uppercase tracking-wide border transition-all text-nowrap flex items-center justify-between cursor-pointer ${
                activeFilter === "All"
                  ? "bg-white/5 border-white/20 text-white font-bold"
                  : "border-transparent text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200"
              }`}
            >
              <span>{language === "hi" ? "सभी साक्ष्य" : "All Exhibits"}</span>
              <span className="hidden md:inline-block font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-500">
                {items.length}
              </span>
            </button>

            <button
              onClick={() => setActiveFilter("Document")}
              className={`px-3 py-2 text-left rounded font-mono text-[10px] uppercase tracking-wide border transition-all text-nowrap flex items-center justify-between cursor-pointer ${
                activeFilter === "Document"
                  ? "bg-white/5 border-white/20 text-white font-bold"
                  : "border-transparent text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200"
              }`}
            >
              <span>{language === "hi" ? "पुलिस रिपोर्ट्स" : "Police Reports"}</span>
              <span className="hidden md:inline-block font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-500">
                {items.filter(i => i.category === "Document").length}
              </span>
            </button>

            <button
              onClick={() => setActiveFilter("Clipping")}
              className={`px-3 py-2 text-left rounded font-mono text-[10px] uppercase tracking-wide border transition-all text-nowrap flex items-center justify-between cursor-pointer ${
                activeFilter === "Clipping"
                  ? "bg-white/5 border-white/20 text-white font-bold"
                  : "border-transparent text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200"
              }`}
            >
              <span>{language === "hi" ? "अखबार की कतरनें" : "Newspaper Clippings"}</span>
              <span className="hidden md:inline-block font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-500">
                {items.filter(i => i.category === "Clipping").length}
              </span>
            </button>

            <button
              onClick={() => setActiveFilter("Diagram")}
              className={`px-3 py-2 text-left rounded font-mono text-[10px] uppercase tracking-wide border transition-all text-nowrap flex items-center justify-between cursor-pointer ${
                activeFilter === "Diagram"
                  ? "bg-white/5 border-white/20 text-white font-bold"
                  : "border-transparent text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200"
              }`}
            >
              <span>{language === "hi" ? "फोरेंसिक आरेख" : "Forensic Diagrams"}</span>
              <span className="hidden md:inline-block font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-500">
                {items.filter(i => i.category === "Diagram").length}
              </span>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="md:col-span-9">
          {filteredItems.length === 0 ? (
            <div className="h-48 border border-white/5 rounded-sm flex flex-col items-center justify-center text-zinc-500 font-mono text-xs">
              {language === "hi" ? "चयनित फ़िल्टर के साथ कोई रिकॉर्ड नहीं मिला।" : "No records found matching current selection."}
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent select-none"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-[300px] sm:w-[320px] bg-[#010101]/40 border border-white/10 rounded-sm p-5 flex flex-col justify-between relative hover:border-white/20 transition-all duration-300 group text-left"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {/* Top Tag & Paperclip effect */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-[8px] bg-white/5 border border-white/10 text-zinc-300 px-2.5 py-0.5 rounded uppercase tracking-[0.1em]">
                      {item.category === "Document" ? (language === "hi" ? "दस्तावेज" : "DOCUMENT") :
                       item.category === "Clipping" ? (language === "hi" ? "खबर कतरन" : "CLIPPING") :
                       (language === "hi" ? "आरेख" : "DIAGRAM")}
                    </span>
                    <div className="flex items-center space-x-1 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      <Paperclip className="w-3.5 h-3.5 -rotate-45 text-zinc-400" />
                      <span className="font-mono text-[8px] tracking-wide font-bold">SECURED</span>
                    </div>
                  </div>

                  {/* Microfilm Box */}
                  <div
                    onMouseMove={(e) => handleMouseMove(e, item.id)}
                    onMouseLeave={handleMouseLeave}
                    className="w-full h-36 bg-black border border-white/5 rounded-sm p-4 relative overflow-hidden mb-4 flex flex-col justify-between grayscale contrast-125 opacity-90 group-hover:opacity-100 group-hover:contrast-150 transition-all duration-500 cursor-crosshair"
                  >
                    {/* Scanline overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none" />

                    <div className="flex justify-between items-start font-mono text-[7px] text-zinc-500">
                      <span>MICRO_FILM // REF_{item.id.toUpperCase()}</span>
                      <span>DE-CLASSIFIED</span>
                    </div>

                    {/* Typewriter text block (crisp white) */}
                    <div className="my-auto font-mono text-[9.5px] text-zinc-100 leading-normal border-l-2 border-red-500/40 pl-2 select-text selection:bg-red-500 selection:text-black">
                      <p className="font-black mb-1 uppercase tracking-wide text-red-500">
                        {item.title[language]}
                      </p>
                      <p className="text-[8px] line-clamp-3 text-zinc-300 italic font-light">
                        &ldquo;{item.snippet[language]}&rdquo;
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-[7px] font-mono text-zinc-500 border-t border-white/5 pt-1">
                      <span>DATE: {item.date.toUpperCase()}</span>
                      <span>ARCHIVE_CFSL_MHA</span>
                    </div>

                    {/* MAGNIFIER LENS SCREEN */}
                    {lensMode === "magnifier" && hoveredId === item.id && lensPos && (
                      <div
                        className="absolute pointer-events-none w-24 h-24 rounded-full border-2 border-red-500 bg-black shadow-[0_0_20px_rgba(239,68,68,0.35)] flex flex-col justify-center items-center overflow-hidden z-30"
                        style={{
                          left: `${lensPos.x}px`,
                          top: `${lensPos.y}px`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <div className="absolute inset-0 bg-black opacity-95" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[size:100%_2px] pointer-events-none" />
                        
                        <div
                          className="absolute font-mono text-[10.5px] text-red-400 font-bold leading-tight px-3.5 text-center uppercase tracking-wider"
                          style={{
                            transform: `scale(1.4) translate(${-(lensPos.x - 150) / 4}px, ${-(lensPos.y - 72) / 3}px)`,
                          }}
                        >
                          <span className="text-[5.5px] text-zinc-400 block mb-0.5 tracking-widest font-bold">ENLARGED CODES</span>
                          <span className="line-clamp-2 leading-tight text-white">{item.snippet[language]}</span>
                        </div>

                        {/* Circular scanning markers */}
                        <div className="absolute inset-0 border border-red-500/20 rounded-full pointer-events-none" />
                        <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-red-500/30" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-red-500/30" />
                      </div>
                    )}

                    {/* CRIME SCENE FILTER LENS */}
                    {lensMode === "crime-scene" && hoveredId === item.id && lensPos && (
                      <div
                        className="absolute pointer-events-none w-28 h-28 rounded-full border-2 border-dashed border-red-500 bg-red-950/20 shadow-[0_0_25px_rgba(239,68,68,0.5)] flex flex-col justify-center items-center overflow-hidden z-30"
                        style={{
                          left: `${lensPos.x}px`,
                          top: `${lensPos.y}px`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {/* High-contrast inverted canvas filter feel */}
                        <div className="absolute inset-0 bg-red-950/40 backdrop-invert backdrop-contrast-[3] backdrop-grayscale-[1]" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.15)_50%,transparent_50%)] bg-[size:100%_3px] pointer-events-none" />
                        
                        <div className="absolute inset-2 border border-red-500/30 rounded-full animate-pulse" />
                        <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-red-500/60" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-red-500/60" />

                        <div className="absolute font-mono text-[7px] text-red-400 font-extrabold text-center px-1.5 tracking-tighter uppercase z-10 select-none">
                          <span className="text-[5px] bg-red-600 text-black px-1 py-0.5 rounded block mb-1 font-black tracking-widest mx-auto max-w-fit">
                            {secretTags[item.id]?.code || "TAG_LOST"}
                          </span>
                          <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] line-clamp-2 leading-none font-bold">
                            {secretTags[item.id]?.[language] || ""}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description details (Super legible, high contrast text) */}
                  <div className="flex flex-col space-y-1.5 text-left">
                    <h4 className="font-serif text-[13px] font-bold text-white tracking-tight">
                      {item.title[language]}
                    </h4>
                    <p className="font-sans text-[11px] text-zinc-200 leading-relaxed font-light min-h-[50px] opacity-95">
                      {item.desc[language]}
                    </p>
                  </div>

                  {/* Footer indicator */}
                  <div className="border-t border-white/5 pt-3 mt-4 flex justify-between items-center text-zinc-500 font-mono text-[8px]">
                    <span>STATUS: COLD CASE RECOVERY</span>
                    <ShieldAlert className="w-3.5 h-3.5 text-zinc-600 group-hover:text-red-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
