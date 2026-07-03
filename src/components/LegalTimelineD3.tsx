/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { Calendar, ShieldAlert, Scale, Clock, CheckCircle } from "lucide-react";

interface Milestone {
  id: string;
  dateStr: string;
  date: Date;
  label: string;
  stage: "Crime" | "Investigation" | "Trial" | "Verdict" | "Execution";
  description: string;
}

interface LegalTimelineD3Props {
  language: "hi" | "en";
}

export function LegalTimelineD3({ language }: LegalTimelineD3Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [width, setWidth] = useState(800);

  const selectedMilestoneRef = useRef<Milestone | null>(null);
  selectedMilestoneRef.current = selectedMilestone;

  const milestones: Milestone[] = useMemo(() => [
    {
      id: "m1",
      dateStr: language === "hi" ? "26 अगस्त 1978" : "Aug 26, 1978",
      date: new Date(1978, 7, 26),
      label: language === "hi" ? "अपहरण" : "The Abduction",
      stage: "Crime",
      description: language === "hi"
        ? "गीता और संजय चोपड़ा का धौला कुआं से एक चोरी की गई ग्रे फिएट 1100 कार में अपहरण कर लिया गया, जिससे पूरे दिल्ली शहर में हड़कंप मच गया।"
        : "Geeta and Sanjay Chopra are abducted at Dhaula Kuan in a stolen grey Fiat 1100, sparking a massive citywide alarm.",
    },
    {
      id: "m2",
      dateStr: language === "hi" ? "27 अगस्त 1978" : "Aug 27, 1978",
      date: new Date(1978, 7, 27),
      label: language === "hi" ? "प्राथमिकी दर्ज" : "FIR No. 248",
      stage: "Investigation",
      description: language === "hi"
        ? "दिल्ली में आधिकारिक तौर पर प्राथमिकी (FIR No. 248) दर्ज की गई। पुलिस के तलाशी अभियान में सहायता के लिए नौसेना और सेना की इकाइयों को तैनात किया गया।"
        : "First Information Report officially registered at Delhi. Navies and army units mobilize to aid police search sweeps.",
    },
    {
      id: "m3",
      dateStr: language === "hi" ? "29 अगस्त 1978" : "Aug 29, 1978",
      date: new Date(1978, 7, 29),
      label: language === "hi" ? "शव बरामदगी" : "Ridge Discovery",
      stage: "Investigation",
      description: language === "hi"
        ? "पीड़ितों के शव अपर रिज फॉरेस्ट (घने जंगलों) में बरामद हुए। घटनास्थल पर तुरंत गहन वैज्ञानिक और फोरेंसिक जांच शुरू की गई।"
        : "Victims are located in the Upper Ridge Forest. Intensive forensic examinations begin on site.",
    },
    {
      id: "m4",
      dateStr: language === "hi" ? "8 सितंबर 1978" : "Sep 8, 1978",
      date: new Date(1978, 8, 8),
      label: language === "hi" ? "ट्रेन में गिरफ्तारी" : "Train Capture",
      stage: "Investigation",
      description: language === "hi"
        ? "रंगा और बिल्ला को कालका मेल एक्सप्रेस ट्रेन के तीसरे दर्जे के डिब्बे में छुट्टी पर जा रहे सतर्क सैनिकों द्वारा पहचाने जाने के बाद सेना पुलिस ने गिरफ्तार किया।"
        : "Ranga and Billa are spotted on the Kalka Mail express train and arrested by military police in third-class.",
    },
    {
      id: "m5",
      dateStr: language === "hi" ? "मार्च 1979" : "Mar 1979",
      date: new Date(1979, 2, 1),
      label: language === "hi" ? "सत्र न्यायालय में सुनवाई" : "Sessions Trial",
      stage: "Trial",
      description: language === "hi"
        ? "फास्ट-ट्रैक सत्र न्यायालय में दैनिक सुनवाई शुरू हुई। दर्जनों प्रमुख फोरेंसिक विशेषज्ञों, चिकित्सा विशेषज्ञों और रेलवे गवाहों ने गवाही दी।"
        : "Fast-track sessions court hearing begins. Dozens of key forensics experts and railway witnesses testify.",
    },
    {
      id: "m6",
      dateStr: language === "hi" ? "7 अप्रैल 1979" : "Apr 7, 1979",
      date: new Date(1979, 3, 7),
      label: language === "hi" ? "मृत्युदंड की सजा" : "Death Sentence",
      stage: "Verdict",
      description: language === "hi"
        ? "फास्ट-ट्रैक सत्र न्यायाधीश ने पूर्व-नियोजित बर्बरता को देखते हुए दोनों दोषियों रंगा और बिल्ला को मौत की सजा सुनाई।"
        : "The fast-track sessions judge sentences both perpetrators to death, citing unprecedented cold deliberation.",
    },
    {
      id: "m7",
      dateStr: language === "hi" ? "अप्रैल 1980" : "Apr 1980",
      date: new Date(1980, 3, 1),
      label: language === "hi" ? "उच्च न्यायालय द्वारा पुष्टि" : "High Court Uphold",
      stage: "Verdict",
      description: language === "hi"
        ? "दिल्ली उच्च न्यायालय ने सत्र न्यायालय के मृत्युदंड के फैसले की पूर्ण समीक्षा कर उसकी पुष्टि की और दया की सभी अपीलों को अस्वीकार कर दिया।"
        : "Delhi High Court reviews and confirms the trial court decision, rejecting all mitigation pleas.",
    },
    {
      id: "m8",
      dateStr: language === "hi" ? "अप्रैल 1981" : "Apr 1981",
      date: new Date(1981, 3, 1),
      label: language === "hi" ? "सर्वोच्च न्यायालय द्वारा खारिज" : "Supreme Court Reject",
      stage: "Verdict",
      description: language === "hi"
        ? "भारत के सर्वोच्च न्यायालय ने अंतिम आपराधिक याचिका को यह कहते हुए खारिज कर दिया कि यह जघन्य मामला मृत्युदंड के लिए पूर्णतः उपयुक्त है।"
        : "The Supreme Court of India dismisses the final criminal appeal, declaring the case is fit for capital punishment.",
    },
    {
      id: "m9",
      dateStr: language === "hi" ? "31 जनवरी 1982" : "Jan 31, 1982",
      date: new Date(1982, 0, 31),
      label: language === "hi" ? "तिहाड़ में फांसी" : "Tihar Hanging",
      stage: "Execution",
      description: language === "hi"
        ? "रंगा और बिल्ला को तड़के सुबह तिहाड़ जेल में फांसी दी गई, जिससे देश के सबसे भावनात्मक और ऐतिहासिक न्यायिक मामलों में से एक का समापन हुआ।"
        : "Ranga and Billa are executed by hanging at Tihar Jail at dawn, closing one of India's most emotional judicial battles.",
    },
  ], [language]);

  const translateStage = (stage: string) => {
    if (language === "hi") {
      switch (stage) {
        case "Crime": return "अपराध";
        case "Investigation": return "पुलिस जांच";
        case "Trial": return "सुनवाई";
        case "Verdict": return "निर्णय";
        case "Execution": return "फांसी";
        default: return stage;
      }
    }
    return stage;
  };

  // Set default selected milestone
  useEffect(() => {
    if (!selectedMilestone && milestones.length) {
      setSelectedMilestone(milestones[0]);
    } else if (selectedMilestone) {
      // Keep correct translated version selected
      const current = milestones.find(m => m.id === selectedMilestone.id);
      if (current) {
        setSelectedMilestone(current);
      }
    }
  }, [language, milestones]);

  // Track parent width for responsiveness
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(Math.max(400, entry.contentRect.width));
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Render D3 SVG Timeline (Only on width or language milestone list changes!)
  useEffect(() => {
    if (!svgRef.current || !milestones.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const height = 150;
    const margin = { top: 40, right: 50, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Index-based scale to perfectly separate the circles and prevent overlap
    const xScale = d3.scaleLinear()
      .domain([0, milestones.length - 1])
      .range([30, innerWidth - 30]);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Draw main timeline track line
    g.append("line")
      .attr("x1", 0)
      .attr("y1", innerHeight / 2)
      .attr("x2", innerWidth)
      .attr("y2", innerHeight / 2)
      .attr("stroke", "rgba(255, 255, 255, 0.2)")
      .attr("stroke-width", 2);

    // Render interactive nodes
    const nodeG = g.selectAll(".node")
      .data(milestones)
      .enter()
      .append("g")
      .attr("class", "node cursor-pointer")
      .attr("transform", (d, i) => `translate(${xScale(i)}, ${innerHeight / 2})`)
      .on("click", (event, d) => {
        setSelectedMilestone(d);
      })
      .on("mouseover", (event, d) => {
        // Change mouse cursor style
        d3.select(event.currentTarget).style("cursor", "pointer");
        // Highlight circle temporarily if it is not the active one
        const isCurrent = selectedMilestoneRef.current && selectedMilestoneRef.current.id === d.id;
        if (!isCurrent) {
          d3.select(event.currentTarget).select(".node-circle")
            .transition()
            .duration(150)
            .attr("r", 9);
        }
      })
      .on("mouseout", (event, d) => {
        // Keep the active selected one larger or revert
        const isCurrent = selectedMilestoneRef.current && selectedMilestoneRef.current.id === d.id;
        d3.select(event.currentTarget).select(".node-circle")
          .transition()
          .duration(150)
          .attr("r", isCurrent ? 9 : 6);
      });

    // Node circles with class name for easy targeting
    nodeG.append("circle")
      .attr("class", "node-circle transition-all duration-300")
      .attr("r", d => (selectedMilestoneRef.current && selectedMilestoneRef.current.id === d.id) ? 9 : 6)
      .attr("fill", d => (selectedMilestoneRef.current && selectedMilestoneRef.current.id === d.id) ? "#ffffff" : "#09090b")
      .attr("stroke", d => getStageColor(d.stage))
      .attr("stroke-width", 3);

    // Ripple glowing pulse for the nodes
    nodeG.append("circle")
      .attr("r", 15)
      .attr("fill", "transparent")
      .attr("stroke", d => getStageColor(d.stage))
      .attr("stroke-width", 1)
      .attr("opacity", 0.15)
      .attr("class", "hover:scale-125 transition-all duration-300");

    // Dynamic Labels above nodes - elevated contrast and visibility
    nodeG.append("text")
      .attr("y", -22)
      .attr("text-anchor", "middle")
      .attr("class", "font-sans text-[10px] font-bold fill-zinc-100 pointer-events-none")
      .text(d => d.label);

    // Miniature date below node - elevated contrast and visibility
    nodeG.append("text")
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("class", "font-mono text-[9px] font-semibold fill-zinc-300 pointer-events-none")
      .text(d => d.dateStr.split(",")[0]);

  }, [width, milestones]);

  // Lightweight effect to update node circle styles in response to selection change
  useEffect(() => {
    if (!svgRef.current || !milestones.length) return;
    const svg = d3.select(svgRef.current);
    
    svg.selectAll(".node-circle")
      .transition()
      .duration(200)
      .attr("r", (d: any) => (selectedMilestone && selectedMilestone.id === d.id) ? 9 : 6)
      .attr("fill", (d: any) => (selectedMilestone && selectedMilestone.id === d.id) ? "#ffffff" : "#09090b");
  }, [selectedMilestone]);

  function getStageColor(stage: string) {
    switch (stage) {
      case "Crime": return "#f97316"; // Orange
      case "Investigation": return "#3b82f6"; // Blue
      case "Trial": return "#a855f7"; // Purple
      case "Verdict": return "#10b981"; // Emerald
      case "Execution": return "#ef4444"; // Red
      default: return "#ffffff";
    }
  }

  function getStageIcon(stage: string) {
    switch (stage) {
      case "Crime": return <ShieldAlert className="w-4 h-4 text-orange-500" />;
      case "Investigation": return <Clock className="w-4 h-4 text-blue-500" />;
      case "Trial": return <Scale className="w-4 h-4 text-purple-500" />;
      case "Verdict": return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "Execution": return <Calendar className="w-4 h-4 text-red-500" />;
      default: return <Scale className="w-4 h-4 text-white" />;
    }
  }

  return (
    <div ref={containerRef} className="w-full bg-[#020202] border border-white/10 rounded-sm p-6 my-12 relative shadow-2xl overflow-hidden">
      <div className="grain"></div>
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      {/* Header section */}
      <div className="border-b border-white/10 pb-4 mb-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-brand-accent/60 mb-1">
            <Scale className="w-4 h-4" />
            <span className="font-mono text-[8px] uppercase tracking-[0.25em] font-bold">
              {language === "hi" ? "न्यायिक प्रणाली मार्ग" : "JUDICIAL SYSTEM PATHWAY"}
            </span>
          </div>
          <h3 className="font-serif text-xl font-bold text-brand-accent">
            {language === "hi" ? "D3 न्यायिक घटनाक्रम (1978 – 1982)" : "D3 Judicial Chronology (1978 – 1982)"}
          </h3>
          <p className="font-sans text-[11px] text-brand-accent/40 font-light mt-0.5">
            {language === "hi"
              ? "अपराध स्थल से लेकर ऐतिहासिक फास्ट-ट्रैक न्यायिक फांसी तक के मार्ग को रेखांकित करने के लिए समय अक्ष (time axis) के बिंदुओं पर कर्सर ले जाएं।"
              : "Hover over the time axis points to trace the path from the crime scene to the historic fast-track judicial hanging."}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-[8px] uppercase tracking-wider text-brand-accent/50">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /><span>{language === "hi" ? "अपराध" : "Abduction"}</span></div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /><span>{language === "hi" ? "पुलिस" : "Police"}</span></div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500" /><span>{language === "hi" ? "सुनवाई" : "Trial"}</span></div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span>{language === "hi" ? "निर्णय" : "Verdict"}</span></div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /><span>{language === "hi" ? "फांसी" : "Hanging"}</span></div>
        </div>
      </div>

      {/* D3 SVG Axis Container */}
      <div className="w-full overflow-x-auto relative z-10 select-none pb-2">
        <svg
          ref={svgRef}
          width={width}
          height={150}
          className="mx-auto"
        />
      </div>

      {/* Milestone Detailed Card */}
      {selectedMilestone && (
        <div className="bg-[#010101]/80 border border-white/10 rounded-sm p-5 relative z-10 mt-4 flex flex-col md:flex-row md:items-start justify-between gap-6 animate-fadeIn">
          <div className="flex-1 text-left">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="font-mono text-[8px] px-2.5 py-0.5 rounded uppercase tracking-[0.1em] font-bold flex items-center gap-1.5 bg-white/5 border border-white/10">
                {getStageIcon(selectedMilestone.stage)}
                <span className="text-zinc-200">{translateStage(selectedMilestone.stage)}</span>
              </span>
              <span className="font-mono text-[9px] text-brand-accent/55 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedMilestone.dateStr.toUpperCase()}</span>
              </span>
            </div>

            <h4 className="font-serif text-lg font-bold text-brand-accent mb-2">
              {selectedMilestone.label}
            </h4>
            <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light">
              {selectedMilestone.description}
            </p>
          </div>

          <div className="hidden md:block w-32 border-l border-white/10 pl-6 self-stretch flex flex-col justify-between font-mono text-[8px] text-brand-accent/30 py-1">
            <div>
              <span>{language === "hi" ? "अभिलेख क्रम" : "RECORD_SEQ"}</span>
              <span className="block text-brand-accent font-bold text-[10px]">{selectedMilestone.id.toUpperCase()}</span>
            </div>
            <div>
              <span>{language === "hi" ? "प्राधिकरण: दिल्ली पुलिस" : "AUTH: DEL_POL"}</span>
              <span className="block text-brand-accent font-bold">{language === "hi" ? "सत्यापित लॉग" : "VERIFIED_LOG"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
