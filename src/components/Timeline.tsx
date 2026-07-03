/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TIMELINE_EVENTS } from "../data/storyData";
import { Clock, MapPin, Calendar } from "lucide-react";

interface TimelineProps {
  language: "hi" | "en";
}

export function Timeline({ language }: TimelineProps) {
  return (
    <div className="w-full bg-brand-bg border border-white/10 rounded-sm p-6 md:p-12 shadow-2xl relative overflow-hidden text-left">
      <div className="grain"></div>
      {/* Background Subtle Elements */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/5 border-dashed border-l border-white/10 pointer-events-none" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center space-x-2 text-brand-accent/60 mb-4 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <Clock className="w-3.5 h-3.5 animate-pulse text-red-500" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
              {language === "hi" ? "जांच का कालक्रम" : "Timeline of the Investigation"}
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-accent font-black tracking-tight">
            {language === "hi" ? "न्याय का सफर: ऐतिहासिक घटनाक्रम" : "The Road to Justice"}
          </h2>
          <p className="font-sans text-sm text-brand-accent/50 mt-3 max-w-xl mx-auto leading-relaxed font-light">
            {language === "hi"
              ? "अगस्त 1978 में हुए क्रूर अपहरण से लेकर 1982 में रंगा और बिल्ला को फांसी की सजा दिए जाने तक की ऐतिहासिक घटनाओं का क्रम।"
              : "Follow the definitive sequence of events from the sudden abduction in August 1978 to the execution of Ranga and Billa in 1982."}
          </p>
        </div>

        {/* Timeline Line & Cards */}
        <div className="relative space-y-12">
          {TIMELINE_EVENTS.map((event, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={`${event.year}-${idx}`}
                className={`flex flex-col md:flex-row items-center justify-between relative ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline center node dot */}
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20">
                  <div className="w-8 h-8 rounded-full bg-brand-bg border border-white/20 flex items-center justify-center transition-colors hover:border-red-500">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  </div>
                </div>

                {/* Timeline Content Card */}
                <div className="w-full md:w-[45%] bg-brand-bg/55 border border-white/10 rounded p-6 hover:border-white/30 transition-all shadow-xl group hover:shadow-2xl text-left">
                  <div className="flex justify-between items-center mb-4">
                    {/* Year badge */}
                    <span className="font-mono text-[10px] font-bold text-brand-accent bg-white/10 border border-white/20 px-2.5 py-1 rounded-sm tracking-wider">
                      {event.year}
                    </span>

                    {/* Date label */}
                    <div className="flex items-center space-x-1 text-brand-accent/40 font-mono text-[9px] tracking-wide">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date[language]}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg text-brand-accent font-bold mb-2 group-hover:text-red-400 transition-colors">
                    {event.title[language]}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-xs md:text-sm text-brand-accent/60 leading-relaxed mb-4 font-light opacity-95">
                    {event.description[language]}
                  </p>

                  {/* Location label */}
                  {event.location && (
                    <div className="flex items-center space-x-1.5 border-t border-white/10 pt-3 text-brand-accent/30">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.15em] font-semibold">
                        {event.location[language]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Empty spacer to balance grid */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
