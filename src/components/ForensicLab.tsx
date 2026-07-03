/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Eye, ShieldAlert, Cpu, Sparkles, Sliders, RefreshCw } from "lucide-react";

interface LabItem {
  id: string;
  name: { en: string; hi: string };
  exhibitCode: string;
  category: { en: string; hi: string };
  narrative: { en: string; hi: string };
  // Function to draw default normal base representation on canvas
  drawBase: (ctx: CanvasRenderingContext2D, width: number, height: number, themeGreen: boolean) => void;
  // Function to draw fluorescent UV markings
  drawUV: (ctx: CanvasRenderingContext2D, width: number, height: number, themeGreen: boolean) => void;
}

export function ForensicLab({ language }: { language: "hi" | "en" }) {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [scannerType, setScannerType] = useState<"uv" | "laser">("uv");
  const [isHovering, setIsHovering] = useState(false);
  
  const activeItemIndexRef = useRef(activeItemIndex);
  activeItemIndexRef.current = activeItemIndex;

  const scannerTypeRef = useRef(scannerType);
  scannerTypeRef.current = scannerType;

  const isHoveringRef = useRef(isHovering);
  isHoveringRef.current = isHovering;

  const mousePosRef = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Define our 3 forensic objects drawn completely using HTML5 Canvas
  const LAB_ITEMS: LabItem[] = [
    {
      id: "lab-1",
      name: { en: "Stolen Fiat Handle (Rear Right)", hi: "चोरी की फिएट का हैंडल (पीछे दाईं ओर)" },
      exhibitCode: "CFSL-EXHIBIT-11A",
      category: { en: "Latent Fingermarks", hi: "छिपे हुए उंगलियों के निशान" },
      narrative: {
        en: "The chrome interior handle. Base inspection shows metal fatigue, but UV fluorescent scanning reveals a partial latent thumbprint matched to the Mumbai criminal index.",
        hi: "क्रोम इंटीरियर हैंडल। सामान्य जांच से केवल धातु की घिसावट दिखती है, लेकिन यूवी फ्लोरोसेंट स्कैनिंग से अंगूठे का एक आंशिक निशान सामने आता है जो मुंबई के आपराधिक सूचकांक से मेल खाता है।"
      },
      drawBase: (ctx, w, h, themeGreen) => {
        // Draw elegant blueprint wireframe background
        ctx.strokeStyle = themeGreen ? "rgba(34, 197, 94, 0.08)" : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        for (let i = 0; i < w; i += 20) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
        }

        // Draw vintage car handle outline
        ctx.strokeStyle = themeGreen ? "rgba(34, 197, 94, 0.4)" : "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(w / 2 - 60, h / 2, 24, 0, Math.PI * 2); // Handle socket mount
        ctx.stroke();

        // The lever arm
        ctx.fillStyle = themeGreen ? "rgba(34, 197, 94, 0.15)" : "rgba(255, 255, 255, 0.15)";
        ctx.beginPath();
        ctx.moveTo(w / 2 - 60, h / 2 - 10);
        ctx.lineTo(w / 2 + 80, h / 2 - 18);
        ctx.quadraticCurveTo(w / 2 + 110, h / 2, w / 2 + 80, h / 2 + 18);
        ctx.lineTo(w / 2 - 60, h / 2 + 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Mechanical screws inside mount
        ctx.fillStyle = themeGreen ? "rgba(34, 197, 94, 0.3)" : "rgba(255, 255, 255, 0.3)";
        ctx.beginPath(); ctx.arc(w / 2 - 68, h / 2 - 8, 3, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(w / 2 - 68, h / 2 + 8, 3, 0, Math.PI * 2); ctx.fill();

        // Text technical details
        ctx.fillStyle = themeGreen ? "rgba(34, 197, 94, 0.4)" : "rgba(255, 255, 255, 0.4)";
        ctx.font = "9px monospace";
        ctx.fillText("PART ID: FIAT-DEL-11A", 20, 30);
        ctx.fillText("SPEC: METALLIC CHROME LATCH", 20, 42);
        ctx.fillText("REAR POSITION DETACHMENT", 20, 54);
      },
      drawUV: (ctx, w, h, themeGreen) => {
        // Draw fluorescent fingerprints
        const uvColor = themeGreen ? "#22c55e" : "#ef4444"; // Green or Crime Scene Red glow
        ctx.strokeStyle = uvColor;
        ctx.shadowColor = uvColor;
        ctx.shadowBlur = 12;
        ctx.lineWidth = 1.5;

        // Draw whorl arches of latent print on the lever handle
        const centerX = w / 2 + 30;
        const centerY = h / 2 - 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, 4, Math.PI * 0.2, Math.PI * 1.8); ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, Math.PI * 0.15, Math.PI * 1.85); ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 12, Math.PI * 0.25, Math.PI * 1.7); ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 17, Math.PI * 0.1, Math.PI * 1.9); ctx.stroke();
        ctx.beginPath();
        ctx.arc(centerX, centerY, 22, Math.PI * 0.3, Math.PI * 1.65); ctx.stroke();

        // Fingerprint HUD tagging text
        ctx.shadowBlur = 0;
        ctx.fillStyle = uvColor;
        ctx.font = "bold 9px monospace";
        ctx.fillText("LATENT R-INDEX IDENTIFIED", centerX - 55, centerY - 32);
        ctx.fillText("MATCH ID: BILLA_J_1978_X", centerX - 55, centerY + 36);
        ctx.fillText("CORRELATION SCORE: 99.42%", centerX - 55, centerY + 46);

        // Highlight line
        ctx.strokeStyle = uvColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX - 40, centerY - 25);
        ctx.lineTo(centerX - 80, centerY - 25);
        ctx.stroke();
      }
    },
    {
      id: "lab-2",
      name: { en: "Silt Soil Sample (Footwear)", hi: "मिट्टी का नमूना (जूते से प्राप्त)" },
      exhibitCode: "CFSL-EXHIBIT-14D",
      category: { en: "Soil Mineral Profiling", hi: "मिट्टी के खनिज का विश्लेषण" },
      narrative: {
        en: "Fine silt residue collected from Ranga's boots. Base analysis shows grey soil grains. UV scanning highlights high-quartz minerals exclusive to the Upper Ridge forest.",
        hi: "रंगा के जूतों से एकत्र की गई बारीक गाद। सामान्य विश्लेषण से धूसर मिट्टी के कण दिखते हैं। यूवी स्कैनिंग से उच्च-क्वार्ट्ज खनिजों का पता चलता है जो विशेष रूप से अपर रिज के जंगलों में पाए जाते हैं।"
      },
      drawBase: (ctx, w, h, themeGreen) => {
        // Draw circular Petri Dish
        ctx.strokeStyle = themeGreen ? "rgba(34, 197, 94, 0.15)" : "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(w / 2, h / 2, h / 2 - 20, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(w / 2, h / 2, h / 2 - 23, 0, Math.PI * 2); ctx.stroke();

        // Draw standard grey dust spots
        ctx.fillStyle = "rgba(100, 100, 110, 0.35)";
        for (let i = 0; i < 40; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * (h / 2 - 40);
          const x = w / 2 + Math.cos(angle) * dist;
          const y = h / 2 + Math.sin(angle) * dist;
          ctx.beginPath();
          ctx.arc(x, y, 1.5 + Math.random() * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = themeGreen ? "rgba(34, 197, 94, 0.4)" : "rgba(255, 255, 255, 0.4)";
        ctx.font = "9px monospace";
        ctx.fillText("PETRI DISH GRID #14D", 20, 30);
        ctx.fillText("SOURCE: RUNWAY OUTPOST BOOTS", 20, 42);
        ctx.fillText("HUMIDITY RATIO: 8.2%", 20, 54);
      },
      drawUV: (ctx, w, h, themeGreen) => {
        // Draw glowing mineral flakes under UV
        const uvColor = themeGreen ? "#22c55e" : "#ef4444"; // Green or Red
        ctx.fillStyle = uvColor;
        ctx.strokeStyle = uvColor;
        ctx.shadowColor = uvColor;
        ctx.shadowBlur = 15;

        // Glowing particles
        const seedPoints = [
          { dx: -25, dy: -20, r: 4 },
          { dx: 30, dy: 15, r: 5 },
          { dx: 5, dy: -35, r: 3.5 },
          { dx: -40, dy: 25, r: 5 },
          { dx: 15, dy: 10, r: 3 },
          { dx: -10, dy: 35, r: 4.5 }
        ];

        seedPoints.forEach((p) => {
          const x = w / 2 + p.dx;
          const y = h / 2 + p.dy;
          ctx.beginPath();
          ctx.arc(x, y, p.r, 0, Math.PI * 2);
          ctx.fill();

          ctx.shadowBlur = 0;
          ctx.font = "8px monospace";
          ctx.fillText("QUARTZ_SIO2_78%", x + 8, y + 2);
          ctx.shadowBlur = 15;
        });

        ctx.shadowBlur = 0;
        ctx.fillStyle = uvColor;
        ctx.font = "bold 9px monospace";
        ctx.fillText("ANALYSIS: CO-CHEMICAL ALIGNMENT OK", 25, h - 35);
        ctx.fillText("MATCH: UPPER RIDGE SECTOR R-4", 25, h - 23);
      }
    },
    {
      id: "lab-3",
      name: { en: "Kalka Mail Passenger Ticket", hi: "कालका मेल यात्री टिकट" },
      exhibitCode: "CFSL-EXHIBIT-19C",
      category: { en: "Physical Ticket Examination", hi: "भौतिक टिकट जांच" },
      narrative: {
        en: "Recovered from Billa's coat during body search. Standard inspection reveals a folded, torn railway slip. UV scanning exposes a concealed ink blood smudge and original date stamp.",
        hi: "शरीर की तलाशी के दौरान बिल्ला के कोट से बरामद। सामान्य जांच से मुड़ा हुआ, फटा हुआ रेलवे टिकट दिखता है। यूवी स्कैनिंग से छुपा हुआ खून का धब्बा और तारीख का मूल टिकट सामने आता है।"
      },
      drawBase: (ctx, w, h, themeGreen) => {
        // Draw ticket board
        ctx.strokeStyle = themeGreen ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.2)";
        ctx.fillStyle = "rgba(30, 30, 35, 0.4)";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.rect(w / 2 - 120, h / 2 - 50, 240, 100);
        ctx.fill();
        ctx.stroke();

        // Tear effect on right side
        ctx.strokeStyle = themeGreen ? "rgba(34, 197, 94, 0.4)" : "rgba(255, 255, 255, 0.4)";
        ctx.beginPath();
        ctx.moveTo(w / 2 + 120, h / 2 - 50);
        // Jagged line
        ctx.lineTo(w / 2 + 115, h / 2 - 30);
        ctx.lineTo(w / 2 + 122, h / 2 - 10);
        ctx.lineTo(w / 2 + 113, h / 2 + 10);
        ctx.lineTo(w / 2 + 120, h / 2 + 30);
        ctx.lineTo(w / 2 + 115, h / 2 + 50);
        ctx.stroke();

        // Print text layout
        ctx.fillStyle = themeGreen ? "rgba(34, 197, 94, 0.5)" : "rgba(255, 255, 255, 0.5)";
        ctx.font = "9px monospace";
        ctx.fillText("NORTHERN RAILWAYS // SEC-TKT", w / 2 - 110, h / 2 - 32);
        ctx.fillText("CLASS: THIRD-CLASS COMPARTMENT", w / 2 - 110, h / 2 - 18);
        ctx.fillText("ROUTE: DELHI JN TO AMBALA CY", w / 2 - 110, h / 2 - 4);
        ctx.fillText("FARE: INR 12.50 Paid", w / 2 - 110, h / 2 + 10);

        ctx.fillText("NO_83210-9", w / 2 + 60, h / 2 + 42);
      },
      drawUV: (ctx, w, h, themeGreen) => {
        // Draw hidden blood smudge and ticket inspector stamp
        const uvColor = themeGreen ? "#22c55e" : "#ef4444"; // Green or Red glow for blood trace
        ctx.strokeStyle = uvColor;
        ctx.fillStyle = uvColor;
        ctx.shadowColor = uvColor;
        ctx.shadowBlur = 14;

        // Concealed blood trace
        ctx.beginPath();
        ctx.arc(w / 2 + 40, h / 2 - 15, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(w / 2 + 45, h / 2 - 25, 8, 0, Math.PI * 2);
        ctx.fill();

        // Stamp
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.rect(w / 2 - 95, h / 2 - 15, 75, 45);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.font = "bold 8px monospace";
        ctx.fillText("TKT_INSP_STAMP", w / 2 - 90, h / 2 - 4);
        ctx.fillText("DATE: 26-08-1978", w / 2 - 90, h / 2 + 8);
        ctx.fillText("STATUS: STAIN_POS", w / 2 - 90, h / 2 + 20);
      }
    }
  ];

  // Canvas drawing loop (using a high-performance continuous RAF loop to bypass React render overhead entirely)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const isTerminalGreen = document.body.classList.contains("theme-terminal");
      const activeIdx = activeItemIndexRef.current;
      const scanType = scannerTypeRef.current;
      const hovering = isHoveringRef.current;
      const pos = mousePosRef.current;

      // Clear with extremely dark canvas background
      ctx.fillStyle = "#030304";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const activeItem = LAB_ITEMS[activeIdx];
      if (activeItem) {
        // Draw standard base representation
        activeItem.drawBase(ctx, canvas.width, canvas.height, isTerminalGreen);

        // If hovering, overlay UV fluorescent lens or Laser oscillograph lines
        if (hovering) {
          ctx.save();

          if (scanType === "uv") {
            // Draw circular clipping lens around mouse position
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 65, 0, Math.PI * 2);
            ctx.clip();

            // Fill UV lens background
            ctx.fillStyle = "rgba(10, 5, 25, 0.45)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw fluorescent details
            activeItem.drawUV(ctx, canvas.width, canvas.height, isTerminalGreen);

            // Draw UV lens borders
            ctx.restore();
            ctx.strokeStyle = isTerminalGreen ? "#22c55e" : "#ef4444";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 65, 0, Math.PI * 2);
            ctx.stroke();

            // Crosshairs in lens
            ctx.strokeStyle = isTerminalGreen ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pos.x - 75, pos.y); ctx.lineTo(pos.x + 75, pos.y);
            ctx.moveTo(pos.x, pos.y - 75); ctx.lineTo(pos.x, pos.y + 75);
            ctx.stroke();
          } else {
            // Laser Scan Mode (Vertical line sweep or scope analyzer)
            ctx.restore();
            const laserColor = isTerminalGreen ? "#22c55e" : "#ef4444";

            // Draw horizontal laser sweeping guide line
            ctx.strokeStyle = laserColor;
            ctx.lineWidth = 1.5;
            ctx.shadowColor = laserColor;
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(0, pos.y);
            ctx.lineTo(canvas.width, pos.y);
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Scan wave HUD text
            ctx.fillStyle = laserColor;
            ctx.font = "8px monospace";
            ctx.fillText(`OSC_Y: ${pos.y} | SCANNING WAVEFORM`, 20, pos.y - 6);

            // Draw overlay oscilloscope waves
            ctx.strokeStyle = isTerminalGreen ? "rgba(34, 197, 94, 0.25)" : "rgba(239, 68, 68, 0.25)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x += 5) {
              const sineY = pos.y + Math.sin(x * 0.08 + Date.now() * 0.005) * 12;
              if (x === 0) ctx.moveTo(x, sineY);
              else ctx.lineTo(x, sineY);
            }
            ctx.stroke();
          }
        }
      }

      // Update HUD element directly in DOM (no React diffing/renders!)
      const hud = document.getElementById("lab-coordinates-hud");
      if (hud) {
        hud.textContent = `X: ${pos.x}px | Y: ${pos.y}px`;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mousePosRef.current = {
      x: Math.round((e.clientX - rect.left) * scaleX),
      y: Math.round((e.clientY - rect.top) * scaleY)
    };
  };

  return (
    <div className="w-full bg-[#020202] border border-white/10 rounded-sm p-6 relative overflow-hidden my-12 shadow-2xl">
      <div className="grain"></div>
      
      {/* Header controls inside bento */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/15 pb-4 mb-6 relative z-10 text-left">
        <div className="flex items-center space-x-2.5">
          <Eye className="w-4 h-4 text-red-600 animate-pulse" />
          <div>
            <h3 className="font-serif text-lg text-white font-bold tracking-tight">
              {language === "hi" ? "सीएफएसएल फोरेंसिक प्रयोगशाला एवं स्पेक्ट्रोमेट्री" : "CFSL Forensic Laboratory & Spectrometry"}
            </h3>
            <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest font-light mt-0.5">
              {language === "hi" ? "छिपे हुए निशानों और साक्ष्यों का फोरेंसिक विश्लेषण" : "SCAN EVIDENCE TO DECLASSIFY CONCEALED MARKINGS"}
            </p>
          </div>
        </div>

        {/* Action triggers */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setScannerType("uv")}
            className={`px-3 py-1.5 rounded font-mono text-[9px] uppercase tracking-wider border transition-all flex items-center gap-1.5 cursor-pointer ${
              scannerType === "uv"
                ? "bg-red-900/20 border-red-700 text-red-400 font-bold"
                : "border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            {language === "hi" ? "यूवी टॉर्च मोड" : "UV TORCH MODE"}
          </button>
          <button
            onClick={() => setScannerType("laser")}
            className={`px-3 py-1.5 rounded font-mono text-[9px] uppercase tracking-wider border transition-all flex items-center gap-1.5 cursor-pointer ${
              scannerType === "laser"
                ? "bg-red-900/20 border-red-700 text-red-400 font-bold"
                : "border-white/10 text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Sliders className="w-3 h-3" />
            {language === "hi" ? "लेज़र ऑसिलेशन मोड" : "LASER OSC MODE"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        
        {/* Left column: Evidence Picker and description */}
        <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-4">
          <div className="space-y-3">
            <span className="font-mono text-[9px] bg-zinc-900 border border-white/10 text-zinc-400 px-2 py-0.5 rounded tracking-widest uppercase">
              {language === "hi" ? "जांच के लिए साक्ष्य चुनें" : "Select Lab Artifact"}
            </span>
            
            <div className="space-y-1.5 pt-1.5">
              {LAB_ITEMS.map((item, idx) => {
                const isSelected = idx === activeItemIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItemIndex(idx)}
                    className={`w-full text-left px-3.5 py-3 rounded border transition flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-white/5 border-red-700 text-white"
                        : "border-white/5 text-zinc-400 hover:bg-white/[0.02] hover:text-white"
                    }`}
                  >
                    <div>
                      <p className="font-mono text-[8px] text-zinc-500 font-bold uppercase tracking-wider">
                        {item.exhibitCode}
                      </p>
                      <p className="font-sans text-xs font-bold leading-tight mt-0.5">
                        {item.name[language]}
                      </p>
                    </div>
                    <RefreshCw className={`w-3.5 h-3.5 text-zinc-500 group-hover:rotate-45 transition-transform ${isSelected ? "text-red-500 animate-spin animate-duration-3000" : ""}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context box */}
          <div className="bg-[#010101]/80 border border-white/10 rounded p-4 flex flex-col space-y-2">
            <div className="flex items-center space-x-1.5 font-mono text-[9px] text-red-500 font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
              <span>{LAB_ITEMS[activeItemIndex].category[language]}</span>
            </div>
            <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light">
              {LAB_ITEMS[activeItemIndex].narrative[language]}
            </p>
          </div>
        </div>

        {/* Right column: Interactive Scanning Canvas */}
        <div className="lg:col-span-7 bg-black border border-white/10 rounded relative flex flex-col items-center justify-center p-2.5 overflow-hidden group">
          
          <canvas
            ref={canvasRef}
            width={480}
            height={300}
            onMouseMove={handleCanvasMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="max-w-full rounded border border-white/5 cursor-none bg-black"
          />

          {/* Hover helper cue */}
          {!isHovering && (
            <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-xs select-none">
              <Sparkles className="w-6 h-6 text-red-600 animate-bounce mb-2" />
              <p className="font-mono text-[10px] text-white tracking-widest uppercase font-black">
                {language === "hi" ? "स्कैन करने के लिए माउस लाएं" : "HOVER WORKSPACE TO SCAN"}
              </p>
              <p className="font-sans text-[10px] text-zinc-400 px-6">
                {language === "hi" ? "फ्लोरोसेंट यूवी-लाइट को सक्रिय करने के लिए माउस कर्सर को छवि पर घुमाएं" : "Move cursor across the canvas to activate fluorescent light"}
              </p>
            </div>
          )}

          {/* Coordinates HUD overlay on canvas container */}
          <div
            id="lab-coordinates-hud"
            className="absolute bottom-4 left-4 pointer-events-none font-mono text-[8px] text-zinc-500 bg-black/80 px-2 py-1 rounded border border-white/5"
          >
            X: 0px | Y: 0px
          </div>
          <div className="absolute bottom-4 right-4 pointer-events-none font-mono text-[8px] text-zinc-500 bg-black/80 px-2 py-1 rounded border border-white/5 uppercase font-bold">
            SCAN_VOLTAGE: 380V // OK
          </div>

        </div>

      </div>
    </div>
  );
}
