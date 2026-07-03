/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Info, Calendar, MapPin } from "lucide-react";

interface TooltipData {
  title: string;
  date: string;
  location: string;
  details: string;
}

const TOOLTIP_DATABASE: Record<string, TooltipData> = {
  "dhaula kuan": {
    title: "Dhaula Kuan Intersection",
    date: "August 26, 1978",
    location: "South-West Delhi, India",
    details: "The fateful location where Geeta (16) and Sanjay (14) were picked up by Ranga and Billa in the stolen Fiat 1100, believing they were being driven to All India Radio.",
  },
  "tihar jail": {
    title: "Tihar Jail Execution",
    date: "January 31, 1982",
    location: "Tihar, New Delhi",
    details: "The high-security penitentiary where the convicts Ranga and Billa were executed by hanging at 08:00 AM after their petitions for clemency were rejected.",
  },
  "ridge forest": {
    title: "Delhi Ridge Forest",
    date: "August 29, 1978",
    location: "Upper Ridge Road, Delhi",
    details: "The secluded forest area where the body of the siblings was discovered after an intensive multi-agency forensic sweep spanning 72 hours.",
  },
  "all india radio": {
    title: "All India Radio Studio",
    date: "August 26, 1978",
    location: "Parliament Street, Delhi",
    details: "The broadcasting studio where the children were scheduled to participate in the 'Yuva Vani' youth radio program, initiating their journey.",
  },
};

interface CaseTooltipProps {
  keyword: keyof typeof TOOLTIP_DATABASE;
  children: React.ReactNode;
  key?: React.Key;
}

export function CaseTooltip({ keyword, children }: CaseTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const data = TOOLTIP_DATABASE[keyword.toLowerCase().trim()];

  if (!data) {
    return <>{children}</>;
  }

  return (
    <span
      className="relative inline-block group cursor-help"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onTouchStart={() => setIsOpen(!isOpen)}
    >
      {/* Target highlighted text */}
      <span className="underline decoration-dashed decoration-brand-accent/50 hover:decoration-brand-accent text-brand-accent font-semibold transition-colors duration-200">
        {children}
      </span>

      {/* Tooltip Card */}
      <span
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-zinc-950 border border-white/20 rounded-sm p-4 shadow-[0_10px_25px_rgba(0,0,0,0.8)] pointer-events-none z-50 flex flex-col space-y-2.5 transition-all duration-300 origin-bottom ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-1 scale-95"
        }`}
      >
        <span className="grain"></span>
        
        {/* Tooltip Header */}
        <span className="flex items-center justify-between border-b border-white/10 pb-1.5">
          <span className="font-serif text-xs font-bold text-brand-accent uppercase tracking-wide">
            {data.title}
          </span>
          <Info className="w-3.5 h-3.5 text-brand-accent/40" />
        </span>

        {/* Date & Location tags */}
        <span className="flex flex-col space-y-1 text-[9px] font-mono text-brand-accent/50">
          <span className="flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-brand-accent/30" />
            <span>DATE: {data.date.toUpperCase()}</span>
          </span>
          <span className="flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-brand-accent/30" />
            <span>LOC: {data.location.toUpperCase()}</span>
          </span>
        </span>

        {/* Detailed context text */}
        <span className="font-sans text-[11px] text-zinc-300 leading-relaxed font-light">
          {data.details}
        </span>

        {/* Arrow element */}
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-zinc-950 -mt-[1px]" />
      </span>
    </span>
  );
}
