/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { AlertCircle, Terminal, Activity, FileText } from "lucide-react";

interface LiveCaseNotificationsProps {
  language: "hi" | "en";
}

interface CaseAlert {
  id: string;
  category: { hi: "नया प्रमाण प्राप्त"; en: "NEW EVIDENCE ADDED" };
  detail: { hi: string; en: string };
  code: string;
}

const ALERTS: CaseAlert[] = [
  {
    id: "a1",
    category: { hi: "नया प्रमाण प्राप्त", en: "NEW EVIDENCE ADDED" },
    detail: {
      hi: "सलेटी फिएट 1100 के पिछले हिस्से से बरामद ऊनी रेशे 99.8% सटीकता के साथ संजय की जर्सी से मेल खाते हैं।",
      en: "Woolen fibers recovered from the grey Fiat 1100 rear cushion match Sanjay's jersey with 99.8% precision."
    },
    code: "CFSL-FIBER-REC-01"
  },
  {
    id: "a2",
    category: { hi: "नया प्रमाण प्राप्त", en: "NEW EVIDENCE ADDED" },
    detail: {
      hi: "स्टीयरिंग कॉलम से लिए गए उंगलियों के निशान मुंबई पुलिस के आपराधिक रिकॉर्ड में जसबीर सिंह (बिल्ला) के रूप में मेल खाते हैं।",
      en: "Latent prints lifted from the steering column identified as Jasbir Singh (Billa) from Mumbai criminal index."
    },
    code: "CFSL-PRINT-MATCH-04"
  },
  {
    id: "a3",
    category: { hi: "नया प्रमाण प्राप्त", en: "NEW EVIDENCE ADDED" },
    detail: {
      hi: "पोस्टमॉर्टम रिपोर्ट से गीता के हाथों पर गहरे बचाव के निशान मिले हैं, जो उनकी अत्यधिक बहादुरी और कड़े प्रतिरोध की पुष्टि करते हैं।",
      en: "Autopsy report documents severe defensive cuts on Geeta's forearms, confirming extreme physical resistance."
    },
    code: "POST-MORTEM-CHOPRA-G"
  },
  {
    id: "a4",
    category: { hi: "नया प्रमाण प्राप्त", en: "NEW EVIDENCE ADDED" },
    detail: {
      hi: "चश्मदीद गवाह का बयान: रंगा के कद-काठी से मेल खाता एक व्यक्ति शाम 19:30 बजे लोहे की केन में पेट्रोल खरीदते हुए देखा गया।",
      en: "Eyewitness log: Individual matching Ranga's height seen purchasing fuel in a metal canister at 19:30 IST."
    },
    code: "WITNESS-LOG-182"
  },
  {
    id: "a5",
    category: { hi: "नया प्रमाण प्राप्त", en: "NEW EVIDENCE ADDED" },
    detail: {
      hi: "रंगा के जूतों से लिए गए मिट्टी के कणों का रासायनिक विश्लेषण अपर रिज वन क्षेत्र की अनूठी खनिज संरचना से सटीक रूप से मेल खाता है।",
      en: "Soil chemical profiling from Ranga's footwear matches the unique mineral composition of Upper Ridge Forest."
    },
    code: "GEOLOGY-SOIL-TR-9"
  },
  {
    id: "a6",
    category: { hi: "नया प्रमाण प्राप्त", en: "NEW EVIDENCE ADDED" },
    detail: {
      hi: "शरीर की तलाशी के दौरान बिल्ला की जेब से कालका मेल का यात्री टिकट मिला, जिससे उनके भागने की योजना की पुष्टि होती है।",
      en: "Kalka Mail physical passenger ticket found inside Billa's inner pocket, confirming train escape schedule."
    },
    code: "RAILWAY-TKT-3821"
  },
  {
    id: "a7",
    category: { hi: "नया प्रमाण प्राप्त", en: "NEW EVIDENCE ADDED" },
    detail: {
      hi: "ऑल इंडिया रेडियो (AIR) का 'युवा वाणी' रिकॉर्डिंग लॉग दोनों भाई-बहनों के प्रस्थान के सटीक समय की पुष्टि करता है।",
      en: "All India Radio (AIR) recording log confirms the precise departure timing of the Yuva Vani studio session."
    },
    code: "AIR-RADIO-SCHED-78"
  }
];

export function LiveCaseNotifications({ language }: LiveCaseNotificationsProps) {
  const [currentAlert, setCurrentAlert] = useState<CaseAlert | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 6 seconds
    const initialTimer = setTimeout(() => {
      triggerNotification();
    }, 6000);

    // Set up periodic notifications every 20 seconds
    const interval = setInterval(() => {
      triggerNotification();
    }, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const triggerNotification = () => {
    setVisible(false);
    
    setTimeout(() => {
      // Pick a random alert
      const randomIndex = Math.floor(Math.random() * ALERTS.length);
      setCurrentAlert(ALERTS[randomIndex]);
      setVisible(true);

      // Auto-hide after 7 seconds
      setTimeout(() => {
        setVisible(false);
      }, 7000);
    }, 400);
  };

  if (!currentAlert || !visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#020202]/95 border border-red-500/30 rounded shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md p-4 animate-fadeIn flex flex-col space-y-2.5">
      {/* HUD Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="font-mono text-[9px] font-black uppercase text-red-500 tracking-[0.2em] flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-red-500" />
            {currentAlert.category[language]}
          </span>
        </div>
        <span className="font-mono text-[8px] text-zinc-400 font-bold bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
          {currentAlert.code}
        </span>
      </div>

      {/* Detail Content - Ultra legible and high contrast text */}
      <div className="flex items-start space-x-3 text-left">
        <div className="bg-red-500/10 border border-red-500/20 p-2 rounded-sm text-red-500 shrink-0">
          <FileText className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <p className="font-sans text-xs text-zinc-100 font-medium leading-relaxed opacity-95">
            {currentAlert.detail[language]}
          </p>
          <div className="flex items-center space-x-1.5 font-mono text-[8px] text-zinc-500">
            <Terminal className="w-2.5 h-2.5" />
            <span>SYS_METRIC: STABLE_LINK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
