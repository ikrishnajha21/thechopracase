/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface GuiltyWordProps {
  children: React.ReactNode;
  key?: React.Key;
}

export function GuiltyWord({ children }: GuiltyWordProps) {
  const handleMouseEnter = () => {
    document.body.classList.add("body-guilty-tremble");
  };

  const handleMouseLeave = () => {
    document.body.classList.remove("body-guilty-tremble");
  };

  return (
    <span
      className="guilty-keyword"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
}
