/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { User, Car, Skull, FileText, ShieldAlert, Pin, RefreshCw, Layers } from "lucide-react";

interface ProfileNode {
  id: string;
  name: string;
  alias: string;
  role: string;
  status: string;
  x: number; // Percentage positions for SVG thread mapping
  y: number;
  photoLabel: string;
  bio: string;
  criminalRecord: string[];
  vehicleDetails?: {
    make: string;
    plate: string;
    roleInCrime: string;
  };
}

interface EvidenceBoardProps {
  language: "hi" | "en";
}

export function EvidenceBoard({ language }: EvidenceBoardProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const nodes: ProfileNode[] = [
    {
      id: "ranga",
      name: language === "hi" ? "कुलजीत सिंह" : "Kuljeet Singh",
      alias: language === "hi" ? "रंगा" : "Ranga",
      role: language === "hi" ? "मुख्य सह-साजिशकर्ता" : "Primary Co-Conspirator",
      status: language === "hi" ? "फांसी दी गई // 31 जनवरी, 1982" : "Executed // Jan 31, 1982",
      x: 20,
      y: 25,
      photoLabel: "SUBJECT_01_A",
      bio: language === "hi"
        ? "मुंबई का एक आदतन अपराधी और अवसरवादी, जिसका चोरी, राहजनी और स्थानीय अधिकारियों से बचने का इतिहास रहा है। अगस्त 1978 के मध्य में जसबीर सिंह के साथ दिल्ली पहुंचा था।"
        : "A habitual drifter and opportunist from Mumbai with a history of petty thefts, street muggings, and evasion of local authorities. Arrived in Delhi with Jasbir Singh in mid-August 1978.",
      criminalRecord: language === "hi"
        ? [
            "वाहन चोरी के कई मामले (बॉम्बे पुलिस विभाग)",
            "हमला और गिरफ्तारी का विरोध (1976)",
            "1978 के अपहरण और हत्या मामले में सह-अभियुक्त",
          ]
        : [
            "Multiple counts of vehicle theft (Bombay Police Dept.)",
            "Assault and resisting arrest (1976)",
            "Co-defendant in 1978 kidnapping and capital homicide",
          ],
    },
    {
      id: "billa",
      name: language === "hi" ? "जसबीर सिंह" : "Jasbir Singh",
      alias: language === "hi" ? "बिल्ला" : "Billa",
      role: language === "hi" ? "मुख्य सह-साजिशकर्ता" : "Primary Co-Conspirator",
      status: language === "hi" ? "फांसी दी गई // 31 जनवरी, 1982" : "Executed // Jan 31, 1982",
      x: 80,
      y: 25,
      photoLabel: "SUBJECT_02_B",
      bio: language === "hi"
        ? "एक शातिर अपराधी जो अपने अनियंत्रित व्यवहार और अत्यधिक शारीरिक वर्चस्व के लिए जाना जाता था। मुंबई में सुनवाई की कार्यवाही से भागने के बाद रंगा के साथ मिलकर राजमार्ग डकैती और फिरौती के लिए अपहरण करने लगा था।"
        : "A hardened offender known for erratic behavior and extreme physical dominance. Escaped Mumbai trial proceedings before partnering with Ranga to execute highway robberies and ransom kidnappings.",
      criminalRecord: language === "hi"
        ? [
            "राजमार्ग डकैती (ठाणे जिला, 1975)",
            "चोरी के हथियार रखने का मामला (1977)",
            "1978 के अपहरण और हत्या मामले में सह-अभियुक्त",
          ]
        : [
            "Highway robbery (Thane District, 1975)",
            "Stolen weapon possession (1977)",
            "Co-defendant in 1978 kidnapping and capital homicide",
          ],
    },
    {
      id: "fiat",
      name: language === "hi" ? "मौत का जाल बनी कार" : "The 'Death Trap' Car",
      alias: language === "hi" ? "फिएट 1100 (DLK 3433)" : "Fiat 1100 (DLK 3433)",
      role: language === "hi" ? "अपराध का उपकरण" : "Instrument of Crime",
      status: language === "hi" ? "जब्त और नष्ट" : "Confiscated & Scrapped",
      x: 50,
      y: 70,
      photoLabel: "EXHIBIT__03_CAR",
      bio: language === "hi"
        ? "फर्जी नंबर प्लेट के तहत पंजीकृत एक चोरी की गई ग्रे फिएट 1100 कार। कार के पिछले दरवाजे के हैंडल हटा दिए गए थे, जिससे पीछे की सीट अनजान चोपड़ा भाई-बहन के लिए एक अपरिहार्य जेल कक्ष में बदल गई थी।"
        : "A stolen grey Fiat 1100 registered under a falsified plate. Modified internally to prevent easy egress. The rear door handles were removed, effectively turning the back seat into an inescapable prison cell for the unsuspecting Chopra siblings.",
      criminalRecord: language === "hi"
        ? [
            "24 अगस्त, 1978 को मध्य दिल्ली से चोरी हुई",
            "नकली नंबर प्लेट लगाई गई",
            "पीड़ितों के सामान से मेल खाते हुए सुराग के साथ लावारिस मिली",
          ]
        : [
            "Stolen from Central Delhi on August 24, 1978",
            "Fitted with duplicate license plates",
            "Found abandoned with trace matching the victims' belongings",
          ],
      vehicleDetails: {
        make: "Premier Fiat 1100-D",
        plate: language === "hi" ? "DLK 3433 (चोरी की गई)" : "DLK 3433 (Stolen)",
        roleInCrime: language === "hi"
          ? "प्राथमिक परिवहन और प्रारंभिक संघर्ष का स्थल।"
          : "Primary transport and site of the initial struggle.",
      },
    },
  ];

  const nodeConnections = [
    { from: "ranga", to: "fiat" },
    { from: "billa", to: "fiat" },
    { from: "ranga", to: "billa" },
  ];

  const activeProfile = nodes.find((n) => n.id === selectedNode);

  return (
    <div className="w-full bg-[#020202] border border-white/10 rounded-sm p-6 md:p-8 relative overflow-hidden shadow-2xl my-12 select-none text-left">
      {/* Wooden Frame aesthetic replaced with clean Crime Scene Red border overlay */}
      <div className="absolute inset-0 border-[6px] border-zinc-950 pointer-events-none z-30" />
      
      {/* Textured Corkboard Background replaced with Charcoal + neutral grid */}
      <div className="absolute inset-0 bg-black bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1.5px)] [background-size:12px_12px] opacity-70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-transparent to-black/80 pointer-events-none" />

      {/* Decorative Blueprint Corner Lines */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/10 pointer-events-none" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/10 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/10 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/10 pointer-events-none" />

      {/* Title & Badge */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-red-500 mb-2">
            <Layers className="w-4 h-4 text-red-500" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] font-bold">
              {language === "hi" ? "खोजी सहसंबंध बोर्ड" : "INVESTIGATIVE CORRELATION BOARD"}
            </span>
          </div>
          <h3 className="font-serif text-2xl font-black text-white tracking-tight">
            {language === "hi" ? "रंगा-बिल्ला सिंडिकेट संबंध" : "The Ranga-Billa Syndicate Connections"}
          </h3>
          <p className="font-sans text-xs text-zinc-400 mt-1 max-w-xl font-light opacity-95">
            {language === "hi"
              ? "संदिग्धों, अपहरण के वाहन और उन्हें जोड़ने वाले फोरेंसिक सुरागों को दर्शाने वाला इंटरैक्टिव इंटेलिजेंस बोर्ड।"
              : "Interactive intelligence board mapping the suspects, the vehicle of abduction, and the forensic links that bound them together."}
          </p>
        </div>

        {selectedNode && (
          <button
            onClick={() => setSelectedNode(null)}
            className="flex items-center space-x-1.5 px-3 py-1.5 border border-white/10 hover:border-red-500/30 bg-white/[0.02] text-zinc-300 hover:text-white text-[10px] font-mono uppercase tracking-wider rounded-sm transition-all cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{language === "hi" ? "पिन रीसेट करें" : "Reset Pins"}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
        
        {/* Left Interactive Corkboard Display (7 Cols) */}
        <div className="lg:col-span-7 bg-black/40 border border-white/10 rounded-sm relative min-h-[400px] overflow-hidden p-6">
          
          {/* Dynamic Red Connecting Threads (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {nodeConnections.map((conn, idx) => {
              const startNode = nodes.find((n) => n.id === conn.from);
              const endNode = nodes.find((n) => n.id === conn.to);
              if (!startNode || !endNode) return null;

              // Animate threads for selected items
              const isLinked = selectedNode === conn.from || selectedNode === conn.to;

              return (
                <g key={idx}>
                  {/* Shadow line */}
                  <line
                    x1={`${startNode.x}%`}
                    y1={`${startNode.y}%`}
                    x2={`${endNode.x}%`}
                    y2={`${endNode.y}%`}
                    stroke="rgba(0,0,0,0.8)"
                    strokeWidth="3.5"
                    className="transition-all duration-300"
                  />
                  {/* Main red string */}
                  <line
                    x1={`${startNode.x}%`}
                    y1={`${startNode.y}%`}
                    x2={`${endNode.x}%`}
                    y2={`${endNode.y}%`}
                    stroke={isLinked ? "#ef4444" : "#b91c1c"}
                    strokeWidth={isLinked ? "2.5" : "1.5"}
                    strokeDasharray={isLinked ? "none" : "3,3"}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Profile Polaroid Nodes */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {nodes.map((node) => {
              const isSelected = selectedNode === node.id;
              
              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                >
                  <button
                    onClick={() => setSelectedNode(node.id)}
                    className={`flex flex-col items-center bg-[#fcfbf9] p-2.5 pb-4 shadow-xl border transition-all duration-300 hover:scale-105 active:scale-95 group relative cursor-pointer ${
                      isSelected
                        ? "border-red-500 ring-2 ring-red-500/20 rotate-0"
                        : "border-[#e0d6c5] hover:border-red-700/50 " + 
                          (node.id === "ranga" ? "-rotate-2" : node.id === "billa" ? "rotate-2" : "rotate-1")
                    }`}
                    style={{ width: "125px" }}
                  >
                    {/* Push Pin */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 transition-all group-hover:scale-110">
                      <Pin className={`w-5 h-5 drop-shadow-md ${isSelected ? "text-red-500 fill-red-500" : "text-zinc-600 fill-zinc-600"}`} />
                    </div>

                    {/* Polaroid Grayscale Image Box */}
                    <div className={`w-full h-20 flex items-center justify-center border border-[#e6dcce] rounded-sm grayscale group-hover:grayscale-0 transition-all ${
                      node.id === "fiat" ? "bg-zinc-900 text-zinc-400" : "bg-zinc-800 text-zinc-300"
                    }`}>
                      {node.id === "fiat" ? (
                        <Car className="w-8 h-8 text-red-900/40" />
                      ) : (
                        <User className="w-8 h-8 text-red-900/40" />
                      )}
                    </div>

                    {/* Tag / Name Label */}
                    <div className="mt-2.5 text-center">
                      <span className="font-mono text-[8px] bg-red-100 border border-red-200 text-red-800 px-1 py-0.2 rounded font-bold uppercase tracking-wide font-mono">
                        {node.photoLabel}
                      </span>
                      <h4 className="font-serif text-[11px] font-bold text-zinc-900 mt-1 leading-none">
                        {node.alias}
                      </h4>
                      <p className="font-sans text-[8px] text-zinc-500 mt-0.5 leading-none font-light">
                        {node.name.split(" ")[0]}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Dossier / File Details (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col">
          {activeProfile ? (
            <div className="flex-1 bg-[#010101]/95 border border-white/10 p-5 rounded-sm relative flex flex-col justify-between animate-fadeIn text-left">
              {/* Case file paper effect */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
              
              <div>
                {/* Dossier Badge */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center space-x-1.5 text-red-500">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="font-mono text-[9px] uppercase tracking-wider font-bold">
                      {language === "hi" ? "दिल्ली पुलिस विभाग // दस्तावेज़" : "DELHI POLICE DEPT // DOSSIER"}
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-zinc-500">
                    ID: {activeProfile.photoLabel}
                  </span>
                </div>

                {/* Primary Name Details */}
                <h3 className="font-serif text-xl font-black text-white">
                  {activeProfile.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1.5 mb-4">
                  <span className="font-mono text-[9px] bg-red-500/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    {language === "hi" ? "उपनाम" : "ALIAS"}: {activeProfile.alias}
                  </span>
                  <span className="text-zinc-600 font-mono text-[10px]">|</span>
                  <span className="font-mono text-[9px] text-red-500 font-semibold uppercase">
                    {activeProfile.status}
                  </span>
                </div>

                {/* Narrative Profile Bio */}
                <div className="space-y-3">
                  <div>
                    <h5 className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                      {language === "hi" ? "वर्णनात्मक विश्लेषण और वर्गीकरण" : "NARRATIVE ANALYSIS & CLASSIFICATION"}
                    </h5>
                    <p className="font-sans text-xs text-zinc-200 leading-relaxed font-light opacity-95">
                      {activeProfile.bio}
                    </p>
                  </div>

                  {/* Vehicle Details Sub-section if applicable */}
                  {activeProfile.vehicleDetails && (
                    <div className="p-3 bg-black/40 border border-white/10 rounded-sm">
                      <h5 className="font-mono text-[8px] uppercase tracking-wider text-red-400 font-bold mb-1.5 flex items-center space-x-1">
                        <Car className="w-3 h-3 text-red-500" />
                        <span>{language === "hi" ? "संशोधित वाहन साक्ष्य पत्रक" : "MODIFIED VEHICLE EVIDENCE SHEET"}</span>
                      </h5>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-300">
                        <div>
                          <span className="text-zinc-500 block">{language === "hi" ? "निर्माता / श्रेणी" : "MAKE / CLASS"}</span>
                          <span className="text-white font-bold">{activeProfile.vehicleDetails.make}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 block">{language === "hi" ? "पंजीकरण टैग" : "REGISTRY TAG"}</span>
                          <span className="text-white font-bold">{activeProfile.vehicleDetails.plate}</span>
                        </div>
                        <div className="col-span-2 mt-1">
                          <span className="text-zinc-500 block">{language === "hi" ? "खोजी गई भूमिका" : "ROLE DETECTED"}</span>
                          <span className="font-sans text-[11px] text-zinc-200 leading-tight">
                            {activeProfile.vehicleDetails.roleInCrime}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Criminal History List */}
                  <div>
                    <h5 className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 font-bold mb-2">
                      {language === "hi" ? "सत्यापित आपराधिक रिकॉर्ड / ज्ञात इतिहास" : "VERIFIED RAP SHEET / KNOWN RECORDS"}
                    </h5>
                    <ul className="space-y-1.5">
                      {activeProfile.criminalRecord.map((record, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs font-sans font-light text-zinc-300 leading-tight opacity-95">
                          <Skull className="w-3.5 h-3.5 text-red-500/40 mt-0.5 flex-shrink-0" />
                          <span>{record}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Prompt */}
              <div className="border-t border-white/10 pt-4 mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-zinc-500 font-mono text-[9px]">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{language === "hi" ? "गृह मंत्रालय आपराधिक खुफिया विभाग" : "MHA_CRIMINAL_INTELLIGENCE"}</span>
                </div>
                <span className="font-mono text-[8px] uppercase text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">
                  {language === "hi" ? "संबंध स्थापित" : "LINK ESTABLISHED"}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex-1 bg-[#020202]/40 border border-white/10 rounded-sm p-8 flex flex-col justify-center items-center text-center relative border-dashed">
              <div className="w-12 h-12 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-zinc-600" />
              </div>
              <h4 className="font-serif text-base font-bold text-white">
                {language === "hi" ? "दस्तावेज़ फ़ाइलों की जांच करें" : "Inspect Dossier Files"}
              </h4>
              <p className="font-sans text-xs text-zinc-400 max-w-xs mt-1.5 font-light leading-relaxed opacity-95">
                {language === "hi"
                  ? "विशिष्ट उच्च-प्राथमिकता वाले आपराधिक दस्तावेजों और फोरेंसिक लॉग को देखने के लिए बाईं ओर के बोर्ड पर किसी भी पोलरॉइड पोर्ट्रेट या पिन पर क्लिक करें।"
                  : "Click any Polaroid portrait or pin on the left board to release specific high-priority criminal dossiers and forensic logs."}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
