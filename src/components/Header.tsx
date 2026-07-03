/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Globe, FileText, Search, Calendar, BookOpen, X, Terminal, Menu, FolderOpen, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { downloadConfidentialReport } from "../utils/generateReport";

interface HeaderProps {
  language: "hi" | "en";
  setLanguage: (lang: "hi" | "en") => void;
  scrollProgress: number; // 0 to 100
  onJumpToSection?: (sectionId: string) => void;
  isTerminalMode: boolean;
  toggleTerminalMode: () => void;
}

interface SearchItem {
  label: { en: string; hi: string };
  sectionId: string;
  type: "chapter" | "date";
  keywords: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  { 
    label: { 
      en: "Chapter 1: Dhaula Kuan Abduction (August 26, 1978)", 
      hi: "अध्याय 1: धौला कुआँ अपहरण (26 अगस्त 1978)" 
    }, 
    sectionId: "s1-1", 
    type: "chapter", 
    keywords: "chapter 1 one abduction lift delhi dhg 1729 geeta sanjay chopra dhaula kuan अपहरण" 
  },
  { 
    label: { 
      en: "Chapter 2: Panic in the Ridge Forest (August 28, 1978)", 
      hi: "अध्याय 2: रिज वन में दहशत (28 अगस्त 1978)" 
    }, 
    sectionId: "s2-1", 
    type: "chapter", 
    keywords: "chapter 2 two ridge forest stabbing knife bodies discovery जंगल मर्डर" 
  },
  { 
    label: { 
      en: "Chapter 3: Forensic Fiat 1100 Blueprint (Inside the Car)", 
      hi: "अध्याय 3: फोरेंसिक फिएट 1100 ब्लूप्रिंट (कार के अंदर)" 
    }, 
    sectionId: "s3-1", 
    type: "chapter", 
    keywords: "chapter 3 three forensic car fiat blood hair prints handles billa ranga फिएट" 
  },
  { 
    label: { 
      en: "Chapter 4: The Hunt & Capture on Rails (September 8, 1978)", 
      hi: "अध्याय 4: पटरियों पर खोज और गिरफ्तारी (8 सितंबर 1978)" 
    }, 
    sectionId: "s4-1", 
    type: "chapter", 
    keywords: "chapter 4 four train capture kalka mail ambala arrest manhunt ट्रेन गिरफ्तार" 
  },
  { 
    label: { 
      en: "Chapter 5: Legacy & Prime Series 'Raakh'", 
      hi: "अध्याय 5: विरासत और प्राइम सीरीज़ 'राख'" 
    }, 
    sectionId: "s5-1", 
    type: "chapter", 
    keywords: "chapter 5 five legacy raakh bobby deol awards prime series वीरता" 
  },
  { 
    label: { 
      en: "August 26, 1978 — The Kidnapping", 
      hi: "26 अगस्त 1978 — अपहरण" 
    }, 
    sectionId: "s1-1", 
    type: "date", 
    keywords: "august 26 26th 1978 kidnapping lift fiat अपहरण" 
  },
  { 
    label: { 
      en: "August 27, 1978 — Delhi Police FIR 248", 
      hi: "27 अगस्त 1978 — दिल्ली पुलिस एफआईआर 248" 
    }, 
    sectionId: "s1-2", 
    type: "date", 
    keywords: "august 27 27th 1978 fir delhi police investigation पुलिस" 
  },
  { 
    label: { 
      en: "August 29, 1978 — Body Recovery in Ridge Forest", 
      hi: "29 अगस्त 1978 — रिज वन में शवों की बरामदगी" 
    }, 
    sectionId: "s2-3", 
    type: "date", 
    keywords: "august 29 29th 1978 body recovery ridge forest मर्डर शव" 
  },
  { 
    label: { 
      en: "September 8, 1978 — Capture on Kalka Mail Train", 
      hi: "8 सितंबर 1978 — कालका मेल ट्रेन में गिरफ्तारी" 
    }, 
    sectionId: "s4-2", 
    type: "date", 
    keywords: "september 8 8th 1978 capture train kalka mail ट्रेन" 
  },
  { 
    label: { 
      en: "January 31, 1982 — Tihar Jail Executions", 
      hi: "31 जनवरी 1982 — तिहाड़ जेल फांसी" 
    }, 
    sectionId: "s4-3", 
    type: "date", 
    keywords: "january 31 31st 1982 tihar hanging execution तिहाड़ फांसी" 
  },
];

export function Header({
  language,
  setLanguage,
  scrollProgress,
  onJumpToSection,
  isTerminalMode,
  toggleTerminalMode,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = searchQuery.trim() === ""
    ? SEARCH_ITEMS
    : SEARCH_ITEMS.filter(item =>
        item.keywords.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.label[language].toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleItemSelect = (sectionId: string) => {
    if (onJumpToSection) {
      onJumpToSection(sectionId);
    }
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 text-brand-accent py-3 px-4 md:px-8 flex justify-between items-center transition-all">
      <div className="flex items-center space-x-3 shrink-0">
        {/* Custom Minimalist Logo */}
        <div className="w-5 h-5 bg-brand-accent rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-brand-bg rounded-full"></div>
        </div>
        <h1 className="font-serif tracking-[0.2em] text-xs font-bold uppercase text-brand-accent">
          {language === "hi" ? "चोपड़ा केस" : "THE CHOPRA CASE"}
        </h1>
        <span className="hidden lg:inline-block text-[8px] font-mono uppercase tracking-[0.15em] text-zinc-400 border border-white/10 px-2 py-0.5 rounded">
          {language === "hi" ? "फोरेंसिक फ़ाइल" : "FORENSIC DOSSIER"}
        </span>
      </div>

      {/* SEARCH SYSTEM BAR - Hidden on mobile, visible on desktop */}
      <div className="hidden md:block flex-1 max-w-xs md:max-w-md mx-4 relative" ref={dropdownRef}>
        <div className="relative flex items-center bg-black/80 border border-white/15 rounded px-2.5 py-1.5 focus-within:border-white/35 transition-all">
          <Search className="w-3.5 h-3.5 text-zinc-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder={language === "hi" ? "तारीख, अध्याय या गिरफ्तारी खोजें..." : "Search date, chapter, arrest..."}
            className="w-full bg-transparent border-none text-[11px] font-mono focus:outline-none placeholder-zinc-500 text-zinc-100"
            value={searchQuery}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="text-zinc-500 hover:text-white ml-1">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Dynamic overlay drop-down docket */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-1.5 bg-[#020202] border border-white/15 rounded shadow-2xl z-50 max-h-64 overflow-y-auto select-none p-1 animate-fadeIn">
            <div className="text-[8px] font-mono font-bold text-zinc-500 px-2.5 py-1 border-b border-white/5 uppercase tracking-[0.15em]">
              {language === "hi" ? "मुख्य घटनाक्रम" : "Dossier Milestones"}
            </div>
            {filteredItems.length === 0 ? (
              <div className="text-[10px] font-mono text-zinc-400 p-3 text-center">
                {language === "hi" ? "कोई परिणाम नहीं मिला" : "No file matches found"}
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleItemSelect(item.sectionId)}
                  className="w-full text-left px-2.5 py-2 hover:bg-white/5 active:bg-white/10 rounded flex items-center space-x-2.5 transition text-zinc-100 group border border-transparent hover:border-white/5 cursor-pointer"
                >
                  {item.type === "chapter" ? (
                    <BookOpen className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  ) : (
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  )}
                  <span className="font-mono text-[10px] tracking-wide text-zinc-200 group-hover:text-white truncate">
                    {item.label[language]}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* DESKTOP ACTION CONTROLS - Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex items-center space-x-2 md:space-x-3 shrink-0">
        {/* Download Dossier Report button */}
        <button
          onClick={downloadConfidentialReport}
          className="flex items-center space-x-1.5 text-zinc-100 hover:bg-white/10 active:scale-95 transition text-[9px] md:text-xs border border-white/20 rounded px-2.5 py-1.5 font-mono uppercase tracking-wider font-bold shadow-md bg-white/5 cursor-pointer"
          title={language === "hi" ? "फोरेंसिक रिपोर्ट डाउनलोड करें" : "Download printable cold-case PDF report"}
        >
          <FileText className="w-3.5 h-3.5 text-white" />
          <span>{language === "hi" ? "केस रिपोर्ट" : "Case Report"}</span>
        </button>

        {/* Language Switch button */}
        <button
          onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
          className="flex items-center space-x-1 border border-white/10 rounded px-2 py-1 text-[10px] hover:bg-white/5 transition cursor-pointer"
        >
          <Globe className="w-3 h-3 text-zinc-300" />
          <span className="text-[9px] tracking-wider text-zinc-200 font-bold uppercase">
            {language === "hi" ? "HINDI" : "ENGLISH"}
          </span>
        </button>

        {/* Terminal High Contrast Switcher */}
        <button
          onClick={toggleTerminalMode}
          className={`flex items-center space-x-1 border rounded px-2 py-1 text-[10px] transition select-none cursor-pointer ${
            isTerminalMode
              ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
              : "border-white/10 text-zinc-300 hover:bg-white/5"
          }`}
          title={language === "hi" ? "टर्मिनल मोड चालू/बंद करें" : "Toggle Terminal Mode (Retro green style)"}
        >
          <Terminal className={`w-3.5 h-3.5 ${isTerminalMode ? "text-emerald-400 animate-pulse" : "text-zinc-300"}`} />
          <span className="text-[9px] tracking-wider font-bold uppercase">
            {isTerminalMode ? "TERM ON" : "TERM OFF"}
          </span>
        </button>
      </div>

      {/* MOBILE TRIGGER - Visible on mobile, hidden on desktop */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="flex md:hidden items-center space-x-1.5 bg-yellow-900/15 border border-yellow-700/40 hover:bg-yellow-900/25 px-3 py-1.5 rounded-sm font-mono text-[9px] uppercase tracking-[0.15em] font-black text-yellow-500 hover:text-yellow-400 active:scale-95 transition-all cursor-pointer"
        style={{ minHeight: '44px' }}
      >
        <FolderOpen className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
        <span>{language === "hi" ? "दस्तावेज" : "Dossier"}</span>
      </button>

      {/* Mobile Drawer Navigation (Confidential Investigation Folder) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] cursor-pointer"
            />

            {/* Folder Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[310px] sm:w-[380px] bg-[#070709] border-l border-zinc-800/80 p-6 z-[101] shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Confidential Police Tag Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-5">
                  <div className="flex items-center space-x-2">
                    <FolderOpen className="w-4 h-4 text-yellow-600 animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-yellow-500 font-bold">
                      {language === "hi" ? "दस्तावेज अनुक्रमणिका" : "DOSSIER ARCHIVE"}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 -mr-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900/30 border border-zinc-800/40 cursor-pointer flex items-center justify-center"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Case Status Stamp */}
                <div className="mb-6 bg-red-950/10 border border-red-900/40 rounded p-3 relative overflow-hidden flex items-center space-x-3">
                  <div className="absolute right-[-10px] top-[-10px] opacity-[0.05] rotate-12 select-none">
                    <ShieldAlert className="w-16 h-16 text-red-500" />
                  </div>
                  <div className="w-2 h-2 rounded-full bg-red-600 animate-ping shrink-0" />
                  <div className="font-mono text-[9px] text-red-500 font-bold uppercase tracking-[0.1em]">
                    {language === "hi" ? "स्थिति: अत्यंत गोपनीय - केस फाइल" : "STATUS: RESTRICTED - COLD CASE"}
                  </div>
                </div>

                {/* Search field inside Drawer */}
                <div className="relative mb-5">
                  <div className="relative flex items-center bg-black border border-zinc-800 focus-within:border-zinc-700 rounded px-3 py-2 transition-all">
                    <Search className="w-3.5 h-3.5 text-zinc-500 mr-2 shrink-0" />
                    <input
                      type="text"
                      placeholder={language === "hi" ? "तारीख, अध्याय या गिरफ्तारी खोजें..." : "Search case details..."}
                      className="w-full bg-transparent border-none text-[11px] font-mono focus:outline-none placeholder-zinc-600 text-zinc-100"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="text-zinc-500 hover:text-white ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* List of sections & chapters */}
                <div className="flex-1 overflow-y-auto space-y-2 max-h-[50vh] pr-1">
                  <div className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-[0.15em] mb-2 px-1">
                    {language === "hi" ? "केस मील के पत्थर" : "Milestones Ledger"}
                  </div>
                  {filteredItems.length === 0 ? (
                    <div className="text-[10px] font-mono text-zinc-500 py-4 text-center">
                      {language === "hi" ? "कोई रिकॉर्ड नहीं मिला" : "No matches in archive"}
                    </div>
                  ) : (
                    filteredItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          handleItemSelect(item.sectionId);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2.5 bg-zinc-950/40 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-800 rounded flex items-center space-x-3 transition text-zinc-100 group cursor-pointer"
                        style={{ minHeight: '48px' }}
                      >
                        {item.type === "chapter" ? (
                          <BookOpen className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        ) : (
                          <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        )}
                        <span className="font-mono text-[10px] tracking-wide text-zinc-300 group-hover:text-white truncate">
                          {item.label[language]}
                        </span>
                      </button>
                    ))
                  )}
                </div>

                {/* Mobile Controls section */}
                <div className="border-t border-zinc-800 pt-5 mt-5 space-y-3.5">
                  {/* Case Report download inside menu */}
                  <button
                    onClick={() => {
                      downloadConfidentialReport();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-white/5 border border-zinc-800 rounded py-3 font-mono text-[10px] uppercase tracking-wider font-bold text-zinc-100 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                    style={{ minHeight: '48px' }}
                  >
                    <FileText className="w-4 h-4 text-zinc-100" />
                    <span>{language === "hi" ? "केस रिपोर्ट डाउनलोड" : "Download PDF Report"}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Language Select */}
                    <button
                      onClick={() => setLanguage(language === "hi" ? "en" : "hi")}
                      className="flex items-center justify-center space-x-1.5 border border-zinc-800 rounded py-3 text-[10px] hover:bg-zinc-900 transition-all font-mono font-bold uppercase cursor-pointer"
                      style={{ minHeight: '48px' }}
                    >
                      <Globe className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{language === "hi" ? "HINDI" : "ENGLISH"}</span>
                    </button>

                    {/* Terminal Switcher */}
                    <button
                      onClick={toggleTerminalMode}
                      className={`flex items-center justify-center space-x-1.5 border rounded py-3 text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                        isTerminalMode
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                          : "border-zinc-800 text-zinc-400 hover:bg-zinc-900"
                      }`}
                      style={{ minHeight: '48px' }}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{isTerminalMode ? "TERM ON" : "TERM OFF"}</span>
                    </button>
                  </div>
                </div>

                {/* Footer seal */}
                <div className="mt-6 text-center">
                  <span className="text-[7px] font-mono uppercase tracking-[0.3em] text-zinc-600 block">
                    DELHI POLICE ARCHIVE © 1978-2026
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Elegant Progress bar at bottom of header */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10">
        <div
          className="h-full bg-white transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
