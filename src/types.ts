/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Translation {
  hi: string;
  en: string;
}

export interface Chapter {
  id: string;
  number: number;
  title: Translation;
  subtitle: Translation;
  bgType: "image" | "map" | "prison" | "satellite";
  bgValue: string; // Coordinate, image prompt, or special component state
  sections: Section[];
}

export interface Section {
  id: string;
  text: Translation;
  highlight?: Translation;
  coordinates?: {
    lat: number;
    lng: number;
    label: string;
  };
}

export interface TimelineEvent {
  year: string;
  date: Translation;
  title: Translation;
  description: Translation;
  location?: Translation;
}

export interface MapNode {
  id: string;
  name: Translation;
  lat: number;
  lng: number; // For plotting on a normalized 0-100% SVG box
  description: Translation;
}

export interface PrisonHotspot {
  id: string;
  title: Translation;
  description: Translation;
  coordinates: { x: number; y: number }; // Percentage in cell plan
}
