/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Radio } from "lucide-react";

interface DispatchMarqueeProps {
  language: "hi" | "en";
}

const DISPATCHES = {
  en: [
    "18:15 IST // CONTROL TO ALL PATROLS: SUSPICIOUS GREY FIAT 1100 NOTED NEAR SAN MARTIN MARG — BE ALERT",
    "18:40 IST // OUTRAGE IN SOUTH DELHI: RESIDENTS EXPRESS GROWING ANXIOUSNESS OVER STREET ILLUMINATION DEFICITS",
    "19:00 IST // COMM CHOPRA DESK: CONFIRMED DEPARTURE TIME AT YUVA VANI BROADCAST TIMED AT 17:55 IST",
    "20:10 IST // COMMAND SYSTEM: ALL INBOUND TRAFFIC TO WEST RIDGE BLOCKS BEING SCREENED UNDER FIRST ORDER",
    "06:30 IST // DUST SAMPLING LAB: CHEMICAL MATCH IDENTIFIED AT OUTPOST R-4 CORRESPONDING TO UPPER RIDGE FORESTS",
    "11:00 IST // RAILWAY INTERCEPT OUTPOST: PATROLS DISPATCHED TO AMBALA JUNCTION — PREPARE FOR ARRIVAL OF KALKA MAIL",
    "14:15 IST // DECLASSIFIED FILES: BIO-SAMPLES CONFIRM REAR SEAT FITTING LATCHES REMOVED POST-MANUFACTURE"
  ],
  hi: [
    "18:15 IST // नियंत्रण कक्ष से सभी गश्ती दल: सैन मार्टिन मार्ग के पास संदिग्ध सलेटी फिएट 1100 देखी गई — सतर्क रहें",
    "18:40 IST // दक्षिण दिल्ली में आक्रोश: नागरिक सड़कों पर कम रोशनी और सुरक्षा की कमी को लेकर चिंतित",
    "19:00 IST // कमांडर चोपड़ा डेस्क: संसद मार्ग स्थित स्टूडियो से प्रस्थान का समय शाम 17:55 बजे दर्ज",
    "20:10 IST // मुख्य नियंत्रण: रिज रोड वन क्षेत्र की ओर जाने वाले सभी वाहनों की सघन जांच जारी",
    "06:30 IST // मृदा जांच प्रयोगशाला: रंगा के जूते से लिए गए कणों का मिलान रिज वन के क्षेत्र R-4 से हुआ",
    "11:00 IST // रेलवे इंटरसेप्ट चौकी: अंबाला जंक्शन पर बल तैनात — कालका मेल के आने की तैयारी करें",
    "14:15 IST // गोपनीय फाइल: जैविक नमूनों से पुष्टि होती है कि कार के पिछले गेट के अंदरूनी हैंडल को हटा दिया गया था"
  ]
};

export function DispatchMarquee({ language }: DispatchMarqueeProps) {
  const list = DISPATCHES[language] || DISPATCHES.en;
  const marqueeText = list.join("   •   ") + "   •   ";

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/95 border-t border-white/10 text-zinc-400 py-1.5 z-40 select-none overflow-hidden backdrop-blur-md flex items-center text-left">
      <div className="bg-[#010101] border-r border-white/10 px-3 py-1.5 flex items-center space-x-1.5 text-red-500 z-10 select-none shrink-0 font-mono text-[9px] uppercase tracking-wider font-black">
        <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
        <span>RADIO DISPATCH</span>
      </div>

      <div className="relative w-full overflow-hidden flex items-center font-mono text-[10px] tracking-wide text-zinc-300">
        <div className="animate-marquee whitespace-nowrap flex py-0.5 hover:[animation-play-state:paused] cursor-pointer">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>
    </div>
  );
}
