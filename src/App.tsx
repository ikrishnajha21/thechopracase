/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Import Custom Hooks & Types
import { CHAPTERS } from "./data/storyData";

// Import Components
import { Header } from "./components/Header";
import { IntroSlide } from "./components/IntroSlide";
import { InteractiveMap } from "./components/InteractiveMap";
import { SatelliteRadar } from "./components/SatelliteRadar";
import { PrisonCell } from "./components/PrisonCell";
import { CaesarCabinet } from "./components/CaesarCabinet";
import { Timeline } from "./components/Timeline";
import { PageLoader } from "./components/PageLoader";
import { CaseTooltip } from "./components/CaseTooltip";
import { EvidenceGallery } from "./components/EvidenceGallery";
import { FactVsFiction } from "./components/FactVsFiction";
import { EvidenceBoard } from "./components/EvidenceBoard";
import { LegalTimelineD3 } from "./components/LegalTimelineD3";
import { DispatchMarquee } from "./components/DispatchMarquee";
import { AudioVault } from "./components/AudioVault";
import { ForensicLab } from "./components/ForensicLab";
import { QuickSummary } from "./components/QuickSummary";
import { GuiltyWord } from "./components/GuiltyWord";
import { DigitalEvidenceBox } from "./components/DigitalEvidenceBox";

// Memoize core heavy components to block scroll-induced re-renders in App
const MemoizedInteractiveMap = memo(InteractiveMap);
const MemoizedSatelliteRadar = memo(SatelliteRadar);
const MemoizedPrisonCell = memo(PrisonCell);
const MemoizedCaesarCabinet = memo(CaesarCabinet);
const MemoizedTimeline = memo(Timeline);
const MemoizedEvidenceGallery = memo(EvidenceGallery);
const MemoizedFactVsFiction = memo(FactVsFiction);
const MemoizedEvidenceBoard = memo(EvidenceBoard);
const MemoizedLegalTimelineD3 = memo(LegalTimelineD3);
const MemoizedAudioVault = memo(AudioVault);
const MemoizedForensicLab = memo(ForensicLab);
const MemoizedDigitalEvidenceBox = memo(DigitalEvidenceBox);

// Import Icons
import { AlertTriangle, Award, Users, FileText, ArrowUp } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function renderTextWithTooltips(text: string) {
  const tooltipKeywords = ["Dhaula Kuan", "Tihar Jail", "Ridge Forest", "All India Radio"];
  const guiltyKeywords = [
    "abduction", "abducted", "brutal", "murder", "murdered", "homicide", 
    "kidnapping", "heinous", "Ranga", "Billa", "hanging", "hanged", 
    "criminal", "criminals", "guilty", "execution", "violent",
    "अपहरण", "हत्या", "क्रूर", "रंगा", "बिल्ला", "फांसी", "सजा"
  ];

  const allKeywords = [...tooltipKeywords, ...guiltyKeywords];
  const sortedKeywords = [...allKeywords].sort((a, b) => b.length - a.length);
  
  const patternStr = sortedKeywords.map(k => {
    const isHindi = /[^\x00-\x7F]/.test(k);
    return isHindi ? k : `\\b${k}\\b`;
  }).join("|");
  
  const regex = new RegExp(`(${patternStr})`, "gi");
  const parts = text.split(regex);
  if (parts.length === 1) return text;
  
  return parts.map((part, index) => {
    const lowerPart = part.toLowerCase();
    
    const matchedTooltip = tooltipKeywords.find(
      (k) => k.toLowerCase() === lowerPart
    );
    if (matchedTooltip) {
      return (
        <CaseTooltip key={index} keyword={matchedTooltip.toLowerCase() as any}>
          {part}
        </CaseTooltip>
      );
    }
    
    const matchedGuilty = guiltyKeywords.find(
      (k) => k.toLowerCase() === lowerPart
    );
    if (matchedGuilty) {
      return (
        <GuiltyWord key={index}>
          {part}
        </GuiltyWord>
      );
    }
    
    return part;
  });
}

export default function App() {
  const [language, setLanguage] = useState<"hi" | "en">("en");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSectionId, setActiveSectionId] = useState<string>("s1-1");
  const [showLoader, setShowLoader] = useState(true);
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  // Sync Terminal High Contrast theme
  useEffect(() => {
    document.documentElement.classList.toggle("theme-terminal", isTerminalMode);
    document.body.classList.toggle("theme-terminal", isTerminalMode);
  }, [isTerminalMode]);

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Lenis Smooth Inertia-Based Scrolling Integration
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Soundscapes disabled

  // Monitor general scroll percentage for progress bar with RAF throttle & passive listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP ScrollTrigger to track active text block and update visual states, with background parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Track active text block
      Object.keys(sectionRefs.current).forEach((sectionId) => {
        const el = sectionRefs.current[sectionId];
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 40%",
            onEnter: () => {
              setActiveSectionId(sectionId);
            },
            onEnterBack: () => {
              setActiveSectionId(sectionId);
            },
          });
        }
      });

      // Add scroll-triggered parallax effects to all section backgrounds
      const sections = gsap.utils.toArray("section");
      sections.forEach((section: any) => {
        const stickyBg = section.querySelector(".sticky");
        if (stickyBg) {
          gsap.fromTo(
            stickyBg,
            { yPercent: -6, scale: 1.03 },
            {
              yPercent: 6,
              scale: 0.98,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });

      // Ultra-high performance, GPU-accelerated smooth slide-in reveal
      const kineticBlocks = gsap.utils.toArray(".kinetic-reveal");
      kineticBlocks.forEach((block: any) => {
        gsap.set(block, {
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          force3D: true,
          willChange: "transform, opacity",
        });

        gsap.fromTo(
          block,
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 92%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // Scroll to Top action
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Search jump to section handler
  const handleJumpToSection = (sectionId: string) => {
    const el = sectionRefs.current[sectionId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="bg-brand-bg text-brand-accent font-sans min-h-screen relative selection:bg-white/20 selection:text-brand-accent">
      {/* Texture Grain Overlay */}
      <div className="grain"></div>

      {/* Cinematic Vignette Overlay */}
      <div className="cinematic-vignette"></div>

      {showLoader && (
        <PageLoader
          onComplete={() => {
            setShowLoader(false);
          }}
        />
      )}

      {/* Universal Header with Lang Switch */}
      <Header
        language={language}
        setLanguage={setLanguage}
        scrollProgress={scrollProgress}
        onJumpToSection={handleJumpToSection}
        isTerminalMode={isTerminalMode}
        toggleTerminalMode={() => setIsTerminalMode(!isTerminalMode)}
      />

      {/* Cinematic Title Slide */}
      <IntroSlide
        language={language}
      />

      {/* Main Scrollytelling Lane */}
      <main className="relative">
        
        {/* CHAPTER 1: Dhaula Kuan Abduction */}
        <section className="relative min-h-[160vh]">
          {/* Sticky Visual Background */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0 p-4 md:p-10">
            <div className="w-full max-w-5xl h-[70vh] md:h-[75vh]">
              <MemoizedInteractiveMap
                language={language}
                activeNodeId={
                  activeSectionId === "s1-1"
                    ? "node-delhi"
                    : activeSectionId === "s1-2" || activeSectionId === "s1-3"
                    ? "node-delhi"
                    : undefined
                }
              />
            </div>
          </div>

          {/* Scrollable Text Blocks */}
          <div className="relative z-10 pointer-events-none -mt-[75vh] pb-[30vh]">
            <div className="max-w-xl mx-auto px-6 flex flex-col space-y-[45vh]">
              {CHAPTERS[0].sections.map((section) => (
                <div
                  key={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="kinetic-reveal bg-brand-bg border border-white/10 rounded-sm p-6 md:p-8 shadow-2xl pointer-events-auto transition-all duration-500 border-l-4 border-l-white/25 hover:border-l-red-500 text-left"
                >
                  <span className="font-mono text-[9px] text-brand-accent/40 uppercase tracking-[0.2em] font-bold mb-2.5 block">
                    {language === "hi" ? `अध्याय 1 | अनुभाग ${section.id.split("-")[1]}` : `CHAPTER 1 | SECTION ${section.id.split("-")[1]}`}
                  </span>
                  <p className="font-sans text-sm md:text-base text-brand-accent/80 leading-relaxed mb-4 font-light opacity-95">
                    {renderTextWithTooltips(section.text[language])}
                  </p>
                  {section.highlight && (
                    <div className="border-t border-white/10 pt-3.5 text-xs md:text-sm text-brand-accent/60 font-serif italic font-medium opacity-95">
                      {renderTextWithTooltips(section.highlight[language])}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 2: Panic in the Ridge Forest */}
        <section className="relative min-h-[160vh] border-t border-white/10">
          {/* Sticky Visual Background */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0 p-4 md:p-10">
            <div className="w-full max-w-5xl h-[70vh] md:h-[75vh]">
              <MemoizedSatelliteRadar
                language={language}
                focusPoint={
                  activeSectionId === "s2-1"
                    ? "branch215"
                    : activeSectionId === "s2-3"
                    ? "branch227"
                    : "default"
                }
              />
            </div>
          </div>

          {/* Scrollable Text Blocks */}
          <div className="relative z-10 pointer-events-none -mt-[75vh] pb-[30vh]">
            <div className="max-w-xl mx-auto px-6 flex flex-col space-y-[45vh]">
              {CHAPTERS[1].sections.map((section) => (
                <div
                  key={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="kinetic-reveal bg-brand-bg border border-white/10 rounded-sm p-6 md:p-8 shadow-2xl pointer-events-auto transition-all duration-500 border-l-4 border-l-white/25 hover:border-l-red-500 text-left"
                >
                  <span className="font-mono text-[9px] text-brand-accent/40 uppercase tracking-[0.2em] font-bold mb-2.5 block">
                    {language === "hi" ? `अध्याय 2 | अनुभाग ${section.id.split("-")[1]}` : `CHAPTER 2 | SECTION ${section.id.split("-")[1]}`}
                  </span>
                  <p className="font-sans text-sm md:text-base text-brand-accent/80 leading-relaxed mb-4 font-light opacity-95">
                    {renderTextWithTooltips(section.text[language])}
                  </p>
                  {section.highlight && (
                    <div className="border-t border-white/10 pt-3.5 text-xs md:text-sm text-brand-accent/60 font-serif italic font-medium opacity-95">
                      {renderTextWithTooltips(section.highlight[language])}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 3: Stolen Fiat 1100 Blueprint */}
        <section className="relative min-h-[140vh] border-t border-white/10">
          {/* Sticky Visual Background */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0 p-4 md:p-10">
            <div className="w-full max-w-5xl h-[75vh] md:h-[80vh]">
              <MemoizedPrisonCell language={language} />
            </div>
          </div>

          {/* Scrollable Text Blocks */}
          <div className="relative z-10 pointer-events-none -mt-[75vh] pb-[30vh]">
            <div className="max-w-xl mx-auto px-6 flex flex-col space-y-[45vh]">
              {CHAPTERS[2].sections.map((section) => (
                <div
                  key={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="kinetic-reveal bg-brand-bg border border-white/10 rounded-sm p-6 md:p-8 shadow-2xl pointer-events-auto transition-all duration-500 border-l-4 border-l-white/25 hover:border-l-red-500 text-left"
                >
                  <span className="font-mono text-[9px] text-brand-accent/40 uppercase tracking-[0.2em] font-bold mb-2.5 block">
                    {language === "hi" ? `अध्याय 3 | अनुभाग ${section.id.split("-")[1]}` : `CHAPTER 3 | SECTION ${section.id.split("-")[1]}`}
                  </span>
                  <p className="font-sans text-sm md:text-base text-brand-accent/80 leading-relaxed mb-4 font-light opacity-95">
                    {renderTextWithTooltips(section.text[language])}
                  </p>
                  {section.highlight && (
                    <div className="border-t border-white/10 pt-3.5 text-xs md:text-sm text-brand-accent/60 font-serif italic font-medium opacity-95">
                      {renderTextWithTooltips(section.highlight[language])}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVIDENCE BOARD PROFILE CARDS */}
        <section className="relative z-20 w-full max-w-5xl mx-auto px-6 py-6 border-t border-white/10">
          <MemoizedEvidenceBoard language={language} />
        </section>

        {/* EVIDENCE ARCHIVE GALLERY */}
        <section className="relative z-20 w-full max-w-5xl mx-auto px-6 py-6 border-t border-white/10">
          <MemoizedEvidenceGallery language={language} />
        </section>

        {/* FORENSIC INTERACTIVE SCANNING LAB */}
        <section className="relative z-20 w-full max-w-5xl mx-auto px-6 py-6 border-t border-white/10">
          <MemoizedForensicLab language={language} />
        </section>

        {/* DIGITAL COLD-CASE EVIDENCE COLLECTOR BOX */}
        <section className="relative z-20 w-full max-w-5xl mx-auto px-6 py-6 border-t border-white/10">
          <MemoizedDigitalEvidenceBox language={language} />
        </section>

        {/* ATMOSPHERIC AUDIO VAULT RECONSTRUCTIONS */}
        <section className="relative z-20 w-full max-w-5xl mx-auto px-6 py-6 border-t border-white/10">
          <MemoizedAudioVault language={language} />
        </section>

        {/* CHAPTER 4: The Manhunt and Capture */}
        <section className="relative min-h-[160vh] border-t border-white/10">
          {/* Sticky Visual Background */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0 p-4 md:p-10">
            <div className="w-full max-w-5xl h-[70vh] md:h-[75vh]">
              <MemoizedCaesarCabinet language={language} />
            </div>
          </div>

          {/* Scrollable Text Blocks */}
          <div className="relative z-10 pointer-events-none -mt-[75vh] pb-[30vh]">
            <div className="max-w-xl mx-auto px-6 flex flex-col space-y-[45vh]">
              {CHAPTERS[3].sections.map((section) => (
                <div
                  key={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="kinetic-reveal bg-brand-bg border border-white/10 rounded-sm p-6 md:p-8 shadow-2xl pointer-events-auto transition-all duration-500 border-l-4 border-l-white/25 hover:border-l-red-500 text-left"
                >
                  <span className="font-mono text-[9px] text-brand-accent/40 uppercase tracking-[0.2em] font-bold mb-2.5 block">
                    {language === "hi" ? `अध्याय 4 | अनुभाग ${section.id.split("-")[1]}` : `CHAPTER 4 | SECTION ${section.id.split("-")[1]}`}
                  </span>
                  <p className="font-sans text-sm md:text-base text-brand-accent/80 leading-relaxed mb-4 font-light opacity-95">
                    {renderTextWithTooltips(section.text[language])}
                  </p>
                  {section.highlight && (
                    <div className="border-t border-white/10 pt-3.5 text-xs md:text-sm text-brand-accent/60 font-serif italic font-medium opacity-95">
                      {renderTextWithTooltips(section.highlight[language])}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHAPTER 5: The Legacy and Raakh */}
        <section className="relative min-h-[160vh] border-t border-white/10">
          {/* Sticky Visual Background */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0 p-4 md:p-10">
            <div className="w-full max-w-5xl h-[70vh] md:h-[75vh]">
              <MemoizedInteractiveMap
                language={language}
                activeNodeId={
                  activeSectionId === "s5-1"
                    ? "node-mumbai"
                    : activeSectionId === "s5-2"
                    ? "node-tihar"
                    : "node-mumbai"
                }
              />
            </div>
          </div>

          {/* Scrollable Text Blocks */}
          <div className="relative z-10 pointer-events-none -mt-[75vh] pb-[30vh]">
            <div className="max-w-xl mx-auto px-6 flex flex-col space-y-[45vh]">
              {CHAPTERS[4].sections.map((section) => (
                <div
                  key={section.id}
                  ref={(el) => (sectionRefs.current[section.id] = el)}
                  className="kinetic-reveal bg-brand-bg border border-white/10 rounded-sm p-6 md:p-8 shadow-2xl pointer-events-auto transition-all duration-500 border-l-4 border-l-white/25 hover:border-l-red-500 text-left"
                >
                  <span className="font-mono text-[9px] text-brand-accent/40 uppercase tracking-[0.2em] font-bold mb-2.5 block">
                    {language === "hi" ? `अध्याय 5 | अनुभाग ${section.id.split("-")[1]}` : `CHAPTER 5 | SECTION ${section.id.split("-")[1]}`}
                  </span>
                  <p className="font-sans text-sm md:text-base text-brand-accent/80 leading-relaxed mb-4 font-light opacity-95">
                    {renderTextWithTooltips(section.text[language])}
                  </p>
                  {section.highlight && (
                    <div className="border-t border-white/10 pt-3.5 text-xs md:text-sm text-brand-accent/60 font-serif italic font-medium opacity-95">
                      {renderTextWithTooltips(section.highlight[language])}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FACT VS FICTION COMPARISON SECTION */}
        <section className="relative z-20 w-full max-w-5xl mx-auto px-6 py-6 border-t border-white/10">
          <MemoizedFactVsFiction language={language} />
        </section>

        {/* TIMELINE SECTION */}
        <section className="relative min-h-screen border-t border-white/10 bg-brand-bg px-6 py-20 z-20">
          <div className="max-w-5xl mx-auto">
            <MemoizedTimeline language={language} />
          </div>
        </section>

        {/* EPILOGUE (STATISTICS, AWARDS & CREDITS) */}
        <section className="relative min-h-screen bg-brand-bg border-t border-white/10 px-6 py-24 flex flex-col justify-between items-center z-20 text-center">
          {/* Subtle top indicator */}
          <div className="w-12 h-[1.5px] bg-red-600 mb-10" />

          <div className="max-w-3xl flex flex-col items-center">
            <span className="font-mono text-[10px] tracking-[0.25em] text-red-500 uppercase font-bold mb-4">
              {language === "hi" ? "उपसंहार" : "Epilogue"}
            </span>

            <h2 className="font-serif text-3xl md:text-5xl text-brand-accent font-black tracking-tight mb-6">
              {language === "hi" ? "न्याय के लिए संघर्ष" : "The Fight for Justice"}
            </h2>

            <p className="font-sans text-sm md:text-base text-brand-accent/60 font-light leading-relaxed max-w-2xl mb-16 opacity-95">
              {language === "hi"
                ? "गीता और संजय चोपड़ा की बहादुरी ने भारतीय समाज पर एक अमिट छाप छोड़ी, जिससे बच्चों की सुरक्षा के नियमों में ऐतिहासिक बदलाव आया। उनका वीरतापूर्ण प्रतिरोध आज भी प्रतिष्ठित राष्ट्रीय वीरता पुरस्कारों के रूप में जीवित है, जो हर साल असाधारण बच्चों को सम्मानित करता है।"
                : "The bravery of Geeta and Sanjay Chopra left an indelible mark on Indian society, shifting parental anxiety and child protection forever. Their heroic resistance lives on through the prestigious national bravery awards bearing their names, honoring exceptional children annually."}
            </p>

            {/* D3 LEGAL TIMELINE VISUALIZATION */}
            <div className="w-full max-w-4xl mx-auto mb-16">
              <MemoizedLegalTimelineD3 language={language} />
            </div>

            {/* Impact Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl mb-16 border-t border-b border-white/10 py-10">
              <div className="flex flex-col items-center">
                <Users className="w-5 h-5 text-red-500 mb-2" />
                <span className="font-serif text-3xl font-extrabold text-brand-accent mb-1">1978</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-accent/40 font-mono">
                  {language === "hi" ? "अपहरण का वर्ष" : "Year of Abduction"}
                </span>
              </div>
              <div className="flex flex-col items-center border-t sm:border-t-0 sm:border-l sm:border-r border-white/10 pt-6 sm:pt-0">
                <AlertTriangle className="w-5 h-5 text-red-500 mb-2" />
                <span className="font-serif text-3xl font-extrabold text-brand-accent mb-1">{language === "hi" ? "2 पुरस्कार" : "2 Awards"}</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-accent/40 font-mono">
                  {language === "hi" ? "राष्ट्रीय वीरता पुरस्कार" : "National Bravery Awards"}
                </span>
              </div>
              <div className="flex flex-col items-center border-t sm:border-t-0 pt-6 sm:pt-0">
                <FileText className="w-5 h-5 text-red-500 mb-2" />
                <span className="font-serif text-3xl font-extrabold text-brand-accent mb-1">1982</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-accent/40 font-mono">
                  {language === "hi" ? "न्याय का निष्पादन" : "Execution of Justice"}
                </span>
              </div>
            </div>

            {/* Awards & Journalistic credits banner */}
            <div className="bg-white/5 border border-white/10 rounded-sm p-6 max-w-xl text-left flex items-start space-x-4 mb-16">
              <div className="bg-white/10 border border-white/25 p-2.5 rounded-sm text-red-500 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1 font-mono">
                  {language === "hi" ? "गीता और संजय चोपड़ा वीरता पुरस्कार" : "The Chopra Bravery Legacy"}
                </h4>
                <p className="font-sans text-xs text-brand-accent/60 leading-relaxed font-light opacity-95">
                  {language === "hi"
                    ? "दोनों भाई-बहन के असाधारण साहस का सम्मान करने के लिए, भारत सरकार ने प्रतिष्ठित गीता और संजय चोपड़ा वीरता पुरस्कारों की स्थापना की, जो देश भर के बहादुर बच्चों को प्रतिवर्ष दिए जाते हैं।"
                    : "To honor the incredible courage of the young siblings, the Indian government established the Geeta and Sanjay Chopra Awards, celebrating brave children nationwide."}
                </p>
              </div>
            </div>
          </div>

          {/* Credits footer */}
          <div className="w-full max-w-3xl flex flex-col md:flex-row justify-between items-center text-brand-accent/40 font-mono text-[9px] border-t border-white/10 pt-8 space-y-4 md:space-y-0">
            <div>
              {language === "hi" ? "प्रेरणा: अमेज़ॅन प्राइम वीडियो सीरीज़ 'राख'" : "INSPIRATION: Amazon Prime Video Series 'Raakh'"}
            </div>
            <div>
              {language === "hi" ? "विषय: 1978 का ऐतिहासिक चोपड़ा अपहरण मामला" : "SUBJECT: The 1978 Geeta & Sanjay Chopra Case"}
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 hover:text-red-400 transition uppercase tracking-[0.15em] text-[9px] border border-white/10 hover:border-white/30 px-4 py-1.5 rounded-sm font-bold cursor-pointer"
            >
              <span>{language === "hi" ? "ऊपर जाएँ" : "To Top"}</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </section>

      </main>

      {/* Live Case Evidence Update Notifications removed */}

      {/* Heartbeat tension overlay for all sections other than the hero section */}
      {scrollProgress > 3 && (
        <div className="fixed inset-0 pointer-events-none z-30 animate-heartbeat bg-[radial-gradient(circle_at_center,transparent_50%,rgba(255,255,255,0.02)_100%)]" />
      )}

      {/* Quick Summary floating action button & modal */}
      <QuickSummary language={language} />

      {/* Real-time ticker dispatch radio chatter marquee at bottom of screen */}
      <DispatchMarquee language={language} />
    </div>
  );
}
