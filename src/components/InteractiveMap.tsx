/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { MAP_NODES } from "../data/storyData";
import { MapNode } from "../types";
import { MapPin, Info, ArrowRight, Thermometer, Compass, Activity, Shield } from "lucide-react";

interface InteractiveMapProps {
  language: "hi" | "en";
  activeNodeId?: string;
  onNodeClick?: (nodeId: string) => void;
}

// Rich forensic telemetry for each location
const FORENSIC_TELEMETRY: Record<string, { latLng: string; temp1978: string; humidity: string; forensicFact: string; activeAgent: string }> = {
  "node-mumbai": {
    latLng: "19.0760° N, 72.8777° E",
    temp1978: "27.2°C (81.0°F)",
    humidity: "92% (High Monsoon)",
    forensicFact: "Criminal register index Mumbai Central: Suspects Jasbir (Billa) & Kuljeet (Ranga) flagged under unresolved heist warrants.",
    activeAgent: "CID Mumbai Branch Log #489"
  },
  "node-delhi": {
    latLng: "28.5910° N, 77.1612° E",
    temp1978: "28.4°C (83.1°F)",
    humidity: "86% (Monsoon Evening)",
    forensicFact: "August 26, 1978, 18:30 IST. Eye witness reports grey Fiat 1100 (DHG 1729) operating with interior cabin lights extinguished.",
    activeAgent: "Delhi Police Patrol Desk 4"
  },
  "node-ridge": {
    latLng: "28.6185° N, 77.1822° E",
    temp1978: "27.8°C (82.0°F)",
    humidity: "89% (Saturated Terrain)",
    forensicFact: "Crime Scene 1A. Silt soil samples retrieved. High trace elements match chassis residue of the recovered Fiat.",
    activeAgent: "Central Forensic Science Lab"
  },
  "node-railway": {
    latLng: "30.3782° N, 76.7767° E",
    temp1978: "25.6°C (78.1°F)",
    humidity: "80% (Precipitation)",
    forensicFact: "September 8, 1978. Military police intercepts Kalka Mail at Ambala. Fugitives apprehended wearing disguised railway staff uniforms.",
    activeAgent: "Army Intelligence Div 9"
  },
  "node-tihar": {
    latLng: "28.6272° N, 77.0989° E",
    temp1978: "11.2°C (52.2°F)",
    humidity: "65% (Dry Winter)",
    forensicFact: "Executions carried out simultaneously at 06:00 IST on Jan 31, 1982. Coroners logged execution timings matching strict legal codes.",
    activeAgent: "Tihar Judicial Warden Desk"
  }
};

export function InteractiveMap({ language, activeNodeId, onNodeClick }: InteractiveMapProps) {
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(MAP_NODES[0]);

  // Normalized positions for schematic SVG map:
  const getSvgCoordinates = (id: string) => {
    switch (id) {
      case "node-mumbai":
        return { x: 120, y: 350 };
      case "node-delhi":
        return { x: 300, y: 190 };
      case "node-ridge":
        return { x: 260, y: 140 };
      case "node-railway":
        return { x: 450, y: 240 };
      case "node-tihar":
        return { x: 340, y: 210 };
      default:
        return { x: 100, y: 100 };
    }
  };

  // Connect paths: Mumbai -> Delhi -> Railway -> Tihar
  const flightPathPoints = [
    getSvgCoordinates("node-mumbai"),
    getSvgCoordinates("node-delhi"),
    getSvgCoordinates("node-railway"),
    getSvgCoordinates("node-tihar"),
  ];

  const dPath = flightPathPoints.reduce((acc, pt, idx) => {
    return acc + (idx === 0 ? `M ${pt.x} ${pt.y}` : ` Q ${(flightPathPoints[idx-1].x + pt.x)/2 - 20} ${(flightPathPoints[idx-1].y + pt.y)/2 - 30}, ${pt.x} ${pt.y}`);
  }, "");

  const handleNodeSelect = (node: MapNode) => {
    setSelectedNode(node);
    if (onNodeClick) onNodeClick(node.id);
  };

  const telemetry = selectedNode ? FORENSIC_TELEMETRY[selectedNode.id] : null;

  return (
    <div className="w-full h-full min-h-[420px] flex flex-col md:flex-row bg-[#020202] border border-white/15 rounded-sm overflow-hidden shadow-2xl relative text-left">
      <div className="grain"></div>
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

      {/* Interactive Map Visual */}
      <div className="flex-1 bg-black relative overflow-hidden flex items-center justify-center p-4 min-h-[300px]">
        {/* Schematic country outlines / grid references - high contrast */}
        <div className="absolute top-4 left-4 font-mono text-[9px] text-zinc-100 bg-white/5 border border-white/15 px-2 py-0.5 rounded uppercase tracking-[0.2em] pointer-events-none font-bold z-10">
          {language === "hi" ? "नक्शा & मार्ग रेखांकन" : "Schematic Route Mapping"}
        </div>
        <div className="absolute bottom-4 left-4 font-mono text-[10px] text-zinc-300 font-medium tracking-wide bg-black/60 px-2 py-0.5 rounded border border-white/5 pointer-events-none z-10">
          LAT REF: 18°N - 28°N | LON REF: 72°E - 80°E
        </div>

        <svg
          viewBox="0 0 650 450"
          className="w-full h-full max-h-[380px] z-10 select-none transition-transform"
        >
          {/* Grid coordinates */}
          <line x1="50" y1="0" x2="50" y2="450" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="200" y1="0" x2="200" y2="450" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="350" y1="0" x2="350" y2="450" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="500" y1="0" x2="500" y2="450" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="0" y1="100" x2="650" y2="100" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="0" y1="250" x2="650" y2="250" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="0" y1="380" x2="650" y2="380" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="3,3" />

          {/* Connectors */}
          {/* Delhi -> Ridge Forest kidnapping link */}
          <line
            x1={getSvgCoordinates("node-delhi").x}
            y1={getSvgCoordinates("node-delhi").y}
            x2={getSvgCoordinates("node-ridge").x}
            y2={getSvgCoordinates("node-ridge").y}
            stroke="rgba(239, 68, 68, 0.55)"
            strokeWidth="1.75"
            strokeDasharray="4,4"
            className="animate-[dash_20s_linear_infinite]"
          />

          {/* Major Flight Route Path */}
          <path
            d={dPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.06)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d={dPath}
            fill="none"
            stroke="#f4f4f5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="5,4"
            className="animate-[dash_30s_linear_infinite]"
          />

          {/* Map Node Dots and Interactives */}
          {MAP_NODES.map((node) => {
            const coords = getSvgCoordinates(node.id);
            const isSelected = selectedNode?.id === node.id || activeNodeId === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${coords.x}, ${coords.y})`}
                className="cursor-pointer group"
                onClick={() => handleNodeSelect(node)}
              >
                {/* Glowing ring */}
                <circle
                  r={isSelected ? "18" : "12"}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  className={`opacity-0 group-hover:opacity-100 transition-all ${
                    isSelected ? "opacity-60 scale-110 animate-ping" : ""
                  }`}
                  style={{ transformOrigin: "0 0" }}
                />

                {/* Outer circle */}
                <circle
                  r={isSelected ? "8" : "5"}
                  fill="#000000"
                  stroke={isSelected ? "#ef4444" : "#cccccc"}
                  strokeWidth={isSelected ? "3" : "1.5"}
                  className="transition-all duration-300"
                />

                {/* Inner dot */}
                <circle
                  r="2.5"
                  fill={isSelected ? "#ef4444" : "#999999"}
                  className="transition-colors duration-300"
                />

                {/* Floating label - drastically increased readability and contrast */}
                <text
                  y="-16"
                  textAnchor="middle"
                  fill={isSelected ? "#ffffff" : "#d4d4d8"}
                  className={`font-sans text-[10px] font-bold tracking-[0.1em] uppercase transition-all select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
                    isSelected ? "text-[11px] font-black" : "group-hover:fill-white"
                  }`}
                >
                  {node.name[language]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Info Panel on Side */}
      <div className="w-full md:w-85 border-t md:border-t-0 md:border-l border-white/15 bg-[#020202] p-6 flex flex-col justify-between z-20">
        <div>
          <div className="flex items-center space-x-2 text-zinc-100 mb-4 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-sm">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
              {language === "hi" ? "स्थान का विवरण" : "LOCATION DOSSIER"}
            </span>
          </div>

          {selectedNode ? (
            <div className="animate-fadeIn space-y-4">
              <div>
                <h3 className="font-serif text-lg text-white font-bold mb-2 flex items-center justify-between">
                  {selectedNode.name[language]}
                  {selectedNode.id === "node-tihar" && (
                    <span className="text-[8px] bg-red-950/70 text-red-400 border border-red-500/40 px-2 py-0.5 rounded font-mono uppercase tracking-[0.15em] font-bold">
                      TIHAR
                    </span>
                  )}
                  {selectedNode.id === "node-ridge" && (
                    <span className="text-[8px] bg-red-950/70 text-red-400 border border-red-500/40 px-2 py-0.5 rounded font-mono uppercase tracking-[0.15em] font-bold">
                      CRIME SCENE
                    </span>
                  )}
                </h3>
                <p className="font-sans text-xs text-zinc-200 leading-relaxed font-light bg-white/5 border border-white/5 rounded p-3 mb-4 opacity-95">
                  {selectedNode.description[language]}
                </p>
              </div>

              {/* FORENSIC TELEMETRY CARD - High visibility & rich metadata */}
              {telemetry && (
                <div className="bg-black/90 border border-white/10 rounded p-4.5 space-y-3.5 text-left font-mono">
                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                    <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                      {language === "hi" ? "फोरेंसिक मैट्रिक्स" : "Forensic Metrics"}
                    </span>
                    <span className="text-[8px] text-zinc-500 font-bold">RECORDED_1978</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[9px]">
                    <div className="space-y-0.5">
                      <span className="text-zinc-500 block text-[8px] uppercase">COORDINATES</span>
                      <span className="text-zinc-100 font-bold flex items-center gap-1">
                        <Compass className="w-3 h-3 text-red-500 shrink-0" />
                        {telemetry.latLng.split(",")[0]}
                      </span>
                      <span className="text-zinc-200 block font-bold pl-4">
                        {telemetry.latLng.split(",")[1]}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-zinc-500 block text-[8px] uppercase">HISTORIC TEMP</span>
                      <span className="text-zinc-100 font-bold flex items-center gap-1">
                        <Thermometer className="w-3 h-3 text-red-400 shrink-0" />
                        {telemetry.temp1978}
                      </span>
                      <span className="text-zinc-400 block text-[8px] pl-4">
                        {telemetry.humidity}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-2 text-[9px] leading-relaxed">
                    <span className="text-zinc-500 block text-[8px] uppercase font-bold mb-1 flex items-center gap-1">
                      <Shield className="w-3 h-3 text-red-500" />
                      {language === "hi" ? "जांच फाइल अवशेष" : "INVESTIGATIVE FILE RESIDUE"}
                    </span>
                    <p className="text-zinc-200 font-sans text-[11px] leading-normal font-light italic opacity-95">
                      "{telemetry.forensicFact}"
                    </p>
                  </div>

                  <div className="text-[8px] text-zinc-500 text-right font-semibold pt-1 border-t border-white/5">
                    {telemetry.activeAgent}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-zinc-300 text-sm flex items-center space-x-2 py-4">
              <Info className="w-4 h-4 text-red-500" />
              <span>
                {language === "hi" ? "नक्शे पर किसी बिंदु पर क्लिक करें" : "Click on a marker on the map"}
              </span>
            </div>
          )}
        </div>

        {/* Quick Nav Guides */}
        <div className="mt-6 border-t border-white/10 pt-4 flex flex-col space-y-2">
          <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] font-black">
            {language === "hi" ? "मार्ग खंड" : "ROUTE SEGMENTS"}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {MAP_NODES.map((node) => (
              <button
                key={node.id}
                onClick={() => handleNodeSelect(node)}
                className={`text-[9px] font-mono px-3 py-1.5 rounded transition cursor-pointer ${
                  selectedNode?.id === node.id
                    ? "bg-white text-black border border-white font-bold"
                    : "bg-white/5 text-zinc-200 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {node.name[language].split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center space-x-1.5 text-zinc-400 text-[10px] font-mono select-none">
            <span>Mumbai</span>
            <ArrowRight className="w-3 h-3 opacity-50" />
            <span>Delhi</span>
            <ArrowRight className="w-3 h-3 opacity-50" />
            <span>Railway</span>
            <ArrowRight className="w-3 h-3 opacity-50" />
            <span className="text-white font-bold underline decoration-red-600">Tihar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
