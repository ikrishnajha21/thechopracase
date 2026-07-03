/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Film, FileText, CheckCircle2, ShieldAlert, HelpCircle } from "lucide-react";

interface ComparisonCard {
  id: string;
  topic: string;
  sceneTitle: string;
  fictionTitle: string;
  fictionText: string;
  factTitle: string;
  factText: string;
  dramatizationNote: string;
}

interface FactVsFictionProps {
  language: "hi" | "en";
}

export function FactVsFiction({ language }: FactVsFictionProps) {
  const [activeTab, setActiveTab] = useState<"fiction" | "fact">("fact");
  const [selectedCase, setSelectedCase] = useState<string>("scene-1");

  const cases: ComparisonCard[] = [
    {
      id: "scene-1",
      topic: language === "hi" ? "अपहरण की साजिश" : "The Abduction Plot",
      sceneTitle: language === "hi" ? "वे वाहन में कैसे दाखिल हुए" : "How they got in the vehicle",
      fictionTitle: language === "hi" ? "नाटकीय साजिश (राख)" : "Dramatized Plot (Raakh)",
      fictionText: language === "hi"
        ? "अपहरणकर्ताओं को अत्यधिक संगठित मास्टरमाइंड के रूप में दर्शाया गया है, जिन्होंने बच्चों को पकड़ने के लिए निगरानी उपकरणों और हाई-टेक मैपिंग का उपयोग करके दिनों पहले से ही अपहरण की योजना बनाई थी।"
        : "The kidnappers are depicted as highly organized mastermind operatives who planned the abduction days in advance using surveillance equipment and high-tech mapping to intercept the children.",
      factTitle: language === "hi" ? "ऐतिहासिक तथ्य (1978)" : "Historical Fact (1978)",
      factText: language === "hi"
        ? "रंगा और बिल्ला मुंबई के छोटे-मोटे, अवसरवादी अपराधी थे। उन्होंने एक ग्रे फिएट 1100 कार चुराई थी और किसी अमीर शिकार की तलाश में नई दिल्ली में घूम रहे थे। चोपड़ा भाई-बहन ने ऑल इंडिया रेडियो में एक कार्यक्रम में भाग लेने के लिए बस लिफ्ट मांगी थी। यह एक दुखद, यादृच्छिक मुठभेड़ थी।"
        : "Ranga and Billa were small-time, opportunistic criminals from Mumbai. They stole a grey Fiat 1100 and drove around New Delhi looking for any lucrative target. The Chopra siblings had simply offered to participate in a radio broadcast and were looking for a lift to All India Radio. It was a tragic, random encounter.",
      dramatizationNote: language === "hi"
        ? "टीवी श्रृंखला ने नाटकीय तनाव पैदा करने के लिए यादृच्छिक सड़क अपराधियों को जटिल मास्टरमाइंड के रूप में दिखाया है, जबकि असली त्रासदी इसके पूरी तरह से यादृच्छिक होने में थी।"
        : "The TV series elevates random street opportunists into complex masterminds to build cinematic tension, whereas the tragedy lay in its complete randomness.",
    },
    {
      id: "scene-2",
      topic: language === "hi" ? "फिरौती के फोन" : "The Ransom Calls",
      sceneTitle: language === "hi" ? "कमांडर चोपड़ा के साथ बातचीत" : "Communication with Commander Chopra",
      fictionTitle: language === "hi" ? "नाटकीय साजिश (राख)" : "Dramatized Plot (Raakh)",
      fictionText: language === "hi"
        ? "नौसेना कमांडर से सीधे भारी फिरौती की मांग करने के लिए दूरदराज के फोन बूथों से भारी आवाज के बदलाव (voice modulation) के साथ की गई गुप्त और रहस्यमयी फोन कॉल की एक श्रृंखला दिखाई गई है।"
        : "A sequence of cryptic, suspenseful phone calls made from remote phone booths with heavy voice modulation demanding massive ransom figures directly from the Navy commander.",
      factTitle: language === "hi" ? "ऐतिहासिक तथ्य (1978)" : "Historical Fact (1978)",
      factText: language === "hi"
        ? "अपहरणकर्ताओं ने फिरौती के लिए फोन करने का प्रयास किया था लेकिन वे पूरी तरह से असफल रहे। उन्होंने चोपड़ा के घर पर फोन किया लेकिन स्पष्ट निर्देश नहीं दे पाए, और जब उन्हें पता चला कि बच्चों के पिता एक उच्च पदस्थ नौसेना कमांडर थे, तो वे घबरा गए और फिरौती का इरादा छोड़ दिया, जिससे सेना और पुलिस की भारी लामबंदी हुई।"
        : "The kidnappers did attempt to make ransom calls but bungled them completely. They phoned the Chopra home but could not communicate coherent instructions, and abandoned the ransom motive in a state of panic when they realized the children's father was a high-ranking naval commander, bringing immediate massive mobilization of the military and police.",
      dramatizationNote: language === "hi"
        ? "'राख' एक अत्यधिक रणनीतिक बातचीत का युद्ध प्रस्तुत करती है, जबकि ऐतिहासिक रूप से, अपराधी शुरुआत में ही घबरा गए थे, जिससे तत्काल विनाशकारी स्थिति पैदा हो गई।"
        : "Raakh presents a highly tactical negotiations war, whereas historically, the perpetrators panicked early on, leading to immediate catastrophic escalation.",
    },
    {
      id: "scene-3",
      topic: language === "hi" ? "ट्रेन में गिरफ्तारी" : "The Capture on the Train",
      sceneTitle: language === "hi" ? "कानून आखिरकार उन तक कैसे पहुंचा" : "How the law finally caught up",
      fictionTitle: language === "hi" ? "नाटकीय साजिश (राख)" : "Dramatized Plot (Raakh)",
      fictionText: language === "hi"
        ? "चलती एक्सप्रेस ट्रेन के अंदर एक तीव्र और खतरनाक मुठभेड़ दिखाई गई है, जिसमें ट्रेन के डिब्बों के ऊपर स्वाट (SWAT) शैली की सामरिक प्रविष्टि की जाती है, जिससे एक नाटकीय गिरफ्तारी होती है।"
        : "An intense, high-stakes shootout inside a moving express train with tactical SWAT-style insertions on top of train compartments, leading to a dramatic capture.",
      factTitle: language === "hi" ? "ऐतिहासिक तथ्य (1978)" : "Historical Fact (1978)",
      factText: language === "hi"
        ? "रंगा और बिल्ला दिल्ली से भागने के लिए एक ट्रेन में सवार हुए थे। उन्हें छुट्टी पर जा रहे सतर्क, साधारण सैन्य सैनिकों ने ट्रेन के तीसरे दर्जे के डिब्बे के अंदर पहचान लिया, जिन्होंने देखा कि उनका विवरण समाचार पत्रों से मेल खाता था। सैनिकों ने चुपचाप अधिकारियों को सूचित किया, और दोनों को बिना एक भी गोली चलाए पकड़ लिया गया।"
        : "Ranga and Billa boarded a train to escape Delhi. They were recognized by alert, ordinary military soldiers on leave inside a third-class train carriage who noticed their descriptions matched newspapers. The soldiers quietly notified authorities, and the two were apprehended without firing a single shot.",
      dramatizationNote: language === "hi"
        ? "'राख' एक विस्फोटक चरमोत्कर्ष देने के लिए शांतिपूर्ण नागरिक-सैनिक सतर्कता को मानक एक्शन-हीरो हॉलीवुड शैली के दृश्यों में बदल देती है।"
        : "Raakh trades peaceful civic-soldier vigilance for standard action-hero Hollywood tropes to deliver an explosive climax.",
    },
  ];

  const activeCase = cases.find((c) => c.id === selectedCase) || cases[0];

  return (
    <div className="w-full bg-[#020202] border border-white/10 rounded-sm overflow-hidden shadow-2xl relative my-12">
      <div className="grain"></div>
      
      {/* Title section */}
      <div className="p-6 md:p-8 border-b border-white/10 bg-black/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-brand-accent/65 mb-2">
              <HelpCircle className="w-4 h-4 text-brand-accent/80" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
                {language === "hi" ? "फोरेंसिक सत्यापन इंजन" : "FORENSIC VERIFICATION ENGINE"}
              </span>
            </div>
            <h3 className="font-serif text-2xl font-black text-brand-accent">
              {language === "hi" ? "तथ्य बनाम कल्पना: रंगा-बिल्ला की विरासत" : "Fact vs. Fiction: The Ranga-Billa Legacy"}
            </h3>
            <p className="font-sans text-xs text-brand-accent/50 mt-1 max-w-xl font-light">
              {language === "hi"
                ? "अमेज़ॅन प्राइम वीडियो की श्रृंखला 'राख' के नाटकीय रूपांतरण की तुलना 1978 के आधिकारिक दिल्ली पुलिस अभिलेखागार से करें।"
                : "Compare the dramatic storytelling of Prime Video's Raakh with the official 1978 Delhi police archives."}
            </p>
          </div>

          {/* Toggle Control */}
          <div className="flex bg-[#010101] border border-white/10 p-1 rounded-sm self-start md:self-center">
            <button
              onClick={() => setActiveTab("fiction")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-sm font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "fiction"
                  ? "bg-white/10 text-brand-accent font-bold"
                  : "text-brand-accent/40 hover:text-brand-accent"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "राख (काल्पनिक)" : "Raakh (Fiction)"}</span>
            </button>
            <button
              onClick={() => setActiveTab("fact")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-sm font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === "fact"
                  ? "bg-white/10 text-brand-accent font-bold"
                  : "text-brand-accent/40 hover:text-brand-accent"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "दस्तावेज़ (तथ्य)" : "Dossier (Fact)"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[380px]">
        {/* Left side: Case Selector tabs */}
        <div className="w-full lg:w-72 bg-black/20 border-b lg:border-b-0 lg:border-r border-white/10 p-4 flex flex-col space-y-2">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-brand-accent/35 mb-2 block font-bold px-2">
            {language === "hi" ? "महत्वपूर्ण विश्लेषण दृश्य चुनें" : "SELECT CRITICAL ANALYSIS SCENE"}
          </span>
          {cases.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCase(c.id)}
              className={`w-full text-left p-3.5 rounded-sm border transition-all cursor-pointer ${
                selectedCase === c.id
                  ? "bg-white/[0.04] border-white/20 text-brand-accent"
                  : "bg-transparent border-transparent text-brand-accent/55 hover:bg-white/[0.01] hover:text-brand-accent"
              }`}
            >
              <div className="font-mono text-[8px] uppercase tracking-wider text-brand-accent/40 mb-1">
                {c.topic}
              </div>
              <div className="font-serif text-sm font-bold leading-tight">
                {c.sceneTitle}
              </div>
            </button>
          ))}
        </div>

        {/* Right side: Split Pane Content Layout */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="z-10 animate-fadeIn">
            <div className="flex items-center space-x-2 text-brand-accent/40 font-mono text-[9px] uppercase tracking-widest mb-4">
              <span>{language === "hi" ? "अनुभाग संकलक" : "SECTION COMPILER"}</span>
              <span>//</span>
              <span className="text-brand-accent/60">{activeCase.topic.toUpperCase()}</span>
            </div>

            {/* Split Pane View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Left column: Dramatic version */}
              <div
                className={`p-5 rounded-sm border transition-all ${
                  activeTab === "fiction"
                    ? "bg-white/[0.03] border-white/20"
                    : "bg-transparent border-white/5 opacity-50"
                }`}
              >
                <div className="flex items-center space-x-2 text-orange-400 mb-3">
                  <Film className="w-4 h-4" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">
                    {language === "hi" ? "राख स्क्रीन नाट्य रूपांतरण" : "RAAKH SCREEN DRAMATIZATION"}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-brand-accent mb-2.5">
                  {activeCase.fictionTitle}
                </h4>
                <p className="font-sans text-xs text-brand-accent/70 leading-relaxed font-light">
                  {activeCase.fictionText}
                </p>
              </div>

              {/* Right column: Historical fact */}
              <div
                className={`p-5 rounded-sm border transition-all ${
                  activeTab === "fact"
                    ? "bg-white/[0.03] border-white/20"
                    : "bg-transparent border-white/5 opacity-50"
                }`}
              >
                <div className="flex items-center space-x-2 text-emerald-400 mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-mono text-[9px] uppercase tracking-widest font-bold">
                    {language === "hi" ? "आधिकारिक पुलिस अभिलेखागार डेटा" : "OFFICIAL POLICE ARCHIVE DATA"}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold text-brand-accent mb-2.5">
                  {activeCase.factTitle}
                </h4>
                <p className="font-sans text-xs text-brand-accent/70 leading-relaxed font-light">
                  {activeCase.factText}
                </p>
              </div>
            </div>
          </div>

          {/* Verification note banner at bottom */}
          <div className="mt-8 p-4 bg-black/90 border border-white/5 rounded-sm z-10 flex items-start space-x-3 text-left">
            <ShieldAlert className="w-4 h-4 text-brand-accent/40 mt-0.5 flex-shrink-0" />
            <div className="text-[11px] leading-relaxed">
              <span className="font-mono text-[8px] uppercase tracking-wider text-brand-accent/40 block mb-0.5 font-bold">
                {language === "hi" ? "फोरेंसिक विश्लेषण अंतर्दृष्टि" : "FORENSIC ANALYSIS INSIGHT"}
              </span>
              <span className="text-brand-accent/65 font-light">
                {activeCase.dramatizationNote}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
