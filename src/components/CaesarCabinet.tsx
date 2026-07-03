/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { FolderClosed, FileText, Database, ShieldAlert } from "lucide-react";

interface CaesarCabinetProps {
  language: "hi" | "en";
}

export function CaesarCabinet({ language }: CaesarCabinetProps) {
  const [selectedFileId, setSelectedFileId] = useState<string | null>("file-blood");

  const files = [
    {
      id: "file-blood",
      tag: "LAB-B804",
      status: "match",
      name: { hi: "रक्त नमूना जांच रिपोर्ट", en: "Blood Sample Report" },
      ref: "FIAT-STAIN-B804",
      desc: {
        hi: "कार की पिछली ऊनी सीट से बरामद रक्त के छीटों का जैव-रासायनिक विश्लेषण गीता और संजय के दुर्लभ रक्त समूह से सटीक रूप से मेल खाता है।",
        en: "Biochemical analysis of blood stains found on the Fiat's rear wool seats confirmed a perfect match with Geeta and Sanjay's rare blood groups.",
      },
    },
    {
      id: "file-prints",
      tag: "FPS-F1100",
      status: "match",
      name: { hi: "छिपे हुए उंगलियों के निशान", en: "Latent Fingerprints" },
      ref: "MUMBAI-FPS-1975",
      desc: {
        hi: "स्टीयरिंग व्हील और दरवाजे के हैंडल से उठाए गए उंगलियों के आंशिक निशान मुंबई पुलिस डेटाबेस में दर्ज बिल्ला के आपराधिक रिकॉर्ड से मेल खाते हैं।",
        en: "Partial prints lifted from the steering wheel and interior door frames matched Billa's criminal record in the Mumbai database.",
      },
    },
    {
      id: "file-hair",
      tag: "BIO-H902",
      status: "match",
      name: { hi: "सूक्ष्म बाल और फाइबर", en: "Microscopic Hair Fibers" },
      ref: "FORENSIC-BIO-902",
      desc: {
        hi: "कार की पिछली सीट के कुशन से बरामद बाल और फाइबर संजय की सटीक शारीरिक संरचना से मेल खाते हैं, जो कार में उनकी उपस्थिति की पुष्टि करते हैं।",
        en: "Hair follicles recovered from the rear seat cushioning matched Sanjay's exact hair structure, placing him in the car.",
      },
    },
    {
      id: "file-car",
      tag: "REG-DLH75",
      status: "match",
      name: { hi: "फिएट 1100 वाहन पंजीकरण", en: "Fiat 1100 Registry" },
      ref: "DELHI-TRAFFIC-75",
      desc: {
        hi: "अपराध में प्रयुक्त चोरी की फिएट कार को दिल्ली के एक स्थानीय निवासी के नाम पर ट्रैक किया गया, जिसने अपहरण से ठीक 12 घंटे पहले चोरी की रिपोर्ट दर्ज कराई थी।",
        en: "The stolen Fiat was traced to a local Delhi resident who had filed a theft report just 12 hours prior to the abduction.",
      },
    },
    {
      id: "file-confess",
      tag: "JUR-C1982",
      status: "confessed",
      name: { hi: "अदालती इकबालिया बयान", en: "Judicial Confessions" },
      ref: "MAGISTRATE-82-DEL",
      desc: {
        hi: "रंगा और बिल्ला दोनों द्वारा मजिस्ट्रेट के सामने स्वेच्छा से हस्ताक्षरित अदालती बयान, जिसने उनकी कानूनी सजा और दोषसिद्धि को पुख्ता किया।",
        en: "Judicial confessions signed voluntarily by both Ranga and Billa in front of the magistrate, sealing their legal prosecution.",
      },
    },
  ];

  return (
    <div className="w-full h-full min-h-[380px] bg-brand-bg relative flex flex-col justify-between p-6 overflow-hidden border border-white/10 rounded-sm shadow-2xl text-left">
      <div className="grain"></div>
      {/* Background blueprint details */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Header Info */}
      <div className="flex justify-between items-start z-10 mb-6">
        <div className="flex items-center space-x-2 text-brand-accent/60">
          <Database className="w-4 h-4 text-red-500 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
            {language === "hi" ? "फोरेंसिक साक्ष्य लॉकर" : "Forensic Evidence Locker"}
          </span>
        </div>
        <span className="font-mono text-[8px] bg-white/5 border border-white/10 text-brand-accent/40 px-2 py-0.5 rounded font-mono">
          {language === "hi" ? "केस श्रेणी: जघन्य अपहरण व मर्डर" : "CASE TYPE: HEINOUS_KIDNAPPING"}
        </span>
      </div>

      {/* Main Files Display Area */}
      <div className="my-auto z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Archive Stack Left */}
        <div className="bg-brand-bg/40 border border-white/10 rounded p-4 flex flex-col space-y-3">
          <h4 className="font-mono text-[9px] text-brand-accent/40 uppercase tracking-[0.2em] border-b border-white/10 pb-1.5 font-bold">
            {language === "hi" ? "साक्ष्य फ़ोल्डर्स" : "Evidence Folders"}
          </h4>
          <div className="flex flex-col space-y-2">
            {files.map((file) => {
              const isActive = selectedFileId === file.id;
              return (
                <button
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`flex items-center justify-between p-2 rounded border text-left transition cursor-pointer ${
                    isActive
                      ? "bg-white/10 text-brand-accent border-white/20 font-bold"
                      : "bg-transparent text-brand-accent/40 border-white/5 hover:text-brand-accent hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FolderClosed className={`w-3.5 h-3.5 ${isActive ? "text-brand-accent" : "text-brand-accent/30"}`} />
                    <span className="font-mono text-[9px] uppercase tracking-wide">{file.tag}</span>
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Document Metadata Right */}
        <div className="bg-brand-bg/40 border border-white/10 rounded p-4 flex flex-col justify-between min-h-[180px]">
          <div>
            <h4 className="font-mono text-[9px] text-brand-accent/40 uppercase tracking-[0.2em] border-b border-white/10 pb-1.5 mb-3 font-bold">
              {language === "hi" ? "दस्तावेज़ का विवरण" : "Document Details"}
            </h4>

            {selectedFileId ? (
              (() => {
                const file = files.find((f) => f.id === selectedFileId);
                return file ? (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-brand-accent/60" />
                      <span className="font-serif text-sm font-bold text-brand-accent">
                        {file.name[language]}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-brand-accent/60 leading-relaxed font-light opacity-95">
                      {file.desc[language]}
                    </p>

                    <div className="space-y-1.5 border-t border-white/5 pt-2.5">
                      <div className="flex justify-between font-mono text-[8px]">
                        <span className="text-brand-accent/35">LAB_REF:</span>
                        <span className="text-brand-accent/70">{file.ref}</span>
                      </div>
                      <div className="flex justify-between font-mono text-[8px]">
                        <span className="text-brand-accent/35">SECTOR_REF:</span>
                        <span className="text-brand-accent/70">DELHI_POLICE_LAB</span>
                      </div>
                      <div className="flex justify-between font-mono text-[8px]">
                        <span className="text-brand-accent/35">STATUS:</span>
                        <span className="font-bold text-brand-accent">
                          {file.status === "match"
                            ? language === "hi" ? "सत्यापित केस मिलान" : "VERIFIED CASE MATCH"
                            : language === "hi" ? "अदालती स्वीकारोक्ति" : "JUDICIAL_CONFESSION"}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null;
              })()
            ) : (
              <span className="font-mono text-[8px] text-brand-accent/30 font-mono">
                {language === "hi" ? "साक्ष्य_चुनें" : "SELECT_EVIDENCE"}
              </span>
            )}
          </div>

          <div className="text-left mt-3 pt-3 border-t border-white/10 flex items-center space-x-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-brand-accent/30" />
            <span className="font-mono text-[8px] text-brand-accent/40 uppercase font-mono">
              {language === "hi" ? "केस फाइल आईडी: R-BILLA-1978" : "CASE FILE ID: R-BILLA-1978"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="flex justify-between items-center text-brand-accent/30 font-mono text-[8px] z-10 mt-6">
        <div>TOTAL_FORENSIC_EXHIBITS: 14</div>
        <div>TRIAL_REFERENCE_NUM: SC-78-291</div>
      </div>
    </div>
  );
}
