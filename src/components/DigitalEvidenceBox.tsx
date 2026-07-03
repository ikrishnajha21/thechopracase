/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import { FolderHeart, Download, CheckSquare, Square, Trash2, ShieldAlert, Award } from "lucide-react";

interface CollectableItem {
  id: string;
  code: string;
  titleEn: string;
  titleHi: string;
  categoryEn: string;
  categoryHi: string;
  date: string;
  summaryEn: string;
  summaryHi: string;
}

interface DigitalEvidenceBoxProps {
  language: "hi" | "en";
}

export function DigitalEvidenceBox({ language }: DigitalEvidenceBoxProps) {
  const ALL_EVIDENCE_ITEMS: CollectableItem[] = [
    {
      id: "exhibit-a",
      code: "DEL-FIR-248",
      titleEn: "FIR No. 248 - Kidnapping Report",
      titleHi: "एफआईआर नंबर 248 - अपहरण रिपोर्ट",
      categoryEn: "Official Complaint Ledger",
      categoryHi: "आधिकारिक शिकायत बही",
      date: "August 27, 1978",
      summaryEn: "The original First Information Report filed at Delhi Police Station by Commander Madan Mohan Chopra.",
      summaryHi: "कमांडर मदन मोहन चोपड़ा द्वारा दिल्ली पुलिस स्टेशन में दर्ज कराई गई मूल प्रथम सूचना रिपोर्ट।"
    },
    {
      id: "exhibit-b",
      code: "PRESS-STATESMAN-78",
      titleEn: "The Statesman Headline Archive",
      titleHi: "द स्टेट्समैन हेडलाइन पुरालेख",
      categoryEn: "Newspaper Clipping",
      categoryHi: "समाचार पत्र कतरन",
      date: "August 29, 1978",
      summaryEn: "First public coverage of the Discovery in Ridge Forest. Marked capital outrage.",
      summaryHi: "रिज वन में खोज की पहली सार्वजनिक खबर। जनता के बीच भारी आक्रोश।"
    },
    {
      id: "exhibit-c",
      code: "CFSL-FIAT-1100",
      titleEn: "Fiat 1100 Forensics Record",
      titleHi: "फिएट 1100 फोरेंसिक रिकॉर्ड",
      categoryEn: "Forensic Blueprint",
      categoryHi: "फोरेंसिक आरेख",
      date: "September 02, 1978",
      summaryEn: "Detailed crime-lab sheet mapping blood spatter velocity and latent fingerprint correlation.",
      summaryHi: "रक्त के छींटों के वेग और फिंगरप्रिंट मिलान को दर्शाने वाला फोरेंसिक आरेख।"
    },
    {
      id: "exhibit-d",
      code: "MHA-BULLETIN-RANGA",
      titleEn: "Indian Express Manhunt Bulletin",
      titleHi: "इंडियन एक्सप्रेस वांछित अपराधियों का बुलेटिन",
      categoryEn: "National Wanted Circular",
      categoryHi: "राष्ट्रीय वांछित परिपत्र",
      date: "September 05, 1978",
      summaryEn: "Wanted posters distributed across Indian Railways which led to the capture at Ambala Station.",
      summaryHi: "भारतीय रेलवे पर वितरित वांटेड पोस्टर, जिसके कारण अंबाला स्टेशन पर गिरफ्तारी हुई।"
    },
    {
      id: "exhibit-e",
      code: "HC-VERDICT-1979",
      titleEn: "Delhi High Court Verdict Draft",
      titleHi: "दिल्ली उच्च न्यायालय के फैसले का मसौदा",
      categoryEn: "Legal Sentencing Draft",
      categoryHi: "सजा का मसौदा",
      date: "April 1979",
      summaryEn: "Fast-track sentencing draft awarding the maximum death penalty by hanging.",
      summaryHi: "फास्ट-ट्रैक अदालत द्वारा फांसी की अधिकतम सजा सुनाने का मसौदा।"
    },
    {
      id: "exhibit-f",
      code: "TOPO-RIDGE-4",
      titleEn: "Ridge Forest Topo Sketch",
      titleHi: "रिज वन भौगोलिक मानचित्र",
      categoryEn: "Crime Scene Map",
      categoryHi: "अपराध स्थल का नक्शा",
      date: "August 30, 1978",
      summaryEn: "Topographical forensic field sketch charting recovery coordinates in Sector R-4.",
      summaryHi: "रिज वन सेक्टर R-4 में शव बरामदगी के भौगोलिक निर्देशांक।"
    },
    {
      id: "lab-1",
      code: "CFSL-EXHIBIT-11A",
      titleEn: "Stolen Fiat Handle (Rear Right)",
      titleHi: "चोरी की फिएट का हैंडल (पीछे दाईं ओर)",
      categoryEn: "Latent Fingerprints",
      categoryHi: "छिपे हुए उंगलियों के निशान",
      date: "September 01, 1978",
      summaryEn: "Latent thumbprint matching Jasbir Singh (Billa) found on the chrome latch lever.",
      summaryHi: "क्रोम हैंडल लीवर पर जसबीर सिंह (बिल्ला) से मेल खाता हुआ अंगूठे का निशान।"
    },
    {
      id: "lab-2",
      code: "CFSL-EXHIBIT-14D",
      titleEn: "Silt Soil Sample (Footwear)",
      titleHi: "मिट्टी का नमूना (जूते से प्राप्त)",
      categoryEn: "Soil Mineral Profile",
      categoryHi: "मिट्टी के खनिज का विश्लेषण",
      date: "September 02, 1978",
      summaryEn: "Silt from Ranga's boots showing high-quartz mineral content matching Upper Ridge Sector 4.",
      summaryHi: "रंगा के जूतों से प्राप्त मिट्टी जिसमें अपर रिज सेक्टर 4 से मेल खाते खनिज पाए गए।"
    },
    {
      id: "lab-3",
      code: "CFSL-EXHIBIT-19C",
      titleEn: "Kalka Mail Passenger Ticket",
      titleHi: "कालका मेल यात्री टिकट",
      categoryEn: "Railway Paper Exhibit",
      categoryHi: "रेलवे पेपर साक्ष्य",
      date: "August 26, 1978",
      summaryEn: "Concealed blood trace and railway inspector stamp proving travel timeline.",
      summaryHi: "छिपे हुए खून के धब्बे और निरीक्षक की मोहर जो यात्रा की समय-सीमा की पुष्टि करती है।"
    }
  ];

  const [collectedIds, setCollectedIds] = useState<string[]>([]);

  // Load initially collected items from localstorage or pre-populate some for a great user experience
  useEffect(() => {
    const stored = localStorage.getItem("ranga_billa_collected_evidence");
    if (stored) {
      setCollectedIds(JSON.parse(stored));
    } else {
      // Pre-collect 3 core items so the box isn't empty initially!
      const initial = ["exhibit-a", "exhibit-c", "lab-1"];
      setCollectedIds(initial);
      localStorage.setItem("ranga_billa_collected_evidence", JSON.stringify(initial));
    }
  }, []);

  const toggleCollection = (id: string) => {
    let updated: string[];
    if (collectedIds.includes(id)) {
      updated = collectedIds.filter((item) => item !== id);
    } else {
      updated = [...collectedIds, id];
    }
    setCollectedIds(updated);
    localStorage.setItem("ranga_billa_collected_evidence", JSON.stringify(updated));
  };

  const clearAll = () => {
    setCollectedIds([]);
    localStorage.setItem("ranga_billa_collected_evidence", JSON.stringify([]));
  };

  const exportPDFReport = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    // 1978 Police Docket formatting
    doc.setFont("courier", "bold");
    doc.setFontSize(18);
    doc.text("DELHI POLICE DEPT - CRIMINAL INVESTIGATION", 105, 20, { align: "center" });
    
    doc.setFontSize(11);
    doc.text("CONFIDENTIAL CRIME DOSSIER // RECONSTRUCTION UNIT", 105, 26, { align: "center" });

    doc.setFont("courier", "normal");
    doc.setFontSize(8);
    doc.text("MHA INQUEST NO: 1978-DEL-CHOPRA // MHA REGISTRY: CLASSIFIED VINTAGE", 105, 31, { align: "center" });

    // Header Horizontal bar lines
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.6);
    doc.line(15, 35, 195, 35);
    doc.setLineWidth(0.2);
    doc.line(15, 37, 195, 37);

    // Case Details Table Grid
    doc.setFont("courier", "bold");
    doc.setFontSize(10);
    doc.text("CASE LOG DETAILS:", 15, 46);
    
    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    doc.text("OFFENSE CATEGORY : CAPITAL HOMICIDE & ABDUCTION", 15, 52);
    doc.text("DATE OF OFFENSE  : 26 AUGUST 1978 (18:15 HRS onwards)", 15, 57);
    doc.text("VICTIMS          : GEETA CHOPRA (16) & SANJAY CHOPRA (14)", 15, 62);
    doc.text("ACCUSED CODES    : SUBJECT-01A (RANGA), SUBJECT-02B (BILLA)", 15, 67);
    doc.text("PRIMARY LOCATION : RIDGE FOREST SECTOR R-4, NEW DELHI", 15, 72);

    // Official Stamp box
    doc.setDrawColor(239, 68, 68); // Red Stamp
    doc.rect(142, 43, 48, 31);
    doc.setFont("courier", "bold");
    doc.setFontSize(9);
    doc.setTextColor(239, 68, 68);
    doc.text("DELHI POLICE", 166, 49, { align: "center" });
    doc.text("M.H.A. CFSL LAB", 166, 54, { align: "center" });
    doc.setFontSize(7);
    doc.text("29-AUG-1978", 166, 61, { align: "center" });
    doc.setFontSize(9);
    doc.text("CLOSED CASE FILE", 166, 68, { align: "center" });

    // Reset color to black
    doc.setTextColor(0, 0, 0);
    doc.setDrawColor(0, 0, 0);

    // Divider
    doc.setLineWidth(0.4);
    doc.line(15, 78, 195, 78);

    // Selected items section
    doc.setFont("courier", "bold");
    doc.setFontSize(11);
    doc.text("FORENSIC EVIDENCE INVENTORY BOX:", 15, 86);

    const itemsToExport = ALL_EVIDENCE_ITEMS.filter(i => collectedIds.includes(i.id));

    if (itemsToExport.length === 0) {
      doc.setFont("courier", "italic");
      doc.setFontSize(9);
      doc.text("No items were added to the Digital Evidence Box for archival registry.", 20, 94);
    } else {
      let currentY = 94;
      itemsToExport.forEach((item, index) => {
        // Prevent page overflow
        if (currentY > 255) {
          doc.addPage();
          currentY = 20;
          doc.setFont("courier", "bold");
          doc.setFontSize(10);
          doc.text("EVIDENCE INVENTORY BOX (CONTINUED):", 15, currentY);
          currentY += 10;
        }

        doc.setFont("courier", "bold");
        doc.setFontSize(9.5);
        doc.text(`${index + 1}. [EXHIBIT ${item.code}] - ${item.titleEn}`, 15, currentY);
        
        doc.setFont("courier", "normal");
        doc.setFontSize(8);
        doc.text(`   CATEGORY: ${item.categoryEn.toUpperCase()}  //  DATE: ${item.date.toUpperCase()}`, 15, currentY + 4);

        const summarySplit = doc.splitTextToSize(`   ANALYSIS DETAIL: ${item.summaryEn}`, 175);
        doc.text(summarySplit, 15, currentY + 8);

        // Little status box
        doc.rect(15, currentY + 12, 180, 0.1);

        currentY += 17;
      });
    }

    // Footnotes and signatures
    doc.setFont("courier", "normal");
    doc.setFontSize(8.5);
    const footnoteText = "This file represents legal evidence retrieved during fast-track court proceedings. CFSL chemical testing, fingerprint classification matching, and railways timetable alignment have confirmed the absolute guilt of the accused beyond all reasonable doubt. Drafted on archival mechanical paper.";
    const splitFootnote = doc.splitTextToSize(footnoteText, 178);
    doc.text(splitFootnote, 15, 252);

    doc.line(15, 268, 85, 268);
    doc.text("C.F.S.L. Lead Chemist", 15, 272);
    doc.text("Dr. S. K. Prasad, New Delhi", 15, 276);

    doc.line(125, 268, 195, 268);
    doc.text("Commander M. M. Chopra", 125, 272);
    doc.text("Naval HQ / Chief Complainant", 125, 276);

    // Save PDF
    doc.save("1978-DELHI-POLICE-COLD-CASE.pdf");
  };

  return (
    <div className="w-full bg-black/95 border border-white/10 rounded-sm p-6 relative overflow-hidden my-12 shadow-2xl">
      <div className="grain"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header and Download Button */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-5 mb-6 gap-4 text-left">
        <div>
          <div className="flex items-center space-x-2 text-red-500 mb-1.5">
            <FolderHeart className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold">
              DIGITAL COLD-CASE EVIDENCE BOX
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-white tracking-tight">
            {language === "hi" ? "साक्ष्य संग्रह बॉक्स और केस रिपोर्ट" : "Archived Evidence Collector & Dossier Builder"}
          </h3>
          <p className="font-sans text-xs text-zinc-400 mt-1 max-w-xl font-light opacity-95">
            {language === "hi" 
              ? "जांच के दौरान एकत्रित साक्ष्यों को सहेजें। इसे 1978 के पुलिस रिकॉर्ड के रूप में एक पीडीएफ में डाउनलोड करें।" 
              : "Mark items collected during your study of the 1978 crime. Compile and export them into an authentic, vintage-styled Police Investigation report."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full sm:w-auto">
          {collectedIds.length > 0 && (
            <button
              onClick={clearAll}
              className="px-3 py-2 border border-white/10 hover:border-red-500/40 text-zinc-400 hover:text-white text-[10px] font-mono uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
              style={{ minHeight: '44px' }}
            >
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
              <span>{language === "hi" ? "साफ करें" : "Clear Box"}</span>
            </button>
          )}

          <button
            onClick={exportPDFReport}
            className="px-4 py-3 bg-red-500 hover:bg-red-600 border border-red-400 text-black font-mono text-[10px] font-black uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:scale-102 w-full sm:w-auto text-center"
            style={{ minHeight: '44px' }}
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>{language === "hi" ? "1978 पुलिस रिपोर्ट" : "GENERATE REPORT (PDF)"}</span>
          </button>
        </div>
      </div>

      {/* Grid checklist of exhibits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10 text-left">
        {ALL_EVIDENCE_ITEMS.map((item) => {
          const isCollected = collectedIds.includes(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleCollection(item.id)}
              className={`p-3 border rounded-sm transition-all duration-300 flex items-start gap-3 select-none cursor-pointer hover:border-white/20 ${
                isCollected
                  ? "bg-red-950/10 border-red-500/40"
                  : "bg-black/30 border-white/5 opacity-60"
              }`}
            >
              {/* Checkbox Icon */}
              <div className="mt-0.5 shrink-0 text-red-500 transition-colors">
                {isCollected ? (
                  <CheckSquare className="w-4.5 h-4.5 text-red-500 fill-red-500/20" />
                ) : (
                  <Square className="w-4.5 h-4.5 text-zinc-600" />
                )}
              </div>

              {/* Item Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-wider">
                    {item.code}
                  </span>
                  <span className="font-mono text-[7px] text-zinc-600">
                    {item.date}
                  </span>
                </div>
                <h4 className="font-serif text-xs font-bold text-white truncate mt-0.5">
                  {language === "hi" ? item.titleHi : item.titleEn}
                </h4>
                <p className="font-sans text-[10px] text-zinc-400 line-clamp-2 mt-1 leading-normal font-light opacity-95">
                  {language === "hi" ? item.summaryHi : item.summaryEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer statistics indicator */}
      <div className="relative z-10 mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-zinc-500 font-mono text-[8px] gap-2">
        <div className="flex items-center space-x-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-zinc-600" />
          <span>CFSL FILES REGISTRY // STATUS COUNT: {collectedIds.length} / 9 COLLECTED SECURED</span>
        </div>
        <div className="flex items-center space-x-1">
          <Award className="w-3.5 h-3.5 text-zinc-600" />
          <span>{language === "hi" ? "अभिलेखीय विभाग, दिल्ली सरकार" : "ARCHIVAL DIVISION, GOVT OF INDIA"}</span>
        </div>
      </div>
    </div>
  );
}
